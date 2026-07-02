"use client"
import { useCompletion } from "@ai-sdk/react"
import { useState } from "react"

type Week = {
  week: number
  label: string
  dsa: { topic: string; problems: string[] }
  frontend: { topic: string; focus: string[] }
}

type DailyItem = {
  day: string
  topic: string
  tasks: string
}

type PrepPlan = {
  role: string
  company: string | null
  weeks: Week[]
  daily: DailyItem[]
}

const weekColors = [
  { bg: "bg-blue-50", border: "border-blue-200", label: "text-blue-600" },
  { bg: "bg-green-50", border: "border-green-200", label: "text-green-600" },
  { bg: "bg-amber-50", border: "border-amber-200", label: "text-amber-600" },
  { bg: "bg-purple-50", border: "border-purple-200", label: "text-purple-600" },
]

export default function Page() {
  const [jd, setJd] = useState("")
  const [plan, setPlan] = useState<PrepPlan | null>(null)
  const [error, setError] = useState("")

  const { complete, isLoading } = useCompletion({
    api: "/api/prep",
    onFinish: (_, completion) => {
      try {
        setPlan(JSON.parse(completion))
        setError("")
      } catch {
        setError("Failed to parse response. Try again.")
      }
    },
  })

  const handleGenerate = () => {
    setPlan(null)
    setError("")
    complete(jd)
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">P</span>
        </div>
        <span className="text-lg font-semibold">Prepwise</span>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        Paste a job description and get a personalized interview prep plan.
      </p>

      <div className="border rounded-xl p-4 mb-4 bg-white">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">
          Job description
        </label>
        <textarea
          className="w-full h-36 text-sm text-gray-700 resize-none outline-none placeholder-gray-300"
          placeholder="Paste the full job description here — role requirements, tech stack, qualifications..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <span className="text-xs text-gray-400">
            Works best with full JD including requirements
          </span>
          <button
            disabled={isLoading || !jd}
            onClick={handleGenerate}
            className="bg-black text-white text-sm px-4 py-2 rounded-lg disabled:opacity-40 flex items-center gap-2"
          >
            {isLoading ? "Generating..." : "✦ Generate plan"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {plan && (
        <div className="space-y-4">
          <div className="border rounded-xl p-4 bg-white">
            <p className="font-medium text-gray-900">{plan.role}</p>
            {plan.company && (
              <p className="text-sm text-gray-400">{plan.company}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {plan.weeks.map((week, i) => {
              const color = weekColors[i % weekColors.length]
              return (
                <div
                  key={week.week}
                  className={`border rounded-xl p-4 ${color.bg} ${color.border}`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-1 ${color.label}`}
                  >
                    Week {week.week}
                  </p>
                  <p className="font-medium text-gray-900 text-sm mb-3">
                    {week.label}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    DSA · {week.dsa.topic}
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5 mb-3">
                    {week.dsa.problems.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Frontend · {week.frontend.topic}
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {week.frontend.focus.map((f) => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <p className="font-medium text-gray-900 mb-3">Daily breakdown</p>
            <div className="space-y-3">
              {plan.daily.map((d) => (
                <div key={d.day} className="flex gap-3">
                  <span className="text-xs font-semibold text-gray-400 w-8 pt-0.5 shrink-0">
                    {d.day}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {d.topic}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{d.tasks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
