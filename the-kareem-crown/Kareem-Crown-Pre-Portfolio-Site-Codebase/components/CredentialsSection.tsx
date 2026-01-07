"use client";

import { motion } from "framer-motion";

export const CredentialsSection = () => {
  const credentials = [
    {
      title: "AI Systems Architect",
      organization: "MTM Ecosystem",
      period: "Present",
    },
    {
      title: "Senior Developer", 
      organization: "Tech Enterprise",
      period: "2020-2023",
    },
    {
      title: "Full Stack Engineer",
      organization: "Digital Agency",
      period: "2018-2020",
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
            Credentials
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {credentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{cred.title}</h3>
                  <p className="text-yellow-500">{cred.organization}</p>
                </div>
                <div className="text-white/60">{cred.period}</div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
        
      </div>
    </section>
  );
};
