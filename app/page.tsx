import { ArchitectSection } from "@/components/ArchitectSection";
import { ArsenalSection } from "@/components/ArsenalSection";
import { ConnectionSection } from "@/components/ConnectionSection";
import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

export default function Home( ) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <HeroSection />
      <ArsenalSection />
      <ArchitectSection />
      <ConnectionSection />
      <Footer />
    </main>
  );
}