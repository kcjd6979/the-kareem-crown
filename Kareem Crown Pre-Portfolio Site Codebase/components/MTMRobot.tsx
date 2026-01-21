'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export const MTMRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Fallback timer to show logo even if onLoad doesn't fire perfectly
    const timer = setTimeout(() => {
      if (!isLoaded) {
        // We don't necessarily set hasError here because the iframe might still be loading
        // but we can at least stop showing the full-screen loader
        setIsLoaded(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-robot-container relative w-full h-[600px] bg-black/10 rounded-2xl overflow-hidden border border-[#DAA520]/20 shadow-[0_0_50px_rgba(218,165,32,0.1)]">
      {!hasError ? (
        <>
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
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
            title="Interactive 3D Robot - MTM Branded"
            loading="eager"
          />

          {/* MTM Logo Branding Overlay */}
          <div
            className="absolute pointer-events-none z-10"
            style={{
              top: '45%', // Centered on the robot's chest
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
              priority
            />
          </div>

          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a1a]">
              <div className="loader-animation mb-4"></div>
              <p className="text-[#DAA520] font-playfair tracking-widest animate-pulse">Initializing MTM Robot...</p>
            </div>
          )}
        </>
      ) : (
        <div className="robot-fallback flex flex-col items-center justify-center h-full bg-[#0a0a1a]">
          <div className="fallback-robot-icon mb-4">
             <svg viewBox="0 0 200 200" width="120" height="120">
              <rect x="70" y="80" width="60" height="80" rx="8" fill="none" stroke="#DAA520" strokeWidth="2" />
              <circle cx="85" cy="100" r="5" fill="#DAA520" />
              <circle cx="115" cy="100" r="5" fill="#DAA520" />
              <line x1="100" y1="120" x2="100" y2="140" stroke="#DAA520" strokeWidth="2" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="#DAA520" strokeWidth="2" />
            </svg>
          </div>
          <p className="text-[#DAA520] font-playfair tracking-wider">MTM Robot Offline</p>
        </div>
      )}
    </div>
  );
};
