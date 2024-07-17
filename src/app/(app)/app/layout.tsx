import AppFooter from "@/components/shared/AppFooter";
import AppHeader from "@/components/shared/AppHeader";
import BackgroundPattern from "@/components/misc/BackgroundPattern";
import { Row } from "@/components/misc/Row";
import PetContextProvider from "@/contexts/PetContextProvider";
import PetSearchContextProvider from "@/contexts/PetSearchContextProvider";
import React from "react";
import prisma from "@/lib/db";
import { Toaster } from "sonner";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const pets = await prisma.pet.findMany();

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
      <Toaster position="top-right"/>
    </React.Fragment>
  );
};

export default AppLayout;
