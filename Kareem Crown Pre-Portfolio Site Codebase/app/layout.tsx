"layout.tsx"

import type { Metadata } from "next";
import { Playfair_Display_SC, Merriweather } from "next/font/google";
import "./globals.css";

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
  title: "Kareem Daniel | AI Systems Architect & Founder of Midas Touch Media",
  description: "Kareem (KC) Daniel helps SMEs achieve unstoppable growth by architecting AI systems that automate leads, boost revenue, and streamline operations. Explore the portfolio of a forward-thinking AI strategist.",
  keywords: "Kareem Daniel, AI Systems Architect, Midas Touch Media, SME Growth, AI Automation, Lead Generation, Revenue Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${merriweather.variable} font-merriweather`}>
        {children}
      </body>
    </html>
  );
}
