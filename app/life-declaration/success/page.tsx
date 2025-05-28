import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LifeDeclarationSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Declaration Submitted</h1>
        <p className="text-center text-gray-500 mb-6">Your life declaration has been successfully submitted.</p>
        <Link href="/" passHref>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Return to Login</Button>
        </Link>
      </div>
    </div>
  )
}
