"use client";
import { useState } from "react";
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
import { Edit } from "lucide-react";
import React from "react";

type TPetButton = {
  actionType: "add" | "edit" | "checkout";
  onClick?: () => void;
};

const PetButton = ({ actionType, onClick }: TPetButton) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const formOptions = { isFormOpen, setIsFormOpen };

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size={"icon"}>
              <PlusIcon className="h-9 w-9" />
            </Button>
          ) : (
            <Button variant={"secondary"}>Edit</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${actionType === "add" ? "Add a new Pet" : "Edit"}`}</DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => {
              setIsFormOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
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
