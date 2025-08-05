"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface Category { id: number; name: string; }

export function Navigation() {
  const { isLoggedIn, user, setShowAuthModal, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems, setIsCartOpen } = useCart()
  const [categories, setCategories] = useState<Category[]>([]);
  const cartCount = getTotalItems()

  useEffect(() => {
    const fetchCategories = async () => {
        if (!supabase) return;
        const { data } = await supabase.from('categories').select('*').order('name');
        if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleAuthClick = () => { setIsMobileMenuOpen(false); setShowAuthModal(true); }
  const handleLogout = () => { logout(); setIsMobileMenuOpen(false); }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nooré Elegance
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Categories</DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/category/${category.name.toLowerCase().replace(/\s/g, "-")}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-gray-700 hover:text-purple-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600">Contact</Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">{cartCount}</Badge>}
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><User className="w-5 h-5" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild><Link href="/orders">My Orders</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" onClick={handleAuthClick} className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-pink-600 text-white">Login</Button>
            )}

            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {!isLoggedIn && <Button onClick={handleAuthClick} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Login / Register</Button>}
              <span className="font-semibold pt-2">Categories</span>
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.name.toLowerCase().replace(/\s/g, "-")}`} className="block text-gray-600 py-1" onClick={() => setIsMobileMenuOpen(false)}>{category.name}</Link>
              ))}
              <div className="pt-2 border-t">
                <Link href="/about" className="block text-gray-600 py-1" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" className="block text-gray-600 py-1" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                {isLoggedIn && <>
                  <Link href="/orders" className="block text-gray-600 py-1" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
                  <button onClick={handleLogout} className="block text-red-600 py-1 text-left w-full">Logout</button>
                </>}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}