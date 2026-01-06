import HeroSection from "@/components/HeroSection";
import ArchitectSection from "@/components/ArchitectSection";
import ArsenalSection from "@/components/ArsenalSection";
import ConnectionSection from "@/components/ConnectionSection";
import Footer from "@/components/Footer";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Spotlight />
      <ArchitectSection />
      <ArsenalSection />
      <ConnectionSection />
      <Footer />
    </main>
  );
}
