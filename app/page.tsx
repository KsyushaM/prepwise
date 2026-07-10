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

  const weakAreaOptions = ["DSA", "Frontend", "System Design", "Behavioral"]

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
        <div className="pw-card" style={{ padding: "1.5rem" }}>
          <h2
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--text-dark)",
              marginBottom: "1.5rem",
            }}
          >
            Tell us about yourself
          </h2>

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="pw-label">Years of experience</label>
            <select
              style={{
                width: "100%",
                border: "1.5px solid var(--card-border)",
                borderRadius: 10,
                padding: "8px 12px",
                fontSize: 14,
                color: "var(--text-dark)",
                background: "#fff",
                outline: "none",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b09ac8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
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

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="pw-label">Weak areas</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                    border: "1.5px solid",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif",
                    background: profile.weakAreas.includes(area)
                      ? "var(--accent)"
                      : "#fff",
                    color: profile.weakAreas.includes(area)
                      ? "#fff"
                      : "var(--text-muted)",
                    borderColor: profile.weakAreas.includes(area)
                      ? "var(--accent)"
                      : "var(--card-border)",
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="pw-label">Hours per day</label>
            <select
              style={{
                width: "100%",
                border: "1.5px solid var(--card-border)",
                borderRadius: 10,
                padding: "8px 12px",
                fontSize: 14,
                color: "var(--text-dark)",
                background: "#fff",
                outline: "none",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b09ac8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
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

          <div style={{ marginBottom: "1.5rem" }}>
            <label className="pw-label">Prep timeline</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["2", "4", "6"].map((w) => (
                <button
                  key={w}
                  onClick={() => setProfile({ ...profile, weeks: w })}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: 10,
                    fontSize: 13,
                    border: "1.5px solid",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif",
                    background: profile.weeks === w ? "var(--accent)" : "#fff",
                    color: profile.weeks === w ? "#fff" : "var(--text-muted)",
                    borderColor:
                      profile.weeks === w
                        ? "var(--accent)"
                        : "var(--card-border)",
                  }}
                >
                  {w} weeks
                </button>
              ))}
            </div>
          </div>

          <button
            className="pw-btn pw-btn-full"
            disabled={!profile.experience || !profile.hoursPerDay}
            onClick={() => setStep("jd")}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: JD */}
      {step === "jd" && (
        <div className="pw-card" style={{ padding: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text-dark)",
              }}
            >
              Job details
            </h2>
            <button
              onClick={() => setStep("profile")}
              style={{
                fontSize: 12,
                color: "var(--text-label)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ← Edit profile
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
            <div>
              <label className="pw-label">Company</label>
              <input
                style={{
                  width: "100%",
                  border: "1.5px solid var(--card-border)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: 14,
                  color: "var(--text-dark)",
                  outline: "none",
                }}
                placeholder="e.g. Stripe"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="pw-label">Position</label>
              <input
                style={{
                  width: "100%",
                  border: "1.5px solid var(--card-border)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontSize: 14,
                  color: "var(--text-dark)",
                  outline: "none",
                }}
                placeholder="e.g. Senior Frontend Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label className="pw-label">Job description</label>
            <textarea
              style={{
                width: "100%",
                height: 180,
                border: "1.5px solid var(--card-border)",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 14,
                color: "var(--text-dark)",
                outline: "none",
                resize: "none",
                fontFamily: "DM Sans, sans-serif",
              }}
              placeholder="Paste the full job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>

          {error && (
            <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 8 }}>
              {error}
            </p>
          )}

          <button
            className="pw-btn pw-btn-full"
            disabled={isLoading || !jd}
            onClick={handleGenerate}
          >
            {isLoading ? "Generating..." : "✦ Generate prep plan"}
          </button>
        </div>
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
                  key={week.week}
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
                    Week {week.week}
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
              <div key={week.week} className="pw-card">
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
                  Week {week.week} · Daily breakdown
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
