import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const playerSchema = v.object({
  championId: v.string(),
  championName: v.string(),
  summonerName: v.optional(v.string()),
  avgKDA: v.optional(v.number()),
});

const teamSchema = v.object({
  top: playerSchema,
  jungle: playerSchema,
  mid: playerSchema,
  adc: playerSchema,
  support: playerSchema,
});

export const createPrediction = mutation({
  args: {
    blueTeam: teamSchema,
    redTeam: teamSchema,
    blueWinProbability: v.number(),
    redWinProbability: v.number(),
    mvpCandidate: v.object({
      team: v.string(),
      role: v.string(),
      championName: v.string(),
      summonerName: v.optional(v.string()),
    }),
    explanation: v.string(),
    patchVersion: v.string(),
    region: v.string(),
    matchPhase: v.string(),
    modelVersion: v.optional(v.string()),
    parentPredictionId: v.optional(v.id("predictions")),
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

    return await ctx.db.insert("predictions", {
      userId: user._id,
      blueTeam: args.blueTeam,
      redTeam: args.redTeam,
      blueWinProbability: args.blueWinProbability,
      redWinProbability: args.redWinProbability,
      mvpCandidate: args.mvpCandidate,
      explanation: args.explanation,
      patchVersion: args.patchVersion,
      region: args.region,
      matchPhase: args.matchPhase,
      modelVersion: args.modelVersion,
      parentPredictionId: args.parentPredictionId,
      createdAt: Date.now(),
    });
  },
});

export const getUserPredictions = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return [];
    }

    const predictions = await ctx.db
      .query("predictions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit || 50);

    return predictions;
  },
});

export const getGlobalFeed = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const predictions = await ctx.db
      .query("predictions")
      .withIndex("by_created_at")
      .order("desc")
      .take(args.limit || 50);

    const predictionsWithUsers = await Promise.all(
      predictions.map(async (prediction) => {
        const user = await ctx.db.get(prediction.userId);
        return {
          ...prediction,
          userHandle: user?.handle || "Unknown",
        };
      })
    );

    return predictionsWithUsers;
  },
});

export const getPredictionById = query({
  args: {
    predictionId: v.id("predictions"),
  },
  handler: async (ctx, args) => {
    const prediction = await ctx.db.get(args.predictionId);
    if (!prediction) {
      return null;
    }

    const user = await ctx.db.get(prediction.userId);

    return {
      ...prediction,
      userHandle: user?.handle || "Unknown",
    };
  },
});

export const getRelatedPredictions = query({
  args: {
    predictionId: v.id("predictions"),
  },
  handler: async (ctx, args) => {
    const prediction = await ctx.db.get(args.predictionId);
    if (!prediction) {
      return [];
    }

    const related = await ctx.db
      .query("predictions")
      .filter((q) => q.eq(q.field("parentPredictionId"), args.predictionId))
      .collect();

    return related;
  },
});
