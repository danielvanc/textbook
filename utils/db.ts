import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import chalk from "chalk";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { notFound, redirect } from "next/navigation";

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
  const providerAccountId = process.env.GOOGLE_PROVIDER_ID;
  const providerAccountToken = process.env.GOOGLE_ACCESS_TOKEN;
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
    providerAccountId,
    providerAccountToken,
    tokenType,
    scope,
    idToken,
  };
}

const content = JSON.stringify({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World! 🌎️" }],
    },
    { type: "paragraph" },
    {
      type: "paragraph",
      content: [{ type: "text", text: "I hope that this works out nicely" }],
    },
  ],
});

export function createSeedPosts() {
  return [
    {
      title: "First Post",
      content,
    },
    {
      title: "Second Post",
      content,
    },
    {
      title: "Third Post",
      content,
    },
  ];
}

export async function getUsersPosts(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      Post: {
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  // TODO: Add test coverage to ensure redirect happens
  if (!user) redirect("/login");

  return { user, posts: user.Post };
}

export async function getPost(
  slug: string
): Promise<{ post: Post; user: User }> {
  try {
    const data = await prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!data) notFound();

    return {
      post: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      user: data.owner,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get post");
  }
}
