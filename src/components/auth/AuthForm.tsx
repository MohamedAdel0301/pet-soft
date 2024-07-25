import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AuthFormInputStyles = "border-zinc-400";

const AuthForm = () => {
  return (
    <form className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className={AuthFormInputStyles} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" className={AuthFormInputStyles} />
      </div>

      <div className="w-full">
        <Button className="mx-auto mb-2 mt-4 block py-0 text-lg">Log in</Button>
      </div>
    </form>
  );
};

export default AuthForm;
