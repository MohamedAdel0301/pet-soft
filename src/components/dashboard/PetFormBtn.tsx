"use client";
import { Button } from "../ui/button";

type TPetFormBtn = {
  actionType: "add" | "edit";
};

const PetFormBtn = ({ actionType }: TPetFormBtn) => {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Submit" : "Edit"}
    </Button>
  );
};

export default PetFormBtn;
