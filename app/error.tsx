"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">We apologize for the inconvenience. An unexpected error has occurred.</p>

          {process.env.NODE_ENV === "development" && (
            <div className="text-left bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 font-mono">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={reset}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
