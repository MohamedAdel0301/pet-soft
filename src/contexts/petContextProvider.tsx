"use client";
import { addPet } from "@/actions/crud-actions";
import { Pet } from "@/types/pet-types";
import React, { createContext, useState } from "react";

type PetContextType = {
  pets: Pet[] | [];
  selectedPetID: string | null;
  selectedPet?: Pet;
  numberOfPets: number;
  handleChangeSelectedPetID: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
};

type PetsContextProvider = {
  pets: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ pets, children }: PetsContextProvider) => {
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);

  const numberOfPets = pets.length ?? 0;
  const selectedPet = pets.find((pet) => pet.id === selectedPetID);

  const handleChangeSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };

  const handleCheckoutPet = (id: string) => {
    setSelectedPetID(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetID,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetID,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
