import { auth } from "@/auth";
import { redirect } from "next/navigation";

// TODO: Add test coverage
export async function verifyUserSession() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  return { session, userId };
}
