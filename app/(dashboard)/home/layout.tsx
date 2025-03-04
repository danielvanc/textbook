import "@/app/globals.css";
import Shell from "@/components/shell";
import { verifyUserSession } from "@/utils/session";

export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyUserSession();

  return <Shell user={user}>{children}</Shell>;
}
