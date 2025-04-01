import { getFeaturedContent, getContentByCategory } from "@/lib/data.server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Headphones, Video, Radio, Clock } from "lucide-react"
import Image from "next/image"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { formatDate } from "@/lib/utils"

export default async function Home() {
  const featuredContent = await getFeaturedContent()
  const latestAudio = await getContentByCategory("podcasts-audio", 3)
  const latestVideo = await getContentByCategory("podcasts-video", 2)
  const latestVisits = await getContentByCategory("visitas-radio", 1)

  // Get the most recent featured item for the hero section
  const heroContent = featuredContent[0]
  // Rest of the featured content for the secondary section
  const secondaryFeatured = featuredContent.slice(1, 3)

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      {heroContent && (
        <section className="border-b border-neutral-200">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-primary text-sm font-bold uppercase tracking-wider">
                  <Clock size={16} />
                  <span>Destacado</span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {heroContent.title}
                </h1>
                <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
                  {heroContent.description.length > 160
                    ? heroContent.description.substring(0, 160) + "..."
                    : heroContent.description}
                </p>
                <p className="text-neutral-500 text-sm">{formatDate(heroContent.createdAt)}</p>
                <Button asChild variant="default">
                  <Link href={`/${heroContent.category}/${heroContent.id}`}>Leer el artículo completo</Link>
                </Button>
              </div>
              <div className="rounded-sm overflow-hidden shadow-md">
                <div className="relative aspect-video">
                  <ImageWithFallback
                    src={`https://img.youtube.com/vi/${extractYouTubeId(heroContent.url)}/maxresdefault.jpg`}
                    fallbackSrc={`https://img.youtube.com/vi/${extractYouTubeId(heroContent.url)}/hqdefault.jpg`}
                    alt={heroContent.title}
                    fill
                    className="object-cover"
                  />
                  <Link
                    href={`/${heroContent.category}/${heroContent.id}`}
                    className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      {heroContent.category === "podcasts-audio" ? (
                        <Headphones size={28} className="text-white" />
                      ) : heroContent.category === "podcasts-video" ? (
                        <Video size={28} className="text-white" />
                      ) : (
                        <Radio size={28} className="text-white" />
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Secondary Featured Articles */}
      {secondaryFeatured.length > 0 && (
        <section className="bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {secondaryFeatured.map((item) => (
                <div key={item.id} className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1 relative aspect-video rounded-sm overflow-hidden">
                    <Link href={`/${item.category}/${item.id}`}>
                      <Image
                        src={`https://img.youtube.com/vi/${extractYouTubeId(item.url)}/hqdefault.jpg`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <div className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {getCategoryLabel(item.category)}
                    </div>
                    <h2 className="font-serif text-xl font-bold line-clamp-2">
                      <Link href={`/${item.category}/${item.id}`} className="hover:underline">
                        {item.title}
                      </Link>
                    </h2>
                    <p className="text-neutral-700 text-sm line-clamp-2">{item.description}</p>
                    <p className="text-neutral-500 text-xs">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Content Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {/* Audio Podcasts */}
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold">Podcasts de Audio</h2>
                  <Link href="/podcasts-audio" className="text-primary text-sm font-medium hover:underline">
                    Ver todos
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {latestAudio.map((podcast) => (
                  <div key={podcast.id} className="space-y-2">
                    <div className="relative aspect-video rounded-sm overflow-hidden">
                      <Link href={`/podcasts-audio/${podcast.id}`}>
                        <ImageWithFallback
                          src={`https://img.youtube.com/vi/${extractYouTubeId(podcast.url)}/hqdefault.jpg`}
                          fallbackSrc="/placeholder.svg?height=300&width=400"
                          alt={podcast.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Headphones size={20} className="text-white" />
                          </div>
                        </div>
                      </Link>
                      <div className="absolute bottom-2 left-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded">
                        <Headphones size={14} className="inline mr-1" /> Audio
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold line-clamp-2">
                      <Link href={`/podcasts-audio/${podcast.id}`} className="hover:underline">
                        {podcast.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-700 text-sm line-clamp-2">{podcast.description}</p>
                    <p className="text-neutral-500 text-xs">{formatDate(podcast.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Podcasts */}
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold">Podcasts de Video</h2>
                  <Link href="/podcasts-video" className="text-primary text-sm font-medium hover:underline">
                    Ver todos
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {latestVideo.map((video) => (
                  <div key={video.id} className="space-y-2">
                    <div className="relative aspect-video rounded-sm overflow-hidden">
                      <Link href={`/podcasts-video/${video.id}`}>
                        <ImageWithFallback
                          src={`https://img.youtube.com/vi/${extractYouTubeId(video.url)}/hqdefault.jpg`}
                          fallbackSrc="/placeholder.svg?height=300&width=400"
                          alt={video.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Video size={20} className="text-white" />
                          </div>
                        </div>
                      </Link>
                      <div className="absolute bottom-2 left-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded">
                        <Video size={14} className="inline mr-1" /> Video
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold line-clamp-2">
                      <Link href={`/podcasts-video/${video.id}`} className="hover:underline">
                        {video.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-700 text-sm line-clamp-2">{video.description}</p>
                    <p className="text-neutral-500 text-xs">{formatDate(video.createdAt)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Radio Visits & Categories */}
            <div className="space-y-8">
              {/* Radio Visits */}
              <div className="space-y-6">
                <div className="border-b border-neutral-200 pb-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold">Visitas a la Radio</h2>
                    <Link href="/visitas-radio" className="text-primary text-sm font-medium hover:underline">
                      Ver todas
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  {latestVisits.map((visita) => (
                    <div key={visita.id} className="space-y-2">
                      <div className="relative aspect-video rounded-sm overflow-hidden">
                        <Link href={`/visitas-radio/${visita.id}`}>
                          <ImageWithFallback
                            src={`https://img.youtube.com/vi/${extractYouTubeId(visita.url)}/hqdefault.jpg`}
                            fallbackSrc="/placeholder.svg?height=300&width=400"
                            alt={visita.title}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                              <Radio size={20} className="text-white" />
                            </div>
                          </div>
                        </Link>
                        <div className="absolute bottom-2 left-2 bg-primary text-white text-xs font-semibold py-1 px-2 rounded">
                          <Radio size={14} className="inline mr-1" /> Visita
                        </div>
                      </div>
                      <h3 className="font-serif text-lg font-bold line-clamp-2">
                        <Link href={`/visitas-radio/${visita.id}`} className="hover:underline">
                          {visita.title}
                        </Link>
                      </h3>
                      <p className="text-neutral-700 text-sm line-clamp-2">{visita.description}</p>
                      <p className="text-neutral-500 text-xs">{formatDate(visita.createdAt)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-neutral-50 p-6 rounded-sm border border-neutral-200">
                <h2 className="font-serif text-2xl font-bold mb-4">Categorías</h2>
                <div className="space-y-4">
                  <Link
                    href="/podcasts-audio"
                    className="flex items-center justify-between p-3 border-b border-neutral-200 hover:bg-neutral-100 rounded-sm transition-colors"
                  >
                    <div className="flex items-center">
                      <Headphones className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">Podcasts de Audio</span>
                    </div>
                    <span className="text-neutral-500">→</span>
                  </Link>

                  <Link
                    href="/podcasts-video"
                    className="flex items-center justify-between p-3 border-b border-neutral-200 hover:bg-neutral-100 rounded-sm transition-colors"
                  >
                    <div className="flex items-center">
                      <Video className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">Podcasts de Video</span>
                    </div>
                    <span className="text-neutral-500">→</span>
                  </Link>

                  <Link
                    href="/visitas-radio"
                    className="flex items-center justify-between p-3 hover:bg-neutral-100 rounded-sm transition-colors"
                  >
                    <div className="flex items-center">
                      <Radio className="h-5 w-5 text-primary mr-3" />
                      <span className="font-medium">Visitas a la Radio</span>
                    </div>
                    <span className="text-neutral-500">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Helper functions
function getCategoryLabel(category: string) {
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
  return match && match[2].length === 11 ? match[2] : "dQw4w9WgXcQ" // Default to a placeholder if not found
}

