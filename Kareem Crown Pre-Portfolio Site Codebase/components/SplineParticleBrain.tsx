'use client';

import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export const SplineParticleBrain = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="spline-brain-container flex items-center justify-center">
      {!hasError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="spline-canvas-wrapper w-full h-full"
            style={{ display: isLoaded ? 'block' : 'none' }}
          >
            <Spline
              scene="https://prod.spline.design/08b0ad4f-2015-4aef-88be-8a30bb3373ee/scene.splinecode"
              onLoad={() => {
                console.log("Spline Loaded Successfully");
                setIsLoaded(true);
              }}
              onError={() => {
                console.error("Spline Error Triggered");
                setHasError(true);
              }}
            />
          </div>

          {!isLoaded && (
            <div className="spline-loader absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10">
              <div className="loader-animation"></div>
              <p className="mt-4 text-[#DAA520] font-mono animate-pulse uppercase tracking-widest text-xs">
                Initializing Neural Link...
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="spline-fallback">
          <div className="fallback-brain-icon relative w-[300px] h-[300px]">
            {/* Pulsing Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-[#DAA520]/10 blur-3xl animate-pulse"></div>

            <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full drop-shadow-[0_0_15px_rgba(218,165,32,0.5)]">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#F5F5F5" />
                  <stop offset="100%" stopColor="#B6862C" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Brain Outline - Complex Neural Network Style */}
              <motion.path
                d="M100 30 C70 30 40 50 35 90 C30 130 60 170 100 170 C140 170 170 130 165 90 C160 50 130 30 100 30 Z"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />

              {/* Neural Connections */}
              {[...Array(12)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={100 + Math.cos(i * 30 * Math.PI / 180) * 20}
                  y1={100 + Math.sin(i * 30 * Math.PI / 180) * 20}
                  x2={100 + Math.cos(i * 30 * Math.PI / 180) * 60}
                  y2={100 + Math.sin(i * 30 * Math.PI / 180) * 60}
                  stroke="#DAA520"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                />
              ))}

              {/* Synaptic Particles */}
              {[...Array(20)].map((_, i) => (
                <circle key={i} r="1.5" fill="#F5F5F5">
                  <animate
                    attributeName="cx"
                    from={100 + (Math.random() - 0.5) * 120}
                    to={100 + (Math.random() - 0.5) * 120}
                    dur={`${2 + Math.random() * 3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={100 + (Math.random() - 0.5) * 120}
                    to={100 + (Math.random() - 0.5) * 120}
                    dur={`${2 + Math.random() * 3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur={`${1 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Central Nucleus */}
              <circle cx="100" cy="100" r="8" fill="url(#goldGradient)" filter="url(#glow)">
                <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <p className="mt-8 text-xl font-playfair tracking-widest text-[#D4AF37] uppercase animate-pulse">
            Neural Architect Active
          </p>
        </div>
      )}
    </div>
  );
};
