"use server"
import { prisma } from "../../prisma/client/db";

export async function getAllVariant(){
    let variants = []

    variants = await prisma.rateVariant.findMany()

    return variants
}