"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const { isSignedIn } = useUser();
  const recentPredictions = useQuery(api.predictions.getGlobalFeed, {
    limit: 6,
  });

  return (
    <div className="w-full">
      {/* Hero Section - Full Screen */}
      <section className="bg-[var(--primary)] border-b-8 border-[var(--border)] relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center">
          <div className="inline-block mb-16 animate-float">
            <div className="text-9xl md:text-[12rem]">⚔️</div>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black text-[var(--foreground)] mb-16 leading-tight text-center">
            PREDICT THE<br />OUTCOME
          </h1>
          <p className="text-2xl md:text-3xl text-[var(--foreground)] mb-20 max-w-5xl mx-auto font-semibold leading-relaxed text-center">
            Harness AI-powered analysis to predict League of Legends match winners, identify MVP candidates, and understand the reasoning behind every prediction.
          </p>
          <div className="flex justify-center">
            {isSignedIn ? (
              <Link href="/predict">
                <Button variant="secondary" size="lg" className="text-3xl px-20 py-8 font-black uppercase tracking-wider transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  CREATE PREDICTION
                </Button>
              </Link>
            ) : (
              <Button variant="secondary" size="lg" className="text-3xl px-20 py-8 font-black uppercase tracking-wider transform hover:scale-105 transition-all duration-300 shadow-2xl">
                SIGN UP TO GET STARTED
              </Button>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-24 h-24 border-4 border-[var(--border)]"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-[var(--border)]"></div>
          <div className="absolute top-1/2 right-32 w-20 h-20 border-4 border-[var(--border)]"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 border-4 border-[var(--border)]"></div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[var(--foreground)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--foreground)] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-[var(--foreground)] mb-12 text-center">
              POWERFUL FEATURES
            </h2>
            <p className="text-2xl md:text-3xl text-[var(--foreground)] opacity-80 max-w-4xl mx-auto leading-relaxed text-center">
              Discover what makes our AI predictions so accurate and insightful
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 justify-items-center">
              <Card hover className="bg-[var(--accent)] p-16 text-center min-h-[500px] flex flex-col justify-center items-center w-full max-w-md">
                <div className="text-9xl mb-12">🎯</div>
                <h3 className="text-4xl font-black mb-10 text-[var(--foreground)] text-center">
                  WIN PROBABILITY
                </h3>
                <p className="text-xl text-[var(--foreground)] font-medium leading-relaxed text-center">
                  Advanced ML models analyze team compositions, champion synergies, and player stats to predict match outcomes with precision.
                </p>
              </Card>
              <Card hover className="bg-[var(--secondary)] p-16 text-center min-h-[500px] flex flex-col justify-center items-center w-full max-w-md">
                <div className="text-9xl mb-12">🏆</div>
                <h3 className="text-4xl font-black mb-10 text-[var(--foreground)] text-center">
                  MVP PREDICTION
                </h3>
                <p className="text-xl text-[var(--foreground)] font-medium leading-relaxed text-center">
                  Identify the most likely MVP candidate for each match with detailed analysis of key performance factors and impact.
                </p>
              </Card>
              <Card hover className="bg-[var(--success)] p-16 text-center min-h-[500px] flex flex-col justify-center items-center w-full max-w-md">
                <div className="text-9xl mb-12">🧠</div>
                <h3 className="text-4xl font-black mb-10 text-[var(--foreground)] text-center">
                  AI EXPLANATION
                </h3>
                <p className="text-xl text-[var(--foreground)] font-medium leading-relaxed text-center">
                  Get plain-English explanations for every prediction, understanding exactly why the model made its decision.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Predictions Section - Full Screen */}
      {recentPredictions && recentPredictions.length > 0 && (
        <section className="bg-[var(--accent)] border-y-8 border-[var(--border)] min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-20 text-center lg:text-left">
              <h2 className="text-6xl md:text-8xl font-black text-[var(--foreground)] mb-8 lg:mb-0">
                RECENT PREDICTIONS
              </h2>
              <Link href="/feed">
                <Button variant="secondary" size="lg" className="text-2xl px-12 py-4">
                  VIEW ALL
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {recentPredictions.map((prediction) => (
                <div key={prediction._id} className="flex justify-center">
                  <Link href={`/prediction/${prediction._id}`} className="w-full max-w-sm">
                    <Card hover className="p-10 min-h-[400px] flex flex-col justify-between text-center">
                      <div className="flex justify-between items-start mb-10">
                        <span className="font-bold text-xl text-[var(--foreground)]">
                          {prediction.userHandle}
                        </span>
                        <span className="text-base text-[var(--foreground)] opacity-60">
                          {new Date(prediction.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-8 flex-grow">
                        <div className="bg-blue-100 border-4 border-[var(--border)] p-8">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold uppercase text-blue-700">
                              BLUE SIDE
                            </span>
                            <span className="text-5xl font-black text-blue-700">
                              {prediction.blueWinProbability.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="bg-red-100 border-4 border-[var(--border)] p-8">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold uppercase text-red-700">
                              RED SIDE
                            </span>
                            <span className="text-5xl font-black text-red-700">
                              {prediction.redWinProbability.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="pt-6 border-t-4 border-[var(--border)]">
                          <Badge variant="yellow" className="text-base px-6 py-3">
                            MVP: {prediction.mvpCandidate.championName}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center">
          <h2 className="text-6xl md:text-9xl font-black text-[var(--foreground)] mb-16 leading-tight text-center max-w-6xl">
            READY TO MAKE YOUR<br />FIRST PREDICTION?
          </h2>
          <p className="text-3xl md:text-4xl text-[var(--foreground)] mb-20 font-medium leading-relaxed max-w-5xl mx-auto text-center">
            Join the community and start predicting League of Legends match outcomes with AI-powered insights.
          </p>
          <div className="flex justify-center">
            {isSignedIn ? (
              <Link href="/predict">
                <Button variant="primary" size="lg" className="text-4xl px-24 py-10 font-black uppercase tracking-wider transform hover:scale-110 transition-all duration-300 shadow-2xl">
                  START PREDICTING
                </Button>
              </Link>
            ) : (
              <Button variant="primary" size="lg" className="text-4xl px-24 py-10 font-black uppercase tracking-wider transform hover:scale-110 transition-all duration-300 shadow-2xl">
                GET STARTED NOW
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
