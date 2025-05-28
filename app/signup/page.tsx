"use client"

import { useSearchParams } from "next/navigation"
import SignupForm from "@/components/signup-form"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignupForm prefillEmail={email} />
    </main>
  )
}
