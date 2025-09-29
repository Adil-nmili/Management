import { z } from "zod"

export const departementSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  manager_id: z.string().min(1, "Manager is required"),
});