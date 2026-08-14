"use client"
import { useCompletion } from "@ai-sdk/react"
import { useState } from "react"
import type { Profile } from "@/types/profile"
import type { PrepPlan } from "@/types/prep-plan"
import { ProfileForm } from "@/components/ProfileForm"
import { JobForm } from "@/components/JobForm"
import { PrepPlanView } from "@/components/PrepPlanView"

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
        <PrepPlanView plan={plan} onNewPlan={() => setStep("jd")} />
      )}
    </main>
  )
}
