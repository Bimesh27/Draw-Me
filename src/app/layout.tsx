import type { Metadata } from "next";
import "./globals.css";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Draw Me",
  description:
    "Best solution for colaborative drawing on the web with your friends and family members. Draw Me is a free online drawing game where you can draw and guess words with your friends and people around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.className} antialiased`}>{children}</body>
    </html>
  );
}
