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
    // Create 50 floating particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.width = (Math.random() * 2 + 1) + 'px';
      particle.style.height = particle.style.width;
      document.body.appendChild(particle);
    }

    // ==================== CREATE TWINKLE STARS ====================
    const twinkleContainer = document.querySelector('.twinkle-stars');
    if (twinkleContainer) {
      const twinkleColors = ['gold', 'white', 'platinum', 'chrome'];
      for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = `twinkle-star ${twinkleColors[Math.floor(Math.random() * twinkleColors.length)]}`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        twinkleContainer.appendChild(star);
      }
    }

    // ==================== CREATE SHINE STARS ====================
    const shineContainer = document.querySelector('.shine-stars');
    if (shineContainer) {
      const shineColors = ['gold', 'platinum'];
      for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = `shine-star ${shineColors[Math.floor(Math.random() * shineColors.length)]}`;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 6 + 3) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        shineContainer.appendChild(star);
      }
    }

    // ==================== CREATE NEBULA CLOUDS ====================
    const nebulaContainer = document.querySelector('.nebula-cloud-container');
    if (nebulaContainer) {
      const nebulaTypes = ['gold', 'platinum', 'purple'];
      for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = `nebula-cloud ${nebulaTypes[Math.floor(Math.random() * nebulaTypes.length)]}`;
        cloud.style.left = (Math.random() * 100) + '%';
        cloud.style.top = (Math.random() * 100) + '%';
        cloud.style.width = (Math.random() * 400 + 200) + 'px';
        cloud.style.height = cloud.style.width;
        cloud.style.animationDelay = Math.random() * 30 + 's';
        nebulaContainer.appendChild(cloud);
      }
    }

    // ==================== SCROLL REVEAL OBSERVER ====================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
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
      
      {/* Nebula Clouds - Background glows */}
      <div className="nebula-glow nebula-cloud-container"></div>
      
      {/* Shooting Stars */}
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
      
      {/* Halley's Comet - Rare appearance */}
      <div className="haleys-comet"></div>
      
      {/* Twinkling Stars */}
      <div className="twinkle-stars"></div>
      
      {/* Shining Stars - Extra sparkle */}
      <div className="shine-stars"></div>
      
      {/* Global cursor glow effect with highest z-index */}
      <Spotlight className="pointer-events-none" />
      
      {/* Main content */}
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
