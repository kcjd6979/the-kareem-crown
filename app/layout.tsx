import type { Metadata } from "next";
import { Playfair_Display_SC, Merriweather } from "next/font/google";
import BackgroundGradient from "@/components/BackgroundGradient";
import MidasParticles from "@/components/MidasParticles";
import { Spotlight } from "@/components/Spotlight";
import "./globals.css";

const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "The Kareem Crown",
  description: "An Arsenal of Proof",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${playfair.variable} font-sans bg-obsidian text-white antialiased`}>
        <Spotlight />
        <BackgroundGradient />
        <MidasParticles />
        <main>{children}</main>
      </body>
    </html>
  );
}
