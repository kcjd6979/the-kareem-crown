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
        relative px-6 py-3 overflow-hidden
        bg-transparent
        text-white font-merriweather
        transition-all duration-300 ease-in-out
        hover:text-yellow-400
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {/* Subtle underline effect on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-yellow-400"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
