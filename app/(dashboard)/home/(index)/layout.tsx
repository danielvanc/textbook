import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Textbook - Logged in!",
  description: "",
};

export default async function IndexLayout({
  children,
  latest,
}: Readonly<{
  children: React.ReactNode;
  latest: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between gap-4 p-4 min-h-[calc(100vh-4rem)]">
      <main className="flex flex-col gap-4 w-full xl:w-3/4">{children}</main>
      <aside className="hidden xl:flex flex-col gap-4 w-1/4">{latest}</aside>
    </div>
  );
}
