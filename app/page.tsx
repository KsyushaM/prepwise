"use client"
import { useCompletion } from "@ai-sdk/react"
import { useState } from "react"

type Profile = {
  experience: string
  weakAreas: string[]
  hoursPerDay: string
  weeks: string
}

type Week = {
  week: number
  label: string
  dsa: { topic: string; problems: string[] }
  frontend: { topic: string; focus: string[] }
  daily: { day: string; topic: string; tasks: string }[]
}

type PrepPlan = {
  role: string
  company: string | null
  weeks: Week[]
}

const weekColors = [
  { bg: "bg-purple-50", border: "border-purple-200", label: "text-purple-600" },
  { bg: "bg-pink-50", border: "border-pink-200", label: "text-pink-600" },
  { bg: "bg-blue-50", border: "border-blue-200", label: "text-blue-600" },
  { bg: "bg-teal-50", border: "border-teal-200", label: "text-teal-600" },
  { bg: "bg-violet-50", border: "border-violet-200", label: "text-violet-600" },
  {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    label: "text-fuchsia-600",
  },
]

export default function Page() {
  const [step, setStep] = useState<"profile" | "jd" | "plan">("profile")
  const [profile, setProfile] = useState<Profile>({
    experience: "",
    weakAreas: [],
    hoursPerDay: "",
    weeks: "4",
  })
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [jd, setJd] = useState("")
  const [plan, setPlan] = useState<PrepPlan | null>(null)
  const [error, setError] = useState("")

  const { complete, isLoading } = useCompletion({
    api: "/api/prep",
    onFinish: (_, completion) => {
      try {
        const clean = completion.replace(/```json|```/g, "").trim()
        setPlan(JSON.parse(clean))
        setStep("plan")
        setError("")
      } catch {
        setError("Failed to parse response. Try again.")
      }
    },
  })

  const handleGenerate = () => {
    setPlan(null)
    setError("")
    complete(JSON.stringify({ profile, company, position, jd }))
  }

  const weakAreaOptions = ["DSA", "Frontend", "System Design", "Behavioral"]

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">✦</span>
        </div>
        <span
          style={{ fontFamily: "Fraunces, serif" }}
          className="text-lg font-bold"
        >
          Prepwise
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        Paste a job description and get a personalized interview prep plan.
      </p>

      {/* Step 1: Profile */}
      {step === "profile" && (
        <div className="border border-purple-100 rounded-xl p-6 bg-white space-y-5 shadow-[3px_3px_0px_#ddd0f0]">
          <h2
            style={{ fontFamily: "Fraunces, serif" }}
            className="font-bold text-gray-900"
          >
            Tell us about yourself
          </h2>

          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">
              Years of experience
            </label>
            <select
              className="w-full border rounded-lg p-2 text-sm text-gray-700"
              value={profile.experience}
              onChange={(e) =>
                setProfile({ ...profile, experience: e.target.value })
              }
            >
              <option value="">Select...</option>
              <option value="0-1">0–1 years</option>
              <option value="1-3">1–3 years</option>
              <option value="3-5">3–5 years</option>
              <option value="5-10">5–10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">
              Weak areas
            </label>
            <div className="flex gap-2 flex-wrap">
              {weakAreaOptions.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    const already = profile.weakAreas.includes(area)
                    setProfile({
                      ...profile,
                      weakAreas: already
                        ? profile.weakAreas.filter((a) => a !== area)
                        : [...profile.weakAreas, area],
                    })
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                    profile.weakAreas.includes(area)
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">
              Hours per day
            </label>
            <select
              className="w-full border rounded-lg p-2 text-sm text-gray-700"
              value={profile.hoursPerDay}
              onChange={(e) =>
                setProfile({ ...profile, hoursPerDay: e.target.value })
              }
            >
              <option value="">Select...</option>
              <option value="0.5">30 min</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3+ hours</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-2">
              Prep timeline
            </label>
            <div className="flex gap-2">
              {["2", "4", "6"].map((w) => (
                <button
                  key={w}
                  onClick={() => setProfile({ ...profile, weeks: w })}
                  className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                    profile.weeks === w
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {w} weeks
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!profile.experience || !profile.hoursPerDay}
            onClick={() => setStep("jd")}
            className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-40"
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: JD Input */}
      {step === "jd" && (
        <div className="border rounded-xl p-5 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Job details</h2>
            <button
              onClick={() => setStep("profile")}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ← Edit profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1">
                Company
              </label>
              <input
                className="w-full border rounded-lg p-2 text-sm text-gray-700"
                placeholder="e.g. Stripe"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1">
                Position
              </label>
              <input
                className="w-full border rounded-lg p-2 text-sm text-gray-700"
                placeholder="e.g. Senior Frontend Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block mb-1">
              Job description
            </label>
            <textarea
              className="w-full h-48 border rounded-lg p-3 text-sm text-gray-700 resize-none"
              placeholder="Paste the full job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            disabled={isLoading || !jd}
            onClick={handleGenerate}
            className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-40"
          >
            {isLoading ? "Generating..." : "✦ Generate prep plan"}
          </button>
        </div>
      )}

      {/* Step 3: Plan */}
      {step === "plan" && plan && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="border rounded-xl p-4 bg-white flex-1 mr-3">
              <p className="font-medium text-gray-900">{plan.role}</p>
              {plan.company && (
                <p className="text-sm text-gray-400">{plan.company}</p>
              )}
            </div>
            <button
              onClick={() => setStep("jd")}
              className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap"
            >
              ← New plan
            </button>
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

          {plan.weeks.map((week, i) => (
            <div key={week.week} className="border rounded-xl p-4 bg-white">
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-3 ${weekColors[i % weekColors.length].label}`}
              >
                Week {week.week} · Daily breakdown
              </p>
              <div className="space-y-3">
                {week.daily.map((d) => (
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
          ))}
        </div>
      )}
    </main>
  )
}
