import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
