"use client";

import { useEffect, useState, useRef } from 'react';

interface MidasSpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function MidasSpotlight({ 
  className = "", 
  size = 400,
  color = "255, 215, 0" // Midas gold RGB
}: MidasSpotlightProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const previousPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Show spotlight once mouse enters window
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Use requestAnimationFrame for smoother cursor tracking
    const updatePosition = (e: MouseEvent) => {
      // Store position but don't update React state on every frame
      previousPos.current = { x: e.clientX, y: e.clientY };
      
      // Only update React state occasionally to reduce re-renders
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setPosition({ ...previousPos.current });
          animationFrameRef.current = null;
        });
      }
    };

    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', updatePosition);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Custom cursor - Golden Midas Pen Tip */}
      {isVisible && (
        <div
          className="midas-pen-cursor"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}

      {/* Thruster spotlight glow */}
      <div
        className={`midas-spotlight ${className}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
