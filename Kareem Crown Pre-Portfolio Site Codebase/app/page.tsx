"use client";

import HeroSection from "@/components/HeroSection";
import ModernTouchManifesto from "@/components/ModernTouchManifesto";
import MeetTheForge from "@/components/MeetTheForge";
import { ArsenalSection } from "@/components/ArsenalSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { ArchitectSection } from "@/components/ArchitectSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import LogoStorySection from "@/components/LogoStorySection";
import { ConnectionSection } from "@/components/ConnectionSection";
import CompanyLogoSection from "@/components/CompanyLogoSection";
import { Footer } from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      {/* GalaxyBackground is handled by ClientLayout/global styles as the foundational layer */}
      <div className="relative min-h-screen">
        <main className="relative">
          {/* 2. HeroSection — The Solar System */}
          <HeroSection />

          {/* 3. ModernTouchManifesto — MODERN TOUCH MANIFESTO */}
          <ModernTouchManifesto />

          {/* 4. MeetTheForge — Meet The Forge */}
          <MeetTheForge />

          {/* 5. ArsenalSection — Armory */}
          <ArsenalSection />

          {/* 6. AIToolsSection — Command Center */}
          <AIToolsSection />

          {/* 7. ArchitectSection — Architect */}
          <ArchitectSection />

          {/* 8. CredentialsSection — Architect's Foundation */}
          <CredentialsSection />

          {/* 9. LogoStorySection */}
          <LogoStorySection />

          {/* 10. ConnectionSection */}
          <ConnectionSection />

          {/* 11. CompanyLogoSection */}
          <CompanyLogoSection />

          {/* 12. Footer */}
          <Footer />
        </main>
      </div>
    </ClientLayout>
  );
}
