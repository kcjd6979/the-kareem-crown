"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

/**
 * RocketPenCursor - Custom Golden Pen Cursor
 * A golden pen tip that follows the mouse cursor, creating the illusion
 * of a rocket exploring the galaxy. Pairs with the Spotlight for the thruster glow effect.
 */
export default function RocketPenCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Smooth cursor movement with slight lag for "weight" feel
  const updateCursor = useCallback(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    const currentX = parseFloat(cursor.style.left || '0');
    const currentY = parseFloat(cursor.style.top || '0');

    // Calculate velocity for tilt effect
    velocityRef.current.x = (positionRef.current.x - currentX) * 0.15;
    velocityRef.current.y = (positionRef.current.y - currentY) * 0.15;

    // Apply position
    cursor.style.left = `${positionRef.current.x}px`;
    cursor.style.top = `${positionRef.current.y}px`;

    // Calculate tilt based on velocity
    const tiltX = velocityRef.current.y * 0.5;
    const tiltY = -velocityRef.current.x * 0.5;
    cursor.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    animationRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Delay showing cursor to avoid flash on page load
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      animationRef.current = requestAnimationFrame(updateCursor);
    }, 500);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(showTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, updateCursor]);

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        /* Respect user's reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            cursor: auto !important;
          }
          
          .rocket-pen-cursor {
            display: none !important;
          }
        }
      `}</style>

      {/* Rocket Pen Cursor */}
      <div
        ref={cursorRef}
        className="rocket-pen-cursor"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '48px',
          height: '48px',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
        }}
      >
        <Image
          src="/rocket-pen.webp"
          alt="Golden pen cursor - The Rocket"
          width={48}
          height={48}
          priority
          draggable={false}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </>
  );
}
