import { PetContext } from "@/contexts/petContextProvider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used inside a PetContext boundary");
  }
  return context;
}
