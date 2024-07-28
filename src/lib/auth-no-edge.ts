import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./server-utils";
import { nextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,
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
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
