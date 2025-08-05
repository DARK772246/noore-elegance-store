"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CartItem { id: number; name: string; price: number; image: string; quantity: number; selectedSize?: string; selectedColor?: string; }
interface CartContextType { items: CartItem[]; addToCart: (product: any, quantity: number, size?: string, color?: string) => void; removeFromCart: (uniqueId: string) => void; updateQuantity: (uniqueId: string, quantity: number) => void; clearCart: () => void; getTotalItems: () => number; getTotalPrice: () => number; isCartOpen: boolean; setIsCartOpen: (open: boolean) => void; }

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => { const savedCart = localStorage.getItem("noore_cart_v3"); if (savedCart) { setItems(JSON.parse(savedCart)); } }, []);
  useEffect(() => { localStorage.setItem("noore_cart_v3", JSON.stringify(items)); }, [items]);

  const addToCart = (product: any, quantity = 1, size = "N/A", color = "N/A") => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { id: product.id, name: product.name, price: product.price, image: product.imageUrls[0], quantity, selectedSize: size, selectedColor: color }];
      }
    });
    setIsCartOpen(true); // Open cart on add
  };

  const removeFromCart = (uniqueId: string) => { setItems(prevItems => prevItems.filter(item => `${item.id}-${item.selectedSize}-${item.selectedColor}` !== uniqueId)); };
  
  const updateQuantity = (uniqueId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
          removeFromCart(uniqueId);
          return;
      }
      setItems(prevItems => prevItems.map(item => `${item.id}-${item.selectedSize}-${item.selectedColor}` === uniqueId ? { ...item, quantity: newQuantity } : item));
  };
  
  const clearCart = () => { setItems([]); };
  const getTotalItems = () => items.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => items.reduce((total, item) => total + item.price * item.quantity, 0);

  return ( <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice, isCartOpen, setIsCartOpen }}>{children}</CartContext.Provider> )
}
export function useCart() { const context = useContext(CartContext); if (context === undefined) { throw new Error("useCart must be used within a CartProvider"); } return context; }