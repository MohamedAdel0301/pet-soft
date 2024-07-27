import { z } from "zod";

export const AuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().max(100),
});

export type TAuthForm = z.infer<typeof AuthFormSchema>;
