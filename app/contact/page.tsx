import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/components/cart-provider";

export default function ContactPage() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white/50 p-8 rounded-lg shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
              <div className="space-y-4 text-lg text-gray-700">
                <p><strong>WhatsApp:</strong> 0327-5176283</p>
                <p><strong>Email:</strong> info@nooreelegance.com</p>
                <p><strong>Business Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}