"use client"
import { useCompletion } from "@ai-sdk/react"
import { useState } from "react"

export default function Page() {
  const [jd, setJd] = useState("")
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/prep",
  })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Interview Prep Generator</h1>
      <textarea
        className="w-full h-48 border rounded p-3 mb-4 text-sm"
        placeholder="Paste job description here..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />
      <button
        disabled={isLoading || !jd}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        onClick={() => complete(jd)}
      >
        {isLoading ? "Generating..." : "Generate Prep Plan"}
      </button>
      {completion && (
        <div className="mt-8 whitespace-pre-wrap text-sm leading-relaxed">
          {completion}
        </div>
      )}
    </main>
  )
}
