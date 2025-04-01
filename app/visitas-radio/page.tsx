import { getContentByCategory } from "@/lib/data.server"
import { Card, CardContent } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Radio } from "lucide-react"

export default async function VisitasRadioPage() {
  const visitas = await getContentByCategory("visitas-radio")

  function extractYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : "dQw4w9WgXcQ"
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 border-b border-neutral-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Visitas a la Radio</h1>
        <p className="text-neutral-600">
          Revive las experiencias de nuestros estudiantes en visitas a radios profesionales
        </p>
      </div>

      {visitas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">No hay grabaciones de visitas disponibles actualmente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visitas.map((visita) => (
            <Card
              key={visita.id}
              className="overflow-hidden border border-neutral-200 hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Link href={`/visitas-radio/${visita.id}`}>
                  <div className="relative aspect-video">
                    <ImageWithFallback
                      src={`https://img.youtube.com/vi/${extractYouTubeId(visita.url)}/maxresdefault.jpg`}
                      fallbackSrc={`https://img.youtube.com/vi/${extractYouTubeId(visita.url)}/hqdefault.jpg`}
                      alt={visita.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Radio size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded-sm">
                  <Radio size={14} className="inline mr-1" /> Visita a la Radio
                </div>
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-neutral-500 mb-2">{formatDate(visita.createdAt)}</div>
                <h2 className="text-xl font-serif font-bold mb-2 line-clamp-2">
                  <Link href={`/visitas-radio/${visita.id}`} className="hover:text-primary transition-colors">
                    {visita.title}
                  </Link>
                </h2>
                <p className="text-neutral-600 text-sm line-clamp-3">{visita.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

