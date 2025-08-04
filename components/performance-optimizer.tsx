"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=300&width=300",
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })

    // Optimize images with intersection observer
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute("data-src")
              imageObserver.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      },
    )

    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => imageObserver.observe(img))

    // Preload critical CSS
    const criticalCSS = document.createElement("style")
    criticalCSS.textContent = `
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(criticalCSS)

    // Cleanup function
    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return null
}
