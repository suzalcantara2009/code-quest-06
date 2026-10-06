import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          dark: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          accent: '#6366f1',
          gold: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
};

export default config;
