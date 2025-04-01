import "@/app/globals.css";
import Shell from "@/components/shell";
import { findUsernameBySessionUser } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";

export default async function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifyUserSession();
  const data = await findUsernameBySessionUser(user.id);

  if (!data) {
    return <div>User not found</div>;
  }

  const userWithUsername = {
    ...user,
    username: data.username,
  } as const;

  return <Shell user={userWithUsername}>{children}</Shell>;
}
