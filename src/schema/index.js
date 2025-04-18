import { z } from "zod";

// validation schema for the form
export const formSchema = z.object({
  name: z.string().min(2, "Garage name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(
      /^(?:\+84|0)(?:\d{9}|\d{8})$/,
      "Phone number must contain only digits"
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  openTime: z.string().nonempty("Open time is required"),
  closeTime: z.string().nonempty("Close time is required"),
  email: z.string().email("Invalid email address"),
  openDays: z
    .array(
      z.object({
        value: z.string().nonempty("Day ID is required"),
        label: z.string().nonempty("Day name is required"),
      })
    )
    .nonempty("At least one open day is required"),
});

export const staffSchema = z
  .object({
    name: z.string().min(2, "Garage name must be at least 2 characters"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .regex(
        /^(?:\+84|0)(?:\d{9}|\d{8})$/,
        "Phone number must contain only digits"
      ),
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
  description: z
    .string()
    .min(100, "Description must be at least 100 characters"),
  price: z.string(),
  duration: z.string(),
  warranty: z.string().min(1, "Warranty must be at least 1"),
});

export const appointmentSchema = z.object({
  service: z
    .array(
      z.object({
        value: z.string().nonempty("Service ID is required"),
        label: z.string().nonempty("Service name is required"),
      })
    )
    .nonempty("At least one service is required"),
  date: z.string(),
  note: z.string().optional(),
  vehicle: z.object({
    value: z.string().nonempty("Vehicle ID is required"),
    label: z.string().nonempty("Vehicle name is required"),
  }),
});

export const vehicleSchema = z.object({
  carName: z.string().nonempty("Car name is required"),
  carPlate: z.string().nonempty("Car plate is required"),
  carYear: z.string().nonempty("Car year is required"),
  carColor: z.string().nonempty("Car color is required"),
  carBrand: z.object({
    value: z.string().nonempty("Brand ID is required"),
    label: z.string().nonempty("Brand name is required"),
  }),
  carImage: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string(),
  phone: z
    .string()
    .regex(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Phone number must contain only digits"
    ),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z.string().min(8, "New password is required"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

export const appointmentUpdate = z.object({
  updatedEndTime: z.string(),
  nextMaintenance: z.string().optional(),
});
