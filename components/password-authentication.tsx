"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { verifyPassword } from "@/lib/auth-actions"

// Define the form schema with Zod
const formSchema = z.object({
  password: z.string().min(1, { message: "Enter valid password" }),
  captcha: z.string().min(1, { message: "Enter valid Captcha" }),
})

export default function PasswordAuthentication({ identifier }: { identifier: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      captcha: "",
    },
  })

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await verifyPassword(identifier, values.password, values.captcha)
      if (result.success) {
        router.push("/dashboard")
      } else {
        // Handle validation errors
        if (result.errors?.password) {
          form.setError("password", { message: result.errors.password[0] })
        }
        if (result.errors?.captcha) {
          form.setError("captcha", { message: result.errors.captcha[0] })
        }
      }
    } catch (error) {
      console.error("Password verification error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold text-center mb-6">Authentication</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Enter Password"  className="h-12 border-gray-300" />
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

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
