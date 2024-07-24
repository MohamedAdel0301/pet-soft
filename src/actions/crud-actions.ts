"use server";

import prisma from "@/lib/db";
import { Pet } from "@/types/pet-types";
import { revalidatePath } from "next/cache";

export async function addPet(petData: Omit<Pet, "id">) {
  try {
    await prisma.pet.create({
      data: petData,
    });
  } catch (error) {
    return { message: "Couldn't add pet" };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petID: string, petData: Omit<Pet, "id">) {
  try {
    await prisma.pet.update({
      where: {
        id: petID,
      },
      data: petData,
    });
  } catch (error) {
    return { message: "Couldn't edit pet" };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petID: string) {
  try {
    await prisma.pet.delete({ where: { id: petID } });
  } catch (e) {
    return {
      message: "Could not find pet",
    };
  }
  revalidatePath("/app", "layout");
}
