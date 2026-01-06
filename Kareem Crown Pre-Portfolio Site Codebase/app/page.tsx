// The Kareem Crown: A Digital Throne Room of an AI Systems Architect
// V.2.0

'use client';

import React, { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { Spotlight } from '../components/Spotlight';
import { ArchitectSection } from '../components/ArchitectSection';
import { ArsenalSection } from '../components/ArsenalSection';
import { ConnectionSection } from '../components/ConnectionSection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-black overflow-x-hidden">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white fixed top-0 left-0 w-full z-10 p-4" style={{ fontFamily: '"Playfair Display SC", serif' }}>The Kareem Crown</h1>
      <Spotlight />
      <HeroSection />
      <ArchitectSection />
      <ArsenalSection />
      <ConnectionSection />
      <Footer />
    </main>
  );
}
