import "server-only";

import { remember } from "@epic-web/remember";
import { PrismaClient, type User, type Post } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { withOptimize } from "@prisma/extension-optimize";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { redirect } from "next/navigation";

const isProd = process.env.NODE_ENV === "production";

const generateClient = () => {
  return isProd
    ? new PrismaClient().$extends(withAccelerate())
    : new PrismaClient()
        .$extends(withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! }))
        .$extends(withAccelerate());
};

export const prisma = remember("prisma", generateClient);

export const authAdapter = PrismaAdapter(prisma);

export async function getUsersPosts(userId: string) {
  const user = await prisma.user.findUnique({
    // cacheStrategy: {
    //   swr: 120,
    //   ttl: 120,
    // },
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
          ownerId: true,
        },
      },
    },
  });

  // TODO: Add test coverage to ensure redirect happens
  if (!user) redirect("/login");

  return { user, posts: user.Post };
}

export async function getPost(slug: string): Promise<
  | {
      post: Post;
      user: Pick<User, "id" | "name" | "email" | "image">;
    }
  | undefined
> {
  try {
    const data = await prisma.post.findUnique({
      // cacheStrategy: {
      //   swr: 240,
      //   ttl: 240,
      // },
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

    if (!data) {
      return undefined;
    }

    return {
      post: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        ownerId: data.owner.id,
      },
      user: data.owner,
    };
  } catch (error) {
    console.error(error);
  }
}
