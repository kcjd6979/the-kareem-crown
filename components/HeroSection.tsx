"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HeroSection = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const [sheenPosition, setSheenPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const rotateY = (mouseX - centerX) / (rect.width / 2) * 15; // Max rotation 15 degrees
        const rotateX = -(mouseY - centerY) / (rect.height / 2) * 15; // Max rotation 15 degrees

        setRotation({ rotateX, rotateY });

        // For the sheen, move it in the opposite direction
        const sheenX = -(mouseX - centerX) / (rect.width / 2) * 100;
        const sheenY = -(mouseY - centerY) / (rect.height / 2) * 100;
        setSheenPosition({ x: sheenX, y: sheenY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center justify-center"
      >
        <div
          ref={logoRef}
          className="relative w-[85%] md:w-[70%] max-w-5xl"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <motion.div
            style={{
              transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
              transition: "transform 0.1s ease-out",
            }}
            className="relative w-full filter drop-shadow-[0_20px_50px_rgba(179,149,102,0.2)]"
          >
            <Image
              src="/kareem-logo.webp"
              alt="The personal brand logo of Kareem Daniel"
              width={600}
              height={750}
              priority
              className="w-full h-auto mix-blend-screen" // Added mix-blend-screen
            />
            {/* Midas Sheen Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${50 + sheenPosition.x}% ${50 + sheenPosition.y}%, rgba(255, 255, 255, 0.2), transparent 40%)`,
                mixBlendMode: 'soft-light',
              }}
            />
          </motion.div>
        </div>

        <h1 className="text-center text-6xl md:text-8xl font-bold mt-8 text-white font-playfair">
          The Kareem Crown
        </h1>

        <p className="text-center text-lg md:text-xl text-white/80 mt-4">
          An Arsenal of Proof
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
