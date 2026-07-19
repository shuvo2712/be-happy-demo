import { useState, useEffect } from "react";

/**
 * Returns a 0→1 progress value representing how far the user has scrolled
 * within the range [startPx, endPx]. Clamps to [0, 1].
 */
export function useScrollProgress(startPx = 0, endPx = 100): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const raw = (window.scrollY - startPx) / (endPx - startPx);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [startPx, endPx]);

  return progress;
}
