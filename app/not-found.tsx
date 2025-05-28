import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="relative mx-auto w-24 h-24 mb-4">
            <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
              <Home className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">404</h1>

        </div>

      </div>
    </div>
  )
}
