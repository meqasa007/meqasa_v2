import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";

// Google Fonts
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans", // CSS variable for the sans-serif font
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono", // CSS variable for the monospace font
});
