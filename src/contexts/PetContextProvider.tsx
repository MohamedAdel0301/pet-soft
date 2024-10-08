"use client";
import { addPet, deletePet, editPet } from "@/actions/crud-actions";
import { PetEssentials } from "@/types/pet-types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextType = {
  optimisticPets: PetEssentials[] | [];
  selectedPetID: string | null;
  selectedPet?: PetEssentials;
  numberOfPets: number;
  handleChangeSelectedPetID: (id: PetEssentials["id"]) => void;
  handleDeletePet: (id: PetEssentials["id"]) => Promise<void>;
  handleAddPet: (newPet: Omit<PetEssentials, "id">) => Promise<void>;
  handleEditPet: (
    petID: PetEssentials["id"],
    newPetData: Omit<PetEssentials, "id">,
  ) => Promise<void>;
};

type PetsContextProvider = {
  data: PetEssentials[];
  children: React.ReactNode;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ data, children }: PetsContextProvider) => {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random.toString() }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload.newPetData };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    },
  );
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);
  const numberOfPets = optimisticPets.length ?? 0;
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetID);

  const handleAddPet = async (newPet: Omit<PetEssentials, "id">) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (
    petID: PetEssentials["id"],
    newPetData: Omit<PetEssentials, "id">,
  ) => {
    setOptimisticPets({ action: "edit", payload: { petID, newPetData } });
    const error = await editPet(petID, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleDeletePet = async (petID: PetEssentials["id"]) => {
    setOptimisticPets({ action: "delete", payload: petID });
    const error = await deletePet(petID);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetID(null);
  };

  const handleChangeSelectedPetID = (id: PetEssentials["id"]) => {
    setSelectedPetID(id);
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
