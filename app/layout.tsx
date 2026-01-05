import type { Metadata } from "next";
import { Inter } from "next/font/google";
import OptimizedBackground from "@/components/OptimizedBackground";
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
        <OptimizedBackground />
        <Spotlight className="fixed inset-0 pointer-events-none" color="#D4AF37" opacity={0.25} size={700} />
        <main>{children}</main>
      </body>
    </html>
  );
}
