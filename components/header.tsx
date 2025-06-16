"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Headphones, Video, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { SearchDialog } from "@/components/search-dialog"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMobile = useMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Capitalize the first letter of the date
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1)

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-neutral-200">
      {/* Top bar with date */}
      <div className="bg-neutral-100 py-2 border-b border-neutral-200 hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-neutral-600">{formattedDate}</div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-3xl font-black tracking-tighter">
            Colegio Cristo Rey
          </Link>

          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        {!isMobile && (
          <nav className="mt-4 border-t border-b border-neutral-200 py-2">
            <ul className="flex justify-center space-x-6">
              <li>
                <Link href="/" className="inline-block py-2 text-sm font-medium text-neutral-800 hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/podcasts-audio"
                  className="inline-block py-2 text-sm font-medium text-neutral-800 hover:text-primary"
                >
                  <Headphones className="inline-block h-4 w-4 mr-1" />
                  Podcasts de Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/podcasts-video"
                  className="inline-block py-2 text-sm font-medium text-neutral-800 hover:text-primary"
                >
                  <Video className="inline-block h-4 w-4 mr-1" />
                  Podcasts de Video
                </Link>
              </li>
              <li>
                <Link
                  href="/estrategia-seo"
                  className="inline-block py-2 text-sm font-medium text-neutral-800 hover:text-primary"
                >
                  <Radio className="inline-block h-4 w-4 mr-1" />
                  Estrategia SEO
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="pt-4 pb-2">
            <nav className="flex flex-col space-y-4 border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="text-xs text-neutral-600">{formattedDate}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Link
                href="/"
                className="text-neutral-800 hover:text-primary transition-colors px-2 py-1 font-medium"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link
                href="/podcasts-audio"
                className="text-neutral-800 hover:text-primary transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                <Headphones className="inline-block h-4 w-4 mr-2" />
                Podcasts de Audio
              </Link>
              <Link
                href="/podcasts-video"
                className="text-neutral-800 hover:text-primary transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                <Video className="inline-block h-4 w-4 mr-2" />
                Podcasts de Video
              </Link>
              <Link
                href="/estrategia-seo"
                className="text-neutral-800 hover:text-primary transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                <Radio className="inline-block h-4 w-4 mr-2" />
                Estrategia SEO
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}

