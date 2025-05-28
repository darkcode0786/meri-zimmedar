"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { submitLifeDeclaration } from "@/lib/auth-actions"

export default function LifeDeclaration({ identifier }: { identifier: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Form submission handler
  async function onSubmit() {
    if (!imageFile) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("image", imageFile)
      formData.append("identifier", identifier)

      const result = await submitLifeDeclaration(formData)
      if (result.success) {
        // Redirect to success page or logout
        router.push("/life-declaration/success")
      }
    } catch (error) {
      console.error("Life declaration submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-center mb-6">Life Declaration</h2>
      <p className="text-center text-gray-500 mb-6">Please upload a clear photo of yourself to verify your identity</p>

      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
          {previewUrl ? (
            <div className="relative w-full">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={() => {
                  setImageFile(null)
                  setPreviewUrl(null)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>

        <Button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting || !imageFile}
          onClick={onSubmit}
        >
          Submit Declaration
        </Button>
      </div>
    </div>
  )
}
