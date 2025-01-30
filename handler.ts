import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";  // Extended User model with role
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const NEXT_AUTH_HANDLER: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        userType: { label: "User Type", type: "text", placeholder: "User or Admin" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Check if user exists in the database
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
          include: {
            Store: true,        // Fetch the associated Store
            PrintJob: true,    // Fetch the associated PrintJobs
          },
        });

        if (!user) return null; // User does not exist

        // Check if password matches
        if (user.password !== credentials.password) {
          return null; // Incorrect password
        }

        // Return user data after successful authentication along with Store and PrintJobs
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role, // Store user role (e.g., 'admin' or 'user')
          password: user.password,
          confirmpassword: user.confirmpassword,
          store: user.Store,            // Add Store data
          printJobs: user.PrintJob,     // Add PrintJobs data
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page path
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,  // 30 days
    updateAge: 24 * 60 * 60,    // Update after 1 day
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Token expiration time (30 days)
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // Log the user data in the JWT callback
        console.log("User data in JWT callback:", user);

        // Store all user data in the JWT
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.phone = user.phone;
        token.password = user.password;
        token.confirmpassword = user.confirmpassword;
        token.id = user.id;
        token.store = user.store;          // Store data added to JWT
        token.printJobs = user.printJobs;  // PrintJobs data added to JWT
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Log the token data in the session callback
      console.log("Token data in Session callback:", token);

      if (session.user) {
        // Add token data to session
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.password = token.password;
        session.user.confirmpassword = token.confirmpassword;
        session.user.id = token.id;
        session.user.store = token.store;          // Store data added to session
        session.user.printJobs = token.printJobs;  // PrintJobs data added to session
      }
      return session;
    },
  },
};
