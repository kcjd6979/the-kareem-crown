"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import MeetTheForge from "@/components/MeetTheForge";
import { ArsenalSection } from "@/components/ArsenalSection";
import { ArsenalCarousel } from "@/components/Arsenal/ArsenalCarousel";
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
          <ModernTouchManifesto />
          <ArchitectSection />
          <MeetTheForge />
          <CredentialsSection />
          <ArsenalCarousel />
          <ArsenalSection />
          <AIToolsSection />
          <CompanyLogoSection />
          <LogoStorySection />
          <ConnectionSection />
          <Footer />
        </main>
      </div>
    </ClientLayout>
  );
}
