import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    handle: v.string(),
    region: v.string(),
    preferredRole: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_handle", ["handle"]),

  champions: defineTable({
    championId: v.string(),
    name: v.string(),
    roles: v.array(v.string()),
    currentPatch: v.string(),
    imageUrl: v.optional(v.string()),
  })
    .index("by_champion_id", ["championId"])
    .index("by_name", ["name"]),

  predictions: defineTable({
    userId: v.id("users"),
    blueTeam: v.object({
      top: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      jungle: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      mid: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      adc: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      support: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
    }),
    redTeam: v.object({
      top: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      jungle: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      mid: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      adc: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
      support: v.object({
        championId: v.string(),
        championName: v.string(),
        summonerName: v.optional(v.string()),
        avgKDA: v.optional(v.number()),
      }),
    }),
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
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_created_at", ["createdAt"])
    .index("by_user_and_created_at", ["userId", "createdAt"]),

  modelVersions: defineTable({
    version: v.string(),
    description: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_version", ["version"]),

  patchNotes: defineTable({
    patchVersion: v.string(),
    description: v.string(),
    releaseDate: v.number(),
  }).index("by_patch", ["patchVersion"]),
});
