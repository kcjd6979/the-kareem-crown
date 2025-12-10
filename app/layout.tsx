import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackgroundGradient from "@/components/BackgroundGradient";
import MidasParticles from "@/components/MidasParticles";
import { Spotlight } from "@/components/Spotlight";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Spotlight className="fixed inset-0 z-50 pointer-events-none" fill="rgba(255, 215, 0, 0.3)" />
        <BackgroundGradient />
        <MidasParticles />
        <main>{children}</main>
      </body>
    </html>
  );
}
