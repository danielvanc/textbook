import { prisma } from "@/utils/db";
import { generateSlug } from "@/utils/posts";

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
      description: "Hello world description",
      content,
    },
    {
      title: "Second Post",
      description: "Another description",
      content,
    },
    {
      title: "Third Post",
      description: "And yet another description",
      content,
    },
  ];
}

async function seed() {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  const user = createSingleUser();
  console.time(`👤 Created new user ${user.name} in the database!`);
  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (existingUser) {
    await prisma.user.delete({ where: { id: user.id } });
  }

  prisma.$transaction(async (tx) => {
    const entry = await tx.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        accounts: {
          create: {
            provider: user.provider,
            providerAccountId: user?.providerAccountId ?? "",
            access_token: user?.providerAccountToken ?? "",
            token_type: user.tokenType,
            scope: user.scope,
            id_token: user.idToken,
            type: user.type,
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

  console.timeEnd(`👤 Created new user ${user.name} in the database!`);
  console.timeEnd(`🌱 Database has been seeded`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
