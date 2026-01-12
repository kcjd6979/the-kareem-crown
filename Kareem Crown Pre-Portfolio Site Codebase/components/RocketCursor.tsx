'use client';

import { useEffect, useRef, useState } from 'react';

export const RocketCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Activate thrust animation on movement
      setIsMoving(true);

      clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`rocket-cursor ${isMoving ? 'moving' : ''}`}
    >
      {/* Headlight beam projecting forward */}
      <div className="headlight-beam"></div>

      {/* Headlight glow at tip point */}
      <div className="headlight-glow"></div>

      {/* The fountain pen rocket */}
      <img
        src="/images/gold-pen-tip-4k.webp"
        className="cursor-pen"
        alt="Rocket cursor"
      />

      {/* Rocket thrust flames at bottom */}
      <div className="rocket-thrust">
        <div className="flame flame-1"></div>
        <div className="flame flame-2"></div>
        <div className="flame flame-3"></div>
      </div>
    </div>
  );
};
