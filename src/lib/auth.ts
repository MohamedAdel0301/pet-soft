import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          console.log("no user found");
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordsMatch) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isAccessApp = request.nextUrl.pathname.includes("/app");
      if (!isLoggedIn && isAccessApp) {
        return false;
      } else if (isLoggedIn && isAccessApp) {
        return true;
      } else if (isLoggedIn && !isAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      } else if (!isAccessApp && !isLoggedIn) {
        return true;
      }
      return false;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
