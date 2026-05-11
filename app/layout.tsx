import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D&D Cards",
  description: "Build printable DnD 5.5e spell and class feat cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
