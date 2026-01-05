"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const HeroSection = () => {
  // Mouse position state for 3D floating effect - More fluid and free-moving
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ultra-responsive spring for smooth, gliding movement
  const mouseX = useSpring(x, { stiffness: 80, damping: 12 });
  const mouseY = useSpring(y, { stiffness: 80, damping: 12 });

  // Dynamic movement - logo follows mouse direction (dance partners)
  const rotateX = useTransform(mouseY, [-300, 300], [-12, 12]);
  const rotateY = useTransform(mouseX, [-400, 400], [15, -15]);

  // Position shift - logo moves WITH mouse (same direction)
  const translateX = useTransform(mouseX, [-400, 400], [-40, 40]);
  const translateY = useTransform(mouseY, [-300, 300], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use raw mouse position for free movement across entire viewport
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    // The main container - Hero section centered for full above-the-fold impact
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen perspective-1000 overflow-hidden" style={{ paddingTop: '0px', paddingBottom: '5vh' }}>
      
      {/* === OVERHEAD GOLD CROWN LIGHT === */}
      {/* Fixed ambient gold light centered above crown for contrast */}
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

      {/* Logo + Title Group - Centered in viewport with minimal gap */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center z-10 w-full max-w-4xl gap-[2vh]"
      >
        {/* === PERSONAL BRAND LOGO - BLACK CROWN - CENTERPIECE === */}
        <motion.div
          className="relative w-[90%] md:w-[85%] max-w-5xl"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            x: translateX,
            y: translateY,
            transformStyle: "preserve-3d",
            transform: 'scale(4.0, 3.8)',
          }}
        >
          <Image
            src="/kc-logo-black-crown.webp"
            alt="The Kareem Crown personal brand logo"
            width={800}
            height={350}
            priority
            className="w-full h-auto object-contain"
            style={{
              // Midas Gold glow for the crown accents
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
            }}
          />
        </motion.div>
        {/* === END: PERSONAL BRAND LOGO === */}

        {/* Title Text - Positioned immediately below logo */}
        <h1 className="text-center text-5xl md:text-7xl font-playfair font-black mt-0 mb-0 text-white tracking-wide" style={{
          textShadow: '0 2px 10px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1)',
        }}>
          The Kareem Crown
        </h1>
      </motion.div>
      {/* End: Logo + Title Group */}

      {/* Seamless fade to next section - Full height gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};

export default HeroSection;
