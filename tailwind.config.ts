/*
 * @Author: kasuie
 * @Date: 2024-05-20 19:31:13
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-06 10:40:20
 * @Description:
 */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "mio-pulse": {
          "0%": { opacity: "100" },
          "50%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        "mio-rotation": {
          "0%": { transform: "rotateZ(0deg)" },
          "100%": { transform: "rotateZ(360deg)" },
        },
        "mio-floating": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0px)" }
        }
      },
      transitionTimingFunction: {
        "mio-tooltip": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      boxShadow: {
        "mio-link":
          "0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15)",
      },
      colors: {
        "mio-main": "hsl(var(--mio-background))",
        "mio-bg": "rgba(var(--mio-bg))",
        "mio-content": "rgba(var(--mio-text-default))",
      },
      textColor: {
        "mio-text-color": "rgba(var(--mio-text-color))",
        "mio-text-default": "hsl(var(--mio-foreground))",
      }
    },
  },
  plugins: [],
};
export default config;
