import type { User } from "@prisma/client";
import { prisma } from "../../prisma/client/db";

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function createUserWithKwhNumber(user : Partial<User> & { kwhNumber: string }) {
  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email!,
      emailVerified: new Date(),
      password: user.password,
      image: user.image,
      kwhNumber: user.kwhNumber,
      variant: {
        connect: {
          name: "900",
        }
      },
      usage: {
       create: [{
        initialKwh: 0 as number,
        active: true,
       }]
      }
    },
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function getUserByKwhNumber(kwhNumber: string) {
  return prisma.user.findUnique({
    where: {
      kwhNumber,
    },
  });
}

export function updateUser(payload: any, rateVariantId: string, id: string) {
  if(rateVariantId){
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        ...payload,
        variant: {
          connect: {
            id: rateVariantId,
          },
        },
      },
    });
  }
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
}
