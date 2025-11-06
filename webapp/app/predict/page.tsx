"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ChampionImage } from "@/components/ui/ChampionImage";

const ROLES = ["top", "jungle", "mid", "adc", "support"];

const REGIONS = [
  { value: "NA", label: "North America" },
  { value: "EUW", label: "Europe West" },
  { value: "KR", label: "Korea" },
];

export default function PredictPage() {
  const router = useRouter();
  const predictMatchOutcome = useAction(api.mlActions.predictMatchOutcome);
  const explainPrediction = useAction(api.mlActions.explainPrediction);
  const createPrediction = useMutation(api.predictions.createPrediction);

  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState("NA");
  const [patchVersion, setPatchVersion] = useState("14.1");
  const [matchPhase, setMatchPhase] = useState("draft");

  const [blueTeam, setBlueTeam] = useState({
    top: { championName: "", avgKDA: 0 },
    jungle: { championName: "", avgKDA: 0 },
    mid: { championName: "", avgKDA: 0 },
    adc: { championName: "", avgKDA: 0 },
    support: { championName: "", avgKDA: 0 },
  });

  const [redTeam, setRedTeam] = useState({
    top: { championName: "", avgKDA: 0 },
    jungle: { championName: "", avgKDA: 0 },
    mid: { championName: "", avgKDA: 0 },
    adc: { championName: "", avgKDA: 0 },
    support: { championName: "", avgKDA: 0 },
  });

  const handlePredict = async () => {
    setLoading(true);
    try {
      const blueTeamData = {
        top: {
          championId: blueTeam.top.championName.toLowerCase(),
          championName: blueTeam.top.championName,
          avgKDA: blueTeam.top.avgKDA || undefined,
        },
        jungle: {
          championId: blueTeam.jungle.championName.toLowerCase(),
          championName: blueTeam.jungle.championName,
          avgKDA: blueTeam.jungle.avgKDA || undefined,
        },
        mid: {
          championId: blueTeam.mid.championName.toLowerCase(),
          championName: blueTeam.mid.championName,
          avgKDA: blueTeam.mid.avgKDA || undefined,
        },
        adc: {
          championId: blueTeam.adc.championName.toLowerCase(),
          championName: blueTeam.adc.championName,
          avgKDA: blueTeam.adc.avgKDA || undefined,
        },
        support: {
          championId: blueTeam.support.championName.toLowerCase(),
          championName: blueTeam.support.championName,
          avgKDA: blueTeam.support.avgKDA || undefined,
        },
      };

      const redTeamData = {
        top: {
          championId: redTeam.top.championName.toLowerCase(),
          championName: redTeam.top.championName,
          avgKDA: redTeam.top.avgKDA || undefined,
        },
        jungle: {
          championId: redTeam.jungle.championName.toLowerCase(),
          championName: redTeam.jungle.championName,
          avgKDA: redTeam.jungle.avgKDA || undefined,
        },
        mid: {
          championId: redTeam.mid.championName.toLowerCase(),
          championName: redTeam.mid.championName,
          avgKDA: redTeam.mid.avgKDA || undefined,
        },
        adc: {
          championId: redTeam.adc.championName.toLowerCase(),
          championName: redTeam.adc.championName,
          avgKDA: redTeam.adc.avgKDA || undefined,
        },
        support: {
          championId: redTeam.support.championName.toLowerCase(),
          championName: redTeam.support.championName,
          avgKDA: redTeam.support.avgKDA || undefined,
        },
      };

      const predictionResult = await predictMatchOutcome({
        blueTeam: blueTeamData,
        redTeam: redTeamData,
        patchVersion,
        region,
        matchPhase,
      });

      const explanationResult = await explainPrediction({
        blueTeam: blueTeamData,
        redTeam: redTeamData,
        blueWinProbability: predictionResult.blueWinProbability,
        redWinProbability: predictionResult.redWinProbability,
        mvpCandidate: predictionResult.mvpCandidate,
        patchVersion,
        region,
      });

      const predictionId = await createPrediction({
        blueTeam: blueTeamData,
        redTeam: redTeamData,
        blueWinProbability: predictionResult.blueWinProbability,
        redWinProbability: predictionResult.redWinProbability,
        mvpCandidate: predictionResult.mvpCandidate,
        explanation: explanationResult.explanation,
        patchVersion,
        region,
        matchPhase,
        modelVersion: predictionResult.modelVersion,
      });

      router.push(`/prediction/${predictionId}`);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Failed to create prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[var(--background)] min-h-screen">
      <div className="bg-gradient-to-r from-[var(--accent)] to-yellow-300 border-b-8 border-[var(--border)] py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] text-center animate-fadeInUp">
            Create Prediction
          </h1>
          <p className="text-center text-[var(--foreground)] font-bold mt-2">
            Select champions for both teams and predict the match outcome
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-400 border-blue-700 border-4 animate-slideInLeft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-900 border-4 border-white flex items-center justify-center rounded">
                <span className="text-2xl font-black text-white">B</span>
              </div>
              <h2 className="text-3xl font-black text-white">Blue Side</h2>
            </div>
            <div className="space-y-4">
              {ROLES.map((role, index) => (
                <div
                  key={role}
                  className="bg-white/95 border-4 border-blue-900 p-4 animate-fadeInUp hover:scale-105 transition-transform"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="font-bold text-xs uppercase tracking-wide text-blue-900 mb-2 flex items-center gap-2">
                    <span className="bg-blue-900 text-white px-2 py-1 rounded">{role}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    {blueTeam[role as keyof typeof blueTeam].championName && (
                      <ChampionImage
                        championName={blueTeam[role as keyof typeof blueTeam].championName}
                        type="square"
                        className="w-12 h-12 rounded border-2 border-blue-900 animate-scaleIn"
                      />
                    )}
                    <Input
                      placeholder="Champion name"
                      value={blueTeam[role as keyof typeof blueTeam].championName}
                      onChange={(e) =>
                        setBlueTeam({
                          ...blueTeam,
                          [role]: {
                            ...blueTeam[role as keyof typeof blueTeam],
                            championName: e.target.value,
                          },
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-400 border-red-700 border-4 animate-slideInRight">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-900 border-4 border-white flex items-center justify-center rounded">
                <span className="text-2xl font-black text-white">R</span>
              </div>
              <h2 className="text-3xl font-black text-white">Red Side</h2>
            </div>
            <div className="space-y-4">
              {ROLES.map((role, index) => (
                <div
                  key={role}
                  className="bg-white/95 border-4 border-red-900 p-4 animate-fadeInUp hover:scale-105 transition-transform"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="font-bold text-xs uppercase tracking-wide text-red-900 mb-2 flex items-center gap-2">
                    <span className="bg-red-900 text-white px-2 py-1 rounded">{role}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    {redTeam[role as keyof typeof redTeam].championName && (
                      <ChampionImage
                        championName={redTeam[role as keyof typeof redTeam].championName}
                        type="square"
                        className="w-12 h-12 rounded border-2 border-red-900 animate-scaleIn"
                      />
                    )}
                    <Input
                      placeholder="Champion name"
                      value={redTeam[role as keyof typeof redTeam].championName}
                      onChange={(e) =>
                        setRedTeam({
                          ...redTeam,
                          [role]: {
                            ...redTeam[role as keyof typeof redTeam],
                            championName: e.target.value,
                          },
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-[var(--secondary)] to-[var(--success)] mb-8 animate-fadeInUp animation-delay-600">
          <h2 className="text-2xl font-black text-[var(--foreground)] mb-6">
            Match Context
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Select
              label="Region"
              options={REGIONS}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <Input
              label="Patch Version"
              placeholder="14.1"
              value={patchVersion}
              onChange={(e) => setPatchVersion(e.target.value)}
            />
            <Select
              label="Match Phase"
              options={[
                { value: "draft", label: "Draft" },
                { value: "live", label: "Live" },
              ]}
              value={matchPhase}
              onChange={(e) => setMatchPhase(e.target.value)}
            />
          </div>
        </Card>

        <div className="flex justify-center animate-scaleIn animation-delay-800">
          <Button
            variant="primary"
            size="lg"
            onClick={handlePredict}
            disabled={loading}
            className="w-full md:w-auto min-w-[300px] relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="animate-spin-slow">⚡</span>
                Generating Prediction...
              </span>
            ) : (
              "Predict Match Outcome"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
