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
    system: "You are an expert technical interview coach.",
    prompt: `Given this job description, create a focused 4-week interview prep plan covering DSA topics and frontend concepts relevant to this role. Be specific and actionable.

Job Description:
${prompt}`,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
