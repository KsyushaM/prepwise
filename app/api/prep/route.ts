import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export const maxDuration = 60

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

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
      "frontend": { "topic": "topic name", "focus": ["focus area 1", "focus area 2"] }
    }
  ],
  "daily": [
    { "day": "Mon", "topic": "topic", "tasks": "description" }
  ]
}`,
    prompt: `Generate a 4-week interview prep plan for this job description:\n\n${prompt}`,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
