"use server"

import { prisma } from "../../prisma/client/db";
import { PaymentStatus } from "@prisma/client";

export async function createPayment(userId: string, billId: string){
    if(!userId || !billId){
       throw new Error("Please provide all fields")
    }

    const checkPaymentForCurrentBill = await prisma.payment.findFirst({
        where: {
            bill: {
                id: billId
            },
            status: 'PENDING',
            expiredAt: {
                gte: new Date()
            }
        }
    })

    if(checkPaymentForCurrentBill){
        throw new Error("Payment for this bill is already created")
    }

    const payment = await prisma.payment.create({
        data: {
            status: 'PENDING',
            userId,
            billId,
            expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
        }
    })

    return payment;
}

export async function getAllUserPaymentsByEmail(email: string | null){
    if(!email){
        throw new Error("Please provide email")
    }
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user){
        throw new Error("User not found")
    }

    const payments = await prisma.payment.findMany({
        where: {
            userId: user.id
        },
        include: {
            bill: true
        }
    })

    return payments
}

export async function validateUserPayment(paymentId: string, status: PaymentStatus){
    if(!paymentId){
        throw new Error("Please provide payment id")
    }

    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId
        }
    })

    if(!payment){
        throw new Error("Payment not found")
    }

    if(payment.status === 'PAID'){
        throw new Error("Payment already paid")
    }

    const updatedPayment = await prisma.payment.update({
        where: {
            id: paymentId
        },
        data: {
            status
        }
    })

    return updatedPayment
}


export async function getAllUserPayments(){
    const payments = await prisma.payment.findMany({
        include: {
            bill: true,
            user: true
        },
        where: {
            status: 'PENDING'
        }
    })

    return payments
}