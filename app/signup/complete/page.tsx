"use client"

import { useSearchParams } from "next/navigation"
import SignupComplete from "@/components/signup-complete"

export default function SignupCompletePage() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""
  const email = searchParams.get("email") || ""

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignupComplete phone={phone} prefillEmail={email} />
    </main>
  )
}
