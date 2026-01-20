'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export const MTMRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Fallback timer
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-robot-container relative w-full h-[600px] flex items-center justify-center">
      {!hasError ? (
        <>
          <iframe
            src="https://my.spline.design/67babb82-9cf8-4e62-9811-3c5a342578d6"
            frameBorder="0"
            width="100%"
            height="100%"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              console.error("Spline Robot iframe failed to load");
              setHasError(true);
            }}
            style={{
              border: 'none',
              background: 'transparent',
              opacity: 1, // Always visible to avoid loading delay invisibility
              transition: 'opacity 1s ease-in-out'
            }}
            title="Interactive 3D Robot - MTM Branded"
          />

          {/* MTM Logo Branding Overlay - Centered on Robot's Chest */}
          <div
            className="absolute pointer-events-none z-20 flex items-center justify-center"
            style={{
              top: '44%',
              left: '50.1%',
              transform: 'translate(-50%, -50%)',
              width: '15%',
              maxWidth: '120px',
              minWidth: '60px',
              aspectRatio: '1/1',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))'
            }}
          >
            <Image
              src="/main-logo-4k-transparent.webp"
              alt="MTM Logo"
              width={240}
              height={240}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="loader-animation mb-4"></div>
              <p className="text-[#DAA520] font-playfair tracking-widest animate-pulse">
                Activating MTM Robot...
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="robot-fallback flex flex-col items-center justify-center h-full">
          <div className="fallback-robot-icon mb-4">
             <svg viewBox="0 0 200 200" width="120" height="120">
              <rect x="70" y="80" width="60" height="80" rx="8" fill="none" stroke="#DAA520" strokeWidth="2" />
              <circle cx="85" cy="100" r="5" fill="#DAA520" />
              <circle cx="115" cy="100" r="5" fill="#DAA520" />
              <line x1="100" y1="120" x2="100" y2="140" stroke="#DAA520" strokeWidth="2" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="#DAA520" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-[#DAA520] font-playfair tracking-wider">MTM Protocol Offline</p>
        </div>
      )}
    </div>
  );
};
