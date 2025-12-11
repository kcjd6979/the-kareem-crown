"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const OptimizedBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const mousePosition = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Optimized particle count for better performance
    const newParticles = Array.from({ length: 30 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.7 ? "#FFD700" : "#B39566",
      duration: Math.random() * 8 + 8,
    }));
    setParticles(newParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Base gradient background */}
      <div
        className="fixed inset-0 -z-50 h-screen w-screen"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 60%),
            linear-gradient(to right, #0a0a0a, #1a1a1a, #0a0a0a)
          `,
        }}
      />
      
      {/* Optimized particles */}
      <div className="fixed inset-0 -z-40 h-screen w-screen overflow-hidden">
        {particles.map((p) => (
          <OptimizedParticle key={p.id} particle={p} mousePosition={mousePosition} />
        ))}
      </div>
    </>
  );
};

const OptimizedParticle = ({ particle, mousePosition }: { particle: any; mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const [opacity, setOpacity] = useState(0.3);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(rect.x - mousePosition.current.x, 2) + Math.pow(rect.y - mousePosition.current.y, 2)
        );
        const newOpacity = Math.max(0.1, 0.5 - distance / 300);
        setOpacity(newOpacity);
      }
      requestAnimationFrame(update);
    };
    const animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: particle.size,
        height: particle.size,
        backgroundColor: particle.color,
        boxShadow: `0 0 3px ${particle.color}`,
      }}
      animate={{
        y: [0, Math.random() * 15 - 7.5, 0],
        x: [0, Math.random() * 15 - 7.5, 0],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        style={{ backgroundColor: particle.color, opacity }}
      />
    </motion.div>
  );
};

export default OptimizedBackground;