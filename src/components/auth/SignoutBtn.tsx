"use client";
import { logOut } from "@/actions/auth-actions";
import { Button } from "../ui/button";
import { useTransition } from "react";

const SignoutBtn = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignoutBtn;
