"use server"

import * as userRepository from "../lib/user";

export async function updateUser(payload : Partial<any>, id: string){
    const { email, name, rateVariant } = payload

    if(!email && !name && !rateVariant){
        throw new Error("Please change at least one field")
    }

    if(email){
        const user = await userRepository.getUserByEmail(email)
        if(user){
            throw new Error("User with this email already exists")
        }
    }

    await userRepository.updateUser({email, name}, rateVariant, id)
}