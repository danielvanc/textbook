import { auth } from "@/auth";
import { redirect } from "next/navigation";
import config from "./config";

// TODO: Add test coverage
export async function verifyUserSession() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect(config.loginRoute);

  return { session, userId };
}
