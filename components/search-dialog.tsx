"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Headphones, Video, Radio } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { searchContent } from "@/lib/search"
import type { SearchResult } from "@/lib/types"

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setResults([])
        return
      }

      setIsSearching(true)
      const searchResults = await searchContent(searchQuery)
      setResults(searchResults)
      setIsSearching(false)
    }

    const debounce = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchQuery])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim().length > 1) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
      onOpenChange(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "podcasts-audio":
        return <Headphones size={16} className="text-primary" />
      case "podcasts-video":
        return <Video size={16} className="text-primary" />
      case "visitas-radio":
        return <Radio size={16} className="text-primary" />
      default:
        return null
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "podcasts-audio":
        return "Podcast de Audio"
      case "podcasts-video":
        return "Podcast de Video"
      case "visitas-radio":
        return "Visita a la Radio"
      default:
        return "Contenido"
    }
  }

  function extractYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              placeholder="Buscar contenido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-0"
              autoFocus
            />
            {searchQuery && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchQuery("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {isSearching ? (
            <div className="p-8 text-center text-muted-foreground">Buscando...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/${result.category}/${result.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-start gap-3 p-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="relative h-16 w-24 flex-shrink-0 rounded-sm overflow-hidden">
                    {result.category.includes("video") || result.category === "visitas-radio" ? (
                      <Image
                        src={`https://img.youtube.com/vi/${extractYouTubeId(result.url)}/hqdefault.jpg`}
                        alt={result.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={result.thumbnail || "/placeholder.svg?height=100&width=150"}
                        alt={result.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(result.category)}
                      <span className="text-xs text-muted-foreground">{getCategoryName(result.category)}</span>
                    </div>
                    <h4 className="text-sm font-medium line-clamp-2">{result.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{result.description}</p>
                  </div>
                </Link>
              ))}
              {results.length > 5 && (
                <div className="p-3 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
                      onOpenChange(false)
                    }}
                  >
                    Ver todos los resultados
                  </Button>
                </div>
              )}
            </div>
          ) : searchQuery.trim().length > 1 ? (
            <div className="p-8 text-center text-muted-foreground">
              No se encontraron resultados para "{searchQuery}"
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">Escribe al menos 2 caracteres para buscar</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

