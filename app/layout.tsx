import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Prepwise",
  description: "AI-powered interview prep plan generator",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
