import { logIn, signUp } from "@/actions/auth-actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthFormBtn from "./AuthFormBtn";

const AuthFormInputStyles = "border-zinc-400";

type TAuthForm = {
  actionType: "signup" | "login";
};

const AuthForm = ({ actionType }: TAuthForm) => {
  return (
    <form
      className="space-y-2"
      action={actionType === "login" ? logIn : signUp}
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className={AuthFormInputStyles}
          required
          maxLength={100}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          className={AuthFormInputStyles}
          required
          maxLength={100}
        />
      </div>

      <div className="w-full">
        <AuthFormBtn actionType={actionType} />
      </div>
    </form>
  );
};

export default AuthForm;
