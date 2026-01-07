"use client";

import { useState, useEffect } from "react";
import OptimizedBackground from "@/components/OptimizedBackground";
import { Spotlight } from "@/components/Spotlight";
import { FixedLighting } from "@/components/FixedLighting";
import RocketPenCursor from "@/components/RocketPenCursor";
import SoundManager from "@/components/SoundManager";
import MissionControl from "@/components/MissionControl";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [rocketEnabled, setRocketEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    // Load saved preferences
    const savedRocket = localStorage.getItem('kareem-rocket-enabled');
    const savedAudio = localStorage.getItem('kareem-audio-enabled');
    
    if (savedRocket !== null) {
      setRocketEnabled(savedRocket === 'true');
    }
    if (savedAudio !== null) {
      setAudioEnabled(savedAudio === 'true');
    }

    // Listen for rocket toggle changes
    const handleRocketToggle = (e: CustomEvent) => {
      setRocketEnabled(e.detail.enabled);
      if (e.detail.enabled) {
        document.body.classList.add('rocket-pen-enabled');
      } else {
        document.body.classList.remove('rocket-pen-enabled');
      }
    };

    window.addEventListener('rocket-toggle', handleRocketToggle as EventListener);
    
    // Initial state
    if (savedRocket === null || savedRocket === 'true') {
      document.body.classList.add('rocket-pen-enabled');
    }

    return () => {
      window.removeEventListener('rocket-toggle', handleRocketToggle as EventListener);
      document.body.classList.remove('rocket-pen-enabled');
    };
  }, []);

  return (
    <>
      {/* Audio System - No visual representation */}
      <SoundManager enabled={audioEnabled} />
      
      {/* Custom Cursor - Only when enabled */}
      {rocketEnabled && <RocketPenCursor />}
      
      {/* Existing spotlight effect */}
      <Spotlight 
        className="fixed inset-0 pointer-events-none" 
        color="#D4AF37" 
        opacity={0.45} 
        size={700} 
      />
      
      {/* Mission Control Panel */}
      <MissionControl />
      
      {/* Background elements */}
      <OptimizedBackground />
      <FixedLighting />
      
      {children}
    </>
  );
}
