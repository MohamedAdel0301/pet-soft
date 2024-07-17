"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type TPetFormBtn = {
  actionType: "add" | "edit";
};

const PetFormBtn = ({ actionType }: TPetFormBtn) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {actionType === "add" ? "Submit" : "Edit"}
    </Button>
  );
};

export default PetFormBtn;
