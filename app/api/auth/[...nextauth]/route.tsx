import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      try {
        console.log(user.email);
        
        if (user.email == null) {
          throw new Error('Email cannot be null');
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          throw new Error("You are not authorized to access the dashboard.");
        }
        
        return true;
      } catch (err) {
        return `/0191ba6b-7443-75f3-8c5c-da766df93c5e?error=${encodeURIComponent((err as Error).message)}`;
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };