"use server"
import { prisma } from "../../prisma/client/db";

export default async function getAllUsers(variant: string | null){
    let users = []

    if(!variant){
        users = await prisma.user.findMany({
            include: {
                variant: true
            }
        })

        return users
    }

    users = await prisma.user.findMany({
        where: {
            variant: {
                name: variant
            }
        },
        include: {
            variant: true
        }
    })

    return users
}