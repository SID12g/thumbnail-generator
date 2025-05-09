import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

const wantedSans = localFont({
  src: "./fonts/WantedSansVariable.woff2",
  variable: "--font-wanted-sans",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thumbnail.sid12g.dev"),
  title: "Thumbnail Generator",
  description: "Thumbnail generator for creating beautiful images",
  openGraph: {
    images: "https://thumbnail.sid12g.dev/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-K7JXT4ZP5E"
        ></Script>
        <Script>{`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K7JXT4ZP5E');
        `}</Script>
      </head>
      <body className={wantedSans.variable}>{children}</body>
    </html>
  );
}
