import { User } from "next-auth";
//typescript declaration merging statement
declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    hasAccess: boolean;
  }
}

declare module "next-auth" {
  interface User {
    hasAccess: boolean;
  }
  interface Session {
    user: User & {
      id: string;
      hasAccess: boolean;
    };
  }
}
