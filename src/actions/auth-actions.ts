"use server";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { AuthFormSchema } from "@/types/auth-form";
import { Prisma } from "@prisma/client";

export const logIn = async (formData: unknown) => {
  
  //check if of type FormData
  if (!(formData instanceof FormData)) {
    return { message: "Unknown error" };
  }
  const authData = Object.fromEntries(formData.entries());

  //validate data
  const validatedFormData = AuthFormSchema.safeParse(authData);
  if (!validatedFormData) {
    return { message: "Invalid form data" };
  }
  //attempt sign in
  await signIn("credentials", validatedFormData.data);
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (formData: unknown) => {
  if (!(formData instanceof FormData)) {
    return { message: "Unknown error" };
  }
  const authData = Object.fromEntries(formData.entries());
  //validation section
  const validatedFormData = AuthFormSchema.safeParse(authData);
  if (!validatedFormData.success) {
    return { message: "Invalid data" };
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { message: "Email already exists" };
      }
    }
  }
  await signIn("credentials", validatedFormData.data);
};
