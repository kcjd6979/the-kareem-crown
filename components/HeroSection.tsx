"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
{/* Full-Color Logo Image */}
<Image
  src="/kareem-logo.webp"
  alt="The personal brand logo of Kareem Daniel"
  width={400}
  height={500}
  priority
/>

        <h1 className="text-6xl md:text-8xl font-bold mt-6">
          The Kareem Crown
        </h1>
        <p className="text-lg md:text-xl text-white/80 mt-4">
          An Arsenal of Proof
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
