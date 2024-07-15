import { SearchContext } from "@/contexts/PetSearchContextProvider";
import { useContext } from "react";

export function useSearchPets() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchPets should be used within a SearchContext");
  }
  return context;
}
