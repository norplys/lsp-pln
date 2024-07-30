import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.rateVariant.createMany({
    data: [
      {
        name: "900",
        feeRate: 100,
      },
      {
        name: "1000",
        feeRate: 200,
      },
      {
        name: "1100",
        feeRate: 300,
      },
      {
        name: "1500",
        feeRate: 400,
      },
    ],
  });

  const variantId = (await prisma.rateVariant.findFirst({ where: { name: "900" } })).id;

  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "admin123@gmail.com",
        password: await bcrypt.hash("admin123", 10),
        kwhNumber: '123456789',
        role: "ADMIN",
        variantId
      },
      {
        name: "Jane Doe",
        email: "jane@gmail.com",
        password: await bcrypt.hash("jane123", 10),
        kwhNumber: '987654321',
        role: "USER",
        variantId
      },
      {
        name: "Alice Doe",
        email: "alice@gmail.com",
        password: await bcrypt.hash("alice123", 10),
        kwhNumber: '123123123',
        role: "USER",
        variantId
      },
      {
        name: "Bob Doe",
        email: "bob@gmail.com",
        password: await bcrypt.hash("bob123", 10),
        kwhNumber: '456456456',
        role: "USER",
        variantId
      },
      {
        name: "Charlie Doe",
        email: "charlie@gmail.com",
        password: await bcrypt.hash("charlie123", 10),
        kwhNumber: '789789789',
        role: "USER",
        variantId
      }
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
