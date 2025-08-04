// File: app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { PerformanceOptimizer } from "@/components/performance-optimizer"

export const metadata: Metadata = {
  title: "Nooré Elegance - Luxury Fashion Store",
  description:
    "Discover luxury fashion that defines your style. Premium quality dresses, accessories, and bridal wear.",
  keywords: "fashion, luxury, dresses, bridal wear, accessories, Pakistan fashion, online shopping",
  authors: [{ name: "Nooré Elegance" }],
  creator: "Nooré Elegance",
  publisher: "Nooré Elegance",
  openGraph: {
    title: "Nooré Elegance - Luxury Fashion Store",
    description: "Discover luxury fashion that defines your style",
    url: "https://noore-elegance.vercel.app",
    siteName: "Nooré Elegance",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Nooré Elegance - Luxury Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nooré Elegance - Luxury Fashion Store",
    description: "Discover luxury fashion that defines your style",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <PerformanceOptimizer />
        {children}
      </body>
    </html>
  )
}