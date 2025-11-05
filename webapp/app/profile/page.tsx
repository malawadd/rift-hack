"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <Link href="/" className="hover:underline">
          Convex + Next.js + Clerk
        </Link>
        <UserButton />
      </header>
      <main className="p-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-center">Profile</h1>
          
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Handle */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Handle
                </label>
                <div className="bg-white dark:bg-slate-700 p-3 rounded-md border">
                  <p className="text-lg">@{user.username || user.emailAddresses[0]?.emailAddress.split('@')[0]}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Name
                </label>
                <div className="bg-white dark:bg-slate-700 p-3 rounded-md border">
                  <p className="text-lg">{user.fullName || "Not set"}</p>
                </div>
              </div>

              {/* Region */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Region
                </label>
                <div className="bg-white dark:bg-slate-700 p-3 rounded-md border">
                  <p className="text-lg">{user.publicMetadata?.region as string || "Not set"}</p>
                </div>
              </div>

              {/* Preferred Role */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Preferred Role
                </label>
                <div className="bg-white dark:bg-slate-700 p-3 rounded-md border">
                  <p className="text-lg">{user.publicMetadata?.preferredRole as string || "Not set"}</p>
                </div>
              </div>

            </div>

            {/* My Recent Prediction */}
            <div className="mt-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  My Recent Prediction
                </label>
                <div className="bg-white dark:bg-slate-700 p-4 rounded-md border">
                  <p className="text-lg">{user.publicMetadata?.recentPrediction as string || "No recent predictions"}</p>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-6 flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
                Edit Profile
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}