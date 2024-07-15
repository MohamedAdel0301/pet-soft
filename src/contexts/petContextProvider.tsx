"use client";
import { Pet } from "@/types/pet-types";
import React, { createContext, useState } from "react";

type PetContextType = {
  pets: Pet[] | [];
  setPets: React.Dispatch<React.SetStateAction<Pet[] | []>>;
  selectedPetID: string | null;
  setSelectedPetID: React.Dispatch<React.SetStateAction<string | null>>;
};

type PetsContextProvider = {
  pets: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<PetContextType | null>(null);

const PetContextProvider = ({ pets: data, children }: PetsContextProvider) => {

  const [pets, setPets] = useState<Pet[] | []>(data);
  const [selectedPetID, setSelectedPetID] = useState<string | null>(null);
  
  return (
    <PetContext.Provider
      value={{ pets, setPets, selectedPetID, setSelectedPetID }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
