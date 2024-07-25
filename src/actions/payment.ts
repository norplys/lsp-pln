"use server"
import { prisma } from "../../prisma/client/db";

export async function createPayment(userId: string, billId: string){
    if(!userId || !billId){
        throw new Error("Please provide email and billId")
    }

    const payment = await prisma.payment.create({
        data: {
            status: 'PENDING',
            user: {
                connect: {
                    id: userId
                }
            },
            bill: {
                connect: {
                    id: billId
                }
            },
            expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
        }
    })

    return payment;
}