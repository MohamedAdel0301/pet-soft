import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

type TPetButton = {
  actionType: "add" | "edit" | "checkout";
};

const PetButton = ({ actionType }: TPetButton) => {
  if (actionType === "add") {
    return (
      <Button size={"icon"}>
        <PlusIcon className="h-9 w-9" />
      </Button>
    );
  }
  if (actionType === "edit") {
    return <Button variant={"secondary"}>Edit</Button>;
  }
  if (actionType === "checkout") {
    return <Button variant={"secondary"}>Checkout</Button>;
  }
};

export default PetButton;
