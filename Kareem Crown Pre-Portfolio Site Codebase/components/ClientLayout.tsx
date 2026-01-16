"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccessibilityToggle } from "./ui/AccessibilityToggle";

interface RocketPenCursorProps {
  isEnabled: boolean;
}

const RocketPenCursor: React.FC<RocketPenCursorProps> = ({ isEnabled }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isEnabled) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null
      );
    };

    // Add subtle rotation based on movement direction
    let lastX = 0;
    const updateRotation = (e: MouseEvent) => {
      const deltaX = e.clientX - lastX;
      setRotation((prev) => prev + deltaX * 0.5);
      lastX = e.clientX;
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousemove", updateRotation);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousemove", updateRotation);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: position.x,
          top: position.y,
          x: "-50%",
          y: "-50%",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: isHovering ? 1.3 : 1,
          rotate: rotation,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Rocket Pen Graphic */}
        <div
          className={`relative w-8 h-8 transition-transform duration-200 ${
            isHovering ? "scale-125" : ""
          }`}
        >
          {/* Rocket Pen Body */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-lg"
          >
            {/* Pen Body */}
            <rect
              x="20"
              y="20"
              width="24"
              height="36"
              rx="4"
              fill="url(#penGradient)"
              stroke="#D4AF37"
              strokeWidth="2"
            />

            {/* Pen Tip / Rocket Nose */}
            <path
              d="M32 4 L44 20 L32 20 L20 20 Z"
              fill="url(#noseGradient)"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Gold Ring */}
            <rect
              x="18"
              y="28"
              width="28"
              height="6"
              rx="2"
              fill="#D4AF37"
              stroke="#B8860B"
              strokeWidth="1"
            />

            {/* Pen Clip */}
            <rect
              x="38"
              y="22"
              width="4"
              height="16"
              rx="2"
              fill="#D4AF37"
              stroke="#B8860B"
              strokeWidth="1"
            />

            {/* Flame / Trail Effect when hovering */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M26 58 Q32 64 38 58"
                stroke="#FF6B35"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M28 60 Q32 66 36 60"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>

            {/* Gold Accent Lines */}
            <line
              x1="26"
              y1="24"
              x2="26"
              y2="52"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <line
              x1="38"
              y1="24"
              x2="38"
              y2="52"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.5"
            />

            <defs>
              <linearGradient id="penGradient" x1="20" y1="20" x2="44" y2="56">
                <stop offset="0%" stopColor="#2A2A2A" />
                <stop offset="50%" stopColor="#1A1A1A" />
                <stop offset="100%" stopColor="#0A0A0A" />
              </linearGradient>
              <linearGradient id="noseGradient" x1="32" y1="4" x2="32" y2="20">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
              isHovering ? "bg-amber-500/50 scale-150" : "bg-amber-400/20 scale-100"
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(true);

  // Sound manager for click feedback
  useEffect(() => {
    const playClickSound = () => {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          400,
          audioContext.currentTime + 0.1
        );

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        // Audio not supported, ignore
      }
    };

    // Add click sound to all clickable elements
    const addClickSound = () => {
      document.addEventListener("click", playClickSound);
    };

    addClickSound();

    return () => {
      document.removeEventListener("click", playClickSound);
    };
  }, []);

  return (
    <>
      {/* Custom Rocket Pen Cursor */}
      <RocketPenCursor isEnabled={isCustomCursorEnabled} />

      {/* Accessibility Toggle */}
      <AccessibilityToggle
        isCustomCursorEnabled={isCustomCursorEnabled}
        toggleCustomCursor={() =>
          setIsCustomCursorEnabled(!isCustomCursorEnabled)
        }
      />

      {/* Main Content */}
      {children}
    </>
  );
};

export default ClientLayout;
