// app/about/page.tsx
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div>
      <Navigation />
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold my-8">About Nooré Elegance</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to Nooré Elegance, your ultimate destination for luxury fashion that defines your style. We believe in providing premium quality, elegant designs, and exceptional service to our valued customers across Pakistan.
        </p>
      </div>
      <Footer />
    </div>
  );
}