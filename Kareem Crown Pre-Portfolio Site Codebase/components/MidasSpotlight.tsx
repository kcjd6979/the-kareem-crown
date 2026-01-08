'use client';

import { useEffect, useRef, useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function MidasSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { isCustomCursorEnabled } = useAccessibility();

  useEffect(() => {
    // Detect if device has touch capability
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !isCustomCursorEnabled) return; // Don't add listener if disabled

    const updatePosition = (e: MouseEvent) => {
      if (spotlightRef.current) {
        // Direct DOM manipulation - no React re-render
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [isMobile, isCustomCursorEnabled]);

  // Don't render spotlight if disabled or on mobile
  if (isMobile || !isCustomCursorEnabled) return null;

  return (
    <div
      ref={spotlightRef}
      className="midas-spotlight"
      style={{ left: '50%', top: '50%' }}
    />
  );
}
