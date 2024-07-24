import { z } from "zod";

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Minimum 3 characters are required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  ownerName: z
    .string()
    .trim()
    .min(3, { message: "Minimum 3 characters are required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Field must contain a valid URL" }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive()
    .min(0, { message: "Age must be greater than 0" })
    .max(100),
  notes: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .max(1000, { message: "A note may contain up to 1000 characters only." }),
  ]),
});

export type TPetForm = z.infer<typeof petFormSchema>;
