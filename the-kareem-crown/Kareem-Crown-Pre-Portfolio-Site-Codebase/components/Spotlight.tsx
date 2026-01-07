"Spotlight.tsx"

"use client";

import { useState, useEffect } from 'react';

export function Spotlight({
  className,
  fill
}: {
  className?: string;
  fill?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Use raw client coordinates for fixed positioning
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { x, y } = mousePosition;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
      style={{
        background: `radial-gradient(800px circle at ${x}px ${y}px, ${
          fill || "rgba(212, 175, 55, 0.35)"
        }, transparent 60%)`,
      }}
    />
  );
}
