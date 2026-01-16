import type { Metadata } from "next";
import { Playfair_Display_SC, Merriweather } from "next/font/google";
import "./globals.css";
import RocketCursor from "@/components/RocketCursor";
import CursorToggle from "@/components/CursorToggle";
import dynamic from 'next/dynamic';

const AnimatedGalaxyBackground = dynamic(
  () => import('@/components/AnimatedGalaxyBackground'),
  { ssr: false }
);

const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: '--font-playfair',
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: "The Kareem Crown: An Arsenal of Proof",
  description: "The pre-portfolio of Kareem Daniel, an AI Systems Architect who orchestrates proprietary, automated systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${merriweather.variable} font-merriweather`}>
        <AnimatedGalaxyBackground />
        <RocketCursor />
        <CursorToggle />
        {children}
      </body>
    </html>
  );
}
