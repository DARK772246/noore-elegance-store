"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider, useCart } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

function CategoryPageContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth();
  const params = useParams();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const slug = typeof params.slug === "string" ? params.slug : "";
  const categoryName = slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    const fetchProductsByCategory = async () => {
        if (!supabase || !categoryName) return;
        setIsLoading(true);
        
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', categoryName) // Fetch products matching the category name
            .order('id', { ascending: false });

        if (error) {
            console.error("Error fetching products:", error);
        } else if (data) {
            setProducts(data);
        }
        setIsLoading(false);
    }
    fetchProductsByCategory();
  }, [categoryName]);


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
                <Card key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover"/>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button onClick={() => handleAddToCart(product)} className="w-full">
                        <ShoppingBag className="w-4 h-4 mr-2" />Add to Cart
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold">{formatPrice(product.price)}</span>
                      {product.originalPrice && <span className="text-sm line-through text-gray-400">{formatPrice(product.originalPrice)}</span>}
                    </div>
                  </CardContent>
                </Card>
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