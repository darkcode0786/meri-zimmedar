"use client"

import { useSearchParams } from "next/navigation"
import OTPAuthentication from "@/components/otp-authentication"
import PasswordAuthentication from "@/components/password-authentication"

export default function AuthenticatePage() {
  const searchParams = useSearchParams()
  const method = searchParams.get("method")
  const identifier = searchParams.get("identifier") || ""

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      {method === "otp" ? (
        <OTPAuthentication identifier={identifier} />
      ) : (
        <PasswordAuthentication identifier={identifier} />
      )}
    </main>
  )
}
