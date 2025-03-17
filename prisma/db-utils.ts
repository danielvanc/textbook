import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";
import type { User, Account } from "@prisma/client";
import { generateSlug } from "@/utils/posts";
import { prisma } from "@/utils/db";

const uniqueUsernameEnforcer = new UniqueEnforcer();
const type = "oidc";
const provider = "google";
const providerAccountId = process.env.GOOGLE_PROVIDER_ID!;
const providerAccountToken = process.env.GOOGLE_ACCESS_TOKEN!;
const tokenType = "bearer";
const scope =
  "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
const idToken = process.env.ID_TOKEN!;

export function createRandomUser(incrementor: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = `${firstName} ${lastName}`;
  const image = faker.image.avatar();
  const id = `cm70${incrementor}vlvf00001i0w7889xx9y`;

  const username = uniqueUsernameEnforcer
    .enforce(() => {
      return (
        faker.string.alphanumeric({ length: 2 }) +
        "_" +
        faker.internet.username({
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
        })
      );
    })
    .slice(0, 20)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");

  return {
    username,
    id,
    name,
    image,
    type,
    provider,
    providerAccountId,
    scope,
    idToken,
    email: `${username}@example.com`,
    access_token: providerAccountToken,
    token_type: tokenType,
    id_token: idToken,
  };
}

type UserType =
  | Pick<User, "id" | "email" | "name" | "image" | "username"> &
      Pick<
        Account,
        | "provider"
        | "providerAccountId"
        | "access_token"
        | "token_type"
        | "scope"
        | "id_token"
        | "type"
      >;

export async function pushUserToDatabase(userData: UserType) {
  return prisma.$transaction(async (tx) => {
    const entry = await tx.user.create({
      data: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        image: userData.image,
        username: userData.username,
        accounts: {
          create: {
            type,
            provider: userData.provider,
            providerAccountId: faker.string.uuid(),
            access_token: userData?.access_token ?? "",
            token_type: tokenType,
            scope,
            id_token: idToken,
          },
        },
        Post: {
          create: [...createSeedPosts()],
        },
      },
    });

    const posts = await tx.post.findMany({
      where: {
        ownerId: entry.id,
      },
    });

    for (const post of posts) {
      const slug = generateSlug(post.title, post.id);
      await tx.post.update({
        where: { id: post.id },
        data: { slug },
      });
    }
  });
}

export function createAdminUser() {
  const name = "Daniel Van Cuylenburg";
  const email = "email@danielvanc.com";
  const id = "cm796vlvf00001i0w7889xx9y";
  const username = "danielvanc";
  const image =
    "https://lh3.googleusercontent.com/a/ACg8ocItaSg693lHCK4wTckqdqNKYnBTHHQtfpYGLdPvtJCQwXr0-XpN=s96-c";

  return {
    id,
    name,
    email,
    image,
    username,
    type,
    provider,
    providerAccountId,
    access_token: providerAccountToken,
    token_type: tokenType,
    scope,
    id_token: idToken,
  };
}

const content = JSON.stringify({
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: faker.lorem.sentence() }],
    },
    { type: "paragraph" },
    {
      type: "paragraph",
      content: [{ type: "text", text: faker.lorem.sentence() }],
    },
  ],
});

export function createSeedPosts() {
  const postsCount = faker.number.int({ min: 1, max: 3 });

  const posts = [];
  for (let postIndex = 0; postIndex < postsCount; postIndex++) {
    posts.push({
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      content,
    });
  }

  return posts;
}
