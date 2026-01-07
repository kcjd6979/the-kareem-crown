"use client";

import { motion } from "framer-motion";

export const ArsenalSection = () => {
  const arsenalItems = [
    {
      title: "Synapse Agent",
      description: "AI-powered autonomous agent for complex task orchestration",
      icon: "🧠",
    },
    {
      title: "Midas Mailer", 
      description: "Automated email marketing system with AI personalization",
      icon: "📧",
    },
    {
      title: "Competitor Pulse",
      description: "Real-time market intelligence and competitor monitoring",
      icon: "📊",
    },
    {
      title: "Apex Predator",
      description: "Dominant presence in any digital ecosystem",
      icon: "🦁",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* OPEN GALAXY: No container boundaries */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-12 text-center">
            Arsenal of Proof
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {arsenalItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
};
