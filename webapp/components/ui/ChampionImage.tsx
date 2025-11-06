"use client";

import { useState } from "react";
import Image from "next/image";
import { getChampionSquareUrl, getChampionSplashUrl, getChampionLoadingUrl } from "@/lib/data-dragon";

interface ChampionImageProps {
  championName: string;
  type?: "square" | "splash" | "loading";
  alt?: string;
  className?: string;
  fallbackSrc?: string;
}

export function ChampionImage({
  championName,
  type = "square",
  alt,
  className = "",
  fallbackSrc = "/convex.svg",
}: ChampionImageProps) {
  const [error, setError] = useState(false);

  const getImageUrl = () => {
    if (error) return fallbackSrc;

    switch (type) {
      case "splash":
        return getChampionSplashUrl(championName);
      case "loading":
        return getChampionLoadingUrl(championName);
      case "square":
      default:
        return getChampionSquareUrl(championName);
    }
  };

  return (
    <Image
      src={getImageUrl()}
      alt={alt || championName}
      className={className}
      width={120}
      height={120}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
