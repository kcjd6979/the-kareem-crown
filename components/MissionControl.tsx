"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Rocket } from 'lucide-react';

/**
 * MissionControl - Audio & Rocket Pen Toggle Panel
 * 
 * Provides user control over:
 * - Audio: Toggle the signature sound system on/off
 * - Rocket Pen: Toggle the custom cursor on/off
 * 
 * Positioned in the bottom-right corner for easy access.
 */

interface MissionControlProps {
  className?: string;
}

export default function MissionControl({ className = '' }: MissionControlProps) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [rocketEnabled, setRocketEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedAudio = localStorage.getItem('kareem-audio-enabled');
    const savedRocket = localStorage.getItem('kareem-rocket-enabled');
    
    if (savedAudio !== null) {
      setAudioEnabled(savedAudio === 'true');
    }
    if (savedRocket !== null) {
      setRocketEnabled(savedRocket === 'true');
    }
  }, []);

  // Save preferences when changed
  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    localStorage.setItem('kareem-audio-enabled', String(newState));
  };

  const toggleRocket = () => {
    const newState = !rocketEnabled;
    setRocketEnabled(newState);
    localStorage.setItem('kareem-rocket-enabled', String(newState));
    
    // Dispatch event for components to respond
    window.dispatchEvent(new CustomEvent('rocket-toggle', { detail: { enabled: newState } }));
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-[99999] ${className}`}
      style={{ fontFamily: 'Playfair Display SC, serif' }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 mb-2 p-4 rounded-2xl"
            style={{
              background: 'rgba(10, 10, 10, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.1)',
              minWidth: '220px',
            }}
          >
            <div className="space-y-4">
              {/* Audio Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: audioEnabled 
                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.1))'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    {audioEnabled ? (
                      <Volume2 size={18} style={{ color: '#D4AF37' }} />
                    ) : (
                      <VolumeX size={18} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                    )}
                  </div>
                  <div>
                    <div 
                      className="text-sm font-bold"
                      style={{ color: audioEnabled ? '#D4AF37' : 'rgba(255, 255, 255, 0.6)' }}
                    >
                      Audio
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      Signature sound
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={toggleAudio}
                  className="relative w-14 h-7 rounded-full transition-all duration-300"
                  style={{
                    background: audioEnabled 
                      ? 'linear-gradient(90deg, #D4AF37, #F5D76E)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                  }}
                >
                  <motion.div
                    animate={{ x: audioEnabled ? 28 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 rounded-full shadow-lg"
                    style={{
                      background: audioEnabled ? '#000' : 'rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </button>
              </div>

              {/* Divider */}
              <div 
                className="w-full h-px"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)' 
                }}
              />

              {/* Rocket Pen Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: rocketEnabled 
                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.1))'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    {rocketEnabled ? (
                      <Rocket size={18} style={{ color: '#D4AF37' }} />
                    ) : (
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="rgba(255, 255, 255, 0.5)" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12.5 2.5 4.5 10.5l6 6 8-8" />
                        <path d="M13.5 9.5 11 12" />
                        <path d="M15.5 7.5 17.5 9.5" />
                        <path d="M6 18 2 22" />
                        <path d="M18 6l-4-4" />
                        <line x1="2" y1="2" x2="22" y2="22" stroke="rgba(255, 255, 255, 0.3)" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div 
                      className="text-sm font-bold"
                      style={{ color: rocketEnabled ? '#D4AF37' : 'rgba(255, 255, 255, 0.6)' }}
                    >
                      Rocket Pen
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      Custom cursor
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={toggleRocket}
                  className="relative w-14 h-7 rounded-full transition-all duration-300"
                  style={{
                    background: rocketEnabled 
                      ? 'linear-gradient(90deg, #D4AF37, #F5D76E)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                  }}
                >
                  <motion.div
                    animate={{ x: rocketEnabled ? 28 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 rounded-full shadow-lg"
                    style={{
                      background: rocketEnabled ? '#000' : 'rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(20, 20, 20, 0.9))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15)',
        }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Pulse indicator when audio is active */}
      {audioEnabled && !isExpanded && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ background: '#D4AF37' }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}
