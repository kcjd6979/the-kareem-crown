import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        {/* === START: SCORCHED EARTH FIX === */}
        {/* This div applies the background directly to the root, bypassing all conflicts. */}
        <div
          className="relative w-full min-h-screen"
          style={{
            backgroundColor: "#000000",
            backgroundImage: `
              radial-gradient(ellipse 50% 40% at 50% 40%, rgba(255, 255, 255, 0.06), transparent),
              radial-gradient(ellipse 80% 100% at 50% 100%, #1a1a1a, #000000)
            `,
          }}
        >
          {children}
        </div>
        {/* === END: SCORCHED EARTH FIX === */}
      </body>
    </html>
  );
}
