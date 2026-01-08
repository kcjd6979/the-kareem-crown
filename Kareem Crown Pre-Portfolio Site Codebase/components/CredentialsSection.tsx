"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  year: string;
  icon: string;
}

const credentialsData: EducationItem[] = [
  {
    id: 1,
    title: "High School Diploma",
    institution: "Your High School Name",
    year: "Year",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Bachelor's Degree",
    institution: "Your First College",
    year: "Year - Year",
    icon: "🎓",
  },
  {
    id: 3,
    title: "Advanced Studies",
    institution: "Your Second College",
    year: "Year - Year",
    icon: "🎓",
  },
  {
    id: 4,
    title: "Professional Certification",
    institution: "Certification Name",
    year: "Year",
    icon: "📜",
  },
  {
    id: 5,
    title: "Specialized Training",
    institution: "Training Program",
    year: "Year",
    icon: "🎯",
  },
];

export const CredentialsSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
          The Architect&apos;s Foundation
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Building on a foundation of knowledge, certifications, and continuous learning.
        </p>
      </motion.div>

      {/* Credentials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {credentialsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300 group"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Hover Glow Effect */}
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                hoveredItem === item.id ? "opacity-100" : ""
              }`}
            />

            {/* Icon */}
            <div className="text-4xl mb-4">{item.icon}</div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              {item.title}
            </h3>

            {/* Institution */}
            <p className="text-gray-400 text-sm mb-2">{item.institution}</p>

            {/* Year */}
            <p className="text-amber-500 text-sm font-medium">{item.year}</p>

            {/* Decorative Element */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-500/50 group-hover:bg-amber-400 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Decorative Line */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* Stats/Highlights */}
      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "5+", label: "Years Experience" },
          { value: "50+", label: "Projects Completed" },
          { value: "100%", label: "Client Satisfaction" },
          { value: "24/7", label: "AI Operations" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CredentialsSection;
