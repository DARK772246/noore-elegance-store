"use client"
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { CartSidebar } from "@/components/cart-sidebar";

export default function ShippingPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <Navigation />
          <main className="flex-grow pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/50 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">Shipping Information</h1>
              <div className="space-y-4 text-lg text-gray-700">
                <p>We deliver all over Pakistan through reliable courier services.</p>
                <p><strong>Delivery Time:</strong> 3-5 business days.</p>
                <p><strong>Shipping Charges:</strong> A flat rate of Rs. 250 applies. Free shipping on all orders above Rs. 5,000.</p>
              </div>
            </div>
          </main>
          <Footer />
          <CartSidebar />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}