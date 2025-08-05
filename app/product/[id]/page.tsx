"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react"
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

function ProductDetailsContent() {
  const { isLoggedIn, setShowAuthModal } = useAuth();
  const { addToCart } = useCart();
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  
  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
        if (!supabase || !productId) return;
        setIsLoading(true);
        const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();
        if (data) {
            setProduct(data);
            // Set default selected size and color if available
            if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
            if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        }
        setIsLoading(false);
    }
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!isLoggedIn) { setShowAuthModal(true); return; }
    if (product.sizes?.length > 0 && !selectedSize) { alert("Please select a size"); return; }
    if (product.colors?.length > 0 && !selectedColor) { alert("Please select a color"); return; }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    alert(`${quantity} item(s) added to cart!`);
  };

  const formatPrice = (price: number) => `₨ ${price.toLocaleString()}`;

  if (isLoading) {
      return <div className="flex h-screen items-center justify-center"><Loader2 className="w-12 h-12 animate-spin"/></div>
  }
  if (!product) {
      return <div className="flex h-screen items-center justify-center">Product not found.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <TopSlider />
      <Navigation />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img src={product.imageUrls[selectedImage]} alt={product.name} className="w-full h-96 lg:h-[600px] object-cover" />
              </div>
              {product.imageUrls.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.imageUrls.map((image: string, index: number) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`rounded-lg border-2 ${selectedImage === index ? 'border-purple-500' : 'border-transparent'}`}>
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover rounded-md" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-center gap-3"><span className="text-3xl font-bold text-purple-600">{formatPrice(product.price)}</span></div>
              
              {product.sizes?.length > 0 && <div className="space-y-2"><Label>Size</Label><div className="flex gap-2 flex-wrap">{product.sizes.map((size: string) => (<Button key={size} variant={selectedSize === size ? 'default' : 'outline'} onClick={() => setSelectedSize(size)}>{size}</Button>))}</div></div>}
              {product.colors?.length > 0 && <div className="space-y-2"><Label>Color</Label><div className="flex gap-2 flex-wrap">{product.colors.map((color: string) => (<Button key={color} variant={selectedColor === color ? 'default' : 'outline'} onClick={() => setSelectedColor(color)}>{color}</Button>))}</div></div>}

              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</Button><span>{quantity}</span><Button variant="outline" size="sm" onClick={() => setQuantity(q => q+1)}>+</Button></div>
                  <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"><ShoppingBag className="w-5 h-5 mr-2" />Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function ProductPage() {
  return (
    <AuthProvider>
        <CartProvider>
            <ProductDetailsContent />
            <CartSidebar />
        </CartProvider>
    </AuthProvider>
  )
}