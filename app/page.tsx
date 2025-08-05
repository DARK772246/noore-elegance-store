"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider, useCart } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface Category { id: number; name: string; }

function HomePageContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        if (!supabase) { setIsLoading(false); return; };
        setIsLoading(true);
        const productsPromise = supabase.from('products').select('*').order('id', { ascending: false }).limit(8);
        const categoriesPromise = supabase.from('categories').select('*').order('name');
        
        const [productsResult, categoriesResult] = await Promise.all([productsPromise, categoriesPromise]);

        if (productsResult.data) setProducts(productsResult.data);
        if (categoriesResult.data) setCategories(categoriesResult.data);
        
        setIsLoading(false);
    }
    fetchData();
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
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Nooré Elegance</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">Discover Luxury Fashion That Defines Your Style</p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg">Shop Collection</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold">Shop by Category</h2></div>
          {isLoading ? <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin"/></div> :
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.name.toLowerCase().replace(/\s/g, "-")}`}>
                <Card className="group cursor-pointer text-center p-4 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold">{category.name}</h3>
                </Card>
              </Link>
            ))}
          </div>}
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold">Featured Products</h2></div>
          {isLoading ? <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin"/></div> :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover"/>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button onClick={() => handleAddToCart(product)} className="w-full"><ShoppingBag className="w-4 h-4 mr-2" />Add to Cart</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    {product.originalPrice && <span className="text-sm line-through text-gray-400">{formatPrice(product.originalPrice)}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>}
        </div>
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