import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/landing/Header";
import SiteFooter from "@/components/landing/Footer";
import FaviconUpdater from "@/components/ThemeUpdater"; // Client-side component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Static metadata for initial favicon setup
export const metadata: Metadata = {
  title: {
    default: "Printshop Digital",
    template: "%s | Printshop Digital",
  },
  description: "Aplicación Web de Printshop Digital, exclusivo para usuarios",
  icons: {
    icon: [
      { url: "/favicon-light.svg" }, // Default fallback
      { media: "(prefers-color-scheme: dark)", url: "/favicon-dark.svg" },
      { media: "(prefers-color-scheme: light)", url: "/favicon-light.svg" },
    ],
  },
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <Header />
        <FaviconUpdater />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
