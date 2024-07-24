import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../prisma/client/db";
import Credentials from "next-auth/providers/credentials"
import * as bcrypt from '@/actions/bcrypt'
import type { Role } from '@prisma/client'
import { DefaultSession } from 'next-auth'
import 'next-auth/jwt'
import * as userRepository from '@/lib/user'

type User = {
    email: string;
    password: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      role: Role
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            authorize: async (credentials) => {
              try{
              let user = null
              
              const { email, password } = credentials as User

              user = await userRepository.getUserByEmail(email)
       
              if (!user || !user.password) {
                return null
              }
              
              const isPasswordValid = await bcrypt.comparePassword(password, user.password)

              if (!isPasswordValid) {
                return null
              }

              return user
            } catch (error) {

              return null
            }
            },
          }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
      async signIn({ account, user }) {
        const userEmail = user.email
        
        if(!userEmail) return false

        const isGoogle = account?.provider === 'google'

        const userExists = await userRepository.getUserByEmail(userEmail)
        
        const needBackFill = isGoogle && !userExists

        if (needBackFill) {
        let kwhNumber = Math.floor(Math.random() * 1000000000).toString()
        let checkKwhNumber = await userRepository.getUserByKwhNumber(kwhNumber)

        while(checkKwhNumber){
          kwhNumber = Math.floor(Math.random() * 1000000000).toString()
          checkKwhNumber = await userRepository.getUserByKwhNumber(kwhNumber)
        }

        const userWithKwh = { ...user, kwhNumber } as User & { kwhNumber: string }

          await userRepository.createUserWithKwhNumber(userWithKwh)
        }
  
        return true
      },

      async session({ session, token }) {

        if (!session.user) return session

        if (!token.role) return session
        session.user.role = token.role
        return session
      },

      async jwt({ token }) {

        if (!token.sub) return token
        const currentUser = await userRepository.getUserById(token.sub)

        if (currentUser && currentUser.role) token.role = currentUser.role
        return token
      },
    }
});
