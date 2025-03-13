import "server-only";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import config from "./config";
import { type User } from "@prisma/client";
// TODO: Add test coverage
import { cache } from "react";

export const verifyUserSession = cache(async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user || !userId) redirect(config.loginRoute);

  return {
    session,
    userId,
    user: session.user as Pick<User, "id" | "name" | "email" | "image">,
  };
});
