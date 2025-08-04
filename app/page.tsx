// File: app/page.tsx

"use client"

export default function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f2f5', 
      color: '#333', 
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'white' }}>
        <h1 style={{ fontSize: '2rem', color: '#4a00e0' }}>Test Successful!</h1>
        <p style={{ marginTop: '1rem' }}>Your Next.js setup is working correctly.</p>
        <p style={{ marginTop: '0.5rem' }}>Now you can restore the original page code.</p>
      </div>
    </div>
  )
}