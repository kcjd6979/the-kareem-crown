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

  // Delayed follow for light beams and trails (LERP effect)
  const delayedX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.8 });
  const delayedY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.8 });

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
  const galaxyOpacity = useTransform(speed, [0, 5], [0.5, 0.9]);
  const galaxyScale = useTransform(speed, [0, 10], [1, 1.5]);
  const beamScaleY = useTransform(speed, [0, 10], [0.5, 3.0]);
  const beamWidth = useTransform(speed, [0, 10], [30, 100]);
  const beamOpacity = useTransform(speed, [0, 0.5], [0.2, 0.9]);
  const flameScaleY = useTransform(speed, [0, 10], [0, 3.5]);
  const flameOpacity = useTransform(speed, [0, 0.2], [0, 1]);

  if (!isVisible) return null;

  return (
    <div className="rocket-cursor-root" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 999999
    }}>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

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
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 30%, rgba(212, 175, 55, 0.05) 60%, transparent 80%)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          opacity: galaxyOpacity,
          scale: galaxyScale,
        }}
      />

      {/* HEADLIGHT BEAMS - Using delayed coordinates for smooth trail feel */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: delayedX,
          y: delayedY,
          rotate: angle,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Left Beam - Forward Projecting Radial Pool */}
        <motion.div style={{
          position: 'absolute',
          left: '-13px',
          top: '0px',
          width: beamWidth,
          height: '400px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.3) 40%, rgba(212, 175, 55, 0.1) 70%, transparent 100%)',
          filter: 'blur(15px)',
          transformOrigin: 'top center',
          translateX: '-50%',
          opacity: beamOpacity,
          scaleY: beamScaleY,
          mixBlendMode: 'screen',
        }} />

        {/* Right Beam - Forward Projecting Radial Pool */}
        <motion.div style={{
          position: 'absolute',
          right: '-13px',
          top: '0px',
          width: beamWidth,
          height: '400px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.3) 40%, rgba(212, 175, 55, 0.1) 70%, transparent 100%)',
          filter: 'blur(15px)',
          transformOrigin: 'top center',
          translateX: '50%',
          opacity: beamOpacity,
          scaleY: beamScaleY,
          mixBlendMode: 'screen',
        }} />

        {/* Persistent Light Path (Subtle path left behind) */}
        <RocketLightPath smoothX={delayedX} smoothY={delayedY} speed={speed} />
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
          {/* Headlights - More intense core */}
          <motion.div
            style={{
              position: 'absolute', left: '12px', top: '2px', width: '8px', height: '8px',
              borderRadius: '50%', background: '#FFF',
              boxShadow: '0 0 15px 2px #FFF, 0 0 30px 10px #D4AF37',
              zIndex: 10
            }}
            animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            style={{
              position: 'absolute', right: '12px', top: '2px', width: '8px', height: '8px',
              borderRadius: '50%', background: '#FFF',
              boxShadow: '0 0 15px 2px #FFF, 0 0 30px 10px #D4AF37',
              zIndex: 10
            }}
            animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }}
          />

          {/* Body (Pen Tip / Rocket Body) */}
          <div style={{
            width: '100%', height: '100%',
            backgroundImage: "url('/images/gold-pen-tip-4k.webp')",
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(212, 175, 55, 0.2)', // Fallback
            borderRadius: '50% 50% 15% 15%',
            filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            boxShadow: 'inset 0 0 10px rgba(212, 175, 55, 0.3)',
            zIndex: 5
          }}>
            {/* CSS Fallback pen details */}
            <div style={{
              position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
              width: '2px', height: '60%', background: 'rgba(212, 175, 55, 0.3)'
            }} />
          </div>

          {/* Flames - Scalable based on velocity */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              translateX: '-50%',
              width: '24px',
              height: '50px',
              background: 'linear-gradient(to bottom, #D4AF37, #FF8C00, transparent)',
              borderRadius: '50% 50% 20% 20%',
              filter: 'blur(4px)',
              transformOrigin: 'top center',
              scaleY: flameScaleY,
              opacity: flameOpacity,
              zIndex: 1,
            }}
          >
            {/* Core flame */}
            <div style={{
              width: '100%',
              height: '60%',
              background: 'white',
              borderRadius: '50%',
              filter: 'blur(6px)',
              opacity: 0.6
            }} />
          </motion.div>
        </div>
      </motion.div>

      {/* TRAILS - Particle-like fading path */}
      {[0.05, 0.1, 0.2, 0.3, 0.4, 0.6].map((delay, i) => (
        <RocketTrail
          key={i}
          mouseX={mouseX} mouseY={mouseY}
          delay={delay}
          angle={angle}
          speed={speed}
          type={i % 3 === 0 ? 'headlight' : (i % 3 === 1 ? 'body' : 'glow')}
        />
      ))}
    </div>
  );
}

function RocketLightPath({ smoothX, smoothY, speed }: any) {
  const pathOpacity = useTransform(speed, [1, 5], [0, 0.4]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        translateX: '-50%',
        width: '120px',
        height: '300px',
        background: 'linear-gradient(to top, rgba(212, 175, 55, 0.2), transparent)',
        filter: 'blur(25px)',
        opacity: pathOpacity,
        transformOrigin: 'top center',
      }}
    />
  );
}

function RocketTrail({ mouseX, mouseY, delay, angle, speed, type }: any) {
  const trailX = useSpring(mouseX, { stiffness: 60 - (delay * 45), damping: 20 + (delay * 15), mass: 0.5 + delay });
  const trailY = useSpring(mouseY, { stiffness: 60 - (delay * 45), damping: 20 + (delay * 15), mass: 0.5 + delay });

  const trailOpacity = useTransform(speed, [0.1, 8], [0, (type === 'headlight' ? 0.6 : 0.4) * (1 - delay)]);
  const trailScale = useTransform(speed, [0, 10], [0.6 * (1 - delay), 1.8]);

  let width = '40px';
  let height = '40px';
  let background = 'rgba(212, 175, 55, 0.1)';
  let blur = '10px';

  if (type === 'headlight') {
    width = '10px';
    height = '10px';
    background = '#FFF';
    blur = '5px';
  } else if (type === 'glow') {
    width = '120px';
    height = '120px';
    background = 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)';
    blur = '30px';
  }

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
        width,
        height,
        background,
        borderRadius: '50%',
        filter: `blur(${blur})`,
        zIndex: 90 - (delay * 10),
        opacity: trailOpacity,
        scale: trailScale,
        mixBlendMode: 'screen'
      }}
    />
  );
}
