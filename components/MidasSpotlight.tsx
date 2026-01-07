"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, MousePointer2 } from 'lucide-react';

interface MidasSpotlightProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function MidasSpotlight({ 
  className = "", 
  size = 450,
  color = "255, 215, 0"
}: MidasSpotlightProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  // Load preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rocket-pen-enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    } else {
      // Default: enabled
      setIsEnabled(true);
    }
  }, []);

  // Apply/remove body class based on enabled state
  useEffect(() => {
    if (isEnabled) {
      document.body.classList.add('rocket-pen-active');
    } else {
      document.body.classList.remove('rocket-pen-active');
    }
  }, [isEnabled]);

  // Save preference when changed
  const toggleRocketPen = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('rocket-pen-enabled', String(newValue));
  };

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      targetPos.current = { x: -100, y: -100 };
    };

    const updatePosition = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    let animationId: number;
    
    const animate = () => {
      const ease = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
      
      setPosition({ ...currentPos.current });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', updatePosition);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', updatePosition);
      cancelAnimationFrame(animationId);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    // Return toggle button only when disabled
    return (
      <div className="rocket-pen-toggle">
        <motion.button
          onClick={toggleRocketPen}
          className="toggle-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Enable Rocket Pen Cursor"
        >
          <Rocket size={20} />
        </motion.button>
      </div>
    );
  }

  return (
    <>
      {/* Toggle Button */}
      <div className="rocket-pen-toggle">
        <motion.button
          onClick={toggleRocketPen}
          className="toggle-btn active"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Disable Rocket Pen Cursor"
        >
          <Rocket size={20} />
        </motion.button>
      </div>

      {/* Custom cursor - Golden Midas Pen Tip (ROCKET) */}
      {isVisible && (
        <div
          className="midas-pen-cursor"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}

      {/* Thruster spotlight glow (HEADLIGHTS) */}
      <div
        className={`midas-spotlight ${className}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
