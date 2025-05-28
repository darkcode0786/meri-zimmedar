"use server"

import { z } from "zod"

// Define the validation schema
const loginSchema = z.object({
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

export async function loginWithOTP(formData: FormData) {
  // Validate the form data
  const validatedFields = loginSchema.safeParse({
    identifier: formData.get("identifier"),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the form.",
    }
  }

  // Process the OTP login
  try {
    // Here you would implement your OTP sending logic
    // For example, send an OTP to the email or phone number

    return {
      success: true,
      message: "OTP sent successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to send OTP",
    }
  }
}

export async function loginWithPassword(formData: FormData) {
  // Validate the form data
  const validatedFields = loginSchema.safeParse({
    identifier: formData.get("identifier"),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check the form.",
    }
  }

  // Process the password login
  try {
    // Here you would implement your password authentication logic

    return {
      success: true,
      message: "Login successful",
    }
  } catch (error) {
    return {
      success: false,
      message: "Invalid credentials",
    }
  }
}
