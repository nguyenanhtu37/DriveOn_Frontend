import { z } from "zod";

// validation schema for the form
export const formSchema = z.object({
  name: z.string().min(2, "Owner name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  workingHours: z
    .string()
    .min(10, "Working hours must be at least 10 characters"),
});
