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
    title: "High School Diploma",
    institution: "Your High School Name",
    year: "Year",
    icon: "🎓",
    color: "amber",
  },
  {
    id: 2,
    title: "Bachelor's Degree",
    institution: "Your First College",
    year: "Year - Year",
    icon: "🎓",
    color: "blue",
  },
  {
    id: 3,
    title: "Advanced Studies",
    institution: "Your Second College",
    year: "Year - Year",
    icon: "🎓",
    color: "purple",
  },
  {
    id: 4,
    title: "Professional Certification",
    institution: "Certification Name",
    year: "Year",
    icon: "📜",
    color: "teal",
  },
  {
    id: 5,
    title: "Specialized Training",
    institution: "Training Program",
    year: "Year",
    icon: "🎯",
    color: "orange",
  },
];

export const CredentialsSection = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      amber: { bg: "from-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "rgba(251, 245, 183, 0.3)" },
      blue: { bg: "from-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", glow: "rgba(59, 130, 246, 0.3)" },
      purple: { bg: "from-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", glow: "rgba(168, 85, 247, 0.3)" },
      teal: { bg: "from-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", glow: "rgba(45, 212, 191, 0.3)" },
      orange: { bg: "from-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", glow: "rgba(249, 115, 22, 0.3)" },
    };
    return colors[color] || colors.amber;
  };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-amber-500/3 to-transparent" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-6xl text-white mb-4">
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
                className="absolute inset-0 rounded-xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top, ${colors.glow}, transparent 70%)`,
                  opacity: hoveredItem === item.id ? 0.5 : 0,
                }}
              />

              {/* Top Colored Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl transition-all duration-300 ${
                  hoveredItem === item.id ? "w-full" : "w-1/2"
                }`}
                style={{
                  background: colors.text.replace("text-", ""),
                  boxShadow: `0 0 10px ${colors.glow}`,
                }}
              />

              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center text-2xl`}
                  style={{
                    boxShadow: hoveredItem === item.id ? `0 0 20px ${colors.glow}` : "none",
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
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
                  className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full"
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

      {/* Stats/Highlights */}
      <div className="relative max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "5+", label: "Years Experience", color: "#FBF5B7" },
          { value: "50+", label: "Projects Completed", color: "#A855F7" },
          { value: "100%", label: "Client Satisfaction", color: "#2DD4BB" },
          { value: "24/7", label: "AI Operations", color: "#BF953F" },
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
              className="text-4xl md:text-5xl font-bold mb-3 font-playfair"
              style={{
                color: stat.color,
                textShadow: hoveredItem === index + 1 ? `0 0 30px ${stat.color}40` : "none",
                transition: "text-shadow 0.3s ease",
              }}
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
