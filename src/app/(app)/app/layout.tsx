import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/misc/BackgroundPattern";
import { Row } from "@/components/misc/Row";

import React from "react";
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <BackgroundPattern />

      <Row className="flex min-h-screen flex-col">
        <AppHeader />
        {children}
        <AppFooter />
      </Row>
    </React.Fragment>
  );
};

export default AppLayout;
