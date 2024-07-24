"use client";
import { addPet, deletePet, editPet } from "@/actions/crud-actions";
import { Pet } from "@/types/pet-types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextType = {
  optimisticPets: Pet[] | [];
  selectedPetID: string | null;
  selectedPet?: Pet;
  numberOfPets: number;
  handleChangeSelectedPetID: (id: string) => void;
  handleDeletePet: (id: string) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petID: string, newPetData: Omit<Pet, "id">) => Promise<void>;
};

type PetsContextProvider = {
  data: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ data, children }: PetsContextProvider) => {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPetData:Omit<Pet, "id">) => {
      return [
        ...state,
        {
          ...newPetData,
          id: Math.random.toString(),
        },
      ];
    },
  );
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);
  const numberOfPets = optimisticPets.length ?? 0;
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetID);

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petID: string, newPetData: Omit<Pet, "id">) => {
    setOptimisticPets(newPetData);
    const error = await editPet(petID, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };

  const handleDeletePet = async (petID: string) => {
    await deletePet(petID);
    setSelectedPetID(null);
  };

  return (
    <PetContext.Provider
      value={{
        optimisticPets,
        selectedPetID,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetID,
        handleDeletePet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
