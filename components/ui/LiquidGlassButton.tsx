"LiquidGlassButton.tsx"

"use client";

import { motion } from "framer-motion";

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const LiquidGlassButton = ({ children, onClick, className }: LiquidGlassButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-2xl overflow-hidden
        border border-white/20
        bg-white/10
        backdrop-blur-sm
        text-white font-sans
        shadow-lg shadow-black/20
        transition-all duration-300 ease-in-out
        hover:bg-white/20 hover:shadow-midas-gold/20
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
