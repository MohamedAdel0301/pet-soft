"use server";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";

export const logIn = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", authData);
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (formData: FormData) => {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10,
  );
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword: hashedPassword,
    },
  });
  await signIn("credentials", formData);
};
