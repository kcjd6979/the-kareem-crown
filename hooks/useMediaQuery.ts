import { useState, useEffect } from 'react';

/**
 * useMediaQuery Hook
 * Custom hook for responsive breakpoint detection
 * Used for switching between desktop 3D carousel and mobile flat scroll
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const media = window.matchMedia(query);

    // Update state with current match
    setMatches(media.matches);

    // Handler for media query changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener('change', handler);

    // Cleanup
    return () => {
      media.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Breakpoint helpers for common screen sizes
 */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

export default useMediaQuery;
