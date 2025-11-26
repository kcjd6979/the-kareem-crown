"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const MidasParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const mousePosition = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const newParticles = Array.from({ length: 50 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? "#B39566" : "#E1E1E1",
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-40 h-screen w-screen overflow-hidden">
      {particles.map((p) => (
        <Particle key={p.id} particle={p} mousePosition={mousePosition} />
      ))}
    </div>
  );
};

const Particle = ({ particle, mousePosition }: { particle: any; mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const [opacity, setOpacity] = useState(0.5);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(rect.x - mousePosition.current.x, 2) + Math.pow(rect.y - mousePosition.current.y, 2)
        );
        const newOpacity = Math.max(0.5, 1 - distance / 200);
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
        boxShadow: `0 0 5px ${particle.color}`,
      }}
      animate={{
        y: [0, Math.random() * 20 - 10, 0],
        x: [0, Math.random() * 20 - 10, 0],
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

export default MidasParticles;
