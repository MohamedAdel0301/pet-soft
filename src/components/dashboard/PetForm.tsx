import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type TPetForm = {
  actionType: "add" | "edit";
};

const PetForm = ({ actionType }: TPetForm) => {
  return (
    <form className="flex flex-col">
      <section className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" type="text" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" type="text" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" className="max-h-28" rows={3} />
        </div>
      </section>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Submit" : "Edit"}
      </Button>
    </form>
  );
};

export default PetForm;
