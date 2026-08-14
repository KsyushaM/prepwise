"use client"

type JobFormProps = {
  company: string
  position: string
  jd: string
  error: string | null
  isLoading: boolean

  onCompanyChange: (value: string) => void
  onPositionChange: (value: string) => void
  onJdChange: (value: string) => void

  onGenerate: () => void
  onBack: () => void
}

export function JobForm({
  company,
  position,
  jd,
  error,
  isLoading,
  onCompanyChange,
  onPositionChange,
  onJdChange,
  onGenerate,
  onBack,
}: JobFormProps) {
  return (
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
          onClick={onBack}
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
            onChange={(e) => onCompanyChange(e.target.value)}
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
            onChange={(e) => onPositionChange(e.target.value)}
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
          onChange={(e) => onJdChange(e.target.value)}
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
        onClick={onGenerate}
      >
        {isLoading ? "Generating..." : "✦ Generate prep plan"}
      </button>
    </div>
  )
}
