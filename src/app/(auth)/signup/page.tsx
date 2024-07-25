import AuthForm from "@/components/auth/AuthForm";
import H1 from "@/components/misc/H1";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <main>
      <H1 className="text-center">Log in</H1>
      <AuthForm actionType="signup" />

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="mt-6 text-blue-500 visited:text-purple-600"
        >
          Log in
        </Link>
      </p>
    </main>
  );
};

export default SignUpPage;
