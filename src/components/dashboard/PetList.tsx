"use client";
import { usePetContext } from "@/hooks/usePets";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSearchPets } from "@/hooks/useSearchPets";

const PetList = () => {
  const { pets, handleChangeSelectedPetID, selectedPetID } = usePetContext();
  const { searchQuery } = useSearchPets();

  const filteredPets = pets.filter((pet) => {
    if (searchQuery) {
      return pet.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <ul className=" border-b border-LightBlack bg-white">
      {filteredPets.map((pet) => (
        <li key={`pet-${pet.name}-${pet.id}`}>
          <button
            className={cn(
              `flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-offWhite/70 focus:bg-offWhite/70`,
              "",
              {
                "bg-offWhite/70": selectedPetID === pet.id,
              },
            )}
            onClick={() => handleChangeSelectedPetID(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              height={45}
              width={45}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-start font-semibold">{pet.name}</p>
              <p className="text-start text-xs">
                <span className="font-medium">{pet.ownerName}</span>
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
