import { z } from "zod";

export const carOwnerSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters" }),
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, { message: "Password must include at least one letter and one number" }),
    address: z.string().min(1, { message: "Address is required" }),
    carModel: z.string().min(1, { message: "Car model is required" }),
    licensePlate: z.string().min(1, { message: "License plate is required" }),
});
