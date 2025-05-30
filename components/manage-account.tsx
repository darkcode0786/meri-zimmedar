"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/lib/auth-actions"

// Define the form schema with Zod
const resetPasswordSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (value) => {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // Phone validation (10 digits)
        const phoneRegex = /^\d{10}$/
        return emailRegex.test(value) || phoneRegex.test(value)
      },
      {
        message: "Enter valid 10-digit mobile number or e-mail ID",
      },
    ),
})

export default function ManageAccount({ activeTab = "profile" }: { activeTab?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      identifier: "",
    },
  })

  // Form submission handler
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsSubmitting(true)
    try {
      const result = await resetPassword(values.identifier)
      if (result.success) {
        // Redirect to reset password confirmation page
        router.push(
          `/authenticate?method=otp&identifier=${encodeURIComponent(values.identifier)}&action=reset-password`,
        )
      } else {
        // Handle validation errors
        if (result.errors?.identifier) {
          form.setError("identifier", { message: result.errors.identifier[0] })
        }
      }
    } catch (error) {
      console.error("Reset password error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-center mb-6">Manage Account</h2>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="reset-password">Reset Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <p className="text-center text-gray-500">Manage your profile settings here</p>
          {/* Profile management form would go here */}
        </TabsContent>

        <TabsContent value="reset-password" className="space-y-4 mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Phone Number or email ID" {...field} className="h-12 border-gray-300" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
                Reset Password
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
