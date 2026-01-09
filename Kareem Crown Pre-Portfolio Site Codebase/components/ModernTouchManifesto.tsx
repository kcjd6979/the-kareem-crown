"use client";

import { motion } from 'framer-motion';

const ModernTouchManifesto = () => {
  const textBlocks = [
    {
      title: "The Reality Check",
      content: "You didn't build this business to spend your nights fighting algorithms or drowning in digital noise. You built it to lead. But right now, the rules are changing faster than you can adapt, and hustle alone isn't cutting through the fog. You're not here for more content—you're here for Sovereignty. You're ready to stop being a spectator and start owning the narrative."
    },
    {
      title: "The Shift",
      content: "The digital world has been rebuilt. Search isn't just a list of links anymore—it's an ecosystem of AI assistants and shifting feeds. You can watch this shift from the sidelines, or you can own it. Most try to use AI as a magic wand—they end up with ChatGPT AI slop that's super easy for your competitors to ignore. We do it differently."
    },
    {
      title: "The Mechanism",
      content: "At MTM, we don't do hacks—we do the Modern Touch. We deploy The Forge: a specialized elite unit powered by our proprietary Midas OS. While you focus on the vision, Roman, Goldie, Nina, and Echo architect the strategy and iterate relentlessly to transform your raw ideas into a digital dynasty."
    },
    {
      title: "The Result",
      content: "You are the hero of this story. We are simply the guide providing the map and the weaponry. We turn your chaos into clarity and your attention into ROI. The old rules are burned. The new paradigm is yours to write."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen bg-black"
      style={{
        backgroundImage: 'url(/images/manifesto-poster.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Creates a parallax-like effect
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
            className="text-5xl font-bold uppercase text-[#d4af37] font-playfair"
            style={{ letterSpacing: '2px' }}
            variants={itemVariants}
        >
          The Modern Touch Manifesto
        </motion.h1>

        <div className="mt-12 space-y-10">
            {textBlocks.map((block, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <h2 className="text-2xl font-semibold text-[#d4af37] font-playfair">{block.title}</h2>
                    <p className="mt-4 text-lg text-[#e8e8e8] font-sans" style={{ lineHeight: 1.8 }}>{block.content}</p>
                </motion.div>
            ))}
        </div>

        <motion.div className="mt-16" variants={itemVariants}>
            <p className="text-lg text-[#e8e8e8]">The Palace is open. Don't just watch the shift.</p>
            <p className="text-[2rem] font-bold uppercase text-[#d4af37] mt-2" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'}}>Own it.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernTouchManifesto;
