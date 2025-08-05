"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/components/cart-provider"
import { createClient } from "@supabase/supabase-js"
import { Loader2, CreditCard, Truck } from "lucide-react"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface CheckoutModalProps { isOpen: boolean; onClose: () => void; }

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
      email: "", firstName: "", lastName: "", address: "", city: "", postalCode: "", phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const shippingFee = 250;
  const subtotal = getTotalPrice();
  const total = subtotal + shippingFee;

  const handleInputChange = (field: string, value: string) => {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
      if (!supabase) { alert("Database connection error."); return; }
      const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'phone'];
      if (requiredFields.some(field => !shippingInfo[field as keyof typeof shippingInfo])) {
          alert("Please fill all required fields.");
          return;
      }
      
      setIsPlacingOrder(true);

      const orderData = {
          customer_details: shippingInfo,
          order_items: items,
          total_price: total,
          status: 'Pending',
          payment_method: paymentMethod,
          shipping_fee: shippingFee
      };

      const { error } = await supabase.from('orders').insert([orderData]);
      setIsPlacingOrder(false);

      if (error) {
          alert("Error placing order: " + error.message);
      } else {
          alert("Thank you! Your order has been placed successfully.");
          clearCart();
          onClose();
      }
  }

  const formatPrice = (price: number) => `Rs ${price.toLocaleString()}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Checkout</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
            {/* Contact and Delivery Form */}
            <div className="space-y-4">
                <div><Label>Email</Label><Input type="email" value={shippingInfo.email} onChange={e => handleInputChange('email', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><Label>First Name</Label><Input value={shippingInfo.firstName} onChange={e => handleInputChange('firstName', e.target.value)} /></div>
                    <div><Label>Last Name</Label><Input value={shippingInfo.lastName} onChange={e => handleInputChange('lastName', e.target.value)} /></div>
                </div>
                <div><Label>Address</Label><Input value={shippingInfo.address} onChange={e => handleInputChange('address', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><Label>City</Label><Input value={shippingInfo.city} onChange={e => handleInputChange('city', e.target.value)} /></div>
                    <div><Label>Postal Code (Optional)</Label><Input value={shippingInfo.postalCode} onChange={e => handleInputChange('postalCode', e.target.value)} /></div>
                </div>
                <div><Label>Phone</Label><Input type="tel" value={shippingInfo.phone} onChange={e => handleInputChange('phone', e.target.value)} /></div>
            </div>

            {/* Shipping Method */}
            <div className="space-y-2">
                <h3 className="font-semibold">Shipping method</h3>
                <div className="p-3 border rounded-md flex justify-between items-center">
                    <span>Standard Shipping</span>
                    <span>{formatPrice(shippingFee)}</span>
                </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
                <h3 className="font-semibold">Payment</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="p-3 border rounded-md"><div className="flex items-center space-x-2"><RadioGroupItem value="cod" id="cod" /><Label htmlFor="cod" className="flex items-center gap-2"><Truck className="w-5 h-5"/>Cash on Delivery (COD)</Label></div></div>
                    <div className="p-3 border rounded-md"><div className="flex items-center space-x-2"><RadioGroupItem value="nayapay" id="nayapay" /><Label htmlFor="nayapay" className="flex items-center gap-2"><CreditCard className="w-5 h-5"/>NayaPay</Label></div></div>
                </RadioGroup>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm"><p>Subtotal</p><p>{formatPrice(subtotal)}</p></div>
                <div className="flex justify-between text-sm"><p>Shipping</p><p>{formatPrice(shippingFee)}</p></div>
                <div className="flex justify-between font-bold text-lg"><p>Total</p><p>{formatPrice(total)}</p></div>
            </div>

        </div>
        <Button onClick={handlePlaceOrder} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white" disabled={isPlacingOrder}>
            {isPlacingOrder ? <><Loader2 className="animate-spin mr-2"/> Placing Order...</> : `Pay Now - ${formatPrice(total)}`}
        </Button>
      </DialogContent>
    </Dialog>
  )
}