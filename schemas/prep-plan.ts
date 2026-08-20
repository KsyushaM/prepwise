import { z } from "zod"

export const prepWeekSchema = z.object({
  weekNumber: z.number(),
  label: z.string(),
  dsa: z.object({
    topic: z.string(),
    problems: z.array(z.string()),
  }),
  frontend: z.object({
    topic: z.string(),
    focus: z.array(z.string()),
  }),
  daily: z.array(
    z.object({
      day: z.string(),
      topic: z.string(),
      tasks: z.string(),
    }),
  ),
})

export const prepPlanSchema = z.object({
  role: z.string(),
  company: z.string().nullable(),
  weeks: z.array(prepWeekSchema),
})

export type PrepWeek = z.infer<typeof prepWeekSchema>
export type PrepPlan = z.infer<typeof prepPlanSchema>
