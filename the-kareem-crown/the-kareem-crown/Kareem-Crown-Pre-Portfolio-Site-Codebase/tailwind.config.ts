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
        'obsidian': '#111111',
        'midas-gold': '#FFD700',
      },
      fontFamily: {
        'playfair': ['"Playfair Display SC"', 'serif'],
        'merriweather': ['"Merriweather"', 'serif'],
        'georgia': ['Georgia', 'serif'],
        'times': ['"Times New Roman"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      // Z-index scale for consistent layering
      zIndex: {
        'bg-base': '-50',
        'bg-particles': '-40',
        'ui-base': '10',
        'ui-overlay': '20',
        'ui-modal': '30',
        'ui-spotlight': '40',
      },
      // Performance optimizations
      willChange: {
        'transform': 'transform',
      },
      contain: {
        'layout': 'layout',
        'style': 'style',
        'paint': 'paint',
      },
    },
  },
  plugins: [],
};
export default config;
