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
        // Since it's fixed, we can just use clientX/Y
        setMousePosition({ x: event.clientX, y: event.clientY });
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
      className={`pointer-events-none absolute z-50 h-full w-full ${className}`}
      ref={ref}
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, ${
          fill || "rgba(255, 215, 0, 0.4)"
        }, transparent 80%)`,
      }}
    />
  );
}
