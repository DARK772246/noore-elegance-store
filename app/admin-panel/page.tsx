"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPanelRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Admin Panel...</p>
      </div>
    </div>
  )
}
