"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, Star, Heart, Share2, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider, useCart } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"

// Mock product data
const productData = {
  1: {
    id: 1,
    name: "Elegant Evening Dress",
    price: 15999,
    originalPrice: 19999,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    category: "Dresses",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ["Black", "Navy", "Burgundy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Elevate your evening wardrobe with this stunning elegant dress. Crafted from premium fabric with exquisite attention to detail, this dress features a flattering silhouette that enhances your natural beauty.",
    features: [
      "Premium quality fabric",
      "Elegant silhouette design",
      "Perfect for evening events",
      "Available in multiple colors",
      "Professional tailoring",
    ],
    specifications: {
      Material: "Premium Silk Blend",
      Care: "Dry Clean Only",
      Origin: "Made in Pakistan",
      Fit: "Regular Fit",
    },
    inStock: true,
    stockCount: 15,
  },
}

function ProductDetailsContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth()
  const { addToCart } = useCart()
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const productId = Number.parseInt(params.id as string)
  const product = productData[productId as keyof typeof productData]

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }

    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor)
    }

    alert(`Added ${quantity} item(s) to cart!`)
  }

  const reviews = [
    {
      id: 1,
      name: "Ayesha K.",
      rating: 5,
      comment: "Absolutely beautiful dress! The quality is amazing and fits perfectly.",
      date: "2024-01-10",
    },
    {
      id: 2,
      name: "Fatima A.",
      rating: 4,
      comment: "Love the color and design. Great for special occasions.",
      date: "2024-01-08",
    },
    {
      id: 3,
      name: "Zara M.",
      rating: 5,
      comment: "Exceeded my expectations! Will definitely order again.",
      date: "2024-01-05",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <nav className="text-sm text-gray-600">
              <span>Home</span> / <span>{product.category}</span> /{" "}
              <span className="text-purple-600">{product.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 lg:h-[600px] object-cover"
                />
                {product.isNew && <Badge className="absolute top-4 left-4 bg-green-500 text-white">New</Badge>}
                {product.originalPrice && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? "border-purple-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">{product.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-purple-600">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">In Stock ({product.stockCount} available)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Color</Label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-10 h-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-white/20 border border-white/30">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card className="backdrop-blur-md bg-white/20 border border-white/30">
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <h4 className="font-semibold mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card className="backdrop-blur-md bg-white/20 border border-white/30">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-700">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="backdrop-blur-md bg-white/20 border border-white/30">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{review.name}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
      <CartSidebar />
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}

export default function ProductDetailsPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductDetailsContent />
      </CartProvider>
    </AuthProvider>
  )
}
