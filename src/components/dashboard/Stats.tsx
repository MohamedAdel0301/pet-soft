"use client";

import { usePetContext } from "@/hooks/usePets";

const Stats = () => {
  const { numberOfPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">Current Guests</p>
    </section>
  );
};

export default Stats;
