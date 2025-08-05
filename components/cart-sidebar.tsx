"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-provider"
import { createClient } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface CheckoutModalProps { isOpen: boolean; onClose: () => void; }

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ name: "", phone: "", address: ""});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  const handlePlaceOrder = async () => {
      if (!supabase) { alert("Database connection is not configured."); return; }
      if(!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) { alert("Please fill all shipping details."); return; }
      
      setIsPlacingOrder(true);

      const orderData = {
          customer_details: shippingInfo,
          order_items: items,
          total_price: getTotalPrice(),
          status: 'Pending'
      };

      const { error } = await supabase.from('orders').insert([orderData]);
      setIsPlacingOrder(false);

      if (error) {
          alert("Error placing order: " + error.message);
      } else {
          alert("Thank you for your order! It has been placed successfully.");
          clearCart();
          onClose();
      }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>Please provide your shipping details.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div><Label>Full Name</Label><Input value={shippingInfo.name} onChange={e => setShippingInfo({...shippingInfo, name: e.target.value})} /></div>
            <div><Label>Phone Number</Label><Input value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} /></div>
            <div><Label>Full Address</Label><Input value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} /></div>
            <div className="font-bold text-lg">Total: Rs {getTotalPrice().toLocaleString()}</div>
        </div>
        <Button onClick={handlePlaceOrder} className="w-full" disabled={isPlacingOrder}>
            {isPlacingOrder ? <><Loader2 className="animate-spin mr-2"/> Placing Order...</> : "Place Order"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}