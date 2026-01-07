"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CurvedVideoCard from './CurvedVideoCard';
import { arsenalData, ArsenalItem } from './arsenalData';

/**
 * ArsenalCarousel Component
 * Main carousel container with scroll-driven 3D rotation
 * 
 * Features:
 * - Desktop: CSS 3D curved carousel with drag gestures
 * - Mobile: Flat horizontal snap scroll
 * - Auto-play center video only
 * - Navigation dots with keyboard support
 * - Performance optimized with motion values
 */
export function ArsenalCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop 3D carousel controls
  const carouselRadius = 400; // pixels
  const x = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100, mass: 1.2 };
  const velocityX = useSpring(x, springConfig);

  // Transform scroll position to rotation angle
  const rotation = useTransform(velocityX, [-300, 300], [Math.PI / 4, -Math.PI / 4]);

  // Handle drag end - snap to nearest card
  const handleDragEnd = useCallback(() => {
    const currentX = x.get();
    const cardWidth = 360; // Approximate card width + gap
    const nearestIndex = Math.round(-currentX / cardWidth);
    const clampedIndex = Math.max(0, Math.min(nearestIndex, arsenalData.length - 1));
    setActiveIndex(clampedIndex);
  }, [x]);

  // Handle navigation dot click
  const handleDotClick = (index: number) => {
    if (isMobile) {
      // On mobile, scroll to the card
      const cardWidth = window.innerWidth * 0.85 + 20; // card width + gap
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth',
        });
      }
    } else {
      // On desktop, animate to position
      const cardWidth = 360;
      x.set(-index * cardWidth);
    }
    setActiveIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const newIndex = Math.max(0, activeIndex - 1);
        handleDotClick(newIndex);
      } else if (e.key === 'ArrowRight') {
        const newIndex = Math.min(arsenalData.length - 1, activeIndex + 1);
        handleDotClick(newIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleDotClick]);

  return (
    <section
      className="relative w-full h-screen min-h-[800px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111 50%, #000 100%)',
      }}
      aria-label="Arsenal - Proof of Work Showcase"
    >
      {/* Section Title */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold tracking-wide"
          style={{
            fontFamily: 'Playfair Display SC, serif',
            color: '#D4AF37',
            textShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
          }}
        >
          The Arsenal
        </h2>
        <p
          className="mt-2 text-sm uppercase tracking-[0.3em]"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          Proof of Capability
        </p>
      </motion.div>

      {/* Mobile Scroll Container */}
      {isMobile ? (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full pt-24 pb-32"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
          }}
        >
          {arsenalData.map((item, index) => (
            <div
              key={item.id}
              className="flex-shrink-0 snap-center flex items-center justify-center px-4"
              style={{ width: '85vw' }}
            >
              <CurvedVideoCard
                item={item}
                index={index}
                totalItems={arsenalData.length}
                activeIndex={activeIndex}
                rotation={0}
                carouselRadius={carouselRadius}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop 3D Carousel */
        <div
          ref={containerRef}
          className="relative w-full h-full pt-24 pb-32 perspective-1500"
          style={{ perspective: '1500px' }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              rotateY: rotation,
              transformOrigin: 'center center',
            }}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragPropagation={true}
            onDragEnd={handleDragEnd}
            onDrag={(e, { offset }) => {
              x.set(offset.x);
            }}
            style={{ x }}
          >
            {arsenalData.map((item, index) => (
              <CurvedVideoCard
                key={item.id}
                item={item}
                index={index}
                totalItems={arsenalData.length}
                activeIndex={activeIndex}
                rotation={rotation.get()}
                carouselRadius={carouselRadius}
                isMobile={false}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Navigation Dots */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {arsenalData.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleDotClick(index)}
            className="relative group"
            aria-label={`View ${item.title}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          >
            {/* Outer ring */}
            <div
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                index === activeIndex
                  ? 'border-[#D4AF37] scale-110'
                  : 'border-white/30 hover:border-white/60'
              }`}
              style={{
                background: index === activeIndex
                  ? 'radial-gradient(circle, #D4AF37 0%, transparent 70%)'
                  : 'transparent',
              }}
            />
            {/* Hover tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-xs whitespace-nowrap rounded-lg bg-black/80 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.title}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-2 left-0 right-0 text-center text-xs uppercase tracking-widest"
        style={{ color: 'rgba(255, 255, 255, 0.3)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isMobile ? '← Swipe →' : 'Drag to Explore'}
      </motion.div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Radial glow from center */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
}

export default ArsenalCarousel;
