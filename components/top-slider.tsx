"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "🎉 Grand Opening Sale!",
    description: "Get 25% OFF on all items. Use code: NOORE25",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "🚚 Free Delivery",
    description: "Free delivery on orders above ₨5,000",
    bgColor: "bg-gradient-to-r from-green-600 to-blue-600",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "💎 New Bridal Collection",
    description: "Exclusive bridal wear now available",
    bgColor: "bg-gradient-to-r from-yellow-600 to-orange-600",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "📱 WhatsApp Support",
    description: "24/7 customer support on WhatsApp: 03275176283",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    textColor: "text-white",
  },
]

export function TopSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (!isVisible) return null

  const currentSlideData = slides[currentSlide]

  return (
    <div className={`${currentSlideData.bgColor} ${currentSlideData.textColor} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={prevSlide} className="text-white hover:bg-white/20 p-1">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base">
              <span className="font-semibold">{currentSlideData.title}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{currentSlideData.description}</span>
            </div>
            <div className="sm:hidden text-xs mt-1 opacity-90">{currentSlideData.description}</div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={nextSlide} className="text-white hover:bg-white/20 p-1">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-2 gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
