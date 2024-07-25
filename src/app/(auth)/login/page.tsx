import React from "react";

import H1 from "@/components/misc/H1";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <main>
      <H1 className="text-center">Log in</H1>
      <AuthForm actionType="login" />

      <p className="text-center text-sm">
        No account yet?{" "}
        <Link
          href={"/signup"}
          className="mt-6 text-blue-500 visited:text-purple-600"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
