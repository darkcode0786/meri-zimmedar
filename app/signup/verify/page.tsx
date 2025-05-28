"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import SignupVerify from "@/components/signup-verify"
import { sendOTP } from "@/lib/auth-actions"

export default function SignupVerifyPage() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""
  const email = searchParams.get("email") || ""

  // Auto-send OTP if coming from unregistered phone number
  useEffect(() => {
    if (phone) {
      sendOTP(phone)
    }
  }, [phone])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignupVerify phone={phone} prefillEmail={email} />
    </main>
  )
}
