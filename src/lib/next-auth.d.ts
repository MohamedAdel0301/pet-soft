import { User } from "next-auth";
//typescript declaration merging statement
declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}
