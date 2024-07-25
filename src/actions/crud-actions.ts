"use server";

import prisma from "@/lib/db";
import { petFormSchema, petIDSchema } from "@/types/pet-form";
import { revalidatePath } from "next/cache";

export async function addPet(petData: unknown) {
  const validatedPet = petFormSchema.safeParse(petData);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Couldn't add pet" };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petID: unknown, petData: unknown) {
  const validatedID = petIDSchema.safeParse(petID);
  const validatedPet = petFormSchema.safeParse(petData);

  if (!validatedPet.success || !validatedID.success) {
    return {
      message: "Invalid pet data",
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
  const validatedID = petIDSchema.safeParse(petID);
  if (!validatedID.success) {
    return { message: "invalid pet id" };
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
