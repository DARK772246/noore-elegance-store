"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  DialogClose,
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
  Loader2,
} from "lucide-react"
import { createClient } from '@supabase/supabase-js'

// Supabase Client Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Interfaces
interface Product {
    id?: number;
    name: string;
    category: string;
    price: number | string;
    originalPrice?: number | string | null;
    stock: number | string;
    description: string;
    imageUrl: string;
    status: 'active' | 'inactive';
}

interface Category {
    id: number;
    name: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    imageUrl: "/placeholder.svg?height=100&width=100",
    status: 'active'
  });
  
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const fetchData = async () => {
    setIsLoading(true)
    const { data: productsData } = await supabase.from('products').select('*').order('id', { ascending: false })
    const { data: categoriesData } = await supabase.from('categories').select('*').order('name')
    if (productsData) setProducts(productsData)
    if (categoriesData) setCategories(categoriesData)
    setIsLoading(false)
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminCredentials.username === "admin" && adminCredentials.password === "noore2024") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }
  
  const handleInputChange = (field: keyof Product, value: string) => {
      setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
      if (!newProduct.name || !newProduct.category || !newProduct.price) {
          alert("Please fill name, category and price.");
          return;
      }
      const productToInsert = {
          ...newProduct,
          price: Number(newProduct.price),
          originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : null,
          stock: Number(newProduct.stock)
      }
      const { data, error } = await supabase.from('products').insert([productToInsert]).select();
      if (error) {
          alert("Error adding product: " + error.message);
      } else {
          alert("Product added successfully!");
          fetchData();
          setIsDialogOpen(false);
      }
  }
  
  const handleDeleteProduct = async (productId: number | undefined) => {
    if(!productId) return;
    if (confirm("Are you sure you want to delete this product?")) {
        const { error } = await supabase.from('products').delete().match({ id: productId })
        if (error) {
            alert("Error deleting product: " + error.message)
        } else {
            alert("Product deleted successfully!")
            fetchData()
        }
    }
  }
  
  const handleAddCategory = async () => {
      if (!newCategoryName.trim()) {
          alert("Please enter a category name.");
          return;
      }
      const { data, error } = await supabase.from('categories').insert([{ name: newCategoryName }]).select();
       if (error) {
          alert("Error adding category: " + error.message);
      } else {
          alert("Category added successfully!");
          setNewCategoryName("");
          fetchData();
      }
  }
  
  const handleDeleteCategory = async (categoryId: number) => {
      if (confirm("Are you sure you want to delete this category?")) {
          const { error } = await supabase.from('categories').delete().match({ id: categoryId });
          if (error) {
            alert("Error deleting category: " + error.message)
        } else {
            alert("Category deleted successfully!")
            fetchData()
        }
      }
  }

  const formatPrice = (price: any) => `₨ ${Number(price).toLocaleString()}`;
    
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
          <Tabs defaultValue="products">
              <TabsList>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                              Product Management
                              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                  <DialogTrigger asChild>
                                      <Button>Add Product</Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                                      <DialogHeader>
                                          <DialogTitle>Add New Product</DialogTitle>
                                          <DialogDescription>Fill in the details for the new product.</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                          <div><Label>Name</Label><Input value={newProduct.name} onChange={e => handleInputChange('name', e.target.value)} /></div>
                                          <div><Label>Category</Label>
                                            <Select onValueChange={value => handleInputChange('category', value)}>
                                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                          </div>
                                          <div><Label>Price</Label><Input type="number" value={String(newProduct.price)} onChange={e => handleInputChange('price', e.target.value)} /></div>
                                          <div><Label>Original Price (Optional)</Label><Input type="number" value={String(newProduct.originalPrice || '')} onChange={e => handleInputChange('originalPrice', e.target.value)} /></div>
                                          <div><Label>Stock</Label><Input type="number" value={String(newProduct.stock)} onChange={e => handleInputChange('stock', e.target.value)} /></div>
                                          <div><Label>Description</Label><Textarea value={newProduct.description} onChange={e => handleInputChange('description', e.target.value)} /></div>
                                          {/* Image Upload can be added here */}
                                      </div>
                                      <Button onClick={handleAddProduct}>Publish Product</Button>
                                  </DialogContent>
                              </Dialog>
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          {isLoading ? <Loader2 className="animate-spin" /> :
                          <Table>
                              <TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Product</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                              <TableBody>
                                  {products.map(p => (
                                      <TableRow key={p.id}>
                                          <TableCell><img src={p.imageUrl} alt={p.name} className="w-12 h-12" /></TableCell>
                                          <TableCell>{p.name}</TableCell>
                                          <TableCell>{formatPrice(p.price)}</TableCell>
                                          <TableCell>{p.stock}</TableCell>
                                          <TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(p.id)}><Trash2 className="w-4 h-4" /></Button></TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>}
                      </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="categories">
                  <Card>
                      <CardHeader><CardTitle>Category Management</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex gap-2">
                              <Input placeholder="New category name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
                              <Button onClick={handleAddCategory}>Add Category</Button>
                          </div>
                           {isLoading ? <Loader2 className="animate-spin" /> :
                          <Table>
                              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                              <TableBody>
                                  {categories.map(c => (
                                      <TableRow key={c.id}>
                                          <TableCell>{c.name}</TableCell>
                                          <TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(c.id)}><Trash2 className="w-4 h-4" /></Button></TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>}
                      </CardContent>
                  </Card>
              </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}