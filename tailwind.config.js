/** @type {import('tailwindcss').Config} */
// import {type config} from 'tailwindcss/types/config';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        brand: {
          primary: "hsl(var(--brand-primary))",
          "primary-dark": "hsl(var(--brand-primary-dark))",
          "primary-light": "hsl(var(--brand-primary-light))",
          secondary: "hsl(var(--brand-secondary))",
          "secondary-light": "hsl(var(--brand-secondary-light))",
          "secondary-dark": "hsl(var(--brand-secondary-dark))",
          accent: "hsl(var(--brand-accent))",
          gray: "hsl(var(--brand-gray))",
          blue: "hsl(var(--brand-blue))",
          "blue-light": "hsl(var(--brand-blue-light))",
          "blue-dark": "hsl(var(--brand-blue-dark))",
          muted: "hsl(var(--brand-muted))",
          "muted-dark": "hsl(var(--brand-muted-dark))",
          border: "hsl(var(--brand-border))",
          "border-light": "hsl(var(--brand-border-light))",
          "badge-muted": "hsl(var(--brand-badge-muted))",
          "badge-primary": "hsl(var(--brand-badge-primary))",
          "badge-verified": "hsl(var(--brand-badge-verified))",
          "badge-ongoing": "hsl(var(--brand-badge-ongoing))",
          "badge-completed": "hsl(var(--brand-badge-completed))",
        },
      },
      boxShadow: {
        elegant: "0 10px 30px -5px rgba(0, 0, 0, 0.15)",
        "elegant-sm": "0 10px 30px -5px rgba(0, 0, 0, 0.105)",
      },
      animation: {
        marquee: "marquee var(--duration, 50s) linear infinite",
        scroll:
          "scroll var(--animation-duration, 60s) var(--animation-direction, forwards) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        marquee: {
          to: {
            transform: "translateX(-50%)",
          },
        },
        scroll: {
          to: {
            transform: "translateX(-50%)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
