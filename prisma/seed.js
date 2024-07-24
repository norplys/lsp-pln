import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.rateVariant.createMany({
        data: [{
            name: "900",
            feeRate: 100
        },
        {
            name: "1000",
            feeRate: 200
        },
        {
            name: "1100",
            feeRate: 300
        },
        {
            name: "1500",
            feeRate: 400
        },]
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });