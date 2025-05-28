"use client"

import { useSearchParams } from "next/navigation"
import ManageAccount from "@/components/manage-account"

export default function ManageAccountPage() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "profile"

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <ManageAccount activeTab={tab} />
    </main>
  )
}
