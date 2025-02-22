import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Textbook",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-5">{children}</body>
    </html>
  );
}
