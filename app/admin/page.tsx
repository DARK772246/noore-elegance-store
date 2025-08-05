"use client"

import type React from "react"
import { useState, useEffect, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Package, Plus, Trash2, Lock, Loader2, Upload, ShoppingCart } from "lucide-react"
import { createClient, User } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing. Check Environment Variables in Vercel.");
}
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface Product {
    id?: number;
    name: string;
    description: string;
    price: number | string;
    category: string;
    sizes: string[];
    colors: string[];
    stock: number | string;
    imageUrls: string[];
}
interface Category { id: number; name: string; }
interface Order { id: number; customer_details: any; order_items: any[]; total_price: number; status: string; created_at: string; }

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [newProduct, setNewProduct] = useState<any>({ name: "", category: "", price: "", stock: "", description: "", sizes: "", colors: "" });
  const [newCategoryName, setNewCategoryName] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const checkUser = async () => {
        if (!supabase) { setIsLoading(false); return; }
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if(currentUser) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }
    checkUser();

    const { data: authListener } = supabase?.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
            fetchData();
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  const handleLogout = async () => { if (!supabase) return; await supabase.auth.signOut(); setUser(null); };

  const fetchData = async () => {
    if (!supabase) return;
    setIsLoading(true);
    const productsPromise = supabase.from('products').select('*').order('id', { ascending: false });
    const categoriesPromise = supabase.from('categories').select('*').order('name');
    const ordersPromise = supabase.from('orders').select('*').order('created_at', { ascending: false });

    const [productsResult, categoriesResult, ordersResult] = await Promise.all([productsPromise, categoriesPromise, ordersPromise]);

    if (productsResult.data) setProducts(productsResult.data);
    if (categoriesResult.data) setCategories(categoriesResult.data);
    if (ordersResult.data) setOrders(ordersResult.data);
    setIsLoading(false);
  };
  
  const handleInputChange = (field: keyof Product, value: string) => { setNewProduct(prev => ({ ...prev, [field]: value })); };
      
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
          setFiles(Array.from(event.target.files).slice(0, 4)); // Limit to 4 files
      }
  };

  const handleAddProduct = async () => {
      if (!supabase || !newProduct.name || !newProduct.category || !newProduct.price) { alert("Please fill Name, Category and Price."); return; }
      
      setIsUploading(true);
      const imageUrls: string[] = [];
      
      for (const file of files) {
          const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
          const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
          
          if (uploadError) { alert(`Error uploading image ${file.name}: ${uploadError.message}`); setIsUploading(false); return; }
          
          const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
          imageUrls.push(urlData.publicUrl);
      }
      
      const productToInsert = { 
          name: newProduct.name,
          description: newProduct.description,
          price: Number(newProduct.price), 
          category: newProduct.category,
          stock: Number(newProduct.stock),
          sizes: newProduct.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
          colors: newProduct.colors.split(',').map((c: string) => c.trim()).filter(Boolean),
          imageUrls: imageUrls.length > 0 ? imageUrls : ["/placeholder.svg"],
      };
      
      const { error } = await supabase.from('products').insert([productToInsert]);
      setIsUploading(false);
      
      if (error) { alert("Error adding product: " + error.message); } 
      else { 
          alert("Product added successfully!"); 
          fetchData(); 
          setIsDialogOpen(false); 
          setNewProduct({ name: "", category: "", price: "", stock: "", description: "", sizes: "", colors: "" }); 
          setFiles([]);
      }
  };
  
  const handleDeleteProduct = async (productId: number | undefined) => {
    if(!supabase || !productId) return;
    if (confirm("Are you sure you want to delete this product?")) {
        const { error } = await supabase.from('products').delete().match({ id: productId });
        if (error) { alert("Error deleting product: " + error.message); } else { alert("Product deleted successfully!"); fetchData(); }
    }
  };
  
  const handleAddCategory = async () => {
      if (!supabase || !newCategoryName.trim()) { alert("Please enter a category name."); return; }
      const { error } = await supabase.from('categories').insert([{ name: newCategoryName }]);
       if (error) { alert("Error adding category: " + error.message); } else { alert("Category added successfully!"); setNewCategoryName(""); fetchData(); }
  };
  
  const handleDeleteCategory = async (categoryId: number) => {
      if (!supabase || !categoryId) return;
      if (confirm("Are you sure you want to delete this category?")) {
          const { error } = await supabase.from('categories').delete().match({ id: categoryId });
          if (error) { alert("Error deleting category: " + error.message); } else { alert("Category deleted successfully!"); fetchData(); }
      }
  };

  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('orders').update({ status: newStatus }).match({ id: orderId });
    if (error) { alert("Error updating status: " + error.message); } 
    else { alert("Order status updated!"); fetchData(); }
  };

  const formatPrice = (price: any) => `₨ ${Number(price).toLocaleString()}`;
    
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-white" /></div>
            <CardTitle className="text-2xl font-bold text-white">Admin Panel Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div><Label htmlFor="email" className="text-white">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white bg-opacity-20 text-white" /></div>
              <div><Label htmlFor="password" className="text-white">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-white bg-opacity-20 text-white" /></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="p-2 sm:p-6">
        <div className="max-w-7xl mx-auto">
           <div className="mb-8"><div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-6 border border-white shadow-lg"><div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Dashboard</h1><p className="text-gray-600 text-sm">Logged in as: {user.email}</p></div><Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-500">Logout</Button></div></div></div>
          <Tabs defaultValue="orders">
              <TabsList><TabsTrigger value="orders">Orders</TabsTrigger><TabsTrigger value="products">Products</TabsTrigger><TabsTrigger value="categories">Categories</TabsTrigger></TabsList>
              <TabsContent value="orders">
                  <Card><CardHeader><CardTitle>Order Management</CardTitle></CardHeader>
                      <CardContent>
                          <div className="overflow-x-auto">
                              <Table>
                                  <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Items</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                                  <TableBody>
                                      {orders.map(order => (
                                          <TableRow key={order.id}>
                                              <TableCell>{order.customer_details.name}<br/><span className="text-xs text-gray-500">{order.customer_details.phone}</span></TableCell>
                                              <TableCell>
                                                {order.order_items.map((item:any, index:number) => (
                                                    <div key={index} className="text-xs">{item.name} ({item.selectedSize}, {item.selectedColor}) x{item.quantity}</div>
                                                ))}
                                              </TableCell>
                                              <TableCell>{formatPrice(order.total_price)}</TableCell>
                                              <TableCell><Badge>{order.status}</Badge></TableCell>
                                              <TableCell>
                                                  <Select defaultValue={order.status} onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}>
                                                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                                                      <SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Shipped">Shipped</SelectItem><SelectItem value="Delivered">Delivered</SelectItem><SelectItem value="Cancelled">Cancelled</SelectItem></SelectContent>
                                                  </Select>
                                              </TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </div>
                      </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="products">
                  <Card><CardHeader><CardTitle className="flex justify-between items-center"><span>Product Management</span><Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}><DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2"/>Add Product</Button></DialogTrigger><DialogContent className="max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader><div className="space-y-3 py-4"><div><Label>Name</Label><Input value={newProduct.name} onChange={e => handleInputChange('name', e.target.value)} /></div><div><Label>Category</Label><Select onValueChange={value => handleInputChange('category', value)}><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}</SelectContent></Select></div><div><Label>Price</Label><Input type="number" value={String(newProduct.price)} onChange={e => handleInputChange('price', e.target.value)} /></div><div><Label>Sizes (comma separated)</Label><Input placeholder="S,M,L,XL" value={newProduct.sizes} onChange={e => handleInputChange('sizes', e.target.value)} /></div><div><Label>Colors (comma separated)</Label><Input placeholder="Black,White,Red" value={newProduct.colors} onChange={e => handleInputChange('colors', e.target.value)} /></div><div><Label>Stock</Label><Input type="number" value={String(newProduct.stock)} onChange={e => handleInputChange('stock', e.target.value)} /></div><div><Label>Description</Label><Textarea value={newProduct.description} onChange={e => handleInputChange('description', e.target.value)} /></div><div><Label>Product Images (up to 4)</Label><Input id="file-upload" name="file-upload" type="file" multiple onChange={handleFileChange} accept="image/*" /></div></div><Button onClick={handleAddProduct} disabled={isUploading}>{isUploading ? <><Loader2 className="animate-spin mr-2" /> Uploading...</> : 'Publish Product'}</Button></DialogContent></Dialog></CardTitle></CardHeader>
                      <CardContent>
                          {isLoading ? <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div> :
                          <div className="overflow-x-auto">
                            <Table>
                                <TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Product</TableHead><TableHead>Price</TableHead><TableHead>Stock</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {products.map(p => (<TableRow key={p.id}><TableCell><img src={p.imageUrls[0]} alt={p.name} className="w-12 h-12 rounded-md object-cover" /></TableCell><TableCell className="font-medium">{p.name}</TableCell><TableCell>{formatPrice(p.price)}</TableCell><TableCell>{p.stock}</TableCell><TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(p.id)}><Trash2 className="w-4 h-4" /></Button></TableCell></TableRow>))}
                                </TableBody>
                            </Table>
                          </div>}
                      </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="categories">
                  <Card><CardHeader><CardTitle>Category Management</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex gap-2"><Input placeholder="New category name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} /><Button onClick={handleAddCategory}>Add Category</Button></div>
                           {isLoading ? <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div> :
                          <Table>
                              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                              <TableBody>
                                  {categories.map(c => (<TableRow key={c.id}><TableCell>{c.name}</TableCell><TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(c.id)}><Trash2 className="w-4 h-4" /></Button></TableCell></TableRow>))}
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