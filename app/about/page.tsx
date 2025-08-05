"use client"
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { CartSidebar } from "@/components/cart-sidebar";

export default function AboutPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <Navigation />
          <main className="flex-grow pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/50 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">About Nooré Elegance</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to Nooré Elegance, your ultimate destination for luxury fashion that defines your style. We believe in providing premium quality, elegant designs, and exceptional service to our valued customers across Pakistan. Our mission is to bring you the latest trends with a touch of timeless grace.
              </p>
            </div>
          </main>
          <Footer />
          <CartSidebar />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}