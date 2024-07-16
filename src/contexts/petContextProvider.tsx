"use client";
import { Pet } from "@/types/pet-types";
import React, { createContext, useState } from "react";

type PetContextType = {
  pets: Pet[] | [];
  setPets: React.Dispatch<React.SetStateAction<Pet[] | []>>;
  selectedPetID: string | null;
  handleChangeSelectedPetID: (id: string) => void;
  selectedPet?: Pet;
  numberOfPets: number;
  handleCheckoutPet: (id: string) => void;
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
  const handleAddPet = (newPet:Pet)=>{
    setPets(prev => [...prev,newPet])
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        selectedPetID,
        handleChangeSelectedPetID,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
