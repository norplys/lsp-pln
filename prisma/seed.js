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
        role: "ADMIN",
        variantId
      },
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
