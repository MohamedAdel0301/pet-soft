import React, { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PetForm from "./PetForm";

type TPetButton = {
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
};

const PetButton = ({ actionType, onClick }: TPetButton) => {
  if (actionType === "add") {
    return (
      <DialogTemplate header={"Add a new pet"} trigger={<AddButton />}>
        {<PetForm actionType="add" />}
      </DialogTemplate>
    );
  }

  if (actionType === "edit") {
    return (
      <DialogTemplate
        header={"Edit"}
        trigger={<Button variant={"secondary"}>Edit</Button>}
      >
        {<PetForm actionType="edit" />}
      </DialogTemplate>
    );
  }
  if (actionType === "checkout") {
    return (
      <Button variant={"secondary"} onClick={onClick}>
        Checkout
      </Button>
    );
  }
};

export default PetButton;

type TDialogTemplate = {
  header: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
};

function DialogTemplate({ header, trigger, children }: TDialogTemplate) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function AddButton() {
  return (
    <Button size={"icon"}>
      <PlusIcon className="h-9 w-9" />
    </Button>
  );
}
