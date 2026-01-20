// components/RocketCursor.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

export default function RocketCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Base mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for movement (momentum/mass feel)
  const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity tracking
  const velX = useVelocity(smoothX);
  const velY = useVelocity(smoothY);

  // Speed as a motion value for reactive transforms
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

      speed.set(Math.min(currentSpeed / 50, 10)); // Normalized speed

      if (currentSpeed > 50) {
        // Only update angle when moving with some speed to avoid jitter
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

  // Derived transforms
  const galaxyOpacity = useTransform(speed, [0, 5], [0.4, 0.8]);
  const galaxyScale = useTransform(speed, [0, 10], [1, 1.2]);
  const beamScaleY = useTransform(speed, [0, 10], [1, 2]);
  const beamOpacity = useTransform(speed, [0, 0.5], [0.2, 0.7]);
  const flameScaleY = useTransform(speed, [0, 10], [0, 2]);
  const flameOpacity = useTransform(speed, [0, 0.2], [0, 1]);

  if (!isVisible) return null;

  return (
    <div className="rocket-cursor-root" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 999999
    }}>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>

      {/* GALAXY ILLUMINATION - Global glow that follows the cursor */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.05) 40%, transparent 70%)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          opacity: galaxyOpacity,
          scale: galaxyScale,
        }}
      />

      {/* HEADLIGHT BEAMS */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          rotate: angle,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Left Beam */}
        <motion.div style={{
          position: 'absolute',
          left: '-15px',
          top: '-20px',
          width: '40px',
          height: '200px',
          background: 'conic-gradient(from 160deg at 50% 0%, transparent 0%, rgba(212, 175, 55, 0.3) 30%, rgba(212, 175, 55, 0.5) 50%, rgba(212, 175, 55, 0.3) 70%, transparent 100%)',
          filter: 'blur(10px)',
          transformOrigin: 'top center',
          opacity: beamOpacity,
          scaleY: beamScaleY,
        }} />

        {/* Right Beam */}
        <motion.div style={{
          position: 'absolute',
          right: '-15px',
          top: '-20px',
          width: '40px',
          height: '200px',
          background: 'conic-gradient(from 160deg at 50% 0%, transparent 0%, rgba(212, 175, 55, 0.3) 30%, rgba(212, 175, 55, 0.5) 50%, rgba(212, 175, 55, 0.3) 70%, transparent 100%)',
          filter: 'blur(10px)',
          transformOrigin: 'top center',
          opacity: beamOpacity,
          scaleY: beamScaleY,
        }} />
      </motion.div>

      {/* THE ROCKET (PEN) */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: smoothX,
          y: smoothY,
          rotate: angle,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div style={{ position: 'relative', width: '50px', height: '60px' }}>
          {/* Headlights */}
          <div style={{ position: 'absolute', left: '10px', top: '0', width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 15px #D4AF37', zIndex: 10 }} />
          <div style={{ position: 'absolute', right: '10px', top: '0', width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 15px #D4AF37', zIndex: 10 }} />

          {/* Body (Pen Tip) */}
          <div style={{
            width: '100%', height: '100%',
            backgroundImage: "url('/images/gold-pen-tip-4k.webp')",
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(212, 175, 55, 0.1)', // Fallback
            borderRadius: '50% 50% 10% 10%',
            filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))',
            zIndex: 5
          }} />

          {/* Flames */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              translateX: '-50%',
              width: '30px',
              height: '40px',
              background: 'linear-gradient(to bottom, #FF8C00, #D4AF37, transparent)',
              borderRadius: '50% 50% 0 0',
              filter: 'blur(3px)',
              scaleY: flameScaleY,
              opacity: flameOpacity,
              zIndex: 1,
            }}
          />
        </div>
      </motion.div>

      {/* TRAILS */}
      {[0.1, 0.15, 0.2].map((delay, i) => (
        <RocketTrail
          key={i}
          mouseX={mouseX} mouseY={mouseY}
          delay={delay}
          angle={angle}
          speed={speed}
        />
      ))}
    </div>
  );
}

function RocketTrail({ mouseX, mouseY, delay, angle, speed }: any) {
  const trailX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 + delay * 5 });
  const trailY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 + delay * 5 });

  const trailOpacity = useTransform(speed, [0.5, 2], [0, 0.3 - delay]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x: trailX,
        y: trailY,
        rotate: angle,
        translateX: '-50%',
        translateY: '-50%',
        width: '40px',
        height: '50px',
        background: 'rgba(212, 175, 55, 0.1)',
        borderRadius: '50% 50% 10% 10%',
        filter: 'blur(5px)',
        zIndex: 90,
        opacity: trailOpacity,
        scale: 1 - delay,
      }}
    />
  );
}
