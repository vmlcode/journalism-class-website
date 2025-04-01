import type { SearchResult } from "@/lib/types"
import { readData } from "@/lib/data.server"

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  const data = await readData()

  return data
    .filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(normalizedQuery)
      const descriptionMatch = item.description.toLowerCase().includes(normalizedQuery)
      return titleMatch || descriptionMatch
    })
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      url: item.url,
      thumbnail: item.thumbnail,
      category: item.category,
      createdAt: item.createdAt,
    }))
}

