"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle, Clock, Search, Eye, Download } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import { CartSidebar } from "@/components/cart-sidebar"
import { TopSlider } from "@/components/top-slider"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 16099,
    codFee: 100,
    paymentMethod: "COD",
    items: [
      {
        id: 1,
        name: "Elegant Evening Dress",
        image: "/placeholder.svg?height=100&width=100",
        price: 15999,
        quantity: 1,
        size: "M",
        color: "Black",
      },
    ],
    tracking: {
      orderPlaced: { date: "2024-01-15", time: "10:30 AM", completed: true },
      confirmed: { date: "2024-01-15", time: "11:00 AM", completed: true },
      shipped: { date: "2024-01-16", time: "2:00 PM", completed: true },
      delivered: { date: "2024-01-18", time: "4:30 PM", completed: true },
    },
    shippingAddress: "123 Main Street, Karachi, Pakistan",
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "shipped",
    total: 8999,
    codFee: 0,
    paymentMethod: "NayaPay",
    items: [
      {
        id: 2,
        name: "Designer Handbag",
        image: "/placeholder.svg?height=100&width=100",
        price: 8999,
        quantity: 1,
        color: "Brown",
      },
    ],
    tracking: {
      orderPlaced: { date: "2024-01-20", time: "3:15 PM", completed: true },
      confirmed: { date: "2024-01-20", time: "3:45 PM", completed: true },
      shipped: { date: "2024-01-21", time: "10:00 AM", completed: true },
      delivered: { date: "", time: "", completed: false },
    },
    shippingAddress: "456 Garden Road, Lahore, Pakistan",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-003",
    date: "2024-01-22",
    status: "pending",
    total: 26099,
    codFee: 100,
    paymentMethod: "COD",
    items: [
      {
        id: 3,
        name: "Bridal Collection Set",
        image: "/placeholder.svg?height=100&width=100",
        price: 25999,
        quantity: 1,
        size: "L",
        color: "Gold",
      },
    ],
    tracking: {
      orderPlaced: { date: "2024-01-22", time: "1:20 PM", completed: true },
      confirmed: { date: "", time: "", completed: false },
      shipped: { date: "", time: "", completed: false },
      delivered: { date: "", time: "", completed: false },
    },
    shippingAddress: "789 University Road, Islamabad, Pakistan",
  },
]

function OrderTrackingContent() {
  const { isLoggedIn, user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <TopSlider />
        <Navigation />
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-md bg-white/20 rounded-3xl p-12 border border-white/30 shadow-lg">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Login</h1>
              <p className="text-gray-600 mb-8">You need to login to view your orders and track deliveries.</p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Login to Continue
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation />

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="backdrop-blur-md bg-white/20 rounded-3xl p-8 border border-white/30 shadow-lg">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                My Orders
              </h1>
              <p className="text-gray-600">Track your orders and view order history</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search orders..."
                className="pl-10 backdrop-blur-sm bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="backdrop-blur-md bg-white/20 border border-white/30">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {filteredOrders.length === 0 ? (
                <Card className="backdrop-blur-md bg-white/20 border border-white/30">
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
                    <p className="text-gray-500">Start shopping to see your orders here</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="backdrop-blur-md bg-white/20 border border-white/30">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">{order.id}</h3>
                                <p className="text-sm text-gray-600">Placed on {order.date}</p>
                              </div>
                              <Badge className={`${getStatusColor(order.status)} text-white`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1 capitalize">{order.status}</span>
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">Items:</p>
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-2 mt-1">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-8 h-8 object-cover rounded"
                                    />
                                    <span className="text-sm">{item.name}</span>
                                    {item.size && <span className="text-xs text-gray-500">({item.size})</span>}
                                  </div>
                                ))}
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Payment:</p>
                                <p className="font-semibold">{formatPrice(order.total)}</p>
                                <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                                {order.trackingNumber && (
                                  <p className="text-xs text-purple-600">Tracking: {order.trackingNumber}</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {selectedOrder === order.id ? "Hide" : "Track"}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Invoice
                            </Button>
                          </div>
                        </div>

                        {/* Order Tracking Details */}
                        {selectedOrder === order.id && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold mb-4">Order Tracking</h4>
                            <div className="space-y-4">
                              {Object.entries(order.tracking).map(([step, details], index) => (
                                <div key={step} className="flex items-center gap-4">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      details.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                                    }`}
                                  >
                                    {details.completed ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <span className="text-xs">{index + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium capitalize">{step.replace(/([A-Z])/g, " $1")}</p>
                                    {details.completed && (
                                      <p className="text-sm text-gray-600">
                                        {details.date} at {details.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                              <h5 className="font-medium mb-2">Shipping Address</h5>
                              <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Other tabs with filtered content */}
            {["pending", "shipped", "delivered"].map((status) => (
              <TabsContent key={status} value={status} className="space-y-6">
                <div className="space-y-4">
                  {filteredOrders
                    .filter((order) => order.status === status)
                    .map((order) => (
                      <Card key={order.id} className="backdrop-blur-md bg-white/20 border border-white/30">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-4">
                                <div>
                                  <h3 className="font-semibold text-lg">{order.id}</h3>
                                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                                </div>
                                <Badge className={`${getStatusColor(order.status)} text-white`}>
                                  {getStatusIcon(order.status)}
                                  <span className="ml-1 capitalize">{order.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-600">Items:</p>
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-2 mt-1">
                                      <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-8 h-8 object-cover rounded"
                                      />
                                      <span className="text-sm">{item.name}</span>
                                      {item.size && <span className="text-xs text-gray-500">({item.size})</span>}
                                    </div>
                                  ))}
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Payment:</p>
                                  <p className="font-semibold">{formatPrice(order.total)}</p>
                                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                {selectedOrder === order.id ? "Hide" : "Track"}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Invoice
                              </Button>
                            </div>
                          </div>

                          {selectedOrder === order.id && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <h4 className="font-semibold mb-4">Order Tracking</h4>
                              <div className="space-y-4">
                                {Object.entries(order.tracking).map(([step, details], index) => (
                                  <div key={step} className="flex items-center gap-4">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        details.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                                      }`}
                                    >
                                      {details.completed ? (
                                        <CheckCircle className="w-4 h-4" />
                                      ) : (
                                        <span className="text-xs">{index + 1}</span>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium capitalize">{step.replace(/([A-Z])/g, " $1")}</p>
                                      {details.completed && (
                                        <p className="text-sm text-gray-600">
                                          {details.date} at {details.time}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h5 className="font-medium mb-2">Shipping Address</h5>
                                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <Footer />
      <CartSidebar />
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderTrackingContent />
      </CartProvider>
    </AuthProvider>
  )
}
