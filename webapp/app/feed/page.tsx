"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChampionImage } from "@/components/ui/ChampionImage";

export default function FeedPage() {
  const [feedType, setFeedType] = useState<"global" | "personal">("global");

  const globalFeed = useQuery(api.predictions.getGlobalFeed, { limit: 50 });
  const userFeed = useQuery(api.predictions.getUserPredictions, { limit: 50 });

  const predictions = feedType === "global" ? globalFeed : userFeed;

  return (
    <div className="flex-1 bg-[var(--background)]">
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-b-8 border-[var(--border)] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] text-center mb-8 animate-fadeInUp">
            Prediction Feed
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant={feedType === "global" ? "success" : "secondary"}
              size="lg"
              onClick={() => setFeedType("global")}
              className="min-w-[160px]"
            >
              Global Feed
            </Button>
            <Button
              variant={feedType === "personal" ? "success" : "secondary"}
              size="lg"
              onClick={() => setFeedType("personal")}
              className="min-w-[160px]"
            >
              My Predictions
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {predictions === undefined ? (
          <Card>
            <div className="animate-shimmer">
              <p className="text-center font-bold">Loading predictions...</p>
            </div>
          </Card>
        ) : predictions.length === 0 ? (
          <Card className="bg-[var(--accent)]">
            <div className="text-center py-12 animate-scaleIn">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-2xl font-black text-[var(--foreground)] mb-4">
                No predictions yet
              </p>
              <p className="text-[var(--foreground)] mb-8 font-medium">
                Be the first to create a prediction and see your results here!
              </p>
              <Link href="/predict">
                <Button variant="primary" size="lg">Create Prediction</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction, index) => (
              <Link key={prediction._id} href={`/prediction/${prediction._id}`}>
                <Card
                  hover
                  className="h-full animate-fadeInUp hover:scale-105 transition-transform"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {feedType === "global" && "userHandle" in prediction && prediction.userHandle ? (
                    <div className="mb-4 pb-4 border-b-4 border-[var(--border)]">
                      <span className="font-bold text-sm text-[var(--foreground)]">
                        {String(prediction.userHandle)}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="default">{prediction.patchVersion}</Badge>
                      <Badge variant="blue">{prediction.region}</Badge>
                    </div>
                    <span className="text-xs text-[var(--foreground)] opacity-60 font-bold">
                      {new Date(prediction.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-400 border-4 border-blue-700 p-3 rounded relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="grid grid-cols-2 gap-1">
                          {Object.values(prediction.blueTeam).slice(0, 4).map((player, i) => (
                            <ChampionImage
                              key={i}
                              championName={player.championName}
                              type="square"
                              className="w-full h-auto opacity-50"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="relative z-10">
                        <span className="text-xs font-bold uppercase text-white block mb-1">
                          Blue Side
                        </span>
                        <span className="text-3xl font-black text-white animate-glow">
                          {prediction.blueWinProbability.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-red-400 border-4 border-red-700 p-3 rounded relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="grid grid-cols-2 gap-1">
                          {Object.values(prediction.redTeam).slice(0, 4).map((player, i) => (
                            <ChampionImage
                              key={i}
                              championName={player.championName}
                              type="square"
                              className="w-full h-auto opacity-50"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="relative z-10">
                        <span className="text-xs font-bold uppercase text-white block mb-1">
                          Red Side
                        </span>
                        <span className="text-3xl font-black text-white animate-glow">
                          {prediction.redWinProbability.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="h-3 bg-white border-4 border-[var(--border)] overflow-hidden rounded-full">
                      <div className="flex h-full">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-blue-400 transition-all"
                          style={{ width: `${prediction.blueWinProbability}%` }}
                        />
                        <div
                          className="bg-gradient-to-l from-red-600 to-red-400 transition-all"
                          style={{ width: `${prediction.redWinProbability}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t-4 border-[var(--border)] mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-[var(--foreground)] opacity-70">
                        MVP Prediction
                      </span>
                      <div className="flex gap-2 items-center">
                        <ChampionImage
                          championName={prediction.mvpCandidate.championName}
                          type="square"
                          className="w-8 h-8 rounded border-2 border-[var(--border)]"
                        />
                        <div className="text-right">
                          <span className="font-black text-sm text-[var(--foreground)] block">
                            {prediction.mvpCandidate.championName}
                          </span>
                          <Badge variant={prediction.mvpCandidate.team === 'blue' ? 'blue' : 'red'} className="text-xs">
                            {prediction.mvpCandidate.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
