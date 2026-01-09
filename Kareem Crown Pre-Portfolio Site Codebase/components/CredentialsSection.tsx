"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  year: string;
  icon: string;
  color: string;
}

const credentialsData: EducationItem[] = [
  {
    id: 1,
    title: "Maestro University",
    institution: "Advanced AI System Architecture",
    year: "2023-2025",
    icon: "🎓",
    color: "gold",
  },
  {
    id: 2,
    title: "Full Sail University",
    institution: "Bachelor of Science in Web Design & Development",
    year: "2015-2018",
    icon: "🎓",
    color: "silver",
  },
  {
    id: 3,
    title: "Oracle University",
    institution: "Certified Professional, Java SE 8 Programmer",
    year: "2019",
    icon: "📜",
    color: "chrome",
  },
  {
    id: 4,
    title: "Google Certified",
    institution: "Professional Cloud Architect",
    year: "2022",
    icon: "📜",
    color: "gold",
  },
  {
    id: 5,
    title: "DeepLearning.AI",
    institution: "AI for Everyone",
    year: "2021",
    icon: "🎯",
    color: "silver",
  },
];

export const CredentialsSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; }> = {
      gold: {
        bg: "from-midas-gold-glossy/10",
        border: "border-midas-gold-glossy/30",
        text: "text-midas-gold-glossy",
      },
      silver: {
        bg: "from-metallic-silver/10",
        border: "border-metallic-silver/30",
        text: "text-metallic-silver",
      },
      chrome: {
        bg: "from-hi-gloss-chrome/10",
        border: "border-hi-gloss-chrome/30",
        text: "text-hi-gloss-chrome",
      },
    };
    return colors[color] || colors.gold;
  };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-gradient-to-b from-obsidian-black via-jet-black-soft/50 to-obsidian-black overflow-hidden">
      {/* Background Effects - Midas Gold only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-midas-gold-glossy/3 to-transparent" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-6xl text-chrome-white mb-4">
          The Architect&apos;s <span className="text-gradient-gold">Foundation</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Building on a foundation of knowledge, certifications, and continuous learning.
        </p>
        <div className="section-divider mx-auto mt-8" />
      </motion.div>

      {/* Credentials Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {credentialsData.map((item, index) => {
          const colors = getColorClasses(item.color);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-xl glass-card cursor-pointer group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 rounded-xl transition-opacity duration-300 bg-gradient-radial ${colors.bg} to-transparent`}
                style={{
                  opacity: hoveredItem === item.id ? 0.5 : 0,
                }}
              />

              {/* Top Colored Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl transition-all duration-300 ${
                  hoveredItem === item.id ? "w-full" : "w-1/2"
                } ${colors.text.replace("text-", "bg-")}`}
              />

              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} to-transparent flex items-center justify-center text-2xl`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-lg font-bold text-chrome-white mb-2 group-hover:${colors.text} transition-colors`}>
                {item.title}
              </h3>

              {/* Institution */}
              <p className="text-gray-400 text-sm mb-2">{item.institution}</p>

              {/* Year */}
              <p className={`${colors.text} text-sm font-medium`}>{item.year}</p>

              {/* Decorative Corner */}
              <div
                className={`absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <div
                  className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${colors.bg} to-transparent rounded-tl-full`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative Line */}
      <div className="relative max-w-4xl mx-auto mt-16">
        <div className="section-divider" />
      </div>

      {/* Stats/Highlights - Using Official MTM Colors Only */}
      <div className="relative max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "5+", label: "Years Experience", color: "text-midas-gold-glossy" },
          { value: "50+", label: "Projects Completed", color: "text-metallic-silver" },
          { value: "100%", label: "Client Satisfaction", color: "text-midas-gold-matte" },
          { value: "24/7", label: "AI Operations", color: "text-hi-gloss-chrome" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center group"
          >
            <div
              className={`text-4xl md:text-5xl font-bold mb-3 font-playfair ${stat.color}`}
            >
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
