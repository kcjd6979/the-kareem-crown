"use client";

import { Spotlight } from "@/components/Spotlight";
import { HeroSection } from "@/components/HeroSection";
import { ArsenalSection } from "@/components/ArsenalSection";
import { ArchitectSection } from "@/components/ArchitectSection";
import { ConnectionSection } from "@/components/ConnectionSection";
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
        <ArchitectSection />
        <ConnectionSection />
        <Footer />
      </main>
    </div>
  );
}
