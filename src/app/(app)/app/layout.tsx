import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/misc/BackgroundPattern";

import React from "react";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <BackgroundPattern />
      <AppHeader />
      {children}
      <AppFooter />
    </React.Fragment>
  );
};

export default AppLayout;
