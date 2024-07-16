import AppFooter from "@/components/shared/AppFooter";
import AppHeader from "@/components/shared/AppHeader";
import BackgroundPattern from "@/components/misc/BackgroundPattern";
import { Row } from "@/components/misc/Row";
import PetContextProvider from "@/contexts/PetContextProvider";
import PetSearchContextProvider from "@/contexts/PetSearchContextProvider";
import { Pet } from "@/types/pet-types";
import React from "react";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  );
  if (!res.ok) {
    throw new Error("failed to fetch pets data");
  }
  const pets: Pet[] = await res.json();

  return (
    <React.Fragment>
      <BackgroundPattern />

      <Row className="flex min-h-screen flex-col">
        <AppHeader />
        <PetSearchContextProvider>
          <PetContextProvider pets={pets}>{children}</PetContextProvider>
        </PetSearchContextProvider>
        <AppFooter />
      </Row>
    </React.Fragment>
  );
};

export default AppLayout;
