import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

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
      <body className={wantedSans.variable}>{children}</body>
    </html>
  );
}
