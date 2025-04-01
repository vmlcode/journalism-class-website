"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface VideoPlayerProps {
  videoUrl: string
  title?: string
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const extractYouTubeId = useCallback((url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }, [])

  useEffect(() => {
    const id = extractYouTubeId(videoUrl)
    setVideoId(id)
  }, [videoUrl, extractYouTubeId])

  if (!videoId) {
    return (
      <div className="aspect-video bg-muted flex items-center justify-center rounded-md">
        <p className="text-muted-foreground">URL de video inválida</p>
      </div>
    )
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If maxresdefault fails, fallback to hqdefault
    e.currentTarget.src = fallbackThumbnailUrl
  }

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm">
      {!isPlaying ? (
        <div className="relative w-full h-full cursor-pointer group" onClick={handlePlayClick}>
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title || "Video thumbnail"}
            fill
            className="object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}

