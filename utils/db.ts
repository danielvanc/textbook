import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import chalk from "chalk";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prismaClientSingleton = () => {
  // Feel free to change this log threshold to something that makes sense for you
  const logThreshold = 20;

  const client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  });

  client.$on("query", async (e) => {
    if (e.duration < logThreshold) return;
    const color =
      e.duration < logThreshold * 1.1
        ? "green"
        : e.duration < logThreshold * 1.2
        ? "blue"
        : e.duration < logThreshold * 1.3
        ? "yellow"
        : e.duration < logThreshold * 1.4
        ? "redBright"
        : "red";
    const dur = chalk[color](`${e.duration}ms`);
    console.info(`prisma:query - ${dur} - ${e.query}`);
  });
  client.$extends(withAccelerate());

  void client.$connect();
  return client;
};

export const prisma = remember("prisma", prismaClientSingleton);
export const authAdapter = PrismaAdapter(prisma);

export function createSingleUser() {
  const name = "Daniel Van Cuylenburg";
  const email = "email@danielvanc.com";
  const id = "cm796vlvf00001i0w7889xx9y";
  const image =
    "https://lh3.googleusercontent.com/a/ACg8ocItaSg693lHCK4wTckqdqNKYnBTHHQtfpYGLdPvtJCQwXr0-XpN=s96-c";
  const type = "oidc";
  const provider = "google";
  const providerAccId = process.env.GOOGLE_PROVIDER_ID;
  const providerAccToken = process.env.GOOGLE_ACCESS_TOKEN;
  const tokenType = "bearer";
  const scope =
    "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  const idToken = process.env.ID_TOKEN;

  return {
    id,
    name,
    email,
    image,
    type,
    provider,
    providerAccId,
    providerAccToken,
    tokenType,
    scope,
    idToken,
  };
}
