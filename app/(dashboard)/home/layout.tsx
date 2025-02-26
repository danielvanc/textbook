import type { Metadata } from "next";
import "@/app/globals.css";
import Shell from "@/components/shell";
import { verifyUserSession } from "@/utils/session";

export const metadata: Metadata = {
  title: "Textbook",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyUserSession();

  return (
    <html lang="en">
      <body>
        <Shell user={user}>{children}</Shell>
      </body>
    </html>
  );
}
