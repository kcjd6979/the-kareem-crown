import type { Metadata } from "next";
import { Inter, Playfair_Display_SC, Merriweather } from "next/font/google";
import BackgroundGradient from "@/components/BackgroundGradient";
import MidasParticles from "@/components/MidasParticles";
import { Spotlight } from "@/components/Spotlight";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display_SC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-playfair"
});
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather"
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
      <body className={`${inter.variable} ${playfair.variable} ${merriweather.variable} font-sans`}>
        <Spotlight className="fixed inset-0 z-50 pointer-events-none" />
        <BackgroundGradient />
        <MidasParticles />
        <main>{children}</main>
      </body>
    </html>
  );
}
