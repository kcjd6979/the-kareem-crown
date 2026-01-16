'use client';

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { Spotlight } from '../components/Spotlight';
import { ArchitectSection } from '../components/ArchitectSection';
import { ArsenalSection } from '../components/ArsenalSection';
import { ConnectionSection } from '../components/ConnectionSection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-black overflow-x-hidden">
      <Spotlight />
      <HeroSection />
      <ArchitectSection />
      <ArsenalSection />
      <ConnectionSection />
      <Footer />
    </main>
  );
}
