import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-[#D22630]" />
            <span className="text-2xl font-bold text-[#D22630]">SajiloMart</span>
          </Link>
        </header>
        <main className="flex justify-center">
          <div className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
            {children}
          </div>
        </main>
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SajiloMart. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

