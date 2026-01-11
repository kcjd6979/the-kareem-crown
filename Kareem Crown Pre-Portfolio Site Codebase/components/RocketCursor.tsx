"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RocketCursorProps {
  isEnabled: boolean;
}

export const RocketCursor: React.FC<RocketCursorProps> = ({ isEnabled }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth mouse tracking with lerp
  const smoothPosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    // Lerp towards target for smooth movement
    const ease = 0.15;
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

    // Update spotlight position
    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${smoothPosition.current.x}px`;
      spotlightRef.current.style.top = `${smoothPosition.current.y}px`;
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
  const rotation = velocity.x * 0.5;

  if (!isEnabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Spotlight / Headlight Effect - Illuminates the dark galaxy */}
          <motion.div
            ref={spotlightRef}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              position: "fixed",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Radial spotlight that follows cursor - creates the "headlight" effect */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "800px",
                height: "800px",
                background: "radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(212, 175, 55, 0.08) 50%, rgba(212, 175, 55, 0.03) 70%, rgba(0, 0, 0, 0.6) 100%)",
                mixBlendMode: "screen",
              }}
            />

            {/* Inner bright core - the direct illumination */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 60%)",
                mixBlendMode: "screen",
              }}
            />

            {/* Golden glow on the path ahead */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "600px",
                background: "radial-gradient(ellipse at 50% 40%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>

          {/* The Golden Pen Tip "Rocket" Cursor */}
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
            {/* Golden Pen Tip Image */}
            <motion.div
              className="relative"
              animate={{
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Main cursor image */}
              <img
                src="/images/golden-pen-cursor.webp"
                alt="Midas Golden Pen Cursor"
                className="w-10 h-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))",
                }}
              />

              {/* Inner golden glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at center, rgba(255, 215, 0, 0.4) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  transform: "scale(1.5)",
                }}
              />

              {/* Outer halo effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 50%)",
                  filter: "blur(15px)",
                  transform: "scale(2)",
                }}
              />

              {/* Rocket flame trail when moving */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "40px",
                }}
                animate={{
                  opacity: Math.abs(velocity.y) > 2 || Math.abs(velocity.x) > 2 ? 0.8 : 0,
                  scaleY: Math.abs(velocity.y) > 2 || Math.abs(velocity.x) > 2 ? 1 : 0.5,
                }}
                transition={{ duration: 0.1 }}
              >
                {/* Inner flame core */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "8px",
                    height: "30px",
                    background: "linear-gradient(to bottom, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.7), transparent)",
                    borderRadius: "50% 50% 20% 20%",
                    filter: "blur(2px)",
                  }}
                />
                {/* Outer flame */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "16px",
                    height: "35px",
                    background: "linear-gradient(to bottom, rgba(212, 175, 55, 0.6), rgba(255, 100, 50, 0.3), transparent)",
                    borderRadius: "50% 50% 30% 30%",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>

              {/* Star sparkle effects around cursor */}
              <motion.div
                className="absolute pointer-events-none"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  left: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "4px",
                  height: "4px",
                  background: "#FFD700",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px #FFD700, 0 0 20px #FFD700",
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                style={{
                  right: "-15px",
                  top: "30%",
                  width: "3px",
                  height: "3px",
                  background: "#FFD700",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #FFD700, 0 0 15px #FFD700",
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
