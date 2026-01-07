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
