"use client";

import { useState, useEffect } from 'react';

export function Spotlight({
  className,
  fill
}: {
  className?: string;
  fill?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
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
      className={`pointer-events-none fixed z-40 ${className}`}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Large Pen Image that follows cursor */}
      <img
        src="/images/pen-cursor.png"
        alt="Pen Cursor"
        style={{
          width: '200px',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
}
