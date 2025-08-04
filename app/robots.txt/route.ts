export async function GET() {
  const robots = `User-agent: *
Allow: /

User-agent: *
Disallow: /admin
Disallow: /api/
Disallow: /test
Disallow: /error-test

Sitemap: https://noore-elegance.vercel.app/sitemap.xml`

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
