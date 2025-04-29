import { z } from "zod";

// Regex for common Vietnamese license plate formats (more comprehensive)
const vietnamesePlateRegex = /^\d{2}[A-Z]{1,2}[-\s]?\d{4,5}$/;

export const vehicleSchema = z.object({
  carBrand: z.object({
    value: z.string().nonempty("Brand ID is required"),
    label: z.string().nonempty("Brand name is required"),
  }),
  carName: z.string().min(1, "Model is required."),
  carYear: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid year.")
    .refine((val) => {
      const year = parseInt(val, 10);
      return year >= 1900 && year <= new Date().getFullYear();
    }, "Please enter a valid year."),
  carColor: z.string().min(1, "Color is required."),
  carPlate: z
    .string()
    .min(1, "Please enter the license plate.")
    .regex(vietnamesePlateRegex, "Please enter a valid Vietnamese license plate."),
});

export const updateVehicleSchema = z.object({
  carBrand: z
    .object({
      value: z.string().nonempty("Brand ID is required"),
      label: z.string().nonempty("Brand name is required"),
    })
    .optional(),
  carName: z.string().min(1, "Model is required.").optional(),
  carYear: z
    .string()
    .regex(/^\d{4}$/, "Please enter a valid year.")
    .refine((val) => {
      const year = parseInt(val, 10);
      return year >= 1900 && year <= new Date().getFullYear();
    }, "Please enter a valid year.")
    .optional(),
  carColor: z.string().min(1, "Color is required.").optional(),
  carPlate: z
    .string()
    .min(1, "Please enter the license plate.")
    .regex(vietnamesePlateRegex, "Please enter a valid Vietnamese license plate.")
    .optional(),
}); 