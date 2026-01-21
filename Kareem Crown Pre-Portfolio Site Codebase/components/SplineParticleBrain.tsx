'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export const SplineParticleBrain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        // We don't necessarily set hasError here because the 3D asset might still be loading
        setIsLoaded(true);
      }
    }, 30000); // 30 second timeout for 3D assets

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-brain-container relative overflow-hidden bg-[#0a0a1a]/50 border border-[#DAA520]/30 rounded-2xl shadow-[0_0_50px_rgba(218,165,32,0.15)]">
      {!hasError ? (
        <>
          <div
            className="spline-canvas-wrapper w-full h-[600px]"
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1.5s ease-in-out' }}
          >
            <Spline
              scene="https://prod.spline.design/wuVfCRtSg0nsVdL9/scene.splinecode"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          </div>

          {/* MTM Logo Branding Overlay - Centered on Character */}
          <div
            className="absolute pointer-events-none z-10"
            style={{
              top: '45%', // Centered on the character's chest
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
              <p className="text-[#DAA520] font-playfair tracking-widest animate-pulse">Initializing Particle Brain...</p>
            </div>
          )}
        </>
      ) : (
        <div className="spline-fallback flex flex-col items-center justify-center min-h-[600px]">
          <div className="fallback-brain-icon relative w-[200px] h-[200px]">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#DAA520]">
              <path d="M100,40 C60,40 40,70 40,100 C40,130 60,160 100,160 C140,160 160,130 160,100 C160,70 140,40 100,40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="40" x2="100" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="100" y1="130" x2="100" y2="160" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="100" x2="70" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="130" y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <p className="mt-8 text-xl font-playfair tracking-widest text-[#D4AF37] uppercase animate-pulse">
            Neural Interface Offline
          </p>
        </div>
      )}
    </div>
  );
};
