"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { CheckoutModal } from "@/components/checkout-modal"
import { useState } from "react"

export function CartSidebar() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, isCartOpen, setIsCartOpen } = useCart()
  const { isLoggedIn } = useAuth()
  const [showCheckout, setShowCheckout] = useState(false)

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please login to proceed with checkout")
      return
    }
    setShowCheckout(true)
  }

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl backdrop-blur-md bg-white/95">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart
              {items.length > 0 && <Badge variant="secondary">{items.length} items</Badge>}
            </SheetTitle>
            <SheetDescription>Review your selected items</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Add some products to get started</p>
                  <Button onClick={() => setIsCartOpen(false)} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4 max-h-[60vh] min-h-[200px]">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                        className="flex gap-3 p-3 border rounded-lg bg-white/50"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.category}</p>
                          {item.selectedSize && <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>}
                          {item.selectedColor && <p className="text-xs text-gray-600">Color: {item.selectedColor}</p>}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 p-0 text-xs"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 p-0 text-xs"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-purple-600 text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-xs text-gray-500 line-through">
                              {formatPrice(item.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3 bg-white/80 backdrop-blur-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-purple-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} cartTotal={getTotalPrice()} />
    </>
  )
}
