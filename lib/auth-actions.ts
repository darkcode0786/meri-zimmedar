"use server"

import { z } from "zod"

// Define validation schemas
const identifierSchema = z
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
  )

const phoneSchema = z
  .string()
  .min(1, { message: "This field is required" })
  .regex(/^\d{10}$/, { message: "Enter valid 10-digit mobile number" })

const otpSchema = z.string().min(4, { message: "Enter valid OTP" }).max(6)
const captchaSchema = z.string().min(1, { message: "Enter valid Captcha" })
const passwordSchema = z.string().min(1, { message: "Enter valid password" })
const nameSchema = z.string().min(1, { message: "Name is required" })
const emailSchema = z.string().email({ message: "Please enter a valid email" })

// Mock database for demonstration
const mockUsers = [
  { id: 1, phone: "1234567890", email: "user@example.com", name: "Test User", password: "password123" },
]

// Check if user exists
export async function checkUserExists(identifier: string) {
  try {
    // Validate identifier
    const validatedIdentifier = identifierSchema.safeParse(identifier)
    if (!validatedIdentifier.success) {
      return false
    }

    // Check if user exists in mock database
    const user = mockUsers.find((user) => user.phone === identifier || user.email === identifier)

    return !!user
  } catch (error) {
    console.error("Error checking user:", error)
    return false
  }
}

// Social login
export async function loginWithSocial(provider: "google" | "facebook") {
  // In a real app, this would redirect to the OAuth flow
  return { success: true }
}

// Send OTP
export async function sendOTP(phone: string) {
  try {
    // Validate phone
    const validatedPhone = phoneSchema.safeParse(phone)
    if (!validatedPhone.success) {
      return {
        success: false,
        errors: {
          phone: ["Enter valid 10-digit mobile number"],
        },
      }
    }

    // In a real app, this would send an OTP to the phone number
    console.log(`Sending OTP to ${phone}`)

    return { success: true }
  } catch (error) {
    console.error("Error sending OTP:", error)
    return {
      success: false,
      message: "Failed to send OTP",
    }
  }
}

// Resend OTP
export async function resendOTP(phone: string) {
  return sendOTP(phone)
}

// Verify OTP for login
export async function verifyOTP(identifier: string, otp: string, captcha: string) {
  try {
    // Validate inputs
    const validatedIdentifier = identifierSchema.safeParse(identifier)
    const validatedOTP = otpSchema.safeParse(otp)
    const validatedCaptcha = captchaSchema.safeParse(captcha)

    const errors: Record<string, string[]> = {}

    if (!validatedIdentifier.success) {
      errors.identifier = ["Enter valid 10-digit mobile number or e-mail ID"]
    }

    if (!validatedOTP.success) {
      errors.otp = ["Enter valid OTP"]
    }

    if (!validatedCaptcha.success) {
      errors.captcha = ["Enter valid Captcha"]
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      }
    }

    // In a real app, this would verify the OTP
    // For demo, we'll assume OTP "123456" is valid
    if (otp !== "123456") {
      return {
        success: false,
        errors: {
          otp: ["Enter valid OTP"],
        },
      }
    }

    // For demo, we'll assume captcha "CAPTCHA" is valid
    if (captcha !== "CAPTCHA") {
      return {
        success: false,
        errors: {
          captcha: ["Enter valid Captcha"],
        },
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return {
      success: false,
      message: "Failed to verify OTP",
    }
  }
}

// Verify password
export async function verifyPassword(identifier: string, password: string, captcha: string) {
  try {
    // Validate inputs
    const validatedIdentifier = identifierSchema.safeParse(identifier)
    const validatedPassword = passwordSchema.safeParse(password)
    const validatedCaptcha = captchaSchema.safeParse(captcha)

    const errors: Record<string, string[]> = {}

    if (!validatedIdentifier.success) {
      errors.identifier = ["Enter valid 10-digit mobile number or e-mail ID"]
    }

    if (!validatedPassword.success) {
      errors.password = ["Enter valid password"]
    }

    if (!validatedCaptcha.success) {
      errors.captcha = ["Enter valid Captcha"]
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      }
    }

    // Check if user exists and password matches
    const user = mockUsers.find(
      (user) => (user.phone === identifier || user.email === identifier) && user.password === password,
    )

    if (!user) {
      return {
        success: false,
        errors: {
          password: ["Invalid credentials"],
        },
      }
    }

    // For demo, we'll assume captcha "CAPTCHA" is valid
    if (captcha !== "CAPTCHA") {
      return {
        success: false,
        errors: {
          captcha: ["Enter valid Captcha"],
        },
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error verifying password:", error)
    return {
      success: false,
      message: "Failed to verify password",
    }
  }
}

// Verify OTP for signup
export async function verifySignupOTP(phone: string, otp: string) {
  try {
    // Validate inputs
    const validatedPhone = phoneSchema.safeParse(phone)
    const validatedOTP = otpSchema.safeParse(otp)

    const errors: Record<string, string[]> = {}

    if (!validatedPhone.success) {
      errors.phone = ["Enter valid 10-digit mobile number"]
    }

    if (!validatedOTP.success) {
      errors.otp = ["Enter valid OTP"]
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      }
    }

    // In a real app, this would verify the OTP
    // For demo, we'll assume OTP "123456" is valid
    if (otp !== "123456") {
      return {
        success: false,
        errors: {
          otp: ["Enter valid OTP"],
        },
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error verifying signup OTP:", error)
    return {
      success: false,
      message: "Failed to verify OTP",
    }
  }
}

// Complete signup
export async function completeSignup(phone: string, name: string, email: string) {
  try {
    // Validate inputs
    const validatedPhone = phoneSchema.safeParse(phone)
    const validatedName = nameSchema.safeParse(name)
    const validatedEmail = emailSchema.safeParse(email)

    const errors: Record<string, string[]> = {}

    if (!validatedPhone.success) {
      errors.phone = ["Enter valid 10-digit mobile number"]
    }

    if (!validatedName.success) {
      errors.name = ["Name is required"]
    }

    if (!validatedEmail.success) {
      errors.email = ["Please enter a valid email"]
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      }
    }

    // In a real app, this would create a new user
    console.log(`Creating user: ${name}, ${email}, ${phone}`)

    return { success: true }
  } catch (error) {
    console.error("Error completing signup:", error)
    return {
      success: false,
      message: "Failed to complete signup",
    }
  }
}

// Submit life declaration
export async function submitLifeDeclaration(formData: FormData) {
  try {
    const identifier = formData.get("identifier") as string
    const image = formData.get("image") as File

    if (!identifier || !image) {
      return {
        success: false,
        message: "Missing required fields",
      }
    }

    // In a real app, this would process the image and save the declaration
    console.log(`Submitting life declaration for ${identifier}`)

    return { success: true }
  } catch (error) {
    console.error("Error submitting life declaration:", error)
    return {
      success: false,
      message: "Failed to submit life declaration",
    }
  }
}

// Reset password
export async function resetPassword(identifier: string) {
  try {
    // Validate identifier
    const validatedIdentifier = identifierSchema.safeParse(identifier)
    if (!validatedIdentifier.success) {
      return {
        success: false,
        errors: {
          identifier: ["Enter valid 10-digit mobile number or e-mail ID"],
        },
      }
    }

    // Check if user exists
    const userExists = await checkUserExists(identifier)
    if (!userExists) {
      return {
        success: false,
        errors: {
          identifier: ["No account found with this phone number or email"],
        },
      }
    }

    // In a real app, this would send a reset password link or OTP
    console.log(`Sending password reset to ${identifier}`)

    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    return {
      success: false,
      message: "Failed to reset password",
    }
  }
}
