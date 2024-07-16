"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePetContext } from "@/hooks/usePets";

type TPetForm = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: TPetForm) => {
  const { handleAddPet, selectedPet, handleChangePet, selectedPetID } =
    usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: +(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };
    if (actionType === "add") {
      handleAddPet(pet);
    }
    if (actionType === "edit") {
      handleChangePet(selectedPetID!, pet);
    }
    onFormSubmission();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <section className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={`${actionType === "edit" ? `${selectedPet?.name}` : ""}`}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={`${actionType === "edit" ? `${selectedPet?.ownerName}` : ""}`}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={`${actionType === "edit" ? `${selectedPet?.imageUrl ?? ""}` : ""}`}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={`${actionType === "edit" ? `${selectedPet?.age}` : ""}`}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            className="max-h-28"
            rows={3}
            required
            defaultValue={`${actionType === "edit" ? `${selectedPet?.notes}` : ""}`}
          />
        </div>
      </section>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Submit" : "Edit"}
      </Button>
    </form>
  );
};

export default PetForm;
