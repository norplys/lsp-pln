"use server";

import { prisma } from "../../prisma/client/db";
import * as bcrypt from "./bcrypt";
import { signIn } from "@/auth";

export async function register(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      status: 409,
      message: "User already exists.",
    };
  }

  const hashedPassword = await bcrypt.hashPassword(password);

  let kwhNumber = Math.floor(Math.random() * 1000000000).toString();
  let checkKwhNumber = await prisma.user.findUnique({
    where: {
      kwhNumber,
    },
  });
   while (checkKwhNumber) {
    kwhNumber = Math.floor(Math.random() * 1000000000).toString();
    checkKwhNumber = await prisma.user.findUnique({
      where: {
        kwhNumber,
      },
    });
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      kwhNumber: kwhNumber,
      emailVerified: new Date(),
      variant: {
        connect: {
          name: "900",
        }
      },
      usage: {
        create: [{
          initialKwh: 0,
          active: true,
        }]
      }
    },

  });

  return {
    status: 200,
    message: "User created successfully.",
  };
}

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        status: 404,
        message: "User not found.",
      };
    }

    if (!user.password) {
      return {
        status: 404,
        message: "Registered with Google.",
      };
    }

    const isPasswordValid = await bcrypt.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Password is invalid.",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      status: 200,
      message: "User logged in successfully.",
    };
  } catch (error) {

    return {
      status: 500,
      message: "Internal server error.",
    };
  }
}
