import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 via-pink-50 to-purple-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">404</h1>
        <p className="text-purple-800/60 mb-6">This page could not be found.</p>
        <Link href="/" className="text-purple-600 hover:text-purple-800 underline font-medium">
          Go back home
        </Link>
      </div>
    </div>
  )
}
