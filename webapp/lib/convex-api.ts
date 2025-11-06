export const convexApi = {
  users: {
    getCurrentUser: "users:getCurrentUser",
    createOrUpdateUser: "users:createOrUpdateUser",
    updateUserProfile: "users:updateUserProfile",
    getUserStats: "users:getUserStats",
    isAdmin: "users:isAdmin",
  },
  predictions: {
    createPrediction: "predictions:createPrediction",
    getUserPredictions: "predictions:getUserPredictions",
    getGlobalFeed: "predictions:getGlobalFeed",
    getPredictionById: "predictions:getPredictionById",
    getRelatedPredictions: "predictions:getRelatedPredictions",
  },
  champions: {
    getAllChampions: "champions:getAllChampions",
    getChampionsByRole: "champions:getChampionsByRole",
    searchChampions: "champions:searchChampions",
    upsertChampion: "champions:upsertChampion",
    bulkUpsertChampions: "champions:bulkUpsertChampions",
  },
  mlActions: {
    predictMatchOutcome: "mlActions:predictMatchOutcome",
    explainPrediction: "mlActions:explainPrediction",
  },
} as const;
