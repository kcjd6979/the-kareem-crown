"use client";

import { motion } from 'framer-motion';
import VideoScreen from './VideoScreen';
import { ArsenalItem } from './arsenalData';

interface CurvedVideoCardProps {
  item: ArsenalItem;
  index: number;
  totalItems: number;
  activeIndex: number;
  rotation: number;
  carouselRadius: number;
  isMobile: boolean;
}

/**
 * CurvedVideoCard Component
 * Individual video card with 3D transforms for curved carousel effect
 * Features metallic bezel styling matching brand aesthetic
 */
export function CurvedVideoCard({
  item,
  index,
  totalItems,
  activeIndex,
  rotation,
  carouselRadius,
  isMobile,
}: CurvedVideoCardProps) {
  // Calculate card position in the circle
  const angleStep = (2 * Math.PI) / totalItems;
  const cardAngle = index * angleStep;

  // Distance from center card (for scale/opacity transitions)
  const distanceFromActive = Math.abs(index - activeIndex);
  const isActive = index === activeIndex;
  const isAdjacent = distanceFromActive === 1;
  const isVisible = distanceFromActive < 2; // Show 2 cards on each side

  // Calculate 3D transforms
  // On desktop: arrange in circle with 3D rotation
  // On mobile: flat layout with snap scroll
  const x = isMobile ? 0 : Math.cos(cardAngle) * carouselRadius;
  const z = isMobile ? 0 : Math.sin(cardAngle) * carouselRadius * -1; // Negative for proper depth
  const rotateY = isMobile ? 0 : -cardAngle * (180 / Math.PI) + 90; // Face toward center

  // Scale based on distance from active
  const scale = isMobile
    ? 1
    : isActive
    ? 1
    : isAdjacent
    ? 0.85
    : 0.7;

  // Opacity based on visibility
  const opacity = isMobile ? 1 : isActive ? 1 : isAdjacent ? 0.7 : 0.4;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
      }}
      initial={false}
      animate={
        isMobile
          ? {}
          : {
              x,
              z,
              rotateY,
              scale,
              opacity,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 1,
      }}
    >
      {/* Card Container with Metallic Bezel */}
      <div
        className="relative overflow-hidden"
        style={{
          width: isMobile ? '85vw' : '320px',
          height: isMobile ? '70vh' : '480px',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        {/* Metallic Bezel Effect */}
        <div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
          style={{
            // Metallic gradient bezel
            background: `linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.05) 20%,
              rgba(0, 0, 0, 0.3) 50%,
              rgba(0, 0, 0, 0.5) 80%,
              rgba(212, 175, 55, 0.2) 100%
            )`,
            boxShadow: isActive
              ? `0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              : `0 15px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />

        {/* Inner screen border */}
        <div
          className="absolute inset-2 rounded-xl z-10 pointer-events-none"
          style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Video Screen */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <VideoScreen
            src={item.videoSrc}
            poster={item.posterSrc}
            isActive={isActive}
            isVisible={isVisible}
          />
        </div>

        {/* Content Overlay - Shows on hover or when not active */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-end p-6 pointer-events-none"
          style={{
            background: isActive
              ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          }}
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0.7,
          }}
        >
          {/* Title */}
          <h3
            className="text-xl font-bold mb-1"
            style={{
              fontFamily: 'Playfair Display SC, serif',
              color: '#D4AF37',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {item.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-sm mb-3"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textShadow: '0 1px 5px rgba(0,0,0,0.8)',
            }}
          >
            {item.subtitle}
          </p>

          {/* Stats */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 mb-3"
            >
              {item.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-lg font-bold"
                    style={{ color: '#F5D76E' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#D4AF37',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Screen reflection effect */}
        <div
          className="absolute inset-0 z-15 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.08) 0%,
              transparent 40%,
              transparent 60%,
              rgba(255, 255, 255, 0.02) 100%
            )`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default CurvedVideoCard;
