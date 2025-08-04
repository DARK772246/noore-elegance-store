"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            404
          </CardTitle>
          <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/category/dresses">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  Dresses
                </Button>
              </Link>
              <Link href="/category/accessories">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  Accessories
                </Button>
              </Link>
              <Link href="/category/bridal-wear">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                  Bridal Wear
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
