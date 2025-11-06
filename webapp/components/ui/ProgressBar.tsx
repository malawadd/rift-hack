"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  bluePercentage: number;
  redPercentage: number;
  animated?: boolean;
}

export function ProgressBar({ bluePercentage, redPercentage, animated = true }: ProgressBarProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const blueWidth = isAnimated ? bluePercentage : 0;
  const redWidth = isAnimated ? redPercentage : 0;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-black uppercase text-blue-700">Blue Side</span>
        <span className="text-sm font-black uppercase text-red-700">Red Side</span>
      </div>

      <div className="relative h-12 bg-white border-4 border-[var(--border)] overflow-hidden shadow-[4px_4px_0_var(--border)]">
        <div className="absolute inset-0 flex">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-2000 ease-out progress-glow-blue flex items-center justify-start px-4"
            style={{ width: `${blueWidth}%` }}
          >
            {blueWidth > 15 && (
              <span className="text-white font-black text-lg animate-counter">
                {bluePercentage.toFixed(1)}%
              </span>
            )}
          </div>

          <div
            className="bg-gradient-to-l from-red-600 to-red-400 transition-all duration-2000 ease-out progress-glow-red flex items-center justify-end px-4 ml-auto"
            style={{ width: `${redWidth}%` }}
          >
            {redWidth > 15 && (
              <span className="text-white font-black text-lg animate-counter">
                {redPercentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[var(--border)] text-white font-black text-xs px-3 py-1 rounded-full border-2 border-white">
            VS
          </div>
        </div>
      </div>
    </div>
  );
}
