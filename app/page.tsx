"use client"
import { useCompletion } from "@ai-sdk/react"
import { useState } from "react"
import type { Profile } from "@/types/profile"
import type { PrepPlan } from "@/types/prep-plan"
import { ProfileForm } from "@/components/ProfileForm"
import { JobForm } from "@/components/JobForm"

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

  const [lastInput, setLastInput] = useState<string | null>(null)

  const handleGenerate = () => {
    const currentInput = JSON.stringify({ profile, company, position, jd })

    if (currentInput === lastInput && plan) {
      setStep("plan")
      return
    }

    setPlan(null)
    setError("")
    setLastInput(currentInput)
    complete(currentInput)
  }

  return (
    <main style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "var(--accent)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 12 }}>✦</span>
        </div>
        <span
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 26,
            fontWeight: 900,
            color: "var(--text-dark)",
          }}
        >
          Prepwise
        </span>
      </div>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          marginBottom: "2rem",
        }}
      >
        Paste a job description and get a personalized interview prep plan.
      </p>

      {/* Step 1: Profile */}
      {step === "profile" && (
        <ProfileForm
          profile={profile}
          onChange={setProfile}
          onContinue={() => setStep("jd")}
        />
      )}

      {/* Step 2: JD */}
      {step === "jd" && (
        <JobForm
          company={company}
          position={position}
          jd={jd}
          error={error}
          isLoading={isLoading}
          onCompanyChange={setCompany}
          onPositionChange={setPosition}
          onJdChange={setJd}
          onGenerate={handleGenerate}
          onBack={() => setStep("profile")}
        />
      )}

      {/* Step 3: Plan */}
      {step === "plan" && plan && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              className="pw-card"
              style={{ flex: 1, marginRight: 12, marginBottom: 0 }}
            >
              <p
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text-dark)",
                }}
              >
                {plan.role}
              </p>
              {plan.company && (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-label)",
                    marginTop: 2,
                  }}
                >
                  {plan.company}
                </p>
              )}
            </div>
            <button
              onClick={() => setStep("jd")}
              style={{
                fontSize: 12,
                color: "var(--text-label)",
                background: "none",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              ← New plan
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: "1rem",
            }}
          >
            {plan.weeks.map((week, i) => {
              const colors = [
                {
                  bg: "#F3EEFF",
                  border: "#D4B8FF",
                  shadow: "#D4B8FF",
                  label: "#7C3AED",
                },
                {
                  bg: "#FFF0F8",
                  border: "#FFB8DC",
                  shadow: "#FFB8DC",
                  label: "#C0407A",
                },
                {
                  bg: "#EEF4FF",
                  border: "#C5D8FF",
                  shadow: "#C5D8FF",
                  label: "#3B6FD4",
                },
                {
                  bg: "#EEFAF8",
                  border: "#B8EDE8",
                  shadow: "#B8EDE8",
                  label: "#2A9E90",
                },
                {
                  bg: "#FFFBEE",
                  border: "#FFE8A0",
                  shadow: "#FFE8A0",
                  label: "#B07A10",
                },
                {
                  bg: "#FFF0F0",
                  border: "#FFB8B8",
                  shadow: "#FFB8B8",
                  label: "#C04040",
                },
              ]
              const c = colors[i % colors.length]
              return (
                <div
                  key={week.weekNumber}
                  style={{
                    background: c.bg,
                    border: `1.5px solid ${c.border}`,
                    borderRadius: 14,
                    padding: "1rem",
                    boxShadow: `3px 3px 0 ${c.shadow}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: c.label,
                      marginBottom: 3,
                    }}
                  >
                    Week {week.weekNumber}
                  </p>
                  <p
                    style={{
                      fontFamily: "Fraunces, serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-dark)",
                      marginBottom: 10,
                    }}
                  >
                    {week.label}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 4,
                    }}
                  >
                    DSA · {week.dsa.topic}
                  </p>
                  <ul
                    style={{ listStyle: "none", padding: 0, marginBottom: 8 }}
                  >
                    {week.dsa.problems.map((p) => (
                      <li
                        key={p}
                        style={{
                          fontSize: 11,
                          color: "#3d2860",
                          lineHeight: 1.6,
                          paddingLeft: 12,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 4,
                            fontSize: 7,
                            color: "var(--accent)",
                          }}
                        >
                          ✦
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 4,
                    }}
                  >
                    Frontend · {week.frontend.topic}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {week.frontend.focus.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontSize: 11,
                          color: "#3d2860",
                          lineHeight: 1.6,
                          paddingLeft: 12,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 4,
                            fontSize: 7,
                            color: "var(--accent)",
                          }}
                        >
                          ✦
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {plan.weeks.map((week, i) => {
            const labelColors = [
              "#7C3AED",
              "#C0407A",
              "#3B6FD4",
              "#2A9E90",
              "#B07A10",
              "#C04040",
            ]
            return (
              <div key={week.weekNumber} className="pw-card">
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: labelColors[i % labelColors.length],
                    marginBottom: "1rem",
                  }}
                >
                  Week {week.weekNumber} · Daily breakdown
                </p>
                <div>
                  {week.daily.map((d) => (
                    <div
                      key={d.day}
                      style={{ display: "flex", gap: 12, marginBottom: 12 }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: "var(--text-label)",
                          width: 28,
                          paddingTop: 2,
                          flexShrink: 0,
                        }}
                      >
                        {d.day}
                      </span>
                      <div>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "var(--text-dark)",
                            marginBottom: 2,
                          }}
                        >
                          {d.topic}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {d.tasks}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
