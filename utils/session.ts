import { auth } from "@/auth";
import { redirect } from "next/navigation";
import config from "./config";
import { type User } from "@prisma/client";
// TODO: Add test coverage
export async function verifyUserSession() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user || !userId) redirect(config.loginRoute);

  return {
    session,
    userId,
    user: session.user as Pick<User, "id" | "name" | "email" | "image">,
  };
}
