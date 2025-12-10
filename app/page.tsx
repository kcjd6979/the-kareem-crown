"use client";

import { Spotlight } from "@/components/Spotlight";
import HeroSection from "@/components/HeroSection";
import { ArsenalSection } from "@/components/ArsenalSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { ArchitectSection } from "@/components/ArchitectSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { ConnectionSection } from "@/components/ConnectionSection";
import CompanyLogoSection from "@/components/CompanyLogoSection";
import LogoStorySection from "@/components/LogoStorySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Global cursor glow effect with highest z-index */}
      <Spotlight className="pointer-events-none" />
      
      {/* Main content */}
      <main className="relative">
        <HeroSection />
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
