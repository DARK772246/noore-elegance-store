"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Heart, Eye, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider, useCart } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// Supabase Client Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing. Check Environment Variables.");
}
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Categories remain hardcoded for now, you can also fetch them from Supabase later
const categories = [
  { name: "Dresses", image: "/placeholder.svg?height=300&width=300", count: "120+ Items" },
  { name: "Accessories", image: "/placeholder.svg?height=300&width=300", count: "85+ Items" },
  { name: "Beauty", image: "/placeholder.svg?height=300&width=300", count: "60+ Items" },
  { name: "Shoes", image: "/placeholder.svg?height=300&width=300", count: "95+ Items" },
  { name: "Bridal Wear", image: "/placeholder.svg?height=300&width=300", count: "40+ Items" },
  { name: "Bags", image: "/placeholder.svg?height=300&width=300", count: "75+ Items" },
];

function HomePageContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        if (!supabase) return;
        setIsLoading(true);
        // Fetch latest 4 products to feature them
        const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false }).limit(4);
        if (error) {
            console.error("Error fetching products:", error);
        } else if (data) {
            setProducts(data);
        }
        setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    addToCart(product);
    alert("Product added to cart!");
  };

  const formatPrice = (price: number) => `₨ ${price.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation />

      {/* Hero Section remains the same */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* ... Hero Section JSX ... */}
      </section>

      {/* Categories Section remains the same */}
      <section className="py-20 px-4">
        {/* ... Categories Section JSX ... */}
      </section>

      {/* Featured Products - NOW DYNAMIC! */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">Handpicked items just for you</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.status === 'new' && <Badge className="bg-green-500 text-white">New</Badge>}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button onClick={() => handleAddToCart(product)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                        <ShoppingBag className="w-4 h-4 mr-2" />Add to Cart
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-purple-600">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section remains the same */}
      <section className="py-20 px-4">
        {/* ... Newsletter Section JSX ... */}
      </section>

      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <AuthProvider>
      <CartProvider>
        <HomePageContent />
        <CartSidebar />
      </CartProvider>
    </AuthProvider>
  )
}