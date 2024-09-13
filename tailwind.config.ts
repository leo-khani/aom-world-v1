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
      fontFamily: {
        sen: ['var(--font-sen)'],
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
