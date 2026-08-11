"use client"
import { useState } from "react"
import type { Profile } from "@/types/profile"

type ProfileFormProps = {
  onContinue: () => void
}

export function ProfileForm({ onContinue }: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>({
    experience: "",
    weakAreas: [],
    hoursPerDay: "",
    weeks: "4",
  })

  const weakAreaOptions = ["DSA", "Frontend", "System Design", "Behavioral"]

  return (
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
                  profile.weeks === w ? "var(--accent)" : "var(--card-border)",
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
        onClick={onContinue}
      >
        Continue →
      </button>
    </div>
  )
}
