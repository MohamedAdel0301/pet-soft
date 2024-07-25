import { logIn } from "@/actions/auth-actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AuthFormInputStyles = "border-zinc-400";

type TAuthForm = {
  actionType: "signup" | "login";
};

const AuthForm = ({ actionType }: TAuthForm) => {
  return (
    <form className="space-y-2" action={logIn}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className={AuthFormInputStyles}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          className={AuthFormInputStyles}
        />
      </div>

      <div className="w-full">
        <Button className="mx-auto mb-2 mt-4 block py-0 text-lg">
          {actionType === "login" ? "Log in" : "Sign up"}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
