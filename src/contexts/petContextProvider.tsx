"use client";
import { Pet } from "@/types/pet-types";
import React, { createContext, useState } from "react";

type PetContextType = {
  pets: Pet[] | [];
  selectedPetID: string | null;
  selectedPet?: Pet;
  numberOfPets: number;
  handleChangeSelectedPetID: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
};

type PetsContextProvider = {
  pets: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ pets: data, children }: PetsContextProvider) => {
  const [pets, setPets] = useState<Pet[] | []>(data);
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);

  const numberOfPets = pets.length ?? 0;
  const selectedPet = pets.find((pet) => pet.id === selectedPetID);

  const handleChangeSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetID(null);
  };
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets((prev) => [
      ...prev,
      {
        ...newPet,
        id: Date.now().toString(),
      },
    ]);
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
        handleAddPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
