"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useTime } from "framer-motion";
import { useEffect } from "react";

// Planet Orbital Component - Each planet orbits the central sun
// Uses trigonometry to keep planets upright (no flipping)
const OrbitingPlanet = ({
  src,
  alt,
  orbitRadius,
  orbitDuration,
  size = 80,
  startAngle = 0,
  zIndex = 5,
}: {
  src: string;
  alt: string;
  orbitRadius: number;
  orbitDuration: number;
  size?: number;
  startAngle?: number;
  zIndex?: number;
}) => {
  // Time-based animation for smooth, continuous orbit
  const time = useTime();

  // Convert orbit duration to angular velocity (radians per millisecond)
  const angularVelocity = (2 * Math.PI) / (orbitDuration * 1000);

  // Motion values for x and y position - updated directly for performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Update positions on each frame using trigonometry
  useEffect(() => {
    const unsubscribe = time.on("change", (t) => {
      const angle = t * angularVelocity + (startAngle * Math.PI) / 180;
      // Calculate x and y based on orbit radius using trigonometry
      // This keeps the planet upright - no rotation applied to the image itself
      x.set(Math.cos(angle) * orbitRadius);
      y.set(Math.sin(angle) * orbitRadius);
    });
    return () => unsubscribe();
  }, [time, angularVelocity, startAngle, orbitRadius, x, y]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        zIndex,
        // Center the planet in the orbit
        left: '50%',
        top: '50%',
        x, // Dynamic x position via trigonometry
        y, // Dynamic y position via trigonometry
        xPercent: -50, // Center the planet itself
        yPercent: -50, // Center the planet itself
      }}
    >
      {/* Planet container - maintains upright orientation */}
      <motion.div
        style={{
          width: size,
          height: size,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          // Lazy loading for beast mode performance
          loading="lazy"
          // Priority for above-the-fold visible planets
          priority={false}
          className="w-full h-auto object-contain"
          style={{
            // Subtle glow for each planet
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))',
          }}
        />
      </motion.div>
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

  // Planet configurations - optimized orbit durations and radii
  const planets = [
    {
      // Inner orbit - MTM Monogram
      src: "/planet-mtm-monogram.webp",
      alt: "MTM Crown Monogram planetary logo",
      orbitRadius: -280, // Negative = counter-clockwise direction
      orbitDuration: 20, // Seconds per orbit
      baseSize: 80,
      startAngle: 0,
      zIndex: 8,
    },
    {
      // Outer orbit - MTM Circuit Stacked
      src: "/planet-mtm-circuit.webp",
      alt: "MTM Circuit Stacked planetary logo", 
      orbitRadius: 380,
      orbitDuration: 30, // Slower, outer orbit
      startAngle: 180, // Start on opposite side
      zIndex: 6,
    },
  ];

  return (
    // Mobile-first responsive container
    <div 
      className="relative flex flex-col items-center justify-center w-full min-h-screen perspective-1000 overflow-hidden"
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
          className="relative z-20"
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformStyle: "preserve-3d",
            transform: 'scale(896.0, 832.0)',
          }}
        >
          <Image
            src="/kc-logo-black-crown.webp"
            alt="The Kareem Crown personal brand logo - The Sun"
            width={800}
            height={350}
            // Priority load for LCP optimization
            priority
            className="w-full h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
            }}
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
          />
        ))}
        
        {/* === ORBITAL PATH VISUALS (Optional - subtle rings) === */}
        {/* Inner orbit path */}
        <div 
          className="absolute border border-white/5 rounded-full pointer-events-none"
          style={{
            width: '560px', // 2 * 280
            height: '560px',
            zIndex: 1,
          }}
        />
        {/* Outer orbit path */}
        <div 
          className="absolute border border-white/5 rounded-full pointer-events-none"
          style={{
            width: '760px', // 2 * 380
            height: '760px',
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
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
      
    </div>
  );
};

export default HeroSection;
