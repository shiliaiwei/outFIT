import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono, Kantumruy_Pro } from "next/font/google";
import "./globals.css";

const outfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const khmerFont = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-khmer",
});

export const metadata: Metadata = {
  title: "OutFIT — Haute Quiet Luxury Atelier & Storefront",
  description: "Quiet luxury tailoring, Normandy flax overshirts, and high-fashion ready-to-wear essentials.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfitFont.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${khmerFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#C84428] selection:text-white">
        {children}
      </body>
    </html>
  );
}
