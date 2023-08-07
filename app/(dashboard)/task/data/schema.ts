import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  label: z.string(),
  status: z.string(),
  employee: z.string(),
  total_price: z.string(),
  priority: z.string(),
  create: z.string(),
})

export type Task = z.infer<typeof taskSchema>