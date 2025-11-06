"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white border-b-8 border-[var(--border)] sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl transform group-hover:scale-110 transition-transform">
              ⚔️
            </div>
            <div className="text-2xl font-black text-[var(--foreground)] uppercase tracking-tight">
              DORANDISHI
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`font-bold uppercase text-sm tracking-wide transition-all ${
                isActive("/")
                  ? "text-[var(--primary)] border-b-4 border-[var(--primary)] pb-1"
                  : "text-[var(--foreground)] hover:text-[var(--primary)] hover:translate-y-[-2px]"
              }`}
            >
              Home
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/predict"
                  className={`font-bold uppercase text-sm tracking-wide transition-all ${
                    isActive("/predict")
                      ? "text-[var(--primary)] border-b-4 border-[var(--primary)] pb-1"
                      : "text-[var(--foreground)] hover:text-[var(--primary)] hover:translate-y-[-2px]"
                  }`}
                >
                  Predict
                </Link>
                <Link
                  href="/feed"
                  className={`font-bold uppercase text-sm tracking-wide transition-all ${
                    isActive("/feed")
                      ? "text-[var(--primary)] border-b-4 border-[var(--primary)] pb-1"
                      : "text-[var(--foreground)] hover:text-[var(--primary)] hover:translate-y-[-2px]"
                  }`}
                >
                  Feed
                </Link>
                <Link
                  href="/profile"
                  className={`font-bold uppercase text-sm tracking-wide transition-all ${
                    isActive("/profile")
                      ? "text-[var(--primary)] border-b-4 border-[var(--primary)] pb-1"
                      : "text-[var(--foreground)] hover:text-[var(--primary)] hover:translate-y-[-2px]"
                  }`}
                >
                  Profile
                </Link>
              </>
            )}
            <div className="ml-2">
              <UserButton />
            </div>
          </nav>

          <button
            className="md:hidden p-2 border-4 border-[var(--border)] bg-[var(--accent)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="space-y-1">
              <div className="w-6 h-1 bg-[var(--foreground)]"></div>
              <div className="w-6 h-1 bg-[var(--foreground)]"></div>
              <div className="w-6 h-1 bg-[var(--foreground)]"></div>
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 border-t-4 border-[var(--border)] pt-6">
            <Link
              href="/"
              className={`font-bold uppercase text-sm tracking-wide p-4 border-4 border-[var(--border)] transition-all ${
                isActive("/")
                  ? "bg-[var(--primary)] text-[var(--foreground)]"
                  : "bg-white hover:bg-[var(--accent)]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/predict"
                  className={`font-bold uppercase text-sm tracking-wide p-4 border-4 border-[var(--border)] transition-all ${
                    isActive("/predict")
                      ? "bg-[var(--primary)] text-[var(--foreground)]"
                      : "bg-white hover:bg-[var(--accent)]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🎯 Predict
                </Link>
                <Link
                  href="/feed"
                  className={`font-bold uppercase text-sm tracking-wide p-4 border-4 border-[var(--border)] transition-all ${
                    isActive("/feed")
                      ? "bg-[var(--primary)] text-[var(--foreground)]"
                      : "bg-white hover:bg-[var(--accent)]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📰 Feed
                </Link>
                <Link
                  href="/profile"
                  className={`font-bold uppercase text-sm tracking-wide p-4 border-4 border-[var(--border)] transition-all ${
                    isActive("/profile")
                      ? "bg-[var(--primary)] text-[var(--foreground)]"
                      : "bg-white hover:bg-[var(--accent)]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 Profile
                </Link>
              </>
            )}
            <div className="mt-4 p-4 border-4 border-[var(--border)] bg-[var(--secondary)] flex items-center gap-3">
              <UserButton />
              <span className="font-bold text-sm text-[var(--foreground)]">Account</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
