'use client';

import { useEffect, useRef, useState } from 'react';

export const SplineParticleBrain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 30000); // 30 second timeout

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-brain-container">
      {!hasError ? (
        <>
          <iframe
            src="https://my.spline.design/08b0ad4f-2015-4aef-88be-8a30bb3373ee"
            frameBorder="0"
            width="100%"
            height="600px"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            style={{
              border: 'none',
              borderRadius: '12px',
              background: 'transparent',
              display: isLoaded ? 'block' : 'none'
            }}
            title="Particle Brain - AI Systems Architect Visualization"
            loading="eager"
          />

          {!isLoaded && (
            <div className="spline-loader">
              <div className="loader-animation"></div>
              <p>Loading Brain Visualization...</p>
            </div>
          )}
        </>
      ) : (
        <div className="spline-fallback">
          <div className="fallback-brain-icon">
            <svg viewBox="0 0 200 200" width="200" height="200">
              {/* Brain icon */}
              <path
                d="M100 40 C80 40 60 50 50 70 C40 90 40 110 50 130 C60 150 80 160 100 160 C120 160 140 150 150 130 C160 110 160 90 150 70 C140 50 120 40 100 40Z"
                fill="none"
                stroke="rgba(218, 165, 32, 0.6)"
                strokeWidth="2"
              />
              {/* Particle effects */}
              <circle cx="70" cy="80" r="2" fill="#DAA520" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="130" cy="80" r="2" fill="#DAA520" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="120" r="2" fill="#DAA520" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.4;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="fallback-text">Particle Brain Visualization</p>
        </div>
      )}
    </div>
  );
};