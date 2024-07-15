"use client";
import { Pet } from "@/types/pet-types";
import React, { createContext, useState } from "react";

type PetContextType = {
  pets: Pet[] | [];
  setPets: React.Dispatch<React.SetStateAction<Pet[] | []>>;
  selectedPetID: string | null;
  handleChangeSelectedPetID: (id: string) => void;
};

type PetsContextProvider = {
  pets: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ pets: data, children }: PetsContextProvider) => {
  const [pets, setPets] = useState<Pet[] | []>(data);
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);

  const handleChangeSelectedPetID = (id: string) => {
    setSelectedPetID(id);
  };

  return (
    <PetContext.Provider
      value={{ pets, setPets, selectedPetID, handleChangeSelectedPetID }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
