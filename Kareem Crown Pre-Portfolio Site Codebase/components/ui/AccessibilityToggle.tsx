"use client";

import React from "react";
import { MousePointer, MousePointer2 } from "lucide-react";

/**
 * Custom SVG component for disabled cursor state
 * Since MousePointerOff doesn't exist in lucide-react
 */
const MousePointerOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cursor-disabled-icon"
  >
    <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="8" x2="12" y2="8.01" />
    <line x1="12" y1="16" x2="12" y2="16.01" />
    <line x1="8" y1="12" x2="8" y2="12.01" />
    <line x1="16" y1="12" x2="16" y2="12.01" />
  </svg>
);

interface AccessibilityToggleProps {
  isCustomCursorEnabled: boolean;
  toggleCustomCursor: () => void;
  className?: string;
}

export function AccessibilityToggle({
  isCustomCursorEnabled,
  toggleCustomCursor,
  className = "",
}: AccessibilityToggleProps) {
  return (
    <button
      onClick={toggleCustomCursor}
      className={`fixed bottom-24 right-6 z-[99999] p-3 rounded-full transition-all duration-300 group ${
        isCustomCursorEnabled
          ? "bg-amber-500/20 border border-amber-400/50 text-amber-400 hover:bg-amber-500/30"
          : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
      } ${className}`}
      style={{
        fontFamily: "Playfair Display SC, serif",
        backdropFilter: "blur(20px)",
        boxShadow: isCustomCursorEnabled
          ? "0 0 30px rgba(245, 190, 80, 0.3), 0 10px 40px rgba(0, 0, 0, 0.4)"
          : "0 10px 40px rgba(0, 0, 0, 0.4)",
      }}
      aria-label={
        isCustomCursorEnabled
          ? "Disable custom cursor"
          : "Enable custom cursor"
      }
      title={
        isCustomCursorEnabled
          ? "Click to disable the custom cursor"
          : "Click to enable the custom cursor"
      }
    >
      <div className="relative">
        {/* Active state - golden mouse pointer */}
        <div
          className={`transition-all duration-300 ${
            isCustomCursorEnabled
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-30 scale-90 rotate-12"
          }`}
        >
          <MousePointer2
            size={22}
            className="text-amber-400"
            fill="rgba(245, 190, 80, 0.3)"
          />
        </div>

        {/* Disabled state - crossed out cursor */}
        <div
          className={`absolute top-0 left-0 transition-all duration-300 ${
            isCustomCursorEnabled
              ? "opacity-0 scale-50 -rotate-12"
              : "opacity-100 scale-100 rotate-0"
          }`}
        >
          <MousePointerOffIcon />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {isCustomCursorEnabled ? "Cursor: ON" : "Cursor: OFF"}
      </div>
    </button>
  );
}

export default AccessibilityToggle;
