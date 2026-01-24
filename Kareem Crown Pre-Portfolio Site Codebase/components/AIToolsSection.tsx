"use client";

import { motion } from "framer-motion";

interface AITool {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  brandColor: string;
}

const aiTools: AITool[] = [
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's multimodal AI model",
    logo: "/images/gemini-logo.png",
    color: "from-blue-500 to-blue-700",
    brandColor: "#4285F4",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's conversational AI",
    logo: "/images/chatgpt-logo.png",
    color: "from-green-500 to-green-700",
    brandColor: "#10A37F",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's helpful AI assistant",
    logo: "/images/claude-logo.png",
    color: "from-orange-500 to-orange-700",
    brandColor: "#D4A574",
  },
  {
    id: "minimax",
    name: "MiniMax",
    description: "Full-stack AI development platform",
    logo: "/images/minimax-logo.png",
    color: "from-[#D4AF37] to-[#B6862C]",
    brandColor: "#D4AF37",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Advanced reasoning AI model",
    logo: "/images/deepseek-logo.png",
    color: "from-cyan-500 to-cyan-700",
    brandColor: "#06B6D4",
  },
  {
    id: "custom",
    name: "Custom AI",
    description: "Proprietary MTM AI systems",
    logo: "/images/custom-ai-logo.png",
    color: "from-[#D4AF37] to-[#B6862C]",
    brandColor: "#D4AF37",
  },
];

export const AIToolsSection = () => {
  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-transparent overflow-hidden">
      {/* Background Effects - Midas Gold only, no purple/teal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#B6862C]/3 rounded-full blur-3xl" />
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
          <span className="text-gradient-gold">Command Center</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Leveraging the most advanced AI systems to architect solutions that redefine what&apos;s possible.
        </p>
        <div className="section-divider mx-auto mt-8" />
      </motion.div>

      {/* AI Tools Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative p-8 rounded-2xl glass-card overflow-hidden group cursor-pointer"
          >
            {/* Background Gradient with Brand Color */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at top right, ${tool.brandColor}15, transparent 60%)`,
              }}
            />

            {/* Top Right Corner Accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top right, ${tool.brandColor}, transparent 70%)`,
                  transform: "rotate(45deg) translate(10%, -10%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Logo Container */}
              <div
                className="relative w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${tool.brandColor}30, ${tool.brandColor}10)`,
                  boxShadow: `0 0 30px ${tool.brandColor}20`,
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: tool.brandColor }}
                >
                  {tool.name.charAt(0)}
                </span>

                {/* Subtle Glow Ring */}
                <div
                  className="absolute inset-0 rounded-xl border"
                  style={{
                    borderColor: `${tool.brandColor}40`,
                  }}
                />
              </div>

              {/* Name & Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {tool.description}
              </p>

              {/* Active Indicator */}
              <div className="mt-6 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: tool.brandColor,
                    boxShadow: `0 0 10px ${tool.brandColor}`,
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="text-sm"
                  style={{ color: tool.brandColor }}
                >
                  Active in Arsenal
                </span>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                border: `1px solid ${tool.brandColor}30`,
                boxShadow: `0 0 30px ${tool.brandColor}10, inset 0 0 30px ${tool.brandColor}05`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Integration Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto mt-16 text-center p-8 rounded-2xl glass-card"
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#B6862C]/5" />
        </div>
        <div className="relative z-10">
          <p className="text-gray-300 text-lg leading-relaxed">
            <span className="text-gradient-gold font-semibold">
              Proprietary Integration:
            </span>{" "}
            These AI systems are orchestrated through custom MTM protocols, creating a
            unified intelligence that amplifies capabilities beyond what any single
            platform can achieve.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AIToolsSection;
