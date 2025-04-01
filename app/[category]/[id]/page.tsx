import { getContentById } from "@/lib/data.server"
import { notFound } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Headphones, Video, Radio, Calendar, Share2 } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function ContentDetailPage({
  params,
}: {
  params: { category: string; id: string }
}) {
  const content = await getContentById(params.id)

  if (!content) {
    notFound()
  }

  // Determine if this is audio or video content
  const isAudio = content.category === "podcasts-audio"
  const isVideo = content.category === "podcasts-video" || content.category === "visitas-radio"

  // Get category name for display
  const getCategoryName = (category: string) => {
    switch (category) {
      case "podcasts-audio":
        return "Podcasts de Audio"
      case "podcasts-video":
        return "Podcasts de Video"
      case "visitas-radio":
        return "Visitas a la Radio"
      default:
        return "Contenido"
    }
  }

  // Get category icon
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

  function extractYouTubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto py-8 px-4">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href={`/${content.category}`}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver a {getCategoryName(content.category)}
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-sm font-medium flex items-center">
                {getCategoryIcon(content.category)}
                {getCategoryName(content.category)}
              </span>
              <span className="text-neutral-500 flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(content.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">{content.title}</h1>
          </div>

          <div className="mb-8">
            {isAudio && (
              <div className="mb-6 rounded-sm overflow-hidden shadow-md">
                <VideoPlayer videoUrl={content.url} title={content.title} />
              </div>
            )}

            {isVideo && (
              <div className="mb-6 rounded-sm overflow-hidden shadow-md">
                <VideoPlayer videoUrl={content.url} title={content.title} />
              </div>
            )}

            <div className="prose max-w-none">
              <p className="text-neutral-800 text-lg leading-relaxed">{content.description}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
            <div className="text-sm text-neutral-500">Compartir este artículo:</div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Share2 size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

