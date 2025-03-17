import { prisma } from "@/utils/db";
import { createAdminUser, createRandomUser } from "./db-utils";
import { pushUserToDatabase } from "./db-utils";

async function seed() {
  console.log("🌱 Seeding...");
  console.time(`🌱 Database has been seeded`);

  const totalUsers = 5;

  const adminUser = createAdminUser();
  console.time(`👤 Created new admin user ${adminUser.name} in the database!`);
  console.time(`👤 Created ${totalUsers} users...`);

  const existingUser = await prisma.user.findUnique({
    where: { id: adminUser.id },
  });

  if (existingUser) {
    await prisma.user.delete({ where: { id: adminUser.id } });
  }

  for (let index = 0; index < totalUsers; index++) {
    const randomUser = createRandomUser(index + 1);

    await pushUserToDatabase(randomUser);
    console.timeEnd(`👤 Created new user ${randomUser.name} in the database!`);
  }

  await pushUserToDatabase(adminUser);

  console.timeEnd(
    `👤 Created new admin user ${adminUser.name} in the database!`
  );

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
