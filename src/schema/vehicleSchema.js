import { z } from "zod";

export const vehicleSchema = z.object({
  carBrand: z.string().min(1, "Please select a brand."),
  carName: z.string().min(1, "Model is required."),
  carYear: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid year.")
    .refine((val) => {
      const year = parseInt(val, 10);
      return year >= 1900 && year <= new Date().getFullYear();
    }, "Please enter a valid year."),
  carColor: z.string().min(1, "Color is required."),
});