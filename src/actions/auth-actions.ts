"use server";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth-no-edge";
import prisma from "@/lib/db";
import { AuthFormSchema } from "@/types/auth-form";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

export const logIn = async (prevState: unknown, formData: unknown) => {
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
  try {
    await signIn("credentials", validatedFormData.data);
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          };
        }
        default: {
          return {
            message: "Couldn't sign in",
          };
        }
      }
    }
    //nextjs redirect works by throwing an error which gets caught here, need to throw the same error again
    throw e;
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (prevState: unknown, formData: unknown) => {
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
