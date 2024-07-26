import AppFooter from "@/components/shared/AppFooter";
import AppHeader from "@/components/shared/AppHeader";
import BackgroundPattern from "@/components/misc/BackgroundPattern";
import { Row } from "@/components/misc/Row";
import PetContextProvider from "@/contexts/PetContextProvider";
import PetSearchContextProvider from "@/contexts/PetSearchContextProvider";
import React from "react";
import prisma from "@/lib/db";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkAuth, getPetsByUserID } from "@/lib/server-utils";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  
  const session = await checkAuth();
  const pets = await getPetsByUserID(session.user?.id);

  return (
    <React.Fragment>
      <BackgroundPattern />

      <Row className="flex min-h-screen flex-col">
        <AppHeader />
        <PetSearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </PetSearchContextProvider>
        <AppFooter />
      </Row>
      <Toaster position="top-right" />
    </React.Fragment>
  );
};

export default AppLayout;
