import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllChampions = query({
  args: {},
  handler: async (ctx) => {
    const champions = await ctx.db.query("champions").collect();
    return champions.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const getChampionsByRole = query({
  args: {
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const champions = await ctx.db.query("champions").collect();
    return champions
      .filter((champ) => champ.roles.includes(args.role))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const searchChampions = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const champions = await ctx.db.query("champions").collect();
    const term = args.searchTerm.toLowerCase();
    return champions
      .filter((champ) => champ.name.toLowerCase().includes(term))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const upsertChampion = mutation({
  args: {
    championId: v.string(),
    name: v.string(),
    roles: v.array(v.string()),
    currentPatch: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user?.isAdmin) {
      throw new Error("Admin access required");
    }

    const existing = await ctx.db
      .query("champions")
      .withIndex("by_champion_id", (q) => q.eq("championId", args.championId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        roles: args.roles,
        currentPatch: args.currentPatch,
        imageUrl: args.imageUrl,
      });
      return existing._id;
    }

    return await ctx.db.insert("champions", args);
  },
});

export const bulkUpsertChampions = mutation({
  args: {
    champions: v.array(
      v.object({
        championId: v.string(),
        name: v.string(),
        roles: v.array(v.string()),
        currentPatch: v.string(),
        imageUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user?.isAdmin) {
      throw new Error("Admin access required");
    }

    const results = [];
    for (const champion of args.champions) {
      const existing = await ctx.db
        .query("champions")
        .withIndex("by_champion_id", (q) =>
          q.eq("championId", champion.championId)
        )
        .unique();

      if (existing) {
        await ctx.db.patch(existing._id, champion);
        results.push(existing._id);
      } else {
        const id = await ctx.db.insert("champions", champion);
        results.push(id);
      }
    }

    return results;
  },
});
