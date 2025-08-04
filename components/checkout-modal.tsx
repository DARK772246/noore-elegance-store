"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Truck, MessageCircle, Info, MapPin, User, Phone, Mail } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartTotal: number
}

export function CheckoutModal({ isOpen, onClose, cartTotal }: CheckoutModalProps) {
  const { user } = useAuth()
  const { items, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [showNayaPayMessage, setShowNayaPayMessage] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const codFee = 100
  const finalTotal = paymentMethod === "cod" ? cartTotal + codFee : cartTotal

  const formatPrice = (price: number) => {
    return `₨ ${price.toLocaleString()}`
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    setShowNayaPayMessage(value === "nayapay")
  }

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ["fullName", "email", "phone", "address", "city"]
    return required.every((field) => shippingInfo[field as keyof typeof shippingInfo].trim() !== "")
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields")
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderId = `ORD-${Date.now().toString().slice(-6)}`

    if (paymentMethod === "nayapay") {
      alert(
        `Order ${orderId} placed successfully! Please send your NayaPay transaction screenshot to WhatsApp: 03275176283`,
      )
    } else {
      alert(`Order ${orderId} placed successfully! You will pay ${formatPrice(finalTotal)} on delivery.`)
    }

    clearCart()
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl backdrop-blur-md bg-white/95 border border-white/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
            Checkout
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">Complete your order details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t pt-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-orange-600">
                    <span>COD Fee:</span>
                    <span>{formatPrice(codFee)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-purple-600">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="fullName"
                      placeholder="Enter full name"
                      className="pl-10"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      className="pl-10"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      placeholder="03XX-XXXXXXX"
                      className="pl-10"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={shippingInfo.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="House/Flat number, Street, Area, Landmark"
                    className="resize-none"
                    rows={3}
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Enter postal code"
                    value={shippingInfo.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Special instructions"
                    value={shippingInfo.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                {/* Cash on Delivery */}
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Truck className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order (+₨100 fee)</div>
                    </div>
                  </Label>
                </div>

                {/* NayaPay */}
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="nayapay" id="nayapay" />
                  <Label htmlFor="nayapay" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">NayaPay</div>
                      <div className="text-sm text-gray-600">Pay online with NayaPay</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* NayaPay Message */}
          {showNayaPayMessage && (
            <Alert className="border-blue-500 bg-blue-50">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Important:</strong> After completing your NayaPay transaction, please send the payment
                screenshot to our WhatsApp:
                <a
                  href="https://wa.me/923275176283"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline ml-1"
                >
                  03275176283
                </a>
              </AlertDescription>
            </Alert>
          )}

          {/* COD Info */}
          {paymentMethod === "cod" && (
            <Alert className="border-orange-500 bg-orange-50">
              <Info className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>COD Fee:</strong> A delivery fee of ₨100 will be added to all Cash on Delivery orders.
              </AlertDescription>
            </Alert>
          )}

          {/* Place Order Button */}
          <Button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg text-lg"
          >
            {isProcessing ? "Processing Order..." : `Place Order - ${formatPrice(finalTotal)}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
