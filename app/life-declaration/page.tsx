"use client"

import { useSearchParams } from "next/navigation"
import LifeDeclaration from "@/components/life-declaration"

export default function LifeDeclarationPage() {
  const searchParams = useSearchParams()
  const identifier = searchParams.get("identifier") || ""

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <LifeDeclaration identifier={identifier} />
    </main>
  )
}
