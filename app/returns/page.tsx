"use client"
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { CartSidebar } from "@/components/cart-sidebar";

export default function ReturnsPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <Navigation />
          <main className="flex-grow pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/50 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">Returns & Exchanges</h1>
              <div className="space-y-4 text-lg text-gray-700">
                <h2 className="text-2xl font-semibold">Our 7-Day Return & Exchange Policy</h2>
                <p>We offer a 7-day return and exchange policy. If you are not satisfied with your purchase, you can return or exchange it within 7 days of delivery.</p>
                <p><strong>Conditions:</strong> The product must be unused, in its original packaging, and with all tags intact.</p>
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