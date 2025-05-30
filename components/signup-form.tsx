"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { sendOTP } from "@/lib/auth-actions"

// Define the form schema with Zod
const formSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "This field is required" })
    .regex(/^\d{10}$/, { message: "Enter valid 10-digit mobile number" }),
})

export default function SignupForm({ prefillEmail = "" }: { prefillEmail?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  })

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await sendOTP(values.phone)
      if (result.success) {
        router.push(
          `/signup/verify?phone=${encodeURIComponent(values.phone)}${prefillEmail ? `&email=${encodeURIComponent(prefillEmail)}` : ""}`,
        )
      } else {
        // Handle validation errors
        if (result.errors?.phone) {
          form.setError("phone", { message: result.errors.phone[0] })
        }
      }
    } catch (error) {
      console.error("Send OTP error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-center mb-2">Hi, looks you are new to Meri Zimmedari...!!!</h2>
      <p className="text-center text-gray-500 mb-6">Please enter your mobile number to continue</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter Mobile Number" {...field} className="h-12 border-gray-300" />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
            Send OTP
          </Button>
        </form>
      </Form>
    </div>
  )
}
