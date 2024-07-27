"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const AuthFormBtn = ({ actionType }: { actionType: "signup" | "login" }) => {
  const { pending } = useFormStatus();
  return (
    <Button className="mx-auto mb-2 mt-4 block py-0 text-lg" disabled={pending}>
      {actionType === "login" ? "Log in" : "Sign up"}
    </Button>
  );
};

export default AuthFormBtn;
