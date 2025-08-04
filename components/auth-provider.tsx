"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { AuthModal } from "@/components/auth-modal"

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => void
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; code?: string }>
  verifyResetCode: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; message: string }>
}

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database (in real app, this would be a proper database)
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    email: "ayesha@email.com",
    phone: "0321-1234567",
    password: "password123",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@noore.com",
    phone: "0300-0000000",
    password: "admin123",
  },
]

// Mock reset codes storage
const resetCodes: { [email: string]: string } = {}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("noore_user")
      const savedLoginState = localStorage.getItem("noore_logged_in")

      if (savedUser && savedLoginState === "true") {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error("Error loading saved user:", error)
      // Clear corrupted data
      localStorage.removeItem("noore_user")
      localStorage.removeItem("noore_logged_in")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate input
      if (!email.trim() || !password.trim()) {
        return { success: false, message: "Please fill in all fields" }
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address" }
      }

      const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        setIsLoggedIn(true)

        // Save to localStorage
        localStorage.setItem("noore_user", JSON.stringify(userWithoutPassword))
        localStorage.setItem("noore_logged_in", "true")

        setShowAuthModal(false)
        return { success: true, message: "Login successful! Welcome back." }
      } else {
        return { success: false, message: "Invalid email or password. Please try again." }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login. Please try again." }
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Validate input
      if (!userData.name.trim() || !userData.email.trim() || !userData.phone.trim() || !userData.password.trim()) {
        return { success: false, message: "Please fill in all fields" }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        return { success: false, message: "Please enter a valid email address" }
      }

      // Validate password strength
      if (userData.password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long" }
      }

      // Validate phone number format (Pakistani format)
      const phoneRegex = /^(03\d{2}[-\s]?\d{7}|(\+92|0092)[-\s]?3\d{2}[-\s]?\d{7})$/
      if (!phoneRegex.test(userData.phone.replace(/\s/g, ""))) {
        return { success: false, message: "Please enter a valid Pakistani phone number (03XX-XXXXXXX)" }
      }

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())
      if (existingUser) {
        return { success: false, message: "An account with this email already exists. Please login instead." }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        phone: userData.phone.trim(),
        password: userData.password,
      }

      mockUsers.push(newUser)

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setIsLoggedIn(true)

      // Save to localStorage
      localStorage.setItem("noore_user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("noore_logged_in", "true")

      setShowAuthModal(false)

      return { success: true, message: "Account created successfully! Welcome to Nooré Elegance." }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An error occurred during registration. Please try again." }
    }
  }

  const logout = () => {
    try {
      setUser(null)
      setIsLoggedIn(false)
      localStorage.removeItem("noore_user")
      localStorage.removeItem("noore_logged_in")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string; code?: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!email.trim()) {
        return { success: false, message: "Please enter your email address" }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address" }
      }

      const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!foundUser) {
        return { success: false, message: "No account found with this email address" }
      }

      // Generate 6-digit verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      resetCodes[email.toLowerCase()] = code

      return {
        success: true,
        message: "Verification code sent! (In a real app, this would be sent via email)",
        code, // In production, don't return the code
      }
    } catch (error) {
      console.error("Reset password error:", error)
      return { success: false, message: "An error occurred. Please try again." }
    }
  }

  const verifyResetCode = async (
    email: string,
    code: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!code.trim() || !newPassword.trim()) {
        return { success: false, message: "Please fill in all fields" }
      }

      if (newPassword.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long" }
      }

      if (resetCodes[email.toLowerCase()] !== code) {
        return { success: false, message: "Invalid or expired verification code" }
      }

      // Update password
      const userIndex = mockUsers.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())
      if (userIndex !== -1) {
        mockUsers[userIndex].password = newPassword
        delete resetCodes[email.toLowerCase()] // Remove used code
        return { success: true, message: "Password reset successfully! You can now login with your new password." }
      }

      return { success: false, message: "Failed to reset password. Please try again." }
    } catch (error) {
      console.error("Verify reset code error:", error)
      return { success: false, message: "An error occurred. Please try again." }
    }
  }

  // Don't render children until we've checked for existing session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        showAuthModal,
        setShowAuthModal,
        login,
        register,
        logout,
        resetPassword,
        verifyResetCode,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
