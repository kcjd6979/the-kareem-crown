"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useTime } from "framer-motion";
import { useEffect } from "react";

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
        // Center the planet itself using translate
        translateX: '-50%',
        translateY: '-50%',
        // 3D perspective for rotation effect
        perspective: '1000px',
      }}
    >
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
            // Subtle glow for each planet
            filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.4))',
            // Backface visibility creates the flip effect
            backfaceVisibility: 'hidden',
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

  // Planet configurations - 3D solar system with tasteful selection
  // Uses trig to keep planets upright + CSS 3D transforms for depth effect
  const planets = [
    {
      // Inner orbit - Synapse Agent (Core Intelligence)
      src: "/planets/planet-syn-orb.webp",
      alt: "Synapse Agent - Core Intelligence planetary representation",
      orbitRadius: -200,
      orbitDuration: 15,
      baseSize: 60,
      startAngle: 0,
      zIndex: 8,
      scale: { mobile: 0.5, tablet: 0.75, desktop: 1.0 },
    },
    {
      // Middle orbit - Midas Mailer (Commerce/Transformation)
      src: "/planets/planet-midas-orb-1.webp",
      alt: "Midas Mailer - Transformation planetary representation",
      orbitRadius: 280,
      orbitDuration: 22,
      baseSize: 75,
      startAngle: 120,
      zIndex: 6,
      scale: { mobile: 0.5, tablet: 0.75, desktop: 1.0 },
    },
    {
      // Outer orbit - Apex Predator (Dominance/Power)
      src: "/planets/planet-apex-orb.webp",
      alt: "Apex Predator - Dominance planetary representation",
      orbitRadius: -380,
      orbitDuration: 32,
      baseSize: 90,
      startAngle: 240,
      zIndex: 4,
      scale: { mobile: 0.5, tablet: 0.75, desktop: 1.0 },
    },
    {
      // Far outer orbit - Griff Winged (Aspiration/Freedom)
      src: "/planets/planet-griff-winged.webp",
      alt: "Griff Winged - Aspiration planetary representation",
      orbitRadius: 480,
      orbitDuration: 45,
      baseSize: 70,
      startAngle: 60,
      zIndex: 2,
      scale: { mobile: 0.4, tablet: 0.65, desktop: 0.9 },
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
            responsiveScale={planet.scale}
          />
        ))}
        
        {/* === ORBITAL PATH VISUALS (Subtle rings for visual reference) === */}
        {/* Inner orbit path (200px) */}
        <div 
          className="absolute border border-white/5 rounded-full pointer-events-none"
          style={{
            width: '400px', // 2 * 200
            height: '400px',
            zIndex: 1,
          }}
        />
        {/* Middle orbit path (280px) */}
        <div 
          className="absolute border border-white/8 rounded-full pointer-events-none"
          style={{
            width: '560px', // 2 * 280
            height: '560px',
            zIndex: 1,
          }}
        />
        {/* Outer orbit path (380px) */}
        <div 
          className="absolute border border-white/5 rounded-full pointer-events-none"
          style={{
            width: '760px', // 2 * 380
            height: '760px',
            zIndex: 1,
          }}
        />
        {/* Far outer orbit path (480px) */}
        <div 
          className="absolute border border-white/3 rounded-full pointer-events-none"
          style={{
            width: '960px', // 2 * 480
            height: '960px',
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
