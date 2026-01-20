// components/RocketCursor.tsx
'use client';

import { useEffect, useState } from 'react';

interface RocketCursorProps {
  isEnabled?: boolean;
}

export default function RocketCursor({ isEnabled = true }: RocketCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  useEffect(() => {
    if (!isEnabled) return;

    let timeout: NodeJS.Timeout;
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = distance / (deltaTime || 1);

      setPosition({ x: e.clientX, y: e.clientY });
      setVelocity(Math.min(speed * 10, 10)); // Normalize to 0-10
      setIsMoving(true);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
        setVelocity(0);
      }, 100);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      const isText =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        window.getComputedStyle(target).cursor === 'text';

      setIsHovering(isPointer || isText);
      if (isText) setCursorType('text');
      else if (isPointer) setCursorType('pointer');
      else setCursorType('default');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(timeout);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .rocket-cursor-container {
          position: fixed;
          pointer-events: none;
          z-index: 999999;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          will-change: transform;
        }

        .pen-wrapper {
          position: relative;
          width: 50px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .pen-wrapper.hovering {
          transform: scale(1.2);
        }

        .pen-wrapper.text-mode {
          transform: scale(0.8) rotate(-45deg);
        }

        /* THE ACTUAL PEN TIP IMAGE - ROTATED UPWARD */
        .pen-tip-image {
          width: 45px;
          height: 55px;
          background-image: url('/images/gold-pen-tip-4k.webp');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transform: rotate(180deg); /* Pointing UP - usually needs 180 if original is DOWN */
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.4));
          position: relative;
          z-index: 3;
        }

        /* DUAL GOLDEN HEADLIGHTS - at the narrow pointed tip */
        .headlight {
          position: absolute;
          top: -5px; /* Position at the narrow end */
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.9), rgba(255, 215, 0, 0.3));
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
          z-index: 2;
          animation: pulse 2s ease-in-out infinite;
        }

        .headlight-left {
          left: 8px;
        }

        .headlight-right {
          right: 8px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        /* ROCKET THRUST FLAMES - at the rounded bottom */
        .rocket-flames {
          position: absolute;
          bottom: -20px; /* Position at the wide/rounded end */
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 40px;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .rocket-flames.active {
          opacity: 1;
        }

        .flame {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom,
            rgba(255, 140, 0, 0.9) 0%,
            rgba(255, 215, 0, 0.7) 30%,
            rgba(255, 255, 0, 0.5) 60%,
            transparent 100%
          );
          border-radius: 50% 50% 0 0;
          filter: blur(3px);
          animation: flameFlicker 0.1s ease-in-out infinite;
        }

        .flame-inner {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 70%;
          background: linear-gradient(to bottom,
            rgba(255, 215, 0, 1) 0%,
            rgba(255, 255, 100, 0.8) 40%,
            transparent 100%
          );
          border-radius: 50% 50% 0 0;
          filter: blur(2px);
        }

        @keyframes flameFlicker {
          0%, 100% {
            transform: translateX(-50%) scaleY(1);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) scaleY(1.1);
            opacity: 0.9;
          }
        }

        /* Increase flame intensity based on velocity */
        .rocket-flames.active .flame {
          animation-duration: 0.08s;
        }
      `}</style>

      <div
        className="rocket-cursor-container"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      >
        <div className={`pen-wrapper ${isHovering ? 'hovering' : ''} ${cursorType === 'text' ? 'text-mode' : ''}`}>
          {/* DUAL GOLDEN HEADLIGHTS at narrow tip */}
          <div className="headlight headlight-left" />
          <div className="headlight headlight-right" />

          {/* THE ACTUAL PEN TIP IMAGE */}
          <div className="pen-tip-image" />

          {/* ROCKET THRUST FLAMES at rounded bottom */}
          <div className={`rocket-flames ${isMoving ? 'active' : ''}`}>
            <div className="flame" />
            <div className="flame-inner" />
          </div>
        </div>
      </div>
    </>
  );
}