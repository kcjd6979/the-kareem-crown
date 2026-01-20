'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const SplineParticleBrain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        // We don't necessarily set hasError here because the iframe might still be loading
        // but we can at least stop showing the full-screen loader
        setIsLoaded(true);
      }
    }, 15000); // 15 second timeout for robot

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-brain-container relative overflow-hidden bg-[#0a0a1a]/50 border border-[#DAA520]/30 rounded-2xl shadow-[0_0_50px_rgba(218,165,32,0.15)]">
      {!hasError ? (
        <>
          <div
            className="spline-canvas-wrapper w-full h-[600px]"
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
          >
            <iframe
              src="https://my.spline.design/67babb82-9cf8-4e62-9811-3c5a342578d6"
              frameBorder="0"
              width="100%"
              height="100%"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              style={{
                border: 'none',
                background: 'transparent',
              }}
              title="Interactive 3D Robot - Connect with The Architect"
              loading="eager"
            />
          </div>

          {/* MTM Logo Branding Overlay - Centered on Robot */}
          <div
            className="absolute pointer-events-none z-10"
            style={{
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              opacity: isLoaded ? 0.9 : 0,
              transition: 'opacity 1.5s ease-in-out',
              filter: 'drop-shadow(0 0 15px rgba(218, 165, 32, 0.4))'
            }}
          >
            <Image
              src="/kc-logo-black-crown.webp"
              alt="MTM Logo"
              width={100}
              height={100}
              className="object-contain w-full h-full"
            />
          </div>

          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a1a]">
              <div className="loader-animation mb-4"></div>
              <p className="text-[#DAA520] font-playfair tracking-widest animate-pulse">Initializing Robot Architect...</p>
            </div>
          )}
        </>
      ) : (
        <div className="spline-fallback flex flex-col items-center justify-center min-h-[600px]">
          <div className="fallback-robot-icon relative w-[200px] h-[200px]">
             <svg viewBox="0 0 200 200" className="w-full h-full text-[#DAA520]">
              <rect x="70" y="80" width="60" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="85" cy="100" r="5" fill="currentColor" />
              <circle cx="115" cy="100" r="5" fill="currentColor" />
              <line x1="100" y1="120" x2="100" y2="140" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <p className="mt-8 text-xl font-playfair tracking-widest text-[#D4AF37] uppercase animate-pulse">
            Robot Architect Offline
          </p>
        </div>
      )}
    </div>
  );
};
