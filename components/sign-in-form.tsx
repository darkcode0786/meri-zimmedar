"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { CheckCircle, ArrowLeft } from "lucide-react"

// Mock database for demonstration
const mockUsers = [
  { id: 1, phone: "1234567890", email: "user@example.com", name: "Test User", password: "password123" },
]

export default function SignInForm() {
  // State to track the current view/step
  const [currentView, setCurrentView] = useState<
    | "login"
    | "otp-verification"
    | "password-verification"
    | "signup"
    | "signup-otp"
    | "complete-signup"
    | "life-declaration"
    | "forgot-password"
    | "success"
  >("login")

  // Form input states
  const [identifier, setIdentifier] = useState("")
  const [otp, setOtp] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Other states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [resendDisabled, setResendDisabled] = useState(true)
  const [timer, setTimer] = useState(30)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

  // Timer for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if ((currentView === "otp-verification" || currentView === "signup-otp") && timer > 0 && resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setResendDisabled(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentView, timer, resendDisabled])

  // Reset form fields when changing views
  useEffect(() => {
    // Clear validation errors when changing views
    setValidationErrors({})
    setError(null)

    // Reset specific form fields based on the view
    if (currentView === "otp-verification") {
      setOtp("")
      setCaptcha("")
    } else if (currentView === "password-verification") {
      setPassword("")
      setCaptcha("")
    } else if (currentView === "signup-otp") {
      setOtp("")
    }
  }, [currentView])

  // Validation functions
  const validateIdentifier = (value: string): boolean => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/

    if (!value) {
      setValidationErrors((prev) => ({ ...prev, identifier: "This field is required" }))
      return false
    }

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      setValidationErrors((prev) => ({ ...prev, identifier: "Enter valid 10-digit mobile number or e-mail ID" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.identifier
      return newErrors
    })
    return true
  }

  const validateOtp = (value: string): boolean => {
    if (!value || value.length < 4 || value.length > 6) {
      setValidationErrors((prev) => ({ ...prev, otp: "Enter valid OTP" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.otp
      return newErrors
    })
    return true
  }

  const validateCaptcha = (value: string): boolean => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, captcha: "Enter valid Captcha" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.captcha
      return newErrors
    })
    return true
  }

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, password: "Enter valid password" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.password
      return newErrors
    })
    return true
  }

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^\d{10}$/

    if (!value) {
      setValidationErrors((prev) => ({ ...prev, phone: "This field is required" }))
      return false
    }

    if (!phoneRegex.test(value)) {
      setValidationErrors((prev) => ({ ...prev, phone: "Enter valid 10-digit mobile number" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.phone
      return newErrors
    })
    return true
  }

  const validateName = (value: string): boolean => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, name: "Name is required" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.name
      return newErrors
    })
    return true
  }

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!value) {
      setValidationErrors((prev) => ({ ...prev, email: "Email is required" }))
      return false
    }

    if (!emailRegex.test(value)) {
      setValidationErrors((prev) => ({ ...prev, email: "Please enter a valid email" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.email
      return newErrors
    })
    return true
  }

  const validateTerms = (value: boolean): boolean => {
    if (!value) {
      setValidationErrors((prev) => ({ ...prev, terms: "You must accept the terms and conditions" }))
      return false
    }

    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.terms
      return newErrors
    })
    return true
  }

  // Handle social login
  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would redirect to the OAuth flow
      setTimeout(() => {
        setSuccessMessage(`Successfully logged in with ${provider}`)
        setCurrentView("success")
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      console.error(`${provider} login failed:`, error)
      setError(`Failed to login with ${provider}`)
      setIsSubmitting(false)
    }
  }

  // Check if user exists
  const checkUserExists = (identifier: string): boolean => {
    return mockUsers.some((user) => user.phone === identifier || user.email === identifier)
  }

  // Login form submission handler
  const handleLoginSubmit = async (e: FormEvent, action: "otp" | "password" | "declaration") => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate form
    const isValid = validateIdentifier(identifier)
    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // Check if user exists
      const userExists = checkUserExists(identifier)

      if (!userExists) {
        // Show error message instead of redirecting
        setError("No account found with this phone number or email. Please check your credentials or sign up.")
        setIsSubmitting(false)
        return
      }

      // User exists, proceed with selected action
      if (action === "declaration") {
        setCurrentView("life-declaration")
      } else if (action === "otp") {
        // Reset timer for OTP
        setTimer(30)
        setResendDisabled(true)
        setCurrentView("otp-verification")
      } else {
        setCurrentView("password-verification")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // OTP verification handler
  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate form
    const isOtpValid = validateOtp(otp)
    const isCaptchaValid = validateCaptcha(captcha)
    if (!isOtpValid || !isCaptchaValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, this would verify the OTP with a server
      // For demo, we'll assume OTP "123456" is valid
      if (otp !== "123456") {
        setError("Invalid OTP. Please try again.")
        setIsSubmitting(false)
        return
      }

      // For demo, we'll assume captcha "CAPTCHA" is valid
      if (captcha.toUpperCase() !== "CAPTCHA") {
        setError("Invalid captcha. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Success - show dashboard or success message
      setSuccessMessage("Successfully authenticated")
      setCurrentView("success")
    } catch (error) {
      console.error("OTP verification error:", error)
      setError("An error occurred during verification. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Password verification handler
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate form
    const isPasswordValid = validatePassword(password)
    const isCaptchaValid = validateCaptcha(captcha)
    if (!isPasswordValid || !isCaptchaValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, this would verify the password with a server
      // For demo, we'll assume password "password123" is valid
      if (password !== "password123") {
        setError("Invalid password. Please try again.")
        setIsSubmitting(false)
        return
      }

      // For demo, we'll assume captcha "CAPTCHA" is valid
      if (captcha.toUpperCase() !== "CAPTCHA") {
        setError("Invalid captcha. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Success - show dashboard or success message
      setSuccessMessage("Successfully authenticated")
      setCurrentView("success")
    } catch (error) {
      console.error("Password verification error:", error)
      setError("An error occurred during verification. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Signup form submission handler
  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate form
    const isValid = validatePhone(phone)
    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, this would send an OTP to the phone number
      console.log(`Sending OTP to ${phone}`)

      // Reset timer for OTP
      setTimer(30)
      setResendDisabled(true)
      setCurrentView("signup-otp")
    } catch (error) {
      console.error("Signup error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Signup OTP verification handler
  const handleSignupOtpSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate form
    const isValid = validateOtp(otp)
    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, this would verify the OTP with a server
      // For demo, we'll assume OTP "123456" is valid
      if (otp !== "123456") {
        setError("Invalid OTP. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Success - move to complete signup
      setCurrentView("complete-signup")
    } catch (error) {
      console.error("OTP verification error:", error)
      setError("An error occurred during verification. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Complete signup handler
  const handleCompleteSignupSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate form
    const isNameValid = validateName(name)
    const isEmailValid = validateEmail(email)
    const isTermsValid = validateTerms(termsAccepted)
    if (!isNameValid || !isEmailValid || !isTermsValid) {
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, this would create a new user
      console.log(`Creating user: ${name}, ${email}, ${phone}`)

      // Success - show dashboard or success message
      setSuccessMessage("Account created successfully")
      setCurrentView("success")
    } catch (error) {
      console.error("Complete signup error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle image upload for life declaration
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Life declaration submission handler
  const handleLifeDeclarationSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!imageFile) return

    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would upload the image and process the declaration
      console.log(`Submitting life declaration for ${identifier}`)

      // Success - show success message
      setSuccessMessage("Life declaration submitted successfully")
      setCurrentView("success")
    } catch (error) {
      console.error("Life declaration error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      // In a real app, this would resend the OTP
      console.log(`Resending OTP to ${currentView === "otp-verification" ? identifier : phone}`)

      // Reset timer
      setTimer(30)
      setResendDisabled(true)
    } catch (error) {
      console.error("Resend OTP error:", error)
      setError("Failed to resend OTP. Please try again.")
    }
  }

  // Forgot password handler
  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would send a password reset link
      console.log(`Sending password reset to ${identifier}`)

      // Success - show success message
      setSuccessMessage("Password reset link sent to your email/phone")
      setCurrentView("success")
    } catch (error) {
      console.error("Forgot password error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch (currentView) {
      case "login":
        return (
          <>
            <div className="text-center mb-6 bg-transparent backdrop-blur-2xl ">
              <div className="w-full flex justify-center items-center mb-6"><p className=" text-lg py-1 px-4 border border-blue-500 rounded-full text-blue-500  inline-block ">Let's Go...!!!</p></div>

              <div className="flex items-center justify-center gap-3 mb-4">
                <Separator className="flex-1" />
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isSubmitting}
                >

                  <Image src="/google-icon.svg" alt="Google" width={40} height={40} />
                </button>

                <span className="text-gray-500">or</span>

                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isSubmitting}
                >

                  <Image src="/facebook-icon.svg" alt="Facebook" width={40} height={40} />

                </button>
                <Separator className="flex-1" />
              </div>
            </div>

            <form onSubmit={(e) => handleLoginSubmit(e, "otp")} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter Phone Number or email ID"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.identifier && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.identifier}</p>
                )}
              </div>

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
                  Login via OTP
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-blue-500 hover:bg-blue-700"
                  onClick={(e) => handleLoginSubmit(e, "password")}
                  disabled={isSubmitting}
                >
                  Login via Password
                </Button>
              </div>

              <div className="flex items-center gap-4 my-4">
                <Separator className="flex-1" />
                <span className="text-sm text-gray-500">or</span>
                <Separator className="flex-1" />
              </div>

              <Button
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-700"
                onClick={(e) => handleLoginSubmit(e, "declaration")}
                disabled={isSubmitting}
              >
                Submit Life Declaration
              </Button>

              <div className="flex justify-between text-sm pt-4">
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setCurrentView("signup")}
                >
                  Sign-up as new user
                </button>
                <span className="text-gray-400">|</span>
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    if (identifier) {
                      setCurrentView("forgot-password")
                    } else {
                      setValidationErrors((prev) => ({
                        ...prev,
                        identifier: "Please enter your email or phone number first",
                      }))
                    }
                  }}
                >
                  Forgot Password
                </button>
              </div>
            </form>
          </>
        )

      case "otp-verification":
        return (
          <>
            <div className="mb-6 ">
          

              <button
                type="button"
                onClick={() => setCurrentView("login")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
                  <div className="w-full flex justify-center items-center mb-6"><p className=" text-lg py-1 px-4 border border-blue-500 rounded-full text-blue-500  inline-block ">Almost there</p></div>
              <p className="text-center text-gray-500 mb-4">Enter OTP shared on {identifier}</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.otp && <p className="text-xs text-red-500 mt-1">{validationErrors.otp}</p>}
              </div>

              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Captcha"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="bg-gray-100 h-12 w-24 flex items-center justify-center text-gray-500 rounded-md">
                    CAPTCHA
                  </div>
                </div>
                {validationErrors.captcha && <p className="text-xs text-red-500 mt-1">{validationErrors.captcha}</p>}
              </div>

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className={`text-blue-600 text-sm ${resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:underline"
                    }`}
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
          </>
        )

      case "password-verification":
        return (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentView("login")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
                    <div className="w-full flex justify-center items-center mb-6"><p className=" text-lg py-1 px-4 border border-blue-500 rounded-full text-blue-500  inline-block ">Almost there</p></div>

              

            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.password && <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>}
              </div>

              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Captcha"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="bg-gray-100 h-12 w-24 flex items-center justify-center text-gray-500 rounded-md">
                    CAPTCHA
                  </div>
                </div>
                {validationErrors.captcha && <p className="text-xs text-red-500 mt-1">{validationErrors.captcha}</p>}
              </div>

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          </>
        )

      case "signup":
        return (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentView("login")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
              <h2 className="text-xl font-semibold text-center mb-2">Hi, looks you are new to Meri Zimmedari...!!!</h2>
              <p className="text-center text-gray-500 mb-4">Please enter your mobile number to continue</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.phone && <p className="text-xs text-red-500 mt-1">{validationErrors.phone}</p>}
              </div>

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
                Send OTP
              </Button>
            </form>
          </>
        )

      case "signup-otp":
        return (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentView("signup")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <h2 className="text-xl font-semibold text-center mb-2">Hi, looks you are new to Meri Zimmedari...!!!</h2>
              <p className="text-center text-gray-500 mb-4">Enter OTP shared on {phone}</p>
            </div>

            <form onSubmit={handleSignupOtpSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.otp && <p className="text-xs text-red-500 mt-1">{validationErrors.otp}</p>}
              </div>

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className={`text-blue-600 text-sm ${resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:underline"
                    }`}
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
          </>
        )

      case "complete-signup":
        return (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentView("signup-otp")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <h2 className="text-xl font-semibold text-center mb-4">Complete Your Registration</h2>
            </div>

            <form onSubmit={handleCompleteSignupSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.name && <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.email && <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>}
              </div>

              <div className="flex flex-row items-start space-x-3 space-y-0">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1"
                />
                <div className="space-y-1 leading-none">
                  <label htmlFor="terms" className="text-sm text-gray-500">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                  {validationErrors.terms && <p className="text-xs text-red-500">{validationErrors.terms}</p>}
                </div>
              </div>

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
                Let&apos;s Onboard
              </Button>
            </form>
          </>
        )

      case "life-declaration":
        return (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentView("login")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
              <h2 className="text-xl font-semibold text-center mb-2">Life Declaration</h2>
              <p className="text-center text-gray-500 mb-4">
                Please upload a clear photo of yourself to verify your identity
              </p>
            </div>

            <form onSubmit={handleLifeDeclarationSubmit} className="space-y-6">
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

              {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700"
                disabled={isSubmitting || !imageFile}
              >
                Submit Declaration
              </Button>
            </form>
          </>
        )

      case "forgot-password":
        return (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentView("login")}
                className="flex items-center text-blue-600 hover:underline mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </button>
              <h2 className="text-xl font-semibold text-center mb-2">Reset Password</h2>
              <p className="text-center text-gray-500 mb-4">We will send a password reset link to {identifier}</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              {error && <div className="text-sm text-red-500 mt-2 mb-4">{error}</div>}

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isSubmitting}>
                Send Reset Link
              </Button>
            </form>
          </>
        )

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold">{successMessage}</h2>
            <Button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-700"
              onClick={() => setCurrentView("login")}
            >
              Back to Login
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return <div className="w-full max-w-md mx-auto border  rounded-lg p-6 bg-white shadow-sm">{renderView()}</div>
}
