"use client";

import { useEffect, useState, useRef } from 'react';

interface MidasSpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function MidasSpotlight({ 
  className = "", 
  size = 450,
  color = "255, 215, 0"
}: MidasSpotlightProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Show spotlight once mouse enters window
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      // Reset position when mouse leaves
      targetPos.current = { x: -100, y: -100 };
    };

    // Direct update for maximum responsiveness
    const updatePosition = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth interpolation loop for gliding effect
    let animationId: number;
    
    const animate = () => {
      // Smooth interpolation (lerp) for gliding feel
      // Lower value = smoother/glidier, Higher = more responsive
      const ease = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
      
      setPosition({ ...currentPos.current });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', updatePosition);
    
    // Start animation loop
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', updatePosition);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Custom cursor - Golden Midas Pen Tip (ROCKET) */}
      {isVisible && (
        <div
          className="midas-pen-cursor"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}

      {/* Thruster spotlight glow (HEADLIGHTS emanating from cursor) */}
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
