import { z } from "zod";

// validation schema for the form
export const formSchema = z.object({
  name: z.string().min(2, "Garage name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  openTime: z.string().nonempty("Open time is required"),
  closeTime: z.string().nonempty("Close time is required"),
  email: z.string().email("Invalid email address"),
});

export const staffSchema = z
  .object({
    name: z.string().min(2, "Garage name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const serviceSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const serviceDetailSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  serviceSystem: z.string().nonempty("Service system is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be at least 0"),
  duration: z.string().min(1, "Duration must be at least 1"),
  warranty: z.string().min(1, "Warranty must be at least 1"),
});
