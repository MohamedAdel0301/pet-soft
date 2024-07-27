"use client";
import { logIn, signUp } from "@/actions/auth-actions";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AuthFormBtn from "./AuthFormBtn";
import { useFormState } from "react-dom";

const AuthFormInputStyles = "border-zinc-400";

type TAuthForm = {
  actionType: "signup" | "login";
};

const AuthForm = ({ actionType }: TAuthForm) => {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [loginError, dispatchLogin] = useFormState(logIn, undefined);
  return (
    <form
      className="space-y-2"
      action={actionType === "login" ? dispatchLogin : dispatchSignUp}
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
      {signUpError && <p className="text-red-500">{signUpError.message}</p>}
      {loginError && <p className="text-red-500">{loginError.message}</p>}
    </form>
  );
};

export default AuthForm;
