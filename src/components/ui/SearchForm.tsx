"use client";

import { useSearchPets } from "@/hooks/useSearchPets";

const SearchForm = () => {
  const { handleChangeSearchText, searchQuery } = useSearchPets();
  return (
    <form className="h-full w-full">
      <input
        className="h-full w-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50"
        placeholder="search pets"
        type="search"
        value={searchQuery}
        onChange={(e) => handleChangeSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
