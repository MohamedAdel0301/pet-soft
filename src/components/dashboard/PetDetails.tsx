"use client";
import { usePetContext } from "@/hooks/usePets";
import { Pet } from "@/types/pet-types";
import Image from "next/image";

const PetDetails = () => {
  const { selectedPet } = usePetContext();
  if (!selectedPet) return null;

  return (
    <section className="flex h-full w-full flex-col">
      <TopBar pet={selectedPet} />

      <section className="flex justify-around px-5 py-10">
        <PetDetailSection
          label={"Owner name"}
          content={selectedPet.ownerName}
        />
        <PetDetailSection label={"Age"} content={String(selectedPet.age)} />
      </section>

      <section className="border-LightBlack mx-8 mb-9 flex-1 rounded-md border bg-white px-7 py-5 shadow-sm">
        <span>{selectedPet.notes}</span>
      </section>
    </section>
  );
};

function TopBar({ pet }: { pet: Pet }) {
  return (
    <div className="border-LightBlack flex items-center border-b bg-white px-8 py-5">
      <Image
        src={pet.imageUrl}
        alt="selected Pet Image"
        width={75}
        height={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="ml-5 text-3xl font-semibold leading-7">{pet.name}</h2>
    </div>
  );
}

function PetDetailSection({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <div className="text-center">
      <h3 className="text-sm font-medium uppercase text-zinc-600">{label}</h3>
      <p className="mt-1 text-lg font-bold text-zinc-800">{content}</p>
    </div>
  );
}

export default PetDetails;
