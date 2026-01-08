"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Arsenal Video Data
interface ArsenalVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

const arsenalVideos: ArsenalVideo[] = [
  {
    id: "ai-systems",
    title: "AI Systems Architecture",
    description: "Building autonomous AI infrastructure",
    thumbnail: "/images/arsenal-ai-systems.webp",
    videoUrl: "/videos/ai-systems-architecture.mp4",
    duration: "2:45",
  },
  {
    id: "autonomous-dev",
    title: "Full-Stack Development",
    description: "Self-replicating code systems",
    thumbnail: "/images/arsenal-autonomous-dev.webp",
    videoUrl: "/videos/autonomous-development.mp4",
    duration: "3:12",
  },
  {
    id: "performance",
    title: "Performance Engineering",
    description: "Lighthouse scores of 95+",
    thumbnail: "/images/arsenal-performance.webp",
    videoUrl: "/videos/performance-engineering.mp4",
    duration: "1:58",
  },
];

export const ArsenalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % arsenalVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % arsenalVideos.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + arsenalVideos.length) % arsenalVideos.length);
  };

  const currentVideo = arsenalVideos[currentIndex];

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
          The Arsenal
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Strategic weapons in the war for digital dominance.
        </p>
      </motion.div>

      {/* Main Carousel Container */}
      <div className="max-w-7xl mx-auto relative">
        {/* Video Display Area */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-md">
          {/* Thumbnail/Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-black to-purple-900/20">
            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Center Play Button */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center backdrop-blur-md"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-amber-400" />
                ) : (
                  <Play className="w-10 h-10 text-amber-400 ml-1" />
                )}
              </motion.button>
            </motion.div>

            {/* Video Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">
                  {currentVideo.title}
                </h3>
                <p className="text-gray-400">{currentVideo.description}</p>
              </motion.div>
            </div>

            {/* Duration Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
              <span className="text-amber-400 text-sm font-medium">
                {currentVideo.duration}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center backdrop-blur-md z-20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center backdrop-blur-md z-20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {arsenalVideos.map((video, index) => (
            <motion.button
              key={video.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === index
                  ? "border-amber-500 shadow-lg shadow-amber-500/30"
                  : "border-white/10 opacity-50 hover:opacity-100"
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-amber-400 font-bold text-xs">
                  {video.id.split("-")[0].toUpperCase()}
                </span>
              </div>

              {/* Active Indicator */}
              {currentIndex === index && (
                <motion.div
                  layoutId="activeThumbnail"
                  className="absolute inset-0 border-2 border-amber-500 rounded-lg"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {arsenalVideos.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-amber-500"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auto-play Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className={`fixed bottom-24 right-6 z-[99999] p-3 rounded-full transition-all duration-300 ${
          isAutoPlaying
            ? "bg-amber-500/20 border border-amber-400/50 text-amber-400"
            : "bg-white/5 border border-white/10 text-white/50"
        }`}
        style={{
          backdropFilter: "blur(20px)",
        }}
      >
        {isAutoPlaying ? (
          <Pause size={20} />
        ) : (
          <Play size={20} />
        )}
      </motion.button>
    </section>
  );
};

export default ArsenalCarousel;
