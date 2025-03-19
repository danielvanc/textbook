import { remember } from "@epic-web/remember";
import {
  PrismaClient,
  type User,
  type Post,
  type Prisma,
  type Bookmark,
} from "@prisma/client/index.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { withOptimize } from "@prisma/extension-optimize";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { redirect } from "next/navigation";
import { styleText } from "util";

const isProd = process.env.NODE_ENV === "production";
const isOptimizeMode = !!process.env.OPTIMIZE;
const enableOptimize = !(isProd || !isOptimizeMode);

export const prisma = remember("prisma", () => {
  const logThreshold = 20;

  async function queryOutput(e: Prisma.QueryEvent) {
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
    const dur = styleText(color, `${e.duration}ms`);
    console.info(`prisma:query - ${dur} - ${e.query}`);
  }

  const client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  })
    .$on("query", queryOutput)
    .$extends(
      withOptimize({
        enable: enableOptimize,
        apiKey: process.env.OPTIMIZE_API_KEY!,
      })
    )
    .$extends(withAccelerate());

  client.$connect();

  return client;
});

export const authAdapter = PrismaAdapter(prisma);

export async function getTimelinePosts() {
  return await prisma.post.findMany({
    // cacheStrategy: {
    //   swr: 60,
    // },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      ownerId: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      bookmarks: {
        select: {
          id: true,
          userId: true,
          postId: true,
        },
      },
    },
  });
}

export async function getUsersPosts(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      Post: {
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          ownerId: true,
          bookmarks: true,
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
      post: Post & { bookmarks: Pick<Bookmark, "userId" | "id">[] };
      user: Pick<User, "id" | "name" | "email" | "image">;
    }
  | undefined
> {
  try {
    const data = await prisma.post.findUnique({
      cacheStrategy: {
        swr: 60,
      },
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        description: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        bookmarks: {
          select: {
            id: true,
            userId: true,
            postId: true,
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
        description: data.description,
        bookmarks: data.bookmarks,
      },
      user: data.owner,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getBookmarksForUser(userId: string) {
  return await prisma.bookmark.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      post: {
        select: {
          id: true,
          title: true,
          slug: true,
          updatedAt: true,
          owner: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      },
    },
  });
}
