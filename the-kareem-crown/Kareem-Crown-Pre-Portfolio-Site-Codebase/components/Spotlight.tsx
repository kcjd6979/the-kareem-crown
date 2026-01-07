"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export function Spotlight({
  className,
  fill
}: {
  className?: string;
  fill?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const { x, y } = mousePosition;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s ease-out',
      }}
    >
      {/* Midas Gold Spotlight - emanates from pen tip */}
      <div
        className="absolute"
        style={{
          left: x,
          top: y,
          width: '800px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${
            fill || "rgba(212, 175, 55, 0.35)"
          }, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Gold Pen Tip Cursor - positioned at mouse location */}
      <div
        className="absolute"
        style={{
          left: x,
          top: y,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/gold-pen-cursor.webp"
          alt="Midas Gold Pen Cursor"
          width={64}
          height={64}
          priority
          unoptimized
          style={{
            width: '64px',
            height: '64px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))',
          }}
        />
      </div>
    </div>
  );
}
