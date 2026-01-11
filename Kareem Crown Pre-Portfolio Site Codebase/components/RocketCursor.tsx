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
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Smooth mouse tracking with lerp
  const smoothPosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(180);

  const animate = useCallback(() => {
    // Lerp towards target for smooth movement
    const ease = 0.25;
    smoothPosition.current.x += (targetPosition.current.x - smoothPosition.current.x) * ease;
    smoothPosition.current.y += (targetPosition.current.y - smoothPosition.current.y) * ease;

    // Calculate velocity for dynamic rotation
    const velX = smoothPosition.current.x - lastPosition.current.x;
    const velY = smoothPosition.current.y - lastPosition.current.y;
    velocityRef.current = { x: velX, y: velY };

    // Calculate rotation based on movement direction (like a rocket pointing where it goes)
    const speed = Math.sqrt(velX * velX + velY * velY);
    if (speed > 0.5) {
      const targetRotation = Math.atan2(velY, velX) * (180 / Math.PI);
      // Smooth rotation transition
      let diff = targetRotation - (rotationRef.current - 180);
      // Handle angle wrapping
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      rotationRef.current += diff * 0.15;
    }

    lastPosition.current = { x: smoothPosition.current.x, y: smoothPosition.current.y };

    // Update cursor position
    if (cursorRef.current) {
      cursorRef.current.style.left = `${smoothPosition.current.x}px`;
      cursorRef.current.style.top = `${smoothPosition.current.y}px`;
    }

    // Update spotlight position - emanates from the tip (at cursor position)
    if (spotlightRef.current) {
      // Center the spotlight on the cursor/tip position
      spotlightRef.current.style.left = `${smoothPosition.current.x - 400}px`;
      spotlightRef.current.style.top = `${smoothPosition.current.y - 400}px`;
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

  // Get current rotation for rendering
  const rotation = rotationRef.current;

  if (!isEnabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dynamic Spotlight / Headlight Effect - Clean and seamless */}
          <motion.div
            ref={spotlightRef}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Single seamless radial gradient that follows cursor */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${rotation - 90}deg)`,
                width: "800px",
                height: "800px",
                background: "transparent",
              }}
            >
              {/* Main headlight beam - symmetric and smooth */}
              <div
                className="absolute pointer-events-none"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "800px",
                  height: "800px",
                  background: `
                    radial-gradient(ellipse 400px 600px at 50% 100%, 
                      rgba(255, 220, 100, 0.1) 0%, 
                      rgba(255, 215, 0, 0.06) 20%, 
                      rgba(255, 200, 50, 0.03) 45%, 
                      transparent 75%
                    )
                  `,
                  mixBlendMode: "screen",
                }}
              />
              
              {/* Inner bright beam */}
              <div
                className="absolute pointer-events-none"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "800px",
                  height: "800px",
                  background: `
                    radial-gradient(ellipse 200px 350px at 50% 100%, 
                      rgba(255, 255, 200, 0.12) 0%, 
                      rgba(255, 245, 180, 0.06) 30%, 
                      transparent 60%
                    )
                  `,
                  mixBlendMode: "screen",
                }}
              />

              {/* Golden glow at the tip source */}
              <div
                className="absolute pointer-events-none"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  background: "radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(255, 200, 100, 0.2) 50%, transparent 70%)",
                  filter: "blur(10px)",
                }}
              />
            </div>
          </motion.div>

          {/* Dynamic Golden Pen Tip Rocket Cursor */}
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
              scale: isHovering ? 1.3 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              mass: 0.6,
            }}
          >
            {/* Rocket container that rotates based on movement direction */}
            <motion.div
              className="relative"
              animate={{
                rotate: rotation,
                scale: isHovering ? 1.15 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{
                width: "60px",
                height: "100px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                transformOrigin: "center center",
              }}
            >
              {/* Golden glow around the rocket */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-20px",
                  background: "radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.4) 0%, transparent 60%)",
                  filter: "blur(15px)",
                }}
              />

              {/* THE ACTUAL GOLDEN PEN TIP IMAGE - Properly loaded */}
              <img
                src="/images/golden-pen-cursor.webp"
                alt="Midas Golden Pen Cursor"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error("Failed to load golden pen cursor image");
                  // Keep imageError state for potential fallback
                }}
                style={{
                  width: "auto",
                  height: "100px",
                  maxWidth: "none",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 25px rgba(212, 175, 55, 0.6))",
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.2s ease-out",
                }}
              />

              {/* Loading state - show while image loads */}
              {!imageLoaded && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid rgba(212, 175, 55, 0.3)",
                      borderTopColor: "#D4AF37",
                      borderRadius: "50%",
                      animation: "cursorSpin 1s linear infinite",
                    }}
                  />
                </div>
              )}

              {/* Dynamic flame trail at the back when moving */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  bottom: "-30px",
                  transform: "translateX(-50%)",
                  width: "40px",
                  height: "70px",
                }}
                animate={{
                  opacity: Math.sqrt(
                    velocityRef.current.x * velocityRef.current.x +
                    velocityRef.current.y * velocityRef.current.y
                  ) > 0.8 ? 0.95 : 0,
                  scaleY: Math.sqrt(
                    velocityRef.current.x * velocityRef.current.x +
                    velocityRef.current.y * velocityRef.current.y
                  ) > 0.8 ? 1 : 0.4,
                }}
                transition={{ duration: 0.08 }}
              >
                {/* Inner flame - bright gold */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "16px",
                    height: "65px",
                    background: "linear-gradient(to top, rgba(255, 215, 0, 1), rgba(255, 165, 0, 0.8), transparent)",
                    borderRadius: "50% 50% 30% 30%",
                    filter: "blur(2px)",
                  }}
                />
                {/* Middle flame - orange */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "26px",
                    height: "70px",
                    background: "linear-gradient(to top, rgba(255, 140, 0, 0.7), rgba(255, 69, 0, 0.4), transparent)",
                    borderRadius: "50% 50% 40% 40%",
                    filter: "blur(4px)",
                  }}
                />
                {/* Outer flame - subtle glow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "36px",
                    height: "80px",
                    background: "linear-gradient(to top, rgba(212, 175, 55, 0.5), rgba(255, 50, 0, 0.2), transparent)",
                    borderRadius: "50% 50% 50% 50%",
                    filter: "blur(8px)",
                  }}
                />
              </motion.div>

              {/* Dynamic star sparkles along the rocket body */}
              {[-20, 0, 20].map((offset, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  animate={{
                    opacity: [0.2 + i * 0.2, 0.8 + i * 0.1, 0.2 + i * 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5 + i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  style={{
                    left: `${25 + offset}px`,
                    top: `${30 + i * 15}px`,
                    width: `${3 + i}px`,
                    height: `${3 + i}px`,
                    background: "#FFD700",
                    borderRadius: "50%",
                    boxShadow: `0 0 ${8 + i * 4}px #FFD700, 0 0 ${15 + i * 5}px rgba(255, 215, 0, 0.5)`,
                  }}
                />
              ))}

              {/* Tip glow highlight */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: 0,
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "15px",
                  background: "radial-gradient(ellipse at 50% 100%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
                  filter: "blur(3px)",
                }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Add the rotation animation keyframe
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes cursorSpin {
    from { transform: translateX(-50%) rotate(0deg); }
    to { transform: translateX(-50%) rotate(360deg); }
  }
`;
if (typeof document !== "undefined") {
  document.head.appendChild(styleSheet);
}

export default RocketCursor;
