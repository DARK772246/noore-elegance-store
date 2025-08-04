"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Lock,
} from "lucide-react"

// Mock data
const orders = [
  {
    id: "ORD-001",
    customer: "Ayesha Khan",
    email: "ayesha@email.com",
    total: 15999,
    codFee: 100,
    finalTotal: 16099,
    status: "pending",
    paymentMethod: "COD",
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Fatima Ali",
    email: "fatima@email.com",
    total: 8999,
    codFee: 0,
    finalTotal: 8999,
    status: "shipped",
    paymentMethod: "NayaPay",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Zara Ahmed",
    email: "zara@email.com",
    total: 25999,
    codFee: 100,
    finalTotal: 26099,
    status: "delivered",
    paymentMethod: "COD",
    date: "2024-01-13",
    items: 3,
  },
]

const products = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    category: "Dresses",
    price: 15999,
    stock: 25,
    status: "active",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Designer Handbag",
    category: "Bags",
    price: 8999,
    stock: 12,
    status: "active",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Premium Heels",
    category: "Shoes",
    price: 6999,
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const users = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha@email.com",
    phone: "0321-1234567",
    orders: 5,
    totalSpent: 45999,
    joinDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima@email.com",
    phone: "0333-9876543",
    orders: 3,
    totalSpent: 28999,
    joinDate: "2024-01-05",
  },
]

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in real app, use proper authentication
    if (adminCredentials.username === "admin" && adminCredentials.password === "noore2024") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "shipped":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Update order status logic
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Admin Panel</CardTitle>
            <p className="text-gray-300">Nooré Elegance Management</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder-gray-300"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder-gray-300"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Login to Admin Panel
              </Button>
            </form>
            <p className="text-xs text-gray-400 text-center mt-4">Demo: admin / noore2024</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-6 border border-white border-opacity-30 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">Nooré Elegance Management Panel</p>
                </div>
                <Button
                  onClick={() => setIsAuthenticated(false)}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-purple-600">156</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-pink-600">89</p>
                  </div>
                  <Package className="w-8 h-8 text-pink-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-blue-600">234</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₨2.4M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Orders</span>
                    <Badge variant="secondary">{orders.length} orders</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>COD Fee</TableHead>
                        <TableHead>Final Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-gray-600">{order.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{formatPrice(order.total)}</TableCell>
                          <TableCell>{order.codFee > 0 ? formatPrice(order.codFee) : "-"}</TableCell>
                          <TableCell className="font-semibold">{formatPrice(order.finalTotal)}</TableCell>
                          <TableCell>
                            <Badge variant={order.paymentMethod === "COD" ? "destructive" : "default"}>
                              {order.paymentMethod}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Update" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="shipped">Shipped</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Product Management</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl bg-white bg-opacity-95 backdrop-blur-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Add New Product</DialogTitle>
                          <DialogDescription>Create a new product for your store</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Basic Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="productName">Product Name *</Label>
                              <Input id="productName" placeholder="Enter product name" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="category">Category *</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="dresses">Dresses</SelectItem>
                                  <SelectItem value="accessories">Accessories</SelectItem>
                                  <SelectItem value="beauty">Beauty</SelectItem>
                                  <SelectItem value="shoes">Shoes</SelectItem>
                                  <SelectItem value="bridal-wear">Bridal Wear</SelectItem>
                                  <SelectItem value="bags">Bags</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="price">Price (PKR) *</Label>
                              <Input id="price" type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="originalPrice">Original Price (PKR)</Label>
                              <Input id="originalPrice" type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="stock">Stock Quantity *</Label>
                              <Input id="stock" type="number" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <Select defaultValue="active">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Product Images */}
                          <div className="space-y-4">
                            <Label>Product Images</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="space-y-2">
                                  <Label htmlFor={`image${index}`} className="text-sm">
                                    Image {index}
                                  </Label>
                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors cursor-pointer">
                                    <input
                                      type="file"
                                      id={`image${index}`}
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                          console.log(`Image ${index} selected:`, file.name)
                                        }
                                      }}
                                    />
                                    <label htmlFor={`image${index}`} className="cursor-pointer">
                                      <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center">
                                        <span className="text-gray-500 text-sm">Click to upload</span>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              Upload up to 4 product images. First image will be the main image.
                            </p>
                          </div>

                          {/* Product Variants */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sizes">Available Sizes</Label>
                              <Input id="sizes" placeholder="XS, S, M, L, XL" />
                              <p className="text-xs text-gray-500">Separate sizes with commas</p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="colors">Available Colors</Label>
                              <Input id="colors" placeholder="Black, White, Red, Blue" />
                              <p className="text-xs text-gray-500">Separate colors with commas</p>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="description">Product Description *</Label>
                              <Textarea
                                id="description"
                                className="resize-none h-24"
                                placeholder="Detailed product description..."
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="features">Key Features</Label>
                              <Textarea
                                id="features"
                                className="resize-none h-20"
                                placeholder="Premium quality, Elegant design, Perfect fit (one per line)"
                              />
                            </div>
                          </div>

                          {/* Product Specifications */}
                          <div className="space-y-4">
                            <Label>Product Specifications</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="material">Material</Label>
                                <Input id="material" placeholder="e.g., Cotton, Silk, Polyester" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="care">Care Instructions</Label>
                                <Input id="care" placeholder="e.g., Machine wash, Dry clean only" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="origin">Origin</Label>
                                <Input id="origin" placeholder="e.g., Made in Pakistan" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="fit">Fit Type</Label>
                                <Input id="fit" placeholder="e.g., Regular fit, Slim fit" />
                              </div>
                            </div>
                          </div>

                          {/* SEO & Marketing */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="isNew" className="rounded" />
                              <Label htmlFor="isNew">Mark as New Product</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="isFeatured" className="rounded" />
                              <Label htmlFor="isFeatured">Feature on Homepage</Label>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => {}}>
                              Save as Draft
                            </Button>
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              Publish Product
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>
                            <span className={product.stock === 0 ? "text-red-500" : "text-green-500"}>
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
                <CardHeader>
                  <CardTitle>User Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.orders}</TableCell>
                          <TableCell>{formatPrice(user.totalSpent)}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Category Management</span>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {["Dresses", "Accessories", "Beauty", "Shoes", "Bridal Wear", "Bags"].map((category) => (
                      <Card
                        key={category}
                        className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{category}</h3>
                              <p className="text-sm text-gray-600">12 products</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
