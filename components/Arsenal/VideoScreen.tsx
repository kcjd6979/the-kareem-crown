"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

/**
 * VideoScreen Component
 * Handles video playback with intelligent auto-play based on visibility
 * Optimized for performance—only plays when in center/focus
 */
interface VideoScreenProps {
  src: string;
  poster?: string;
  isActive: boolean;
  isVisible: boolean;
  className?: string;
}

export function VideoScreen({ src, poster, isActive, isVisible, className = '' }: VideoScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Auto-play when active and visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isVisible && !hasError) {
      // Small delay for smooth transition
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay prevented:', err);
          // Video might be blocked due to autoplay policies
          // This is expected in some browsers without user interaction
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, isVisible, hasError]);

  // Handle video loading
  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    console.warn('Failed to load video:', src);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Loading</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-gray-500 uppercase tracking-widest">Video Unavailable</span>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={isActive ? 'auto' : 'none'}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      />

      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}

export default VideoScreen;
