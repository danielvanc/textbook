import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Textbook",
  description: "",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-5">{children}</div>;
}
