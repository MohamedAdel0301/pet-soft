import {} from "next-auth";
//typescript declaration merging statement
declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}
