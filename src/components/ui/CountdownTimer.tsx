"use client";

import { useEffect, useState } from "react";

type CountdownTimerProps = {
  mode?: "hours4" | "midnight";
  className?: string;
};

function format(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function CountdownTimer({ mode = "hours4", className }: CountdownTimerProps) {
  const [left, setLeft] = useState(mode === "hours4" ? 4 * 60 * 60 * 1000 : 0);

  useEffect(() => {
    let target =
      mode === "midnight"
        ? (() => {
          const midnight = new Date();
          midnight.setHours(24, 0, 0, 0);
          return midnight.getTime();
        })()
        : new Date().getTime() + 4 * 60 * 60 * 1000;

    const tick = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0 && mode === "midnight") {
        const next = new Date();
        next.setHours(24, 0, 0, 0);
        target = next.getTime();
        setLeft(target - now);
        return;
      }

      if (diff <= 0 && mode === "hours4") {
        target = now + 4 * 60 * 60 * 1000;
        setLeft(4 * 60 * 60 * 1000);
        return;
      }

      setLeft(diff);
    };

    const kick = setTimeout(tick, 0);
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearTimeout(kick);
      clearInterval(interval);
    };
  }, [mode]);

  return <span className={`font-black tabular-nums transition-none ${className || "text-white"}`}>{format(left)}</span>;
}
