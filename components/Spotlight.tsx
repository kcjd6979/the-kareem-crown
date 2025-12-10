"Spotlight.tsx"

"use client";

import { useState, useEffect, useRef } from 'react';

export function Spotlight({
  className,
  fill
}: {
  className?: string;
  fill?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { x, y } = mousePosition;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${className}`}
      ref={ref}
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, ${
          fill || "rgba(255, 215, 0, 0.2)"
        }, transparent 80%)`,
        willChange: "background",
      }}
    />
  );
}