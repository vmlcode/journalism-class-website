import { searchContent } from "@/lib/search"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Headphones, Video, Radio } from "lucide-react"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""
  const results = await searchContent(query)

  function extractYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : "dQw4w9WgXcQ"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "podcasts-audio":
        return <Headphones size={16} className="inline mr-1" />
      case "podcasts-video":
        return <Video size={16} className="inline mr-1" />
      case "visitas-radio":
        return <Radio size={16} className="inline mr-1" />
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 border-b border-neutral-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Resultados de búsqueda</h1>
        <p className="text-neutral-600">
          {results.length} resultados para "{query}"
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">No se encontraron resultados para "{query}".</p>
          <p className="text-neutral-500 mt-2">Intenta con otros términos o navega por las categorías.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-neutral-200 hover:shadow-md transition-shadow">
              <div className="relative">
                <Link href={`/${item.category}/${item.id}`}>
                  <div className="relative aspect-video">
                    {item.category.includes("video") || item.category === "visitas-radio" ? (
                      <Image
                        src={`https://img.youtube.com/vi/${extractYouTubeId(item.url)}/maxresdefault.jpg`}
                        alt={item.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${extractYouTubeId(item.url)}/hqdefault.jpg`
                        }}
                      />
                    ) : (
                      <Image
                        src={item.thumbnail || "/placeholder.svg?height=400&width=600"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        {getCategoryIcon(item.category)}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded-sm">
                  {getCategoryIcon(item.category)} {getCategoryName(item.category)}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-neutral-500 mb-2">{formatDate(item.createdAt)}</div>
                <h2 className="text-xl font-serif font-bold mb-2 line-clamp-2">
                  <Link href={`/${item.category}/${item.id}`} className="hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </h2>
                <p className="text-neutral-600 text-sm line-clamp-3">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

