"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { verifyOTP } from "@/lib/auth-actions"

// Define the form schema with Zod
const formSchema = z.object({
  otp: z.string().min(4, { message: "Enter valid OTP" }).max(6),
  captcha: z.string().min(1, { message: "Enter valid Captcha" }),
})

export default function OTPAuthentication({ identifier }: { identifier: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(true)
  const [timer, setTimer] = useState(30)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      captcha: "",
    },
  })

  // Timer for resend OTP
  useEffect(() => {
    if (timer > 0 && resendDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0) {
      setResendDisabled(false)
    }
  }, [timer, resendDisabled])

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await verifyOTP(identifier, values.otp, values.captcha)
      if (result.success) {
        router.push("/dashboard")
      } else {
        // Handle validation errors
        if (result.errors?.otp) {
          form.setError("otp", { message: result.errors.otp[0] })
        }
        if (result.errors?.captcha) {
          form.setError("captcha", { message: result.errors.captcha[0] })
        }
      }
    } catch (error) {
      console.error("OTP verification error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      // Call API to resend OTP
      // await resendOTP(identifier)

      // Reset timer
      setTimer(30)
      setResendDisabled(true)
    } catch (error) {
      console.error("Resend OTP error:", error)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-center mb-6">Authentication</h2>
      <p className="text-center mb-6">Enter OTP shared on {identifier}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter OTP" {...field} className="h-12 border-gray-300" />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="Enter Captcha" {...field} className="h-12 border-gray-300" />
                    <div className="bg-gray-100 h-12 w-24 flex items-center justify-center text-gray-500 rounded-md">
                      Captcha
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <button
              type="button"
              className={`text-blue-600 text-sm ${resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
              onClick={handleResendOTP}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend OTP (${timer}s)` : "Resend OTP"}
            </button>
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
