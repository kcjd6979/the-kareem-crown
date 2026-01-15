
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedGalaxyBackground = () => {
  const [stars, setStars] = useState([]);
  const [comets, setComets] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 150 }).map(() => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      }));
      setStars(newStars);
    };

    const generateComets = () => {
      const newComet = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5 + 5,
      };
      setComets(prevComets => [...prevComets.slice(-4), newComet]);
    };

    generateStars();
    const cometInterval = setInterval(generateComets, 3000);

    return () => {
      clearInterval(cometInterval);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden bg-obsidian-black">
      {/* Static and twinkling stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-midas-gold-glossy"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: 'loop',
            delay: star.delay,
          }}
        />
      ))}

      {/* Flashing Comets */}
      <AnimatePresence>
        {comets.map(comet => (
          <motion.div
            key={comet.id}
            className="absolute rounded-full bg-chrome-white"
            style={{
              width: '2px',
              height: '2px',
            }}
            initial={{ x: `${comet.x}vw`, y: `${comet.y}vh`, opacity: 0 }}
            animate={{
              x: `${comet.x - 20}vw`,
              y: `${comet.y + 20}vh`,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: comet.duration, delay: comet.delay, ease: 'linear' }}
            exit={{ opacity: 0 }}
          >
            {/* Comet Tail */}
            <div className="absolute w-[100px] h-[1px] bg-gradient-to-r from-white to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Animated Particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--x': `${Math.random() * 100}vw`,
              '--y': `${Math.random() * 100}vh`,
              '--duration': `${Math.random() * 20 + 20}s`,
              '--delay': `${Math.random() * -40}s`,
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default AnimatedGalaxyBackground;
