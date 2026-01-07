"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSoundFeedback } from '@/hooks/useSoundFeedback';
import Image from 'next/image';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export function SoundButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false 
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useSoundFeedback();

  const handleClick = () => {
    if (!disabled) {
      playClick();
      onClick?.();
    }
  };

  return (
    <motion.button
      className={`interactive relative px-8 py-4 rounded-full font-bold tracking-wide overflow-hidden ${className}`}
      style={{
        background: variant === 'primary' 
          ? 'linear-gradient(135deg, #D4AF37, #B8860B)'
          : 'rgba(255, 255, 255, 0.1)',
        border: variant === 'primary' 
          ? 'none'
          : '1px solid rgba(212, 175, 55, 0.5)',
        color: variant === 'primary' ? '#000' : '#D4AF37',
        minWidth: '200px',
      }}
      disabled={disabled}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        }}
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  glowColor?: string;
  className?: string;
}

export function SoundCard({ 
  children, 
  onClick, 
  glowColor = 'rgba(212, 175, 55, 0.3)',
  className = '' 
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useSoundFeedback();

  return (
    <motion.div
      className={`floating-card interactive ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playClick();
        onClick?.();
      }}
      whileHover={{ scale: 1.02 }}
      style={{
        '--card-glow-color': glowColor,
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
}

interface LinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function SoundLink({ children, href = '#', className = '' }: LinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover } = useSoundFeedback();

  return (
    <a
      href={href}
      className={`interactive inline-flex items-center gap-2 ${className}`}
      style={{ color: '#D4AF37' }}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.span
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        →
      </motion.span>
    </a>
  );
}
