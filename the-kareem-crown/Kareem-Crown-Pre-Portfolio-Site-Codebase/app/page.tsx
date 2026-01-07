"use client";

import { useEffect } from "react";
import { Spotlight } from "@/components/Spotlight";
import HeroSection from "@/components/HeroSection";
import MeetTheForge from "@/components/MeetTheForge";
import { ArsenalSection } from "@/components/ArsenalSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { ArchitectSection } from "@/components/ArchitectSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { ConnectionSection } from "@/components/ConnectionSection";
import CompanyLogoSection from "@/components/CompanyLogoSection";
import LogoStorySection from "@/components/LogoStorySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // ==================== PARTICLE SYSTEM ====================
    // Subtle ambient particles - like cosmic dust
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.width = (Math.random() * 1.5 + 0.5) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      document.body.appendChild(particle);
    }

    // ==================== TWINKLE STARS - The Galaxy's Heartbeat ====================
    // Scientific principle: Rhythmic patterns mimic biological systems
    const twinkleContainer = document.querySelector('.twinkle-stars');
    if (twinkleContainer) {
      const twinkleColors = ['gold', 'white', 'platinum', 'chrome'];
      const positions = [];
      
      // Create 25 stars with purposeful distribution
      for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        const color = twinkleColors[Math.floor(Math.random() * twinkleColors.length)];
        star.className = `twinkle-star ${color}`;
        
        // Strategic positioning for visual flow
        let left, top;
        do {
          left = Math.random() * 100;
          top = Math.random() * 100;
        } while (positions.some(p => Math.abs(p.left - left) < 5 && Math.abs(p.top - top) < 5));
        
        positions.push({ left, top });
        
        star.style.left = left + '%';
        star.style.top = top + '%';
        star.style.width = (Math.random() * 2 + 1.5) + 'px';
        star.style.height = star.style.width;
        
        // Vary animation to create breathing rhythm
        const duration = Math.random() * 3 + 4;
        const delay = Math.random() * 5;
        star.style.animationDelay = delay + 's';
        star.style.animationDuration = duration + 's';
        
        twinkleContainer.appendChild(star);
      }
    }

    // ==================== SHINE STARS - Moments of Clarity ====================
    // Psychological principle: Peaks of attention draw the eye
    const shineContainer = document.querySelector('.shine-stars');
    if (shineContainer) {
      const shineColors = ['gold', 'platinum'];
      const shinePositions = [];
      
      // 10 shine stars - fewer, more impactful
      for (let i = 0; i < 10; i++) {
        const star = document.createElement('div');
        const color = shineColors[Math.floor(Math.random() * shineColors.length)];
        star.className = `shine-star ${color}`;
        
        let left, top;
        do {
          left = Math.random() * 100;
          top = Math.random() * 100;
        } while (shinePositions.some(p => Math.abs(p.left - left) < 8 && Math.abs(p.top - top) < 8));
        
        shinePositions.push({ left, top });
        
        star.style.left = left + '%';
        star.style.top = top + '%';
        star.style.width = (Math.random() * 4 + 3) + 'px';
        star.style.height = star.style.width;
        
        // Slower, more meditative shine rhythm
        const duration = Math.random() * 2 + 3.5;
        const delay = Math.random() * 4;
        star.style.animationDelay = delay + 's';
        star.style.animationDuration = duration + 's';
        
        shineContainer.appendChild(star);
      }
    }

    // ==================== NEBULA CLOUDS - Emotional Atmosphere ====================
    // Creates subconscious emotional texture
    const nebulaContainer = document.querySelector('.nebula-cloud-container');
    if (nebulaContainer) {
      const nebulaTypes = ['gold', 'platinum', 'purple'];
      for (let i = 0; i < 4; i++) {
        const cloud = document.createElement('div');
        const type = nebulaTypes[Math.floor(Math.random() * nebulaTypes.length)];
        cloud.className = `nebula-cloud ${type}`;
        
        cloud.style.left = (Math.random() * 100) + '%';
        cloud.style.top = (Math.random() * 100) + '%';
        cloud.style.width = (Math.random() * 350 + 150) + 'px';
        cloud.style.height = cloud.style.width;
        
        // Very slow, almost imperceptible drift
        cloud.style.animationDelay = Math.random() * 25 + 's';
        cloud.style.animationDuration = (Math.random() * 10 + 20) + 's';
        
        nebulaContainer.appendChild(cloud);
      }
    }

    // ==================== SCROLL REVEAL - The Hero's Journey ====================
    // Each section represents a phase of transformation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll, .card-reveal').forEach(el => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      observer.disconnect();
      document.querySelectorAll('.particle').forEach(p => p.remove());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 🌟 ANIMATED STARFIELD LAYERS */}
      
      {/* Nebula Clouds - Subtle emotional atmosphere */}
      <div className="nebula-glow nebula-cloud-container"></div>
      
      {/* Shooting Stars - Moments of inspiration */}
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
      
      {/* Halley's Comet - Rare transcendent moments */}
      <div className="haleys-comet"></div>
      
      {/* Twinkling Stars - The galaxy's heartbeat */}
      <div className="twinkle-stars"></div>
      
      {/* Shining Stars - Peaks of clarity */}
      <div className="shine-stars"></div>
      
      {/* Global cursor glow - guides the journey */}
      <Spotlight className="pointer-events-none" />
      
      {/* Main content - The Hero's Journey unfolds */}
      <main className="relative">
        <HeroSection />
        <MeetTheForge />
        <ArsenalSection />
        <CredentialsSection />
        <ArchitectSection />
        <AIToolsSection />
        <ConnectionSection />
        <CompanyLogoSection />
        <LogoStorySection />
        <Footer />
      </main>
    </div>
  );
}
