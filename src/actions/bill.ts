"use server"
import { prisma } from "../../prisma/client/db";
import * as userRepository from "../lib/user";

export default async function createBill(
  userId: string,
  usageId: string,
  finalKwh: number,
  totalKwh: number,
) {
  if (!finalKwh || !userId || !totalKwh) {
    throw new Error("Please provide all fields");
  }
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const currentBill = await prisma.bill.findFirst({
    where: {
        createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
    }
    });

    if(currentBill){
        throw new Error("Bill already created for this month")
    }


  await prisma.$transaction([
    prisma.usage.update({
      where: {
        id: usageId,
      },
      data: {
        finalKwh,
        active: false,
      },
    }),
    prisma.bill.create({
      data: {
        totalKwh,
        user: {
          connect: {
            id: userId,
          },
        },
        usage: {
          connect: {
            id: usageId,
          },
        },
      },
    }),
    prisma.usage.create({
      data: {
        initialKwh: finalKwh,
        active: true,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    }),
  ]);

  return true;
}
