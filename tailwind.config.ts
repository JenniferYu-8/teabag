import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,ts,jsx,tsx}", // Include all TypeScript files in src directory
  ],  
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      clipPath: {
        'trapezoid': 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
