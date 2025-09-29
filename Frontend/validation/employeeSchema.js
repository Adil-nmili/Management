import { z } from "zod"

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Confirm your password"),
  address: z.string().min(1, "Address is required"),
  departement_id: z.string().min(1, "Departement is required"),
  position: z.string().min(1, "Position is required"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});