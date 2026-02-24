// components/RocketCursor.tsx
// ══════════════════════════════════════════════════════════════
// THE SILK GLIDE — Gold Pen Tip Cursor V2
// Pointed tip faces direction of movement (atan2 velocity banking)
// Dual golden headlights illuminate the path ahead (from the tip)
// Velocity-mapped thrusters flare from the rounded base (rear)
// ══════════════════════════════════════════════════════════════
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

export default function RocketCursor({ isEnabled = true }: { isEnabled?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);

  // ─── BASE MOUSE POSITION (Zero Latency / 1:1 Input) ───
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // ─── SILK GLIDE PHYSICS (Lerped Visual) ───
  // Low stiffness = looser follow | High damping = less oscillation (ice feel)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // ─── VELOCITY TRACKING ───
  const velX = useVelocity(smoothX);
  const velY = useVelocity(smoothY);

  // ─── REACTIVE STATE ───
  const speed = useMotionValue(0);
  const [angle, setAngle] = useState(-90); // Default: pointing up (pen tip up)
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const updateLoop = () => {
      const vx = velX.get();
      const vy = velY.get();
      const currentSpeed = Math.sqrt(vx * vx + vy * vy);

      // Normalized speed: 0 (idle) → 1 (full thrust)
      speed.set(Math.min(currentSpeed / 800, 1));

      if (currentSpeed > 20) {
        // atan2 gives angle from positive X-axis.
        // The pen image points UP (negative Y), so we need +90° offset
        // to rotate the pointed tip INTO the direction of movement.
        const newAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
        setAngle(newAngle);
      }

      rafRef.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isEnabled, mouseX, mouseY, isVisible, velX, velY, speed]);

  // ─── DERIVED VISUAL TRANSFORMS ───

  // Galaxy Aura: Expands and brightens with speed
  const galaxyOpacity = useTransform(speed, [0, 1], [0.15, 0.5]);
  const galaxyScale = useTransform(speed, [0, 1], [0.8, 1.3]);

  // Headlight Beams (from the POINTED TIP): Strengthen on movement
  const beamOpacity = useTransform(speed, [0, 0.3, 1], [0.15, 0.5, 0.85]);
  const beamScaleY = useTransform(speed, [0, 1], [0.6, 2.0]);

  // Thrusters (from the ROUNDED BASE): Flare drastically
  const flameScaleY = useTransform(speed, [0, 0.1, 1], [0.3, 0.6, 3.5]);
  const flameOpacity = useTransform(speed, [0, 0.05, 0.3], [0.15, 0.3, 1]); // Subtle pilot light at idle

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="rocket-cursor-root" style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      pointerEvents: 'none', zIndex: 9999
    }}>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>

      {/* ═══ 1. INSTANT CLICKER (Zero-Latency Input Point) ═══ */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          x: mouseX,
          y: mouseY,
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 12px #FFD700, 0 0 4px #FFF',
          zIndex: 10001,
        }}
      />

      {/* ═══ 2. GALAXY ILLUMINATION (Background Atmosphere) ═══ */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          x: smoothX,
          y: smoothY,
          marginLeft: '-250px',
          marginTop: '-250px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(10, 10, 30, 0.0) 60%)',
          borderRadius: '50%',
          mixBlendMode: 'screen' as const,
          opacity: galaxyOpacity,
          scale: galaxyScale,
        }}
      />

      {/* ═══ 3. THE PEN (Silk Glide Visual — Lerped) ═══ */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          x: smoothX,
          y: smoothY,
          rotate: angle,
          // Center the entire pen assembly on the smoothed position
          marginLeft: '-24px',
          marginTop: '-40px',
        }}
      >
        {/* Pen assembly: 48px wide, ~100px tall */}
        <div style={{ position: 'relative', width: '48px', height: '100px' }}>

          {/* ─── FRONT/TIP: DUAL GOLDEN HEADLIGHTS ─── */}
          {/* Left Headlight Beam */}
          <motion.div style={{
            position: 'absolute',
            top: '-60px',
            left: '8px',
            width: '10px',
            height: '80px',
            background: 'linear-gradient(to top, rgba(255, 215, 0, 0.6), rgba(255, 215, 0, 0.1), transparent)',
            filter: 'blur(6px)',
            opacity: beamOpacity,
            scaleY: beamScaleY,
            transformOrigin: 'bottom center',
            borderRadius: '50% 50% 0 0',
          }} />
          {/* Right Headlight Beam */}
          <motion.div style={{
            position: 'absolute',
            top: '-60px',
            right: '8px',
            width: '10px',
            height: '80px',
            background: 'linear-gradient(to top, rgba(255, 215, 0, 0.6), rgba(255, 215, 0, 0.1), transparent)',
            filter: 'blur(6px)',
            opacity: beamOpacity,
            scaleY: beamScaleY,
            transformOrigin: 'bottom center',
            borderRadius: '50% 50% 0 0',
          }} />
          {/* Center Headlight Cone (wider, softer) */}
          <motion.div style={{
            position: 'absolute',
            top: '-90px',
            left: '50%',
            marginLeft: '-20px',
            width: '40px',
            height: '120px',
            background: 'conic-gradient(from 0deg at 50% 100%, rgba(255, 215, 0, 0.25) -15deg, transparent 15deg)',
            filter: 'blur(10px)',
            opacity: beamOpacity,
            scaleY: beamScaleY,
            transformOrigin: 'bottom center',
          }} />

          {/* ─── THE ASSET: Gold Pen Tip (WebP) ─── */}
          {/* Pointed tip faces UP (top of element = front/direction of travel)
              Rounded base at bottom = rear where thrusters attach */}
          <img
            src="/gold-pen-tip-4k.webp"
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '32px',
              height: 'auto',
              filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))',
              zIndex: 10,
              imageRendering: 'auto',
            }}
          />

          {/* ─── REAR/BASE: PRIMARY ION THRUSTER ─── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              marginLeft: '-7px',
              width: '14px',
              height: '50px',
              background: 'linear-gradient(to bottom, #FFFFFF, #87CEEB, #00BFFF, transparent)',
              borderRadius: '4px 4px 12px 12px',
              filter: 'blur(4px)',
              scaleY: flameScaleY,
              opacity: flameOpacity,
              transformOrigin: 'top center',
              zIndex: 5,
            }}
          />

          {/* ─── REAR/BASE: GOLDEN THRUSTER HALO ─── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              marginLeft: '-12px',
              width: '24px',
              height: '40px',
              background: 'linear-gradient(to bottom, #FFD700, #FF8C00, transparent)',
              borderRadius: '50%',
              filter: 'blur(6px)',
              scaleY: flameScaleY,
              opacity: flameOpacity,
              transformOrigin: 'top center',
              zIndex: 4,
            }}
          />

          {/* ─── REAR/BASE: PILOT LIGHT (always-on subtle glow) ─── */}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              marginLeft: '-5px',
              width: '10px',
              height: '10px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 140, 0, 0.2) 60%, transparent 100%)',
              borderRadius: '50%',
              zIndex: 6,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
