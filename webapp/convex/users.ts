import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    return user;
  },
});

export const createOrUpdateUser = mutation({
  args: {
    clerkId: v.string(),
    handle: v.string(),
    region: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        handle: args.handle,
        region: args.region,
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      handle: args.handle,
      region: args.region,
      isAdmin: false,
      createdAt: Date.now(),
    });
  },
});

export const updateUserProfile = mutation({
  args: {
    region: v.optional(v.string()),
    preferredRole: v.optional(v.string()),
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

    if (!user) {
      throw new Error("User not found");
    }

    const updateData: { region?: string; preferredRole?: string } = {};
    if (args.region !== undefined) updateData.region = args.region;
    if (args.preferredRole !== undefined)
      updateData.preferredRole = args.preferredRole;

    await ctx.db.patch(user._id, updateData);
    return user._id;
  },
});

export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    const predictions = await ctx.db
      .query("predictions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const championCounts: Record<string, number> = {};
    predictions.forEach((pred) => {
      [pred.blueTeam, pred.redTeam].forEach((team) => {
        Object.values(team).forEach((player) => {
          const champName = player.championName;
          championCounts[champName] = (championCounts[champName] || 0) + 1;
        });
      });
    });

    const favoriteChampion = Object.entries(championCounts).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      totalPredictions: predictions.length,
      favoriteChampion: favoriteChampion ? favoriteChampion[0] : null,
      recentPredictions: predictions.slice(-5),
    };
  },
});

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    return user?.isAdmin || false;
  },
});
