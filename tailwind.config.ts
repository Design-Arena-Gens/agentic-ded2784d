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
        'cyber-blue': '#00d9ff',
        'deep-blue': '#0a1929',
        'neon-cyan': '#00fff9',
      },
    },
  },
  plugins: [],
};
export default config;
