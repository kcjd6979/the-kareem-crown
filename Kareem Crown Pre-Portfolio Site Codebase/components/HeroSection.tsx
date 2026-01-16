'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Planet = ({
  imageUrl,
  size,
  orbitRadius,
  duration,
  initialAngle = 0,
}: {
  imageUrl: string;
  size: number;
  orbitRadius: number;
  duration: number;
  initialAngle?: number;
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: size,
        height: size,
        transform: `rotate(${initialAngle}deg) translateX(${orbitRadius}px) rotate(-${initialAngle}deg)`,
      }}
      animate={{
        rotate: [initialAngle, initialAngle + 360],
      }}
      transition={{
        duration,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <motion.div
         style={{
            width: '100%',
            height: '100%',
         }}
         animate={{
            rotate: [-initialAngle, -(initialAngle + 360)]
         }}
         transition={{
            duration,
            ease: 'linear',
            repeat: Infinity,
         }}
      >
        <Image src={imageUrl} alt="planet" width={size} height={size} className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const planets = [
    { name: 'apex-orb', size: 80, orbitRadius: 200, duration: 15, initialAngle: 0 },
    { name: 'crown-orb', size: 100, orbitRadius: 300, duration: 20, initialAngle: 72 },
    { name: 'griff-starfire', size: 90, orbitRadius: 400, duration: 25, initialAngle: 144 },
    { name: 'midas-orb-1', size: 70, orbitRadius: 500, duration: 30, initialAngle: 216 },
    { name: 'syn-orb', size: 110, orbitRadius: 600, duration: 35, initialAngle: 288 },
  ];

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center relative bg-black">
      <div className="relative flex items-center justify-center w-[90vw] h-[90vh] md:w-[80vw] md:h-[80vh]">
        {/* Central Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="z-10"
        >
          <Image
            src="/kc-logo-black-crown.webp"
            alt="The Kareem Crown - Personal Brand Logo"
            width={400}
            height={400}
            priority
            className="w-[400px] h-[400px] drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]"
          />
        </motion.div>

        {/* Orbiting Planets */}
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            imageUrl={`/planets/planet-${planet.name}.webp`}
            size={planet.size}
            orbitRadius={planet.orbitRadius}
            duration={planet.duration}
            initialAngle={planet.initialAngle}
          />
        ))}
      </div>
    </section>
  );
};
