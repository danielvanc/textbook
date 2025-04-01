import "@/app/globals.css";
import Shell from "@/components/shell";
import { findUsernameBySessionUser } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";

export default async function RootLayout() {
  const { user } = await verifyUserSession();
  const data = await findUsernameBySessionUser(user.id);

  if (!data) {
    return <div>User not found</div>;
  }

  const userWithUsername = {
    ...user,
    username: data.username,
  } as const;

  return (
    <Shell user={userWithUsername}>
      <div className="flex justify-between gap-4 p-4 min-h-[calc(100vh-4rem)]">
        <main className="flex flex-col gap-4 w-full">
          <h1>Page not found</h1>
        </main>
      </div>
    </Shell>
  );
}
