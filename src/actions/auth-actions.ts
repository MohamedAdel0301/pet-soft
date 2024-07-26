"use server";

import { signIn, signOut } from "@/lib/auth";

export const logIn = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", authData);
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};
