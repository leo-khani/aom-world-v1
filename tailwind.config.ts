import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
      },
      gridColumnEnd: {
        '14': '14',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        'playfair-display': ['var(--font-playfair-display)', 'serif'],
        'nycd': ['var(--font-nycd)', 'cursive'],
        'sen': ['var(--font-sen)', 'sans-serif'],
      },
      colors: {
        'text': '#ffffff',
        'background': '#0e0e10',
        'primary': '#0f0f11',
        'secondary': '#17171a',
        'accent': '#EF233C',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
