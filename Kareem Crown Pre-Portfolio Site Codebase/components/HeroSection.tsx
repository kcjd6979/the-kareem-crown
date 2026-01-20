"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useTime, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";

// Planet Orbital Component - Each planet orbits the central sun
// Uses trigonometry to keep planets upright + 3D CSS transforms for depth
const OrbitingPlanet = ({
  src,
  alt,
  orbitRadius,
  orbitDuration,
  size = 80,
  startAngle = 0,
  zIndex = 5,
  responsiveScale = { mobile: 0.5, tablet: 0.75, desktop: 1.0 },
}: {
  src: string;
  alt: string;
  orbitRadius: number;
  orbitDuration: number;
  size?: number;
  startAngle?: number;
  zIndex?: number;
  responsiveScale?: { mobile: number; tablet: number; desktop: number };
}) => {
  // Time-based animation for smooth, continuous orbit
  const time = useTime();

  // Convert orbit duration to angular velocity (radians per millisecond)
  const angularVelocity = (2 * Math.PI) / (orbitDuration * 1000);

  // Motion values for position and 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useMotionValue(0); // For 3D flip effect
  const rotateX = useMotionValue(0); // Subtle X rotation for depth

  // Update positions and 3D rotation on each frame
  useEffect(() => {
    const unsubscribe = time.on("change", (t) => {
      const angle = t * angularVelocity + (startAngle * Math.PI) / 180;
      
      // Calculate x and y based on orbit radius using trigonometry
      x.set(Math.cos(angle) * orbitRadius);
      y.set(Math.sin(angle) * orbitRadius);
      
      // 3D rotation effect - flip based on orbit position
      // This creates the illusion of seeing front/back as planet orbits
      const rotationAngle = Math.cos(angle) * 180; // Flip from -180 to 180
      rotateY.set(rotationAngle);
      
      // Subtle X rotation for depth perception
      rotateX.set(Math.sin(angle) * 15);
    });
    return () => unsubscribe();
  }, [time, angularVelocity, startAngle, orbitRadius, x, y, rotateY, rotateX]);

  // Get responsive scale based on window size
  const [scale, setScale] = useState(responsiveScale.desktop);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(responsiveScale.mobile);
      else if (width < 1024) setScale(responsiveScale.tablet);
      else setScale(responsiveScale.desktop);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsiveScale]);

  const finalSize = size * scale;

  // Combine centering transform with dynamic motion values
  const transform = useMotionTemplate`translate(-50%, -50%) translate(${x}px, ${y}px)`;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        zIndex,
        // Center the planet in the orbit
        left: '50%',
        top: '50%',
        transform,
        // 3D perspective for rotation effect
        perspective: '1000px',
      }}
    >
      {/* R3F-inspired layered glow effect */}
      {/* Outer glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          width: finalSize * 1.4,
          height: finalSize * 1.4,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 40%, transparent 70%)',
          filter: 'blur(8px)',
          zIndex: zIndex - 1,
        }}
      />
      
      {/* Inner glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          width: finalSize * 1.2,
          height: finalSize * 1.2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.1) 50%, transparent 80%)',
          filter: 'blur(4px)',
          zIndex: zIndex - 0.5,
        }}
      />
      
      {/* Planet container with 3D rotation */}
      <motion.div
        style={{
          width: finalSize,
          height: finalSize,
          // 3D rotation transforms
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={finalSize}
          height={finalSize}
          // Lazy loading for performance
          loading="lazy"
          priority={false}
          className="w-full h-auto object-contain"
          style={{
            // Multi-layer glow effect (R3F-inspired)
            filter: `
              drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))
              drop-shadow(0 0 40px rgba(212, 175, 55, 0.15))
              drop-shadow(0 0 60px rgba(212, 175, 55, 0.05))
            `,
            // Ambient occlusion simulation via overlay
            backfaceVisibility: 'hidden',
          }}
        />
      </motion.div>
      
      {/* Specular highlight (light reflection) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: finalSize * 0.3,
          height: finalSize * 0.15,
          left: '35%',
          top: '25%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%)',
          filter: 'blur(2px)',
          borderRadius: '50%',
          rotateY,
          zIndex: zIndex + 1,
        }}
      />
    </motion.div>
  );
};

// Planet sizes optimized for mobile-first
const getPlanetSize = (baseSize: number) => ({
  // Mobile: smaller orbits and sizes
  mobile: baseSize * 0.5,
  // Tablet: medium
  tablet: baseSize * 0.75,
  // Desktop: full size
  desktop: baseSize,
});

const HeroSection = () => {
  // Mouse position state for 3D floating effect on the sun
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-responsive spring for smooth, gliding movement
  const mouseX = useSpring(x, { stiffness: 80, damping: 12 });
  const mouseY = useSpring(y, { stiffness: 80, damping: 12 });

  // Dynamic movement - sun follows mouse direction
  const rotateX = useTransform(mouseY, [-300, 300], [-12, 12]);
  const rotateY = useTransform(mouseX, [-400, 400], [15, -15]);
  const translateX = useTransform(mouseX, [-400, 400], [-40, 40]);
  const translateY = useTransform(mouseY, [-300, 300], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  // Planet configurations - 3D solar system with MTM ecosystem
  // Uses trig to keep planets upright + CSS 3D transforms for depth + R3F-inspired lighting
  const planets = [
    {
      // Inner orbit - MTM Shield (Brand Core/Foundation)
      src: "/planets/planet-mtm-shield.webp",
      alt: "MTM Shield - Brand Foundation planetary representation",
      orbitRadius: -180,
      orbitDuration: 12,
      baseSize: 65,
      startAngle: 0,
      zIndex: 8,
      scale: { mobile: 0.5, tablet: 0.75, desktop: 1.0 },
    },
    {
      // Second orbit - Synapse Agent (Core Intelligence)
      src: "/planets/planet-syn-orb.webp",
      alt: "Synapse Agent - Core Intelligence planetary representation",
      orbitRadius: 240,
      orbitDuration: 18,
      baseSize: 55,
      startAngle: 72,
      zIndex: 7,
      scale: { mobile: 0.5, tablet: 0.7, desktop: 0.95 },
    },
    {
      // Third orbit - Midas Mailer (Commerce/Transformation)
      src: "/planets/planet-midas-orb-1.webp",
      alt: "Midas Mailer - Transformation planetary representation",
      orbitRadius: -320,
      orbitDuration: 25,
      baseSize: 70,
      startAngle: 144,
      zIndex: 5,
      scale: { mobile: 0.5, tablet: 0.75, desktop: 1.0 },
    },
    {
      // Fourth orbit - Competitor Pulse (Market Intelligence)
      src: "/planets/planet-competitor-pulse.webp",
      alt: "Competitor Pulse - Market Intelligence planetary representation",
      orbitRadius: 420,
      orbitDuration: 35,
      baseSize: 75,
      startAngle: 216,
      zIndex: 3,
      scale: { mobile: 0.45, tablet: 0.7, desktop: 0.95 },
    },
    {
      // Far outer orbit - Apex Predator (Dominance/Power)
      src: "/planets/planet-apex-orb.webp",
      alt: "Apex Predator - Dominance planetary representation",
      orbitRadius: -520,
      orbitDuration: 48,
      baseSize: 85,
      startAngle: 288,
      zIndex: 1,
      scale: { mobile: 0.4, tablet: 0.65, desktop: 0.9 },
    },
  ];

  return (
    // Mobile-first responsive container
    <div 
      className="hero-section relative flex flex-col items-center justify-center w-full min-h-screen perspective-1000"
      style={{ 
        paddingTop: '0px', 
        paddingBottom: '5vh',
        // Responsive padding for different screen sizes
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* === SOLAR SYSTEM CONTAINER === */}
      {/* Centered in viewport, contains sun + orbiting planets */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: '100%',
          maxWidth: '1200px',
          // Reserve space for orbital paths
          height: '800px',
        }}
      >
        
        {/* === THE SUN: Personal Brand Logo === */}
        <motion.div
          className="relative z-20 hero-logo-container"
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformStyle: "preserve-3d",
            // transform: 'scale(896.0, 832.0)', // Removed potentially broken scale
          }}
        >
          <Image
            src="/kc-logo-black-crown.webp"
            alt="The Kareem Crown personal brand logo - The Sun"
            width={400}
            height={400}
            // Priority load for LCP optimization
            priority
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* === ORBITING PLANETS === */}
        {planets.map((planet, index) => (
          <OrbitingPlanet
            key={index}
            src={planet.src}
            alt={planet.alt}
            orbitRadius={planet.orbitRadius}
            orbitDuration={planet.orbitDuration}
            size={planet.baseSize}
            startAngle={planet.startAngle}
            zIndex={planet.zIndex}
            responsiveScale={planet.scale}
          />
        ))}
        
        {/* === ORBITAL PATH VISUALS (Subtle rings for visual reference) === */}
        {/* Inner orbit path (180px) */}
        <div 
          className="absolute border border-white/6 rounded-full pointer-events-none"
          style={{
            width: '360px', // 2 * 180
            height: '360px',
            zIndex: 1,
          }}
        />
        {/* Second orbit path (240px) */}
        <div 
          className="absolute border border-white/8 rounded-full pointer-events-none"
          style={{
            width: '480px', // 2 * 240
            height: '480px',
            zIndex: 1,
          }}
        />
        {/* Third orbit path (320px) */}
        <div 
          className="absolute border border-white/6 rounded-full pointer-events-none"
          style={{
            width: '640px', // 2 * 320
            height: '640px',
            zIndex: 1,
          }}
        />
        {/* Fourth orbit path (420px) */}
        <div 
          className="absolute border border-white/4 rounded-full pointer-events-none"
          style={{
            width: '840px', // 2 * 420
            height: '840px',
            zIndex: 1,
          }}
        />
        {/* Far outer orbit path (520px) */}
        <div 
          className="absolute border border-white/2 rounded-full pointer-events-none"
          style={{
            width: '1040px', // 2 * 520
            height: '1040px',
            zIndex: 1,
          }}
        />

      </div>
      {/* End: Solar System Container */}

      {/* === TITLE TEXT === */}
      {/* Positioned below the solar system */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10 w-full max-w-4xl gap-[2vh]"
        style={{ marginTop: '-80px' }} // Pull title closer to solar system
      >
        <h1 
          className="text-center text-5xl md:text-7xl font-playfair font-black mt-0 mb-0 text-white tracking-wide"
          style={{
            textShadow: '0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1)',
          }}
        >
          The Kareem Crown
        </h1>
      </motion.div>

      {/* === OVERHEAD GOLD CROWN LIGHT === */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          left: '50%',
          top: '5%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '250px',
          background: 'radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.06) 40%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />

      {/* === SEAMLESS FADE TO NEXT SECTION === */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />
      
    </div>
  );
};

export default HeroSection;
