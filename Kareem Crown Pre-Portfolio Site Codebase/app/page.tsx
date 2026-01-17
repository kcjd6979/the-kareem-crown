"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import MeetTheForge from "@/components/MeetTheForge";
import { ArsenalSection } from "@/components/ArsenalSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { ArchitectSection } from "@/components/ArchitectSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { ConnectionSection } from "@/components/ConnectionSection";
import CompanyLogoSection from "@/components/CompanyLogoSection";
import LogoStorySection from "@/components/LogoStorySection";
import ModernTouchManifesto from "@/components/ModernTouchManifesto";
import { Footer } from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      <div className="relative min-h-screen">
        {/* Main content */}
        <main className="relative">
          <HeroSection />
          <MeetTheForge />

          {/* Modern Touch Manifesto - About Us Section */}
          <ModernTouchManifesto />

          {/* New Arsenal 3D Video Carousel */}
          <ArsenalCarousel />

          <CredentialsSection />
          <ArchitectSection />
          <MeetTheForge />
          <CompanyLogoSection />
          <CredentialsSection />
          <ArsenalSection />
          <AIToolsSection />
          <LogoStorySection />
          <ConnectionSection />
          <Footer />
        </main>
      </div>
    </ClientLayout>
  );
}
