import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function verifyUserSession() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  return userId;
}
