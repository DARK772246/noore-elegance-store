"use client"
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";
import { CartSidebar } from "@/components/cart-sidebar";

export default function SizeGuidePage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <Navigation />
          <main className="flex-grow pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/50 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">Size Guide</h1>
              <p className="text-lg text-gray-700 mb-6">Please refer to the chart below for sizing details (measurements in inches).</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="bg-gray-200"><th className="p-2">Size</th><th className="p-2">Chest</th><th className="p-2">Waist</th><th className="p-2">Hips</th></tr></thead>
                  <tbody>
                    <tr><td className="p-2">S</td><td className="p-2">34-36</td><td className="p-2">28-30</td><td className="p-2">36-38</td></tr>
                    <tr><td className="p-2">M</td><td className="p-2">38-40</td><td className="p-2">32-34</td><td className="p-2">40-42</td></tr>
                    <tr><td className="p-2">L</td><td className="p-2">42-44</td><td className="p-2">36-38</td><td className="p-2">44-46</td></tr>
                  </tbody>
                </table>
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