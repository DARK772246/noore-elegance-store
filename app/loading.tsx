export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-600 rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">Please wait while we prepare your experience</p>
      </div>
    </div>
  )
}
