"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";
import Link from "next/link";

const REGIONS = [
  { value: "NA", label: "North America" },
  { value: "EUW", label: "Europe West" },
  { value: "EUNE", label: "Europe Nordic & East" },
  { value: "KR", label: "Korea" },
  { value: "CN", label: "China" },
  { value: "BR", label: "Brazil" },
  { value: "LAN", label: "Latin America North" },
  { value: "LAS", label: "Latin America South" },
  { value: "OCE", label: "Oceania" },
  { value: "RU", label: "Russia" },
  { value: "TR", label: "Turkey" },
  { value: "JP", label: "Japan" },
];

const ROLES = [
  { value: "", label: "Select Role" },
  { value: "top", label: "Top" },
  { value: "jungle", label: "Jungle" },
  { value: "mid", label: "Mid" },
  { value: "adc", label: "ADC" },
  { value: "support", label: "Support" },
];

export default function ProfilePage() {
  const { user } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);
  const userStats = useQuery(api.users.getUserStats);
  const predictions = useQuery(api.predictions.getUserPredictions, {
    limit: 10,
  });
  const updateProfile = useMutation(api.users.updateUserProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  if (!user || currentUser === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <Card>
          <p className="text-center font-bold">Loading profile...</p>
        </Card>
      </div>
    );
  }

  if (currentUser === null) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <Card>
          <p className="text-center font-bold">
            Please sign in to view your profile
          </p>
        </Card>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        region: selectedRegion || undefined,
        preferredRole: selectedRole || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex-1 bg-[var(--background)]">
      <div className="bg-[var(--secondary)] border-b-8 border-[var(--border)] py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block text-6xl mb-4">👤</div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)]">
            {currentUser.handle}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card className="bg-[var(--accent)]">
            <div className="text-center">
              <div className="text-5xl mb-3">📊</div>
              <div className="text-5xl font-black text-[var(--foreground)] mb-2">
                {userStats?.totalPredictions || 0}
              </div>
              <div className="text-sm font-bold uppercase tracking-wide text-[var(--foreground)] opacity-70">
                Total Predictions
              </div>
            </div>
          </Card>

          <Card className="bg-[var(--primary)]">
            <div className="text-center">
              <div className="text-5xl mb-3">🌍</div>
              <div className="text-3xl font-black text-[var(--foreground)] mb-2">
                {REGIONS.find((r) => r.value === currentUser.region)?.label || currentUser.region}
              </div>
              <div className="text-sm font-bold uppercase tracking-wide text-[var(--foreground)] opacity-70">
                Region
              </div>
            </div>
          </Card>

          <Card className="bg-[var(--success)]">
            <div className="text-center">
              <div className="text-5xl mb-3">⚔️</div>
              <div className="text-3xl font-black text-[var(--foreground)] mb-2">
                {currentUser.preferredRole
                  ? currentUser.preferredRole.charAt(0).toUpperCase() + currentUser.preferredRole.slice(1)
                  : "Not Set"}
              </div>
              <div className="text-sm font-bold uppercase tracking-wide text-[var(--foreground)] opacity-70">
                Preferred Role
              </div>
            </div>
          </Card>
        </div>

        <Card className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-black text-[var(--foreground)]">
              Profile Settings
            </h2>
            {!isEditing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedRegion(currentUser.region);
                  setSelectedRole(currentUser.preferredRole || "");
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <Select
                label="Region"
                options={REGIONS}
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              />
              <Select
                label="Preferred Role"
                options={ROLES}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--background)] border-4 border-[var(--border)] p-6">
              <p className="text-[var(--foreground)] font-medium">
                Your profile is all set! You can edit your region and preferred role above.
              </p>
            </div>
          )}
        </Card>

        {userStats?.favoriteChampion && (
          <Card className="mb-8 bg-[var(--accent)]">
            <h2 className="text-2xl font-black text-[var(--foreground)] mb-4">
              Favorite Champion
            </h2>
            <div className="bg-white border-4 border-[var(--border)] p-6 text-center">
              <div className="text-4xl font-black text-[var(--foreground)]">
                🏆 {userStats.favoriteChampion}
              </div>
            </div>
          </Card>
        )}

        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-[var(--foreground)]">
              Recent Predictions
            </h2>
            <Link href="/predict">
              <Button variant="primary" size="sm">
                New Prediction
              </Button>
            </Link>
          </div>

          {predictions === undefined ? (
            <p className="text-center font-bold text-[var(--foreground)] opacity-70">
              Loading predictions...
            </p>
          ) : predictions.length === 0 ? (
            <div className="text-center py-12 bg-[var(--background)] border-4 border-[var(--border)]">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-2xl font-black text-[var(--foreground)] mb-4">
                No predictions yet
              </p>
              <p className="text-[var(--foreground)] mb-8 font-medium">
                Create your first prediction to get started!
              </p>
              <Link href="/predict">
                <Button variant="primary" size="lg">Create Prediction</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <Link
                  key={prediction._id}
                  href={`/prediction/${prediction._id}`}
                >
                  <div className="border-4 border-[var(--border)] p-6 hover:bg-[var(--accent)] hover:bg-opacity-20 transition-all cursor-pointer shadow-[4px_4px_0_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--border)]">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div className="flex gap-2">
                        <Badge variant="default">
                          {prediction.patchVersion}
                        </Badge>
                        <Badge variant="blue">{prediction.region}</Badge>
                      </div>
                      <span className="text-sm text-[var(--foreground)] opacity-60 font-bold">
                        {new Date(prediction.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-100 border-2 border-[var(--border)] p-3">
                        <span className="text-xs font-bold uppercase text-blue-700">
                          Blue Side
                        </span>
                        <p className="text-3xl font-black text-blue-700">
                          {prediction.blueWinProbability.toFixed(0)}%
                        </p>
                      </div>
                      <div className="bg-red-100 border-2 border-[var(--border)] p-3">
                        <span className="text-xs font-bold uppercase text-red-700">
                          Red Side
                        </span>
                        <p className="text-3xl font-black text-red-700">
                          {prediction.redWinProbability.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t-4 border-[var(--border)]">
                      <Badge variant="yellow">
                        MVP: {prediction.mvpCandidate.championName} ({prediction.mvpCandidate.role})
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
