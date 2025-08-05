"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { CheckoutModal } from "@/components/checkout-modal"

export function CartSidebar() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, isCartOpen, setIsCartOpen } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }
  const formatPrice = (price: number) => `Rs ${price.toLocaleString()}`;

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader><SheetTitle>Shopping Cart</SheetTitle></SheetHeader>
          {items.length === 0 ? <div className="text-center py-12">Your cart is empty.</div> :
          <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto py-4">
                  {items.map((item) => {
                      const uniqueId = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                      return (
                      <div key={uniqueId} className="flex gap-4 mb-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                          <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-500">Size: {item.selectedSize}, Color: {item.selectedColor}</p>
                              <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                              <div className="flex items-center gap-2 mt-2">
                                  <Button variant="outline" size="sm" className="w-6 h-6 p-0" onClick={() => updateQuantity(uniqueId, item.quantity - 1)}><Minus className="w-3 h-3"/></Button>
                                  <span>{item.quantity}</span>
                                  <Button variant="outline" size="sm" className="w-6 h-6 p-0" onClick={() => updateQuantity(uniqueId, item.quantity + 1)}><Plus className="w-3 h-3"/></Button>
                              </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(uniqueId)}><Trash2 className="w-4 h-4 text-red-500"/></Button>
                      </div>
                  )})}
              </div>
              <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg mb-4">
                      <span>Total:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <Button onClick={handleCheckout} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">Proceed to Checkout</Button>
              </div>
          </div>}
        </SheetContent>
      </Sheet>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}