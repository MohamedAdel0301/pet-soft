"use client";
import { logOut } from "@/actions/auth-actions";
import { Button } from "../ui/button";

const SignoutBtn = () => {
  return <Button onClick={async () => await logOut()}>Sign Out</Button>;
};

export default SignoutBtn;
