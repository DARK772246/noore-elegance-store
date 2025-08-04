export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://noore-elegance.vercel.app/</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/category/dresses</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/category/accessories</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/category/beauty</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/category/shoes</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/category/bridal-wear</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/category/bags</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/product/1</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/orders</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://noore-elegance.vercel.app/admin</loc>
    <lastmod>2024-01-20T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
