"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle, Key, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

type AuthMode = "login" | "register" | "forgot" | "reset"

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, register, resetPassword, verifyResetCode } = useAuth()
  const [mode, setMode] = useState<AuthMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [resetCode, setResetCode] = useState("")
  const [resetEmail, setResetEmail] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!showAuthModal) {
      // Reset form after modal closes
      setTimeout(() => {
        setMode("login")
        setMessage(null)
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        })
        setResetCode("")
        setResetEmail("")
        setShowPassword(false)
        setShowConfirmPassword(false)
      }, 300)
    }
  }, [showAuthModal])

  const handleClose = () => {
    if (!isLoading) {
      setShowAuthModal(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear message when user types
    if (message) {
      setMessage(null)
    }
  }

  const validateForm = () => {
    if (mode === "register") {
      if (!formData.name.trim()) {
        setMessage({ type: "error", text: "Please enter your full name" })
        return false
      }
      if (!formData.phone.trim()) {
        setMessage({ type: "error", text: "Please enter your phone number" })
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match" })
        return false
      }
    }

    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Please enter your email" })
      return false
    }

    if (!formData.password.trim()) {
      setMessage({ type: "error", text: "Please enter your password" })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setMessage(null)

    try {
      if (mode === "login") {
        const result = await login(formData.email, formData.password)
        setMessage({ type: result.success ? "success" : "error", text: result.message })

        if (result.success) {
          // Modal will close automatically via the auth provider
        }
      } else if (mode === "register") {
        const result = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        })
        setMessage({ type: result.success ? "success" : "error", text: result.message })

        if (result.success) {
          // Modal will close automatically via the auth provider
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Please enter your email address" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const result = await resetPassword(formData.email)
      if (result.success && result.code) {
        setResetCode(result.code)
        setResetEmail(formData.email)
        setMode("reset")
        setMessage({ type: "success", text: `Verification code: ${result.code} (Save this code!)` })
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resetCode.trim()) {
      setMessage({ type: "error", text: "Please enter the verification code" })
      return
    }

    if (!formData.password.trim()) {
      setMessage({ type: "error", text: "Please enter your new password" })
      return
    }

    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const result = await verifyResetCode(resetEmail, resetCode, formData.password)
      setMessage({ type: result.success ? "success" : "error", text: result.message })

      if (result.success) {
        setTimeout(() => {
          setMode("login")
          setMessage(null)
          setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }))
        }, 2000)
      }
    } catch (error) {
      console.error("Reset password error:", error)
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Welcome Back"
      case "register":
        return "Create Account"
      case "forgot":
        return "Forgot Password"
      case "reset":
        return "Reset Password"
      default:
        return "Authentication"
    }
  }

  const getDescription = () => {
    switch (mode) {
      case "login":
        return "Sign in to access your cart and orders"
      case "register":
        return "Join Nooré Elegance for exclusive access"
      case "forgot":
        return "Enter your email to receive a verification code"
      case "reset":
        return "Enter the verification code and your new password"
      default:
        return ""
    }
  }

  return (
    <Dialog open={showAuthModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/95 border border-white/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">{getDescription()}</DialogDescription>
        </DialogHeader>

        {message && (
          <Alert
            className={`${message.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {mode === "forgot" ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Code...
                </>
              ) : (
                "Get Verification Code"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode("login")}
                disabled={isLoading}
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-semibold disabled:opacity-50"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : mode === "reset" ? (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetCode">Verification Code</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="resetCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="pl-10"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  maxLength={6}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="pl-10 pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode("login")}
                disabled={isLoading}
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-semibold disabled:opacity-50"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="03XX-XXXXXXX"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  disabled={isLoading}
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline disabled:opacity-50"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "login" ? "Signing In..." : "Creating Account..."}
                </>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                disabled={isLoading}
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-semibold disabled:opacity-50"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
        )}

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-700 text-center mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <strong>Email:</strong> ayesha@email.com
            </p>
            <p>
              <strong>Password:</strong> password123
            </p>
            <p className="text-center mt-2 text-purple-600">
              <strong>Note:</strong> You need to login to add items to cart and checkout.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
