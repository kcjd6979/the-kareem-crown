// components/RocketCursor.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

export default function RocketCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Base mouse position (Instant / Zero Latency)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth "Silk Glide" Physics
  // stiffnes: lower = looser follow
  // damping: higher = less oscillation (ice feel)
  // mass: momentum retention
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }; 
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity tracking for dynamic effects
  const velX = useVelocity(smoothX);
  const velY = useVelocity(smoothY);

  // State for reactive transforms
  const speed = useMotionValue(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const updateLoop = () => {
      const vx = velX.get();
      const vy = velY.get();
      const currentSpeed = Math.sqrt(vx * vx + vy * vy);

      speed.set(Math.min(currentSpeed / 100, 1)); // Normalized speed clamp 0-1 (for easier mapping)

      if (currentSpeed > 5) {
        // Only update angle when moving with some speed to avoid jitter
        // +90 deg offset because rocket image points up? Adjust as needed based on asset
        const newAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
        setAngle(newAngle);
      }

      requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mouseX, mouseY, isVisible, velX, velY, speed]);

  // --- DERIVED VISUAL TRANSFORMS ---
  
  // Galaxy Glow: Expands and brightens with speed
  const galaxyOpacity = useTransform(speed, [0, 1], [0.3, 0.6]);
  const galaxyScale = useTransform(speed, [0, 1], [0.8, 1.2]);
  
  // Headlights: Narrow and lengthen at speed
  // const beamScaleY = useTransform(speed, [0, 1], [1, 2.5]); // unused currently or can be re-added
  const beamOpacity = useTransform(speed, [0, 0.5], [0.4, 0.8]);
  
  // Thrusters: Flare drastically on movement
  const flameScaleY = useTransform(speed, [0, 1], [0.5, 3]);
  const flameOpacity = useTransform(speed, [0, 0.2], [0.2, 1]);

  if (!isVisible) return null;

  return (
    <div className="rocket-cursor-root" style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 9999
    }}>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
      
      {/* 1. INSTANT CLICKER (The "Input Logic") 
          This is the 1:1 Zero Latency dot that shows exactly where the user is clicking.
      */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: '8px',
          height: '8px',
          backgroundColor: '#FFD700', // Radiant Gold
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 10px #FFD700',
          zIndex: 10000, // Always on top of the rocket
        }}
      />

      {/* 2. GALAXY ILLUMINATION (Background Atmosphere) */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 30, 0.0) 60%)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          opacity: galaxyOpacity,
          scale: galaxyScale,
        }}
      />

      {/* 3. THE ROCKET (The "Visual Logic") - Lerped */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          x: smoothX,
          y: smoothY,
          rotate: angle,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div style={{ position: 'relative', width: '40px', height: '60px' }}>
          
          {/* Headlights (Golden Beams at Tip) */}
          <motion.div style={{
            position: 'absolute', left: '-10px', top: '-10px', width: '60px', height: '150px',
            background: 'conic-gradient(from 180deg at 50% 0%, rgba(255, 215, 0, 0.4) -10deg, transparent 10deg)',
            filter: 'blur(8px)',
            opacity: beamOpacity,
            transformOrigin: 'top center',
          }} />

          {/* Body (Gold Pen Tip) */}
          {/* Using a pure CSS shape fallback if image fails, but mimicking the pen tip */}
          <div style={{
            position: 'absolute',
            top: 0, left: '50%', translateX: '-50%',
            width: '16px', height: '40px',
            background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
            borderRadius: '50% 50% 5px 5px',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
            zIndex: 10
          }}>
             {/* Detail line */}
             <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '1px', background: 'rgba(255,255,255,0.4)'}} />
          </div>

          {/* Dynamic Rocket Thrusters (Tail) */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '10px', // Just below the body
              left: '50%',
              translateX: '-50%',
              width: '12px',
              height: '40px',
              background: 'linear-gradient(to bottom, #FFFFFF, #00BFFF, transparent)', // Blue/White ion thruster look
              borderRadius: '10px',
              filter: 'blur(4px)',
              scaleY: flameScaleY,
              opacity: flameOpacity,
              originY: 0,
              zIndex: 5,
            }}
          />
          
           {/* Secondary Golden Thruster Halo */}
           <motion.div
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '50%',
              translateX: '-50%',
              width: '20px',
              height: '30px',
              background: 'linear-gradient(to bottom, #FFD700, transparent)',
              borderRadius: '50%',
              filter: 'blur(6px)',
              scaleY: flameScaleY,
              opacity: flameOpacity,
              originY: 0,
              zIndex: 4,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
