import type { PrepPlan } from "@/schemas/prep-plan"

type PrepPlanViewProps = {
  plan: PrepPlan
  onNewPlan: () => void
}

const WEEK_COLORS = [
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

export function PrepPlanView({ plan, onNewPlan }: PrepPlanViewProps) {
  return (
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
          onClick={onNewPlan}
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
          const color = WEEK_COLORS[i % WEEK_COLORS.length]

          return (
            <div
              key={`${week.weekNumber}-${i}`}
              style={{
                background: color.bg,
                border: `1.5px solid ${color.border}`,
                borderRadius: 14,
                padding: "1rem",
                boxShadow: `3px 3px 0 ${color.shadow}`,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: color.label,
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
                style={{
                  listStyle: "none",
                  padding: 0,
                  marginBottom: 8,
                }}
              >
                {week.dsa.problems.map((problem) => (
                  <li
                    key={problem}
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
                    {problem}
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
                {week.frontend.focus.map((focus) => (
                  <li
                    key={focus}
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
                    {focus}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {plan.weeks.map((week, i) => {
        const color = WEEK_COLORS[i % WEEK_COLORS.length]

        return (
          <div key={`${week.weekNumber}-${i}`} className="pw-card">
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: color.label,
                marginBottom: "1rem",
              }}
            >
              Week {week.weekNumber} · Daily breakdown
            </p>

            <div>
              {week.daily.map((day) => (
                <div
                  key={day.day}
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 12,
                  }}
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
                    {day.day}
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
                      {day.topic}
                    </p>

                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {day.tasks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
