"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, User, Search, Menu, X, Heart, MessageCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"

export function Navigation() {
  const { isLoggedIn, user, setShowAuthModal, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems, setIsCartOpen } = useCart()
  const cartCount = getTotalItems()

  const categories = ["Dresses", "Accessories", "Beauty", "Shoes", "Bridal Wear", "Bags", "Sale"]

  const handleAuthClick = () => {
    setShowAuthModal(true)
  }

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nooré Elegance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 backdrop-blur-md bg-white/90">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link href={`/category/${category.toLowerCase().replace(" ", "-")}`}>{category}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Admin
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm bg-white/50"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Chatbot */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <MessageCircle className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline max-w-24 truncate">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 backdrop-blur-md bg-white/90">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={handleAuthClick}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm bg-white/50"
                />
              </div>

              {/* Mobile Auth */}
              {!isLoggedIn && (
                <Button
                  onClick={handleAuthClick}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Login / Register
                </Button>
              )}

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                    className="block text-gray-600 hover:text-purple-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>

              {/* Mobile Links */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-purple-600 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-purple-600 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/admin"
                  className="block text-gray-600 hover:text-purple-600 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
                {isLoggedIn && (
                  <>
                    <Link
                      href="/orders"
                      className="block text-gray-600 hover:text-purple-600 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-red-600 hover:text-red-700 py-1 text-left w-full"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
