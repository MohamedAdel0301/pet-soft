import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./server-utils";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getUserByEmail(email as string);

        if (!user) {
          console.log("no user found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
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
      } else if (isLoggedIn && isAccessApp && !auth?.user.hasAccess) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      } else if (isLoggedIn && isAccessApp && auth?.user.hasAccess) {
        return true;
      } else if (isLoggedIn && !isAccessApp) {
        if (
          (request.nextUrl.pathname.includes("/login") ||
            request.nextUrl.pathname.includes("/signup")) &&
          !auth?.user.hasAccess
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }
        return true;
      } else if (!isAccessApp && !isLoggedIn) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        //on sign in
        token.userId = user.id;
        token.hasAccess = user.hasAccess;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.hasAccess = token.hasAccess;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
