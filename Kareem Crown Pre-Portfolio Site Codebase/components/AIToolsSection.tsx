"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AITool {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
}

const aiTools: AITool[] = [
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's multimodal AI model",
    logo: "/images/gemini-logo.png",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's conversational AI",
    logo: "/images/chatgpt-logo.png",
    color: "from-green-500 to-green-700",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's helpful AI assistant",
    logo: "/images/claude-logo.png",
    color: "from-orange-500 to-orange-700",
  },
  {
    id: "minimax",
    name: "MiniMax",
    description: "Full-stack AI development platform",
    logo: "/images/minimax-logo.png",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Advanced reasoning AI model",
    logo: "/images/deepseek-logo.png",
    color: "from-cyan-500 to-cyan-700",
  },
  {
    id: "custom",
    name: "Custom AI",
    description: "Proprietary MTM AI systems",
    logo: "/images/custom-ai-logo.png",
    color: "from-amber-500 to-amber-700",
  },
];

export const AIToolsSection = () => {
  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-black">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
          Arsenal of Intelligence
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Leveraging the most advanced AI systems to architect solutions that redefine what's possible.
        </p>
      </motion.div>

      {/* AI Tools Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md overflow-hidden group"
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Logo Container */}
              <div
                className={`w-16 h-16 rounded-xl mb-6 bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg`}
              >
                {/* Placeholder for logo - will show text if image missing */}
                <span className="text-white font-bold text-xl">
                  {tool.name.charAt(0)}
                </span>
              </div>

              {/* Name & Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {tool.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-6 flex items-center text-amber-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                <span>Active in Arsenal</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${tool.color} opacity-20 transform rotate-45 translate-x-10 -translate-y-10`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-16 text-center p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5"
      >
        <p className="text-gray-300 text-lg leading-relaxed">
          <span className="text-amber-400 font-semibold">
            Proprietary Integration:
          </span>{" "}
          These AI systems are orchestrated through custom MTM protocols, creating a
          unified intelligence that amplifies capabilities beyond what any single
          platform can achieve.
        </p>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    </section>
  );
};

export default AIToolsSection;
