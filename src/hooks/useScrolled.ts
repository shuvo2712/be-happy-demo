import { useState, useEffect } from "react";

/**
 * Returns true when the page has been scrolled past the given threshold (default 50px).
 * Uses a passive scroll listener for optimal performance.
 */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    // Check immediately in case page is already scrolled on mount
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
