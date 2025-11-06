"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ChampionImage } from "@/components/ui/ChampionImage";
import { Id } from "@/convex/_generated/dataModel";

export default function PredictionDetailPage() {
  const params = useParams();
  const predictionId = params.id as Id<"predictions">;

  const prediction = useQuery(api.predictions.getPredictionById, {
    predictionId,
  });

  if (prediction === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <Card>
          <div className="animate-shimmer">
            <p className="text-center font-bold">Loading prediction...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (prediction === null) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <Card>
          <div className="text-center">
            <p className="text-lg font-bold text-[var(--foreground)] mb-4">
              Prediction not found
            </p>
            <Link href="/feed">
              <Button variant="secondary">Back to Feed</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const blueWinning = prediction.blueWinProbability > prediction.redWinProbability;

  return (
    <div className="flex-1 min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: blueWinning
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
        }}
      />

      <div className="relative z-10">
        <div className="bg-gradient-to-b from-[var(--foreground)] to-transparent border-b-8 border-[var(--border)] py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-6 animate-fadeInUp">
              <Badge variant="default" className="mb-4">
                {new Date(prediction.createdAt).toLocaleDateString()}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-black text-[var(--accent)] animate-glow">
                Match Prediction
              </h1>
              <p className="text-lg font-semibold text-white mt-2">
                By {prediction.userHandle}
              </p>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge variant="default">{prediction.patchVersion}</Badge>
              <Badge variant="blue">{prediction.region}</Badge>
              {prediction.modelVersion && (
                <Badge variant="yellow">{prediction.modelVersion}</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <div className="animate-fadeInUp animation-delay-200">
            <ProgressBar
              bluePercentage={prediction.blueWinProbability}
              redPercentage={prediction.redWinProbability}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
              <div className="bg-[var(--foreground)] text-[var(--accent)] font-black text-2xl px-6 py-3 rounded-full border-4 border-[var(--accent)] shadow-lg animate-pulse-glow">
                VS
              </div>
            </div>

            <Card className="bg-gradient-to-br from-blue-600 to-blue-400 border-blue-700 border-4 relative overflow-hidden h-full animate-slideInLeft">
              {blueWinning && (
                <div className="absolute top-4 right-4 bg-[var(--accent)] border-4 border-[var(--border)] px-4 py-2 rotate-12 animate-scaleIn z-10">
                  <span className="text-xs font-black uppercase">Winner!</span>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-900 border-4 border-white flex items-center justify-center rounded">
                    <span className="text-2xl font-black text-white">B</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">Blue Side</h2>
                </div>

                <div className="mb-8 text-center">
                  <div className="text-7xl font-black text-white mb-2 leading-none animate-glow">
                    <AnimatedCounter value={prediction.blueWinProbability} />
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wide text-blue-100">
                    Win Probability
                  </div>
                </div>

                <div className="space-y-3">
                  {Object.entries(prediction.blueTeam).map(([role, player], index) => (
                    <div
                      key={role}
                      className="bg-white/95 border-4 border-blue-900 p-4 shadow-[4px_4px_0_rgba(30,58,138,0.5)] hover:scale-105 transition-transform animate-fadeInUp"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <ChampionImage
                          championName={player.championName}
                          type="square"
                          className="w-16 h-16 rounded border-2 border-blue-900"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-xs uppercase text-blue-900 mb-1">
                            {role}
                          </div>
                          <div className="font-black text-lg text-[var(--foreground)]">
                            {player.championName}
                          </div>
                        </div>
                        {player.avgKDA && (
                          <div className="text-sm font-bold bg-blue-100 px-3 py-1 rounded border-2 border-blue-900">
                            KDA: {player.avgKDA}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-red-600 to-red-400 border-red-700 border-4 relative overflow-hidden h-full animate-slideInRight">
              {!blueWinning && (
                <div className="absolute top-4 right-4 bg-[var(--accent)] border-4 border-[var(--border)] px-4 py-2 rotate-12 animate-scaleIn z-10">
                  <span className="text-xs font-black uppercase">Winner!</span>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-900 border-4 border-white flex items-center justify-center rounded">
                    <span className="text-2xl font-black text-white">R</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">Red Side</h2>
                </div>

                <div className="mb-8 text-center">
                  <div className="text-7xl font-black text-white mb-2 leading-none animate-glow">
                    <AnimatedCounter value={prediction.redWinProbability} />
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wide text-red-100">
                    Win Probability
                  </div>
                </div>

                <div className="space-y-3">
                  {Object.entries(prediction.redTeam).map(([role, player], index) => (
                    <div
                      key={role}
                      className="bg-white/95 border-4 border-red-900 p-4 shadow-[4px_4px_0_rgba(127,29,29,0.5)] hover:scale-105 transition-transform animate-fadeInUp"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <ChampionImage
                          championName={player.championName}
                          type="square"
                          className="w-16 h-16 rounded border-2 border-red-900"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-xs uppercase text-red-900 mb-1">
                            {role}
                          </div>
                          <div className="font-black text-lg text-[var(--foreground)]">
                            {player.championName}
                          </div>
                        </div>
                        {player.avgKDA && (
                          <div className="text-sm font-bold bg-red-100 px-3 py-1 rounded border-2 border-red-900">
                            KDA: {player.avgKDA}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <Card className="mb-8 bg-gradient-to-br from-[var(--accent)] to-yellow-300 border-8 border-[var(--border)] relative animate-scaleIn animation-delay-600">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-6xl animate-float">
              🏆
            </div>
            <h2 className="text-3xl font-black text-[var(--foreground)] mb-6 text-center pt-8">
              MVP Prediction
            </h2>
            <div className="bg-white border-4 border-[var(--border)] p-8 text-center shadow-[8px_8px_0_var(--border)]">
              <div className="flex justify-center mb-4">
                <ChampionImage
                  championName={prediction.mvpCandidate.championName}
                  type="square"
                  className="w-32 h-32 rounded-lg border-4 border-[var(--border)] shadow-lg"
                />
              </div>
              <div className="text-5xl font-black mb-3 text-[var(--foreground)] animate-glow">
                {prediction.mvpCandidate.championName}
              </div>
              <div className="flex justify-center gap-3 mb-4 flex-wrap">
                <Badge variant={prediction.mvpCandidate.team === 'blue' ? 'blue' : 'red'}>
                  {prediction.mvpCandidate.team.toUpperCase()} Team
                </Badge>
                <Badge variant="default">
                  {prediction.mvpCandidate.role.toUpperCase()}
                </Badge>
              </div>
              {prediction.mvpCandidate.summonerName && (
                <div className="text-lg font-bold mt-4 text-[var(--foreground)]">
                  Player: {prediction.mvpCandidate.summonerName}
                </div>
              )}
            </div>
          </Card>

          <Card className="mb-8 animate-fadeInUp animation-delay-800">
            <h2 className="text-3xl font-black text-[var(--foreground)] mb-6">
              AI Analysis
            </h2>
            <div className="bg-gradient-to-r from-[var(--success)]/20 to-[var(--secondary)]/20 border-4 border-[var(--border)] p-6 rounded">
              <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-wrap font-medium text-lg">
                {prediction.explanation}
              </p>
            </div>
          </Card>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/feed">
              <Button variant="secondary">Back to Feed</Button>
            </Link>
            <Link href="/predict">
              <Button variant="primary">Create New Prediction</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
