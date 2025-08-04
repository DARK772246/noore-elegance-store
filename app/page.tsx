"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Heart, Eye } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
// Update the imports to include the new AuthProvider
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider, useCart } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"

const featuredProducts = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    price: 15999,
    originalPrice: 19999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: 8999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Bags",
    rating: 4.9,
    reviews: 89,
    isSale: true,
  },
  {
    id: 3,
    name: "Bridal Collection Set",
    price: 45999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Bridal Wear",
    rating: 5.0,
    reviews: 67,
    isNew: true,
  },
  {
    id: 4,
    name: "Premium Heels",
    price: 6999,
    originalPrice: 8999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Shoes",
    rating: 4.7,
    reviews: 156,
    isSale: true,
  },
]

const categories = [
  {
    name: "Dresses",
    image: "/placeholder.svg?height=300&width=300",
    count: "120+ Items",
  },
  {
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    count: "85+ Items",
  },
  {
    name: "Beauty",
    image: "/placeholder.svg?height=300&width=300",
    count: "60+ Items",
  },
  {
    name: "Shoes",
    image: "/placeholder.svg?height=300&width=300",
    count: "95+ Items",
  },
  {
    name: "Bridal Wear",
    image: "/placeholder.svg?height=300&width=300",
    count: "40+ Items",
  },
  {
    name: "Bags",
    image: "/placeholder.svg?height=300&width=300",
    count: "75+ Items",
  },
]

// Replace the existing HomePage component with this updated version:
function HomePageContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    addToCart(product)
    alert("Product added to cart!")
  }

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-pulse">
              Nooré Elegance
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
              Discover Luxury Fashion That Defines Your Style
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Shop Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-white/20 transition-all duration-300"
              >
                Explore Bridal
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-20 animate-bounce delay-500"></div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">Explore our curated collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={category.name} href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}>
                <Card className="group cursor-pointer backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">Handpicked items just for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                    {product.isSale && <Badge className="bg-red-500 text-white">Sale</Badge>}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="rounded-full p-2">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

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

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-white/20"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-md bg-white/20 rounded-3xl p-12 border border-white/30 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm bg-white/50"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Wrap the component with AuthProvider
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
