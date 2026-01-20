"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

const CompanyLogoSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  // Initialize particles for smoke effect
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + Math.random() * 200,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 2 - 1,
          size: Math.random() * 40 + 20,
          opacity: Math.random() * 0.3,
          life: Math.random() * 300 + 200,
        });
      }
      particlesRef.current = newParticles;
    };

    initParticles();
    window.addEventListener("resize", initParticles);
    return () => window.removeEventListener("resize", initParticles);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw animated circuitry
      const time = Date.now() * 0.002;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Main circuitry circle - Using Midas Gold Glossy #D4AF37
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 10;

      // Animated PCB traces
      const traceCount = 12;
      for (let i = 0; i < traceCount; i++) {
        const angle = (i * Math.PI * 2) / traceCount + time * 0.5;
        const radius = 150 + Math.sin(time + i) * 20;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle + Math.PI / 6) * (radius + 50);
        const y2 = centerY + Math.sin(angle + Math.PI / 6) * (radius + 50);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Animated nodes - Using Midas Gold Glossy #D4AF37
        const nodeX = x1 + Math.cos(angle + Math.PI / 12) * 25;
        const nodeY = y1 + Math.sin(angle + Math.PI / 12) * 25;

        ctx.fillStyle = "#D4AF37";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 3 + Math.sin(time + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and draw particles (smoke effect)
      particlesRef.current = particlesRef.current.map((particle) => {
        const newX = particle.x + particle.vx;
        const newY = particle.y + particle.vy;
        const newOpacity = particle.opacity * 0.99;
        const newLife = particle.life - 1;

        if (newLife <= 0 || newY < -100) {
          // Respawn particle
          return {
            ...particle,
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -Math.random() * 2 - 1,
            size: Math.random() * 40 + 20,
            opacity: Math.random() * 0.3,
            life: Math.random() * 300 + 200,
          };
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: newOpacity,
          life: newLife,
        };
      });

      // Draw smoke particles - Using Midas Gold colors
      particlesRef.current.forEach((particle) => {
        if (particle.opacity > 0) {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size
          );
          gradient.addColorStop(
            0,
            `rgba(212, 175, 55, ${particle.opacity * 0.1})`
          );
          gradient.addColorStop(
            0.5,
            `rgba(212, 175, 55, ${particle.opacity * 0.05})`
          );
          gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section className="relative h-screen bg-transparent overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: "transparent",
        }}
      />

      {/* Ambient Glow Effects - Using Midas Gold Only (No Purple/Teal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#B6862C]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C0C0C0]/5 rounded-full blur-[150px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Central Logo Container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Logo */}
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Glowing background - Using Midas Gold colors */}
            <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/20 via-[#B6862C]/10 to-transparent rounded-full blur-3xl" />

            {/* Logo container with golden glow - Using Official Midas Gold */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B6862C]/20 border border-[#D4AF37]/30 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(212, 175, 55, 0.3)",
                    "0 0 60px rgba(212, 175, 55, 0.5)",
                    "0 0 30px rgba(212, 175, 55, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {/* MTM Monogram */}
                <div className="text-center">
                  <div className="text-6xl md:text-8xl font-bold text-[#D4AF37] font-serif">
                    MTM
                  </div>
                  <div className="text-[#B6862C] text-sm md:text-base tracking-widest mt-2">
                    MIDAS TOUCH MEDIA
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pulsing rings - Using Midas Gold */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-[#D4AF37]/30 rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.8, 0.4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 1.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Company tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif tracking-wide">
              Midas Touch Media
            </h3>
            <p className="text-[#D4AF37] text-lg font-light tracking-wider uppercase">
              AI-First Venture Studio & Product Lab
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle scan lines effect - Using Midas Gold */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent animate-pulse"
          style={{
            backgroundSize: "100% 2px",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(212, 175, 55, 0.1) 1px, rgba(212, 175, 55, 0.1) 2px)",
          }}
        />
      </div>

      {/* Bottom Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
      >
        <div className="relative flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="text-xs text-white/70 uppercase tracking-widest">
            Adopt Phase
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default CompanyLogoSection;
