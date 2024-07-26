import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, User } from "@prisma/client";
import prisma from "./db";

export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
};

export const getPetByID = async (petID: Pet["id"]) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petID,
    },
    select: {
      userId: true,
    },
  });
  return pet;
};
export const getPetsByUserID = async (userId: User["id"]) => {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
};

export const getUserByEmail = async (email: User["email"]) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};
