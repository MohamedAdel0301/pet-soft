"use server";

import { signIn } from "@/lib/auth";

export const logIn = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", authData);
};
