import { z } from "zod"

export const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    employee_id: z.coerce.number({ invalid_type_error: "Employee is required" }),
    status: z.string().min(1, "Status is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    priority: z.string().min(1, "Priority is required"),
    progress: z.coerce.number({ invalid_type_error: "Progress is required" }),
    notes: z.string().min(1, "Notes is required"),
    attachments: z.string().min(1, "Attachments is required"),
  })
  .refine((data) => {
    const start = new Date(data.start_date)
    const end = new Date(data.end_date)
    return !isNaN(start.getTime()) && !isNaN(end.getTime()) && start < end
  }, {
    message: "Start date must be before end date",
    path: ["start_date", "end_date"],
  })
  .refine((data) => data.progress >= 0 && data.progress <= 100, {
    message: "Progress must be between 0 and 100",
    path: ["progress"],
  })