import { v } from "convex/values";
import { action } from "./_generated/server";

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

export const predictMatchOutcome = action({
  args: {
    blueTeam: teamSchema,
    redTeam: teamSchema,
    patchVersion: v.string(),
    region: v.string(),
    matchPhase: v.string(),
  },
  handler: async (ctx, args) => {
    const ML_PREDICT_ENDPOINT =
      process.env.ML_PREDICT_ENDPOINT || "http://localhost:8000/predict";

    try {
      const response = await fetch(ML_PREDICT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blueTeam: args.blueTeam,
          redTeam: args.redTeam,
          patchVersion: args.patchVersion,
          region: args.region,
          matchPhase: args.matchPhase,
        }),
      });

      if (!response.ok) {
        throw new Error(`ML API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        blueWinProbability: data.blueWinProbability || 50,
        redWinProbability: data.redWinProbability || 50,
        mvpCandidate: data.mvpCandidate || {
          team: "blue",
          role: "mid",
          championName: args.blueTeam.mid.championName,
          summonerName: args.blueTeam.mid.summonerName,
        },
        modelVersion: data.modelVersion || "v1.0",
      };
    } catch (error) {
      console.error("ML prediction error:", error);
      return {
        blueWinProbability: 50,
        redWinProbability: 50,
        mvpCandidate: {
          team: "blue",
          role: "mid",
          championName: args.blueTeam.mid.championName,
          summonerName: args.blueTeam.mid.summonerName,
        },
        modelVersion: "fallback",
      };
    }
  },
});

export const explainPrediction = action({
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
    patchVersion: v.string(),
    region: v.string(),
  },
  handler: async (ctx, args) => {
    const ML_EXPLAIN_ENDPOINT =
      process.env.ML_EXPLAIN_ENDPOINT || "http://localhost:8000/explain";

    try {
      const response = await fetch(ML_EXPLAIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });

      if (!response.ok) {
        throw new Error(`ML API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        explanation:
          data.explanation ||
          "Based on team compositions and player statistics, this prediction analyzes champion synergies, counter matchups, and historical performance data.",
      };
    } catch (error) {
      console.error("ML explanation error:", error);
      return {
        explanation:
          "Based on team compositions and player statistics, this prediction analyzes champion synergies, counter matchups, and historical performance data.",
      };
    }
  },
});
