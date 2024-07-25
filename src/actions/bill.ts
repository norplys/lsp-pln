"use server"
import { prisma } from "../../prisma/client/db";
import * as userRepository from "../lib/user";

export default async function createBill(
  userId: string,
  usageId: string,
  finalKwh: number,
  totalKwh: number,
  totalPrice: number
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
        user: {
          id: userId
        },
    },
    orderBy: {
      createdAt: 'desc'
    }
    });

    if(currentBill){
        const currentBillDate = currentBill.createdAt;
        const nextMonth = new Date(currentBillDate);

        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if(new Date() < nextMonth){
            throw new Error("Bill already created for this month")
        }
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
        totalPrice,
        userId,
        usageId,
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

export async function getAllUserBill(email: string | null){

  if(!email){
    throw new Error("Email Required");
  }

    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    const bills = await prisma.bill.findMany({
        where: {
            user: {
              email
            },
        },
        include: {
          payment: {
            where: {
              status: "PENDING"
            }
          },
          user: true
        }
    });

    return bills
}
