import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export const maxDuration = 60

export async function POST(req: Request) {
  const { prompt } = await req.json()
  const { profile, company, position, jd } = JSON.parse(prompt)

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: `You are an expert technical interview coach.
Return ONLY raw valid JSON with no markdown, no code fences, no backticks, no explanation, no preamble.
Start your response with { and end with }.

Return this exact shape:
{
  "role": "job title",
  "company": "company name or null",
  "weeks": [
    {
      "week": 1,
      "label": "short phase name",
      "dsa": { "topic": "topic name", "problems": ["problem 1", "problem 2"] },
      "frontend": { "topic": "topic name", "focus": ["focus area 1", "focus area 2"] },
      "daily": [
        { "day": "Mon", "topic": "topic", "tasks": "description" }
      ]
    }
  ]
}`,
    prompt: `Generate a ${profile.weeks}-week interview prep plan.

Candidate profile:
- Experience: ${profile.experience} years
- Weak areas: ${profile.weakAreas.join(", ") || "none specified"}
- Hours per day: ${profile.hoursPerDay}

Role: ${position} at ${company}

Job description:
${jd}`,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
