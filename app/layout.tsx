import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Reality Check Official",
  description: "Revealing the truth behind reality - where technology meets consciousness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
