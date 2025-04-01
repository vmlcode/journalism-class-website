'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  fallbackSrc?: string
  alt: string
  fill?: boolean
  className?: string
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  fill = false,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc || '/placeholder.svg?height=300&width=400')
      }}
    />
  )
}

