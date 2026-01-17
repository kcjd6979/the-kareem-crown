'use client';

import { useEffect, useState } from 'react';

export const SplineRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-robot-container">
      {!hasError ? (
        <>
          <iframe
            src="https://my.spline.design/67babb82-9cf8-4e62-9811-3c5a342578d6"
            frameBorder="0"
            width="100%"
            height="600px"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            style={{
              border: 'none',
              background: 'transparent',
              display: isLoaded ? 'block' : 'none'
            }}
            title="Interactive 3D Robot - Connect with The Architect"
            loading="eager"
          />

          {!isLoaded && (
            <div className="robot-loader">
              <div className="loader-animation"></div>
              <p>Loading 3D Robot...</p>
            </div>
          )}
        </>
      ) : (
        <div className="robot-fallback">
          <div className="fallback-robot-icon">
            <svg viewBox="0 0 200 200" width="200" height="200">
              {/* Simple robot icon */}
              <rect x="70" y="80" width="60" height="80" rx="8" fill="none" stroke="#DAA520" strokeWidth="2" />
              <circle cx="85" cy="100" r="5" fill="#DAA520" />
              <circle cx="115" cy="100" r="5" fill="#DAA520" />
              <line x1="100" y1="120" x2="100" y2="140" stroke="#DAA520" strokeWidth="2" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="#DAA520" strokeWidth="2" />
            </svg>
          </div>
          <p className="fallback-text">3D Robot Visualization</p>
        </div>
      )}
    </div>
  );
};
