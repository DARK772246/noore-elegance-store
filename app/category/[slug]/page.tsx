"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

function CategoryPageContent() {
  const params = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const slug = typeof params.slug === "string" ? params.slug : "";
  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    const fetchProductsByCategory = async () => {
        if (!supabase || !categoryName) return;
        setIsLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', categoryName)
            .order('id', { ascending: false });

        if (data) setProducts(data);
        setIsLoading(false);
    }
    if (categoryName) {
        fetchProductsByCategory();
    }
  }, [categoryName]);

  const formatPrice = (price: number) => `₨ ${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{categoryName}</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No products found in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} passHref>
                    <Card className="group cursor-pointer h-full flex flex-col">
                        <div className="relative overflow-hidden">
                            {/* THE FIX IS HERE: Use the first image from the array */}
                            <img src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform"/>
                        </div>
                        <CardContent className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold truncate flex-grow">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-bold text-purple-600">{formatPrice(product.price)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function CategoryPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <CategoryPageContent />
        <CartSidebar />
      </CartProvider>
    </AuthProvider>
  )
}