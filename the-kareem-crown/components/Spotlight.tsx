"use client";

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Global Golden Spotlight - Midas Touch Media
 * A subtle golden glow that follows the mouse cursor throughout the entire site.
 * Works in conjunction with the RocketPenCursor to create the thruster effect.
 * Uses Midas Gold (#D4AF37) from the brand bible for consistent identity.
 */

export function Spotlight({
  className = "",
  color = "#D4AF37",
  size = 700,
  opacity = 0.4,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use motion values for smooth cursor tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Spring physics for smooth, weighted movement
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Calculate opacity based on mouse movement velocity for "pulse" effect
  const [velocity, setVelocity] = useState(0);
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    
    const updateVelocity = () => {
      const currentX = smoothX.get();
      const currentY = smoothY.get();
      
      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      setVelocity(speed);
      lastX = currentX;
      lastY = currentY;
      
      requestAnimationFrame(updateVelocity);
    };
    
    const animId = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(animId);
  }, [smoothX, smoothY]);

  // Dynamic opacity based on velocity
  const dynamicOpacity = Math.min(opacity + (velocity * 0.001), 0.6);
  const hexOpacity = Math.round(dynamicOpacity * 255).toString(16).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{
        zIndex: 9997,
      }}
    >
      {/* Main spotlight - thruster glow */}
      <div
        className="midas-spotlight active"
        style={{
          position: 'absolute',
          left: `${smoothX.get()}px`,
          top: `${smoothY.get()}px`,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          background: `radial-gradient(${size * 0.7}px circle at center, ${color}${hexOpacity} 0%, ${color}00 60%)`,
          willChange: 'background, left, top',
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Inner bright core - the "hot" part of the thruster */}
      <div
        style={{
          position: 'absolute',
          left: `${smoothX.get()}px`,
          top: `${smoothY.get()}px`,
          width: `${size * 0.3}px`,
          height: `${size * 0.3}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          background: `radial-gradient(circle, rgba(255, 255, 255, ${dynamicOpacity * 0.3}) 0%, ${color}${Math.round(dynamicOpacity * 0.5 * 255).toString(16).padStart(2, '0')} 40%, transparent 70%)`,
        }}
      />
    </div>
  );
}

// Compact version for headers/navigation areas
export function SpotlightCompact({
  className = "",
  color = "#D4AF37",
  size = 300,
  opacity = 0.25,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const hexOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{
        zIndex: 9997,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${smoothX.get()}px`,
          top: `${smoothY.get()}px`,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          background: `radial-gradient(${size * 0.7}px circle at center, ${color}${hexOpacity} 0%, ${color}00 60%)`,
        }}
      />
    </div>
  );
}
