"tailwind.config.ts"

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'midas-gold-glossy': 'var(--midas-gold-glossy)',
        'obsidian-black': 'var(--obsidian-black)',
        'chrome-white': 'var(--chrome-white)',
        'midas-gold-matte': 'var(--midas-gold-matte)',
        'jet-black-soft': 'var(--jet-black-soft)',
        'metallic-silver': 'var(--metallic-silver)',
        'hi-gloss-chrome': 'var(--hi-gloss-chrome)',
      },
      fontFamily: {
        'playfair': ['"Playfair Display SC"', 'serif'],
        'merriweather': ['"Merriweather"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
