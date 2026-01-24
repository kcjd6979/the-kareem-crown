"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
  layer: number;
  color: string;
  hasFlare: boolean;
  hasDiffractionSpike: boolean;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  blur: number;
  layer: number;
}

interface Comet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  duration: number;
  width: number;
}

interface LensFlare {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  pulseDuration: number;
}

// Generate random stars with gold/amber warm palette
const generateStars = (count: number): Star[] => {
  const stars: Star[] = [];
  const warmColors = [
    "rgba(255, 255, 255, 1)",    // Pure white
    "rgba(255, 248, 220, 1)",    // Warm white
    "rgba(255, 235, 205, 1)",    // Lemon chiffon
    "rgba(255, 218, 185, 1)",    // Peach
    "rgba(255, 200, 150, 1)",    // Light orange
    "rgba(212, 175, 55, 1)",     // Midas gold
    "rgba(255, 215, 0, 1)",      // Gold
  ];

  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDuration: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 5,
      layer: Math.floor(Math.random() * 3),
      color: warmColors[Math.floor(Math.random() * warmColors.length)],
      hasFlare: Math.random() > 0.95,
      hasDiffractionSpike: Math.random() > 0.9,
    });
  }
  return stars;
};

// Generate nebula clouds with golden-brown amber palette
const generateNebulae = (count: number): Nebula[] => {
  const nebulae: Nebula[] = [];
  const nebulaColors = [
    "rgba(212, 175, 55, 0.08)",    // Midas gold
    "rgba(255, 180, 50, 0.06)",    // Warm amber
    "rgba(200, 150, 50, 0.05)",    // Bronze
    "rgba(180, 130, 40, 0.04)",    // Dusty gold
    "rgba(139, 90, 43, 0.03)",     // Sienna
  ];

  for (let i = 0; i < count; i++) {
    nebulae.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 50 + 30,
      height: Math.random() * 60 + 40,
      color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
      opacity: Math.random() * 0.5 + 0.3,
      blur: Math.random() * 40 + 30,
      layer: Math.floor(Math.random() * 2),
    });
  }
  return nebulae;
};

// Generate lens flares for bright stars
const generateLensFlares = (count: number): LensFlare[] => {
  const flares: LensFlare[] = [];
  const flareColors = [
    "rgba(255, 255, 200, 0.8)",    // Warm white
    "rgba(255, 240, 200, 0.7)",    // Pale gold
    "rgba(255, 220, 150, 0.6)",    // Light amber
  ];

  for (let i = 0; i < count; i++) {
    flares.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 15,
      opacity: Math.random() * 0.6 + 0.2,
      color: flareColors[Math.floor(Math.random() * flareColors.length)],
      pulseDuration: Math.random() * 4 + 3,
    });
  }
  return flares;
};

// Generate occasional comets
const generateComets = (count: number): Comet[] => {
  const comets: Comet[] = [];
  for (let i = 0; i < count; i++) {
    comets.push({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 50,
      endX: Math.random() * 50 + 50,
      endY: Math.random() * 50 + 50,
      delay: Math.random() * 20 + i * 5,
      duration: Math.random() * 3 + 2,
      width: Math.random() * 3 + 2,
    });
  }
  return comets;
};

const GalaxyBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms based on scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, 50]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 80]);

  // Generate all elements once on mount
  const stars = useMemo(() => generateStars(400), []);
  const nebulae = useMemo(() => generateNebulae(12), []);
  const flares = useMemo(() => generateLensFlares(25), []);
  const comets = useMemo(() => generateComets(5), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none animate-galaxy-breathe"
      style={{
        zIndex: -1,
        background: "linear-gradient(180deg, #0a0a1a 0%, #0f0f2e 50%, #0a0a1a 100%)",
      }}
    >
      {/* Layer 0: Deep space base gradient - golden warmth with breathing effect */}
      <div
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 50%, rgba(255, 180, 50, 0.06) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 50%, rgba(255, 200, 100, 0.06) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 100%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a1a 0%, #0d0d24 50%, #0a0a1a 100%)
          `,
        }}
      />

      {/* Layer 1: Distant nebulae - slowest parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        {nebulae.filter((n) => n.layer === 0).map((nebula) => (
          <div
            key={`nebula-0-${nebula.id}`}
            className="absolute"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.width}%`,
              height: `${nebula.height}%`,
              background: nebula.color,
              filter: `blur(${nebula.blur}px)`,
              opacity: nebula.opacity,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Background stars - distant, many small, slow twinkle */}
      {stars.filter((s) => s.layer === 0).map((star) => (
        <motion.div
          key={`star-0-${star.id}`}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            borderRadius: "50%",
            boxShadow: star.hasFlare 
              ? `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px rgba(255, 215, 0, 0.3)` 
              : "none",
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.twinkleDuration,
            delay: star.twinkleDelay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Layer 3: Mid-distance nebulae - medium parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        {nebulae.filter((n) => n.layer === 1).map((nebula) => (
          <div
            key={`nebula-1-${nebula.id}`}
            className="absolute"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.width}%`,
              height: `${nebula.height}%`,
              background: nebula.color,
              filter: `blur(${nebula.blur}px)`,
              opacity: nebula.opacity,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 4: Mid-ground stars - medium brightness, noticeable twinkle */}
      {stars.filter((s) => s.layer === 1).map((star) => (
        <div key={`star-1-${star.id}`} className="absolute">
          {/* Diffraction spike for brighter stars */}
          {star.hasDiffractionSpike && (
            <div
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size * 6}px`,
                height: `${star.size}px`,
                background: `linear-gradient(90deg, transparent 0%, ${star.color} 50%, transparent 100%)`,
                transform: "translate(-50%, -50%)",
                opacity: star.opacity * 0.5,
              }}
            />
          )}
          
          <motion.div
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.color,
              borderRadius: "50%",
              boxShadow: star.hasFlare 
                ? `0 0 ${star.size * 3}px ${star.color}, 0 0 ${star.size * 6}px rgba(255, 215, 0, 0.4)` 
                : "none",
            }}
            animate={{
              opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.twinkleDuration,
              delay: star.twinkleDelay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}

      {/* Layer 5: Lens flares - warm glows */}
      {flares.map((flare) => (
        <motion.div
          key={`flare-${flare.id}`}
          className="absolute"
          style={{
            left: `${flare.x}%`,
            top: `${flare.y}%`,
            width: `${flare.size}px`,
            height: `${flare.size}px`,
            background: `radial-gradient(circle, ${flare.color} 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            opacity: [flare.opacity * 0.5, flare.opacity, flare.opacity * 0.5],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: flare.pulseDuration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Layer 6: Foreground nebula wisps - golden-brown dust */}
      {nebulae.filter((n) => n.layer === 2).map((nebula) => (
        <div
          key={`nebula-2-${nebula.id}`}
          className="absolute"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.width}%`,
            height: `${nebula.height}%`,
            background: nebula.color,
            filter: `blur(${nebula.blur}px)`,
            opacity: nebula.opacity,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Layer 7: Foreground stars - brightest, prominent twinkle, some with spikes */}
      {stars.filter((s) => s.layer === 2).map((star) => (
        <div key={`star-2-${star.id}`} className="absolute">
          {/* Cross diffraction spikes for brightest foreground stars */}
          {star.hasDiffractionSpike && (
            <>
              <div
                className="absolute"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size * 8}px`,
                  height: `${star.size}px`,
                  background: `linear-gradient(90deg, transparent 0%, ${star.color} 50%, transparent 100%)`,
                  transform: "translate(-50%, -50%)",
                  opacity: star.opacity * 0.6,
                }}
              />
              <div
                className="absolute"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size * 8}px`,
                  background: `linear-gradient(180deg, transparent 0%, ${star.color} 50%, transparent 100%)`,
                  transform: "translate(-50%, -50%)",
                  opacity: star.opacity * 0.6,
                }}
              />
            </>
          )}
          
          <motion.div
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.color,
              borderRadius: "50%",
              boxShadow: star.hasFlare 
                ? `0 0 ${star.size * 4}px ${star.color}, 0 0 ${star.size * 8}px rgba(255, 215, 0, 0.5), 0 0 ${star.size * 12}px rgba(212, 175, 55, 0.3)` 
                : `0 0 ${star.size * 2}px ${star.color}`,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: star.twinkleDuration,
              delay: star.twinkleDelay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      ))}

      {/* Layer 8: Animated comets - shooting stars */}
      {comets.map((comet) => (
        <motion.div
          key={`comet-${comet.id}`}
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: comet.duration,
            delay: comet.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: comet.delay * 2,
          }}
          style={{
            left: `${comet.startX}%`,
            top: `${comet.startY}%`,
            width: "150px",
            height: `${comet.width}px`,
            background: `linear-gradient(90deg, 
              rgba(255, 255, 255, 0) 0%, 
              rgba(255, 248, 220, 0.3) 20%, 
              rgba(255, 235, 205, 0.8) 50%, 
              rgba(255, 215, 0, 1) 80%, 
              rgba(212, 175, 55, 0.5) 100%
            )`,
            borderRadius: "50%",
            transform: `rotate(${Math.atan2(comet.endY - comet.startY, comet.endX - comet.startX) * (180 / Math.PI)}deg)`,
            transformOrigin: "left center",
            filter: "blur(1px)",
          }}
        >
          {/* Comet head glow */}
          <div
            className="absolute right-0 top-1/2 transform translate-y-[-50%] translate-x-[20%]"
            style={{
              width: "12px",
              height: "12px",
              background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 215, 0, 0.8) 50%, transparent 100%)",
              borderRadius: "50%",
              filter: "blur(2px)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 215, 0, 0.5)",
            }}
          />
        </motion.div>
      ))}

      {/* Layer 9: Golden ambient glow overlays - warmth spreading */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(212, 175, 55, 0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, rgba(255, 180, 50, 0.02) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.9) 0%, #000000 70%)
          `,
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default GalaxyBackground;
