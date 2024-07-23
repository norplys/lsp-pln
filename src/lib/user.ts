import { prisma } from "../../prisma/client/db";

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function updateEmailVerifiedUser(id: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
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
