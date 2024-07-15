"use client";
import { createContext, useState } from "react";

type TSearchContext = {
  searchQuery?: string;
  handleChangeSearchText: (text: string) => void;
};

type TSearchProvider = {
  children: React.ReactNode;
};

export const SearchContext = createContext<TSearchContext | null>(null);

const PetSearchContextProvider = ({ children }: TSearchProvider) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChangeSearchText = (text: string) => {
    setSearchQuery(() => text);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleChangeSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

export default PetSearchContextProvider;
