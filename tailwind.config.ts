
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
        'obsidian': '#111111',
        'midas-gold': '#FFD700',
      },
      fontFamily: {
        'display': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-merriweather)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
