"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { FaLinkedin, FaYoutube, FaInstagram, FaTiktok, FaTwitter, FaFacebook } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { SiSubstack } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

export const ConnectionSection = () => {
  const socialLinks = [
    { icon: SiSubstack, href: "https://substack.com/home", label: "Substack" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/midas-touch-media-marketing/about/?viewAsMember=true", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://www.youtube.com/@midastouchmedia-24", label: "YouTube" },
    { icon: FaFacebook, href: "https://www.facebook.com/midas.touch.media.2024", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/midastouchmedia24/", label: "Instagram" },
    { icon: FaTwitter, href: "https://x.com/mtmedia2024", label: "X" },
    { icon: FaThreads, href: "https://www.threads.net/@midastouchmedia24", label: "Threads" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@midastouchmedia24", label: "TikTok" },
  ];

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-6 tracking-wide">
            Connect with The Architect
          </h2>
          <p className="text-xl text-gray-300 font-merriweather font-light tracking-wide">
            Let&apos;s Build the Future Together
          </p>
        </motion.div>

        {/* 3-Column Layout: Stack on Mobile, Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Left Column: The Architect (Dossier) */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-[80%] aspect-[3/4] rounded-xl overflow-hidden group backdrop-blur-sm">
              <Image
                src="/images/dossier.png"
                alt="Dossier"
                fill
                className="object-contain opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(255, 215, 0, 0.2))',
                }}
              />
            </div>
          </motion.div>

          {/* Center Column: The Creation (Robot) */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="h-[400px] w-full mb-8 relative">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>}>
                <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
              </Suspense>
              
              {/* MTM Logo Overlay on Robot Chest */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src="/images/mtm_logo.png"
                    alt="MTM Monogram Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.6))',
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                  style={{
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <social.icon 
                    size={24} 
                    className="text-[#D4AF37] group-hover:text-white transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" 
                  />
                  {/* Mac-like pop-out glow effect */}
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm scale-75 group-hover:scale-125 group-hover:blur-md"></div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: The Empire (MTM Logo) */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
             {/* Float animation using framer-motion since animate-bounce-slow is not custom defined */}
            <motion.div
              className="relative w-64 h-64 mix-blend-screen"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/mtm_logo.png"
                alt="MTM Logo"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

        </div>

        <style>{`
            .loader {
              width: 48px;
              height: 48px;
              border: 5px solid #FFF;
              border-bottom-color: #FFD700;
              border-radius: 50%;
              display: inline-block;
              box-sizing: border-box;
              animation: rotation 1s linear infinite;
            }
            @keyframes rotation {
              0% { transform: rotate(0deg ); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
      </div>
    </section>
   );
};
