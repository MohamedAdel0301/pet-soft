"use client";
import { usePetContext } from "@/hooks/usePets";
import Image from "next/image";

const PetList = () => {
  const { pets } = usePetContext();
  return (
    <ul className="border-b border-black/[0.08] bg-white">
      {pets.map((pet) => (
        <li key={`pet-${pet.name}-${pet.id}`}>
          <button className="flex h-[70px] w-full cursor-pointer items-center gap-3 px-5 text-base transition hover:bg-offWhite/70 focus:bg-offWhite/70">
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
                <span className="font-semibold">{pet.ownerName}</span>
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
