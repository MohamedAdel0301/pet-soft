"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-utils";
import { petFormSchema, petIDSchema } from "@/types/pet-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPet(petData: unknown) {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Couldn't add pet" };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petID: unknown, petData: unknown) {
  //authentication
  const session = await checkAuth();
  //validate incoming data
  const validatedID = petIDSchema.safeParse(petID);
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success || !validatedID.success) {
    return {
      message: "Invalid pet data",
    };
  }
  //authorization check
  let pet;
  try {
    pet = await prisma.pet.findUnique({
      where: {
        id: validatedID.data,
      },
      select: {
        userId: true,
      },
    });
  } catch (e) {
    if (e instanceof Error) return { message: e.message };
  }

  if (!pet) {
    return {
      message: "Couldn't find pet",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Action not authorized",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedID.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Couldn't edit pet" };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petID: unknown) {
  //authentication
  const session = await checkAuth();

  //validation part
  const validatedID = petIDSchema.safeParse(petID);
  if (!validatedID.success) {
    return { message: "invalid pet id" };
  }

  //authorization check for pet owner
  let pet;
  try {
    pet = await prisma.pet.findUnique({
      where: {
        id: validatedID.data,
      },
      select: {
        userId: true,
      },
    });
  } catch (e) {
    if (e instanceof Error) return { message: e.message };
  }

  if (!pet) {
    return {
      message: "Couldn't find pet",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Action not authorized",
    };
  }

  try {
    await prisma.pet.delete({ where: { id: validatedID.data } });
  } catch (e) {
    return {
      message: "Could not find pet",
    };
  }
  revalidatePath("/app", "layout");
}
