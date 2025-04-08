import { X, Menu, HelpCircle, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // Height of the header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after clicking a link
  }

  return (
    <header className="w-full py-2 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/30 sticky top-0 z-50 border-b border-purple-100/50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative h-12">
            <Image
              src="/logo.png"
              alt="PGNear.me Logo"
              width={36}
              height={10}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-medium text-xl text-[#1F2937]" style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
            PGNear.me
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#problem"
            onClick={(e) => handleScroll(e, "problem")}
            className="text-gray-700 hover:text-[#7C3AED] transition-colors flex items-center space-x-1.5 group font-medium"
            style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
          >
            <HelpCircle className="h-4 w-4 text-[#7C3AED] group-hover:text-[#6D28D9] transition-colors" />
            <span>The Problem</span>
          </a>
          <a
            href="#benefits"
            onClick={(e) => handleScroll(e, "benefits")}
            className="text-gray-700 hover:text-[#7C3AED] transition-colors flex items-center space-x-1.5 group font-medium"
            style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
          >
            <Award className="h-4 w-4 text-[#7C3AED] group-hover:text-[#6D28D9] transition-colors" />
            <span>How We Help</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-[#7C3AED]">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-purple-100/50 py-4">
          <nav className="flex flex-col items-center space-y-4">
            <a
              href="#problem"
              onClick={(e) => handleScroll(e, "problem")}
              className="text-gray-700 hover:text-[#7C3AED] transition-colors flex items-center space-x-1.5 group text-lg font-medium"
              style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
            >
              <HelpCircle className="h-5 w-5 text-[#7C3AED] group-hover:text-[#6D28D9] transition-colors" />
              <span>The Problem</span>
            </a>
            <a
              href="#benefits"
              onClick={(e) => handleScroll(e, "benefits")}
              className="text-gray-700 hover:text-[#7C3AED] transition-colors flex items-center space-x-1.5 group text-lg font-medium"
              style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
            >
              <Award className="h-5 w-5 text-[#7C3AED] group-hover:text-[#6D28D9] transition-colors" />
              <span>How We Help</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

