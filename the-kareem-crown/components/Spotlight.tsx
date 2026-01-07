"use client";

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Global Golden Cursor - Midas Touch Media
 * A subtle golden glow that follows the mouse cursor throughout the entire site.
 * Uses Midas Gold (#D4AF37) from the brand bible for consistent identity.
 */

export function Spotlight({
  className = "",
  color = "#D4AF37",
  size = 800,
  opacity = 0.35,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use motion values for smooth cursor tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Spring physics for smooth, weighted movement
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get current scroll position
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at ${smoothX.get()}px ${smoothY.get()}, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, transparent ${size * 0.75}px)`,
        willChange: "background",
      }}
    />
  );
}

// Compact version for headers/navigation areas
export function SpotlightCompact({
  className = "",
  color = "#D4AF37",
  size = 300,
  opacity = 0.2,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at ${smoothX.get()}px ${smoothY.get()}, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, transparent ${size * 0.7}px)`,
      }}
    />
  );
}
