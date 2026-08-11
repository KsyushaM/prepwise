type PrepWeek = {
  weekNumber: number
  label: string
  dsa: { topic: string; problems: string[] }
  frontend: { topic: string; focus: string[] }
  daily: { day: string; topic: string; tasks: string }[]
}

export type PrepPlan = {
  role: string
  company: string | null
  weeks: PrepWeek[]
}
