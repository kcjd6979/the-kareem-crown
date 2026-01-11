"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RocketCursorProps {
  isEnabled: boolean;
}

export const RocketCursor: React.FC<RocketCursorProps> = ({ isEnabled }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Smooth mouse tracking with lerp
  const smoothPosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    // Lerp towards target for smooth movement
    const ease = 0.2;
    smoothPosition.current.x += (targetPosition.current.x - smoothPosition.current.x) * ease;
    smoothPosition.current.y += (targetPosition.current.y - smoothPosition.current.y) * ease;

    // Calculate velocity for rotation
    const velX = smoothPosition.current.x - lastPosition.current.x;
    const velY = smoothPosition.current.y - lastPosition.current.y;
    setVelocity({ x: velX, y: velY });
    lastPosition.current = { x: smoothPosition.current.x, y: smoothPosition.current.y };

    // Update cursor position
    if (cursorRef.current) {
      cursorRef.current.style.left = `${smoothPosition.current.x}px`;
      cursorRef.current.style.top = `${smoothPosition.current.y}px`;
    }

    // Update spotlight position - offset to emanate from tip (bottom of image)
    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${smoothPosition.current.x}px`;
      spotlightRef.current.style.top = `${smoothPosition.current.y + 35}px`; // Offset to tip
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("a") !== null ||
          target.closest("button") !== null ||
          target.closest("input") !== null ||
          target.closest(".cursor-pointer") !== null
      );
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, [isEnabled, isVisible, animate]);

  // Calculate rotation based on velocity
  const rotation = velocity.x * 0.3;

  if (!isEnabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Spotlight / Headlight Effect - Illuminates from the DOWNWARD-POINTING tip */}
          <motion.div
            ref={spotlightRef}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: 0,
              top: 0,
              position: "fixed",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Conical headlight beam projecting DOWN from the tip */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: "500px",
                height: "600px",
                background: "conic-gradient(from 0deg at 50% 0%, rgba(255, 215, 0, 0.12) 0deg, transparent 50deg, transparent 130deg, rgba(255, 215, 0, 0.06) 180deg, transparent 230deg)",
                mixBlendMode: "screen",
              }}
            />

            {/* Inner bright core - direct illumination from tip */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: "250px",
                height: "400px",
                background: "conic-gradient(from 0deg at 50% 0%, rgba(255, 255, 200, 0.15) 0deg, transparent 35deg, transparent 145deg, rgba(255, 255, 200, 0.08) 180deg, transparent 215deg)",
                mixBlendMode: "screen",
              }}
            />

            {/* Golden glow around the tip */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
                width: "120px",
                height: "120px",
                background: "radial-gradient(ellipse at 50% 0%, rgba(255, 215, 0, 0.4) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>

          {/* The Golden Pen Tip "Rocket" Cursor - positioned so tip (bottom) is at mouse */}
          <motion.div
            ref={cursorRef}
            className="fixed pointer-events-none z-[99999]"
            style={{
              left: 0,
              top: 0,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isHovering ? 1.2 : 1,
              rotate: rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          >
            {/* Container with pen positioned so tip is at cursor point */}
            <motion.div
              className="relative"
              animate={{
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: "70px",
                height: "100px",
                display: "flex",
                alignItems: "flex-start", // Tip at bottom
                justifyContent: "center",
              }}
            >
              {/* Golden glow around the entire pen */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-15px",
                  background: "radial-gradient(ellipse at 50% 100%, rgba(212, 175, 55, 0.35) 0%, transparent 70%)",
                  filter: "blur(12px)",
                }}
              />

              {/* Main cursor image - loaded from public folder */}
              {!imageError && (
                <img
                  src="/images/golden-pen-cursor.webp"
                  alt="Midas Golden Pen Cursor"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  style={{
                    width: "auto",
                    height: "90px",
                    maxWidth: "none",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              )}

              {/* Fallback SVG if image fails to load */}
              {imageError && (
                <svg
                  viewBox="0 0 100 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "70px",
                    height: "90px",
                    position: "absolute",
                    top: 0,
                    filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))",
                  }}
                >
                  <defs>
                    <linearGradient id="penGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#B8860B" />
                    </linearGradient>
                    <linearGradient id="penTipGold" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFACD" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                  {/* Pen body */}
                  <rect
                    x="15"
                    y="30"
                    width="70"
                    height="100"
                    rx="10"
                    fill="url(#penGold)"
                    stroke="#B8860B"
                    strokeWidth="2"
                  />
                  {/* Gold ring */}
                  <rect
                    x="12"
                    y="45"
                    width="76"
                    height="15"
                    rx="5"
                    fill="#D4AF37"
                    stroke="#B8860B"
                    strokeWidth="2"
                  />
                  {/* Sharp tip pointing DOWN */}
                  <path
                    d="M 15 130 L 50 160 L 85 130 Z"
                    fill="url(#penTipGold)"
                    stroke="#B8860B"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Center line on tip */}
                  <line
                    x1="50"
                    y1="130"
                    x2="50"
                    y2="155"
                    stroke="#B8860B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Pen clip */}
                  <rect
                    x="60"
                    y="35"
                    width="10"
                    height="40"
                    rx="3"
                    fill="#D4AF37"
                    stroke="#B8860B"
                    strokeWidth="1"
                  />
                  {/* Highlight */}
                  <rect
                    x="25"
                    y="35"
                    width="8"
                    height="90"
                    rx="4"
                    fill="white"
                    fillOpacity="0.2"
                  />
                </svg>
              )}

              {/* Rocket flame trail at the TIP (bottom) when moving */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  width: "35px",
                  height: "60px",
                }}
                animate={{
                  opacity: Math.abs(velocity.y) > 1 || Math.abs(velocity.x) > 1 ? 0.9 : 0,
                  scaleY: Math.abs(velocity.y) > 1 || Math.abs(velocity.x) > 1 ? 1 : 0.3,
                }}
                transition={{ duration: 0.1 }}
              >
                {/* Inner flame core */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "14px",
                    height: "55px",
                    background: "linear-gradient(to bottom, rgba(255, 215, 0, 0.9), rgba(255, 140, 0, 0.7), transparent)",
                    borderRadius: "50% 50% 30% 30%",
                    filter: "blur(2px)",
                  }}
                />
                {/* Middle flame */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "60px",
                    background: "linear-gradient(to bottom, rgba(255, 200, 0, 0.6), rgba(255, 100, 50, 0.4), transparent)",
                    borderRadius: "50% 50% 40% 40%",
                    filter: "blur(4px)",
                  }}
                />
                {/* Outer flame */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "32px",
                    height: "65px",
                    background: "linear-gradient(to bottom, rgba(212, 175, 55, 0.4), rgba(255, 69, 0, 0.2), transparent)",
                    borderRadius: "50% 50% 50% 50%",
                    filter: "blur(6px)",
                  }}
                />
              </motion.div>

              {/* Star sparkle effects near the pen */}
              <motion.div
                className="absolute pointer-events-none"
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  left: "-18px",
                  top: "35%",
                  width: "5px",
                  height: "5px",
                  background: "#FFD700",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px #FFD700, 0 0 20px #FFD700",
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                style={{
                  right: "-15px",
                  top: "45%",
                  width: "4px",
                  height: "4px",
                  background: "#FFD700",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #FFD700, 0 0 15px #FFD700",
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                style={{
                  left: "-12px",
                  top: "55%",
                  width: "3px",
                  height: "3px",
                  background: "#FFD700",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px #FFD700",
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RocketCursor;
