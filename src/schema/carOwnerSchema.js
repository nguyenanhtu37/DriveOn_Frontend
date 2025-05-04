import { z } from "zod";

export const carOwnerSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is not in a valid format" }), // Use .email() instead of .regex()
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /(84|0[3|5|7|8|9])([0-9]{8})\b/.test(val), // Simplified regex
        { message: "Phone number is invalid" }
      ),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match",
    path: ["confirmPassword"],
  });