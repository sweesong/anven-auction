import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: AuthUser }) {
      try {
        // Ensure the email is not null or undefined
        if (!user.email) {
          throw new Error('Email cannot be null or undefined');
        }

        // Find the user in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // Check if user exists
        if (!existingUser) {
          throw new Error("You are not authorized to access the dashboard.");
        }

        return true;
      } catch (err) {
        // Return the error message and redirect to error page
        return `/0191ba6b-7443-75f3-8c5c-da766df93c5e?error=${encodeURIComponent((err as Error).message)}`;
      } finally {
        // Ensure Prisma Client is closed
        await prisma.$disconnect();
      }
    },
  },
});

export { handler as GET, handler as POST };
