"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, MessageCircle, Music } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface Category { id: number; name: string; }

export function Footer() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (!supabase) return;
            const { data } = await supabase.from('categories').select('*').order('name');
            if (data) setCategories(data);
        }
        fetchCategories();
    }, []);

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">Nooré Elegance</span>
            </div>
            <p className="text-gray-300 text-sm">
              Discover luxury fashion that defines your style. Premium quality, elegant designs, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" asChild><a href="https://instagram.com/salman_orakxi" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5" /></a></Button>
              <Button variant="ghost" size="sm" asChild><a href="https://tiktok.com/@hba013" target="_blank" rel="noopener noreferrer"><Music className="w-5 h-5" /></a></Button>
              <Button variant="ghost" size="sm" asChild><a href="https://wa.me/923275176283" target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5" /></a></Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white">About Us</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white">Shipping Info</Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white">Returns & Exchanges</Link>
              <Link href="/size-guide" className="block text-gray-300 hover:text-white">Size Guide</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.name.toLowerCase().replace(/\s/g, "-")}`} className="block text-gray-300 hover:text-white">{category.name}</Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p>WhatsApp: 0327-5176283</p>
              <p>Email: info@nooreelegance.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-300">© 2024 Nooré Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}