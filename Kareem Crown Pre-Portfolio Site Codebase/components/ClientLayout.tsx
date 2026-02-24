"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AccessibilityToggle } from "./ui/AccessibilityToggle";

import RocketCursor from "./RocketCursor";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(true);

  // Sound manager for click feedback
  useEffect(() => {
    const playClickSound = () => {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          400,
          audioContext.currentTime + 0.1
        );

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        // Audio not supported, ignore
      }
    };

    // Add click sound to all clickable elements
    const addClickSound = () => {
      document.addEventListener("click", playClickSound);
    };

    addClickSound();

    return () => {
      document.removeEventListener("click", playClickSound);
    };
  }, []);

  return (
    <>
      {/* 3-Layer Parallax Star Field */}
      <div className="star-layer-1" />
      <div className="star-layer-2" />
      <div className="star-layer-3" />

      {/* Custom Rocket Cursor System - Primary Handler */}
      <RocketCursor isEnabled={isCustomCursorEnabled} />

      {/* Accessibility Toggle */}
      <AccessibilityToggle
        isCustomCursorEnabled={isCustomCursorEnabled}
        toggleCustomCursor={() =>
          setIsCustomCursorEnabled(!isCustomCursorEnabled)
        }
      />

      {/* Main Content */}
      {children}
    </>
  );
};

export default ClientLayout;
