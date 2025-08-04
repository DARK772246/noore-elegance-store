"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Heart, Eye, Filter, Grid3X3, List, ChevronDown } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-provider"
import { TopSlider } from "@/components/top-slider"

// Mock products data
const products = [
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
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Casual Summer Dress",
    price: 8999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 4.6,
    reviews: 89,
    isSale: true,
    colors: ["White", "Pink", "Blue"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 3,
    name: "Formal Business Dress",
    price: 12999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 4.7,
    reviews: 67,
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "Cocktail Party Dress",
    price: 18999,
    originalPrice: 22999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 4.9,
    reviews: 156,
    isNew: true,
    colors: ["Red", "Black", "Gold"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 5,
    name: "Maxi Floral Dress",
    price: 11999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 4.5,
    reviews: 98,
    colors: ["Floral Print", "Solid Blue"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Little Black Dress",
    price: 14999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 4.8,
    reviews: 203,
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
]

function CategoryPageContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth()
  const params = useParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState("all")

  const { addToCart } = useCart()

  const categoryName =
    typeof params.slug === "string"
      ? params.slug.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Products"

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  const handleAddToCart = (product: any) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    addToCart(product)
    alert("Product added to cart!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={() => {}} />

      {/* Header */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {categoryName}
            </h1>
            <p className="text-gray-600 text-lg">Discover our curated collection of {categoryName.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 backdrop-blur-md bg-white/20 rounded-2xl p-4 border border-white/30">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="backdrop-blur-sm bg-white/50">
                    <Filter className="w-4 h-4 mr-2" />
                    Price Range
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPriceRange("all")}>All Prices</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceRange("under-10k")}>Under ₨10,000</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceRange("10k-20k")}>₨10,000 - ₨20,000</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriceRange("above-20k")}>Above ₨20,000</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="backdrop-blur-sm bg-white/50">
                    Sort by: {sortBy}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>Highest Rated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{products.length} products</span>
              <div className="flex border rounded-lg overflow-hidden backdrop-blur-sm bg-white/50">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === "grid" ? "h-80" : "h-64"
                    }`}
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

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-purple-600">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-600">Colors:</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{
                            backgroundColor:
                              color.toLowerCase() === "black"
                                ? "#000"
                                : color.toLowerCase() === "white"
                                  ? "#fff"
                                  : color.toLowerCase() === "red"
                                    ? "#ef4444"
                                    : color.toLowerCase() === "blue"
                                      ? "#3b82f6"
                                      : color.toLowerCase() === "navy"
                                        ? "#1e3a8a"
                                        : color.toLowerCase() === "pink"
                                          ? "#ec4899"
                                          : color.toLowerCase() === "gray"
                                            ? "#6b7280"
                                            : color.toLowerCase() === "burgundy"
                                              ? "#7c2d12"
                                              : color.toLowerCase() === "gold"
                                                ? "#f59e0b"
                                                : "#8b5cf6",
                          }}
                        />
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Sizes:</span>
                    <span className="text-xs text-gray-500">{product.sizes.join(", ")}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-white/20"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Wrap the component with AuthProvider
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
