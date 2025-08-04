import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, MessageCircle, Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">Nooré Elegance</span>
            </div>
            <p className="text-gray-300 text-sm">
              Discover luxury fashion that defines your style. Premium quality, elegant designs, and exceptional
              service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-pink-400" asChild>
                <a href="https://instagram.com/salman_orakxi" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-pink-400" asChild>
                <a href="https://tiktok.com/@hba013" target="_blank" rel="noopener noreferrer">
                  <Music className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-pink-400" asChild>
                <a href="https://wa.me/923275176283" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/size-guide" className="block text-gray-300 hover:text-white transition-colors">
                Size Guide
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link href="/category/dresses" className="block text-gray-300 hover:text-white transition-colors">
                Dresses
              </Link>
              <Link href="/category/bridal-wear" className="block text-gray-300 hover:text-white transition-colors">
                Bridal Wear
              </Link>
              <Link href="/category/accessories" className="block text-gray-300 hover:text-white transition-colors">
                Accessories
              </Link>
              <Link href="/category/shoes" className="block text-gray-300 hover:text-white transition-colors">
                Shoes
              </Link>
              <Link href="/category/bags" className="block text-gray-300 hover:text-white transition-colors">
                Bags
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp: 0327-5176283
              </p>
              <p>Email: info@nooreelegance.com</p>
              <p>Business Hours:</p>
              <p className="text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
              <p className="text-sm">Sunday: 12:00 PM - 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-sm font-semibold mb-2">Payment Methods</h4>
              <div className="flex space-x-4 text-sm text-gray-300">
                <span>Cash on Delivery (+₨100)</span>
                <span>NayaPay</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">© 2024 Nooré Elegance. All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">Designed with ❤️ for luxury fashion</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
