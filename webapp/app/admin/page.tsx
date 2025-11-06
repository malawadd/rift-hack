"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
  const isAdmin = useQuery(api.users.isAdmin);
  const champions = useQuery(api.champions.getAllChampions);
  const bulkUpsertChampions = useMutation(api.champions.bulkUpsertChampions);

  const [championData, setChampionData] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAdmin === undefined) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <p className="text-center font-bold">Loading...</p>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <div className="text-center py-8">
            <p className="text-lg font-bold text-[var(--dark-navy)] mb-4">
              Access Denied
            </p>
            <p className="text-[var(--dark-navy)]/70">
              You do not have admin privileges to access this page.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const handleBulkUpload = async () => {
    try {
      setLoading(true);
      const championsArray = JSON.parse(championData);
      await bulkUpsertChampions({ champions: championsArray });
      alert("Champions uploaded successfully!");
      setChampionData("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload champions. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-[var(--dark-navy)] mb-8">
        Admin Panel
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <h2 className="text-2xl font-bold text-[var(--dark-navy)] mb-4">
            Champion Management
          </h2>
          <p className="text-[var(--dark-navy)]/70 mb-4">
            Current champions in database: {champions?.length || 0}
          </p>
          <div className="space-y-4">
            <div>
              <label className="font-bold text-sm text-[var(--dark-navy)] mb-2 block">
                Bulk Upload (JSON)
              </label>
              <textarea
                className="w-full px-4 py-3 border-4 border-black bg-white font-mono text-sm"
                rows={10}
                placeholder={`[
  {
    "championId": "ahri",
    "name": "Ahri",
    "roles": ["mid"],
    "currentPatch": "14.1"
  }
]`}
                value={championData}
                onChange={(e) => setChampionData(e.target.value)}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleBulkUpload}
              disabled={loading || !championData}
            >
              {loading ? "Uploading..." : "Upload Champions"}
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-[var(--dark-navy)] mb-4">
            System Information
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-bold text-sm text-[var(--dark-navy)]/70">
                Total Champions
              </span>
              <p className="text-2xl font-black text-[var(--dark-navy)]">
                {champions?.length || 0}
              </p>
            </div>
            <div className="mt-4 p-4 bg-[var(--accent-yellow)] border-2 border-black">
              <p className="font-bold text-sm">Admin Tools</p>
              <p className="text-xs text-[var(--dark-navy)]/70 mt-1">
                Use this panel to manage champion data and system configuration
              </p>
            </div>
          </div>
        </Card>
      </div>

      {champions && champions.length > 0 && (
        <Card>
          <h2 className="text-2xl font-bold text-[var(--dark-navy)] mb-4">
            Champion List
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {champions.map((champion) => (
              <div
                key={champion._id}
                className="p-3 border-2 border-black bg-white"
              >
                <div className="font-bold text-[var(--dark-navy)]">
                  {champion.name}
                </div>
                <div className="text-xs text-[var(--dark-navy)]/70">
                  {champion.roles.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
