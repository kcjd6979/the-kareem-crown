"use client";

import { useState, useEffect, useRef } from 'react';

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
      {/* Gold Pen Tip Cursor - positioned at mouse location */}
      <img
        src="/images/pen-tip.webp"
        alt="Midas Gold Pen Cursor"
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: '128px',
          height: '128px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
