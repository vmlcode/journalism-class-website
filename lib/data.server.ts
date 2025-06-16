"use server"

import type { Content } from "@/lib/types"
import { promises as fs } from "fs"
import path from "path"

// Helper function to read the data from the JSON file
export async function readData(): Promise<Content[]> {
  try {
    // In a real application, adjust the file path to wherever your data.json is stored
    const filePath = path.join(process.cwd(), "data/content.json")
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading data file:", error)
    // Return mock data as fallback if there's an error reading the file
    return mockData
  }
}

// Get all featured content
export async function getFeaturedContent(): Promise<Content[]> {
  const data = await readData()
  return data
    .filter((item) => item.featured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Get content by category
export async function getContentByCategory(category: string, limit?: number): Promise<Content[]> {
  const data = await readData()
  const filteredData = data
    .filter((item) => item.category === category)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return limit ? filteredData.slice(0, limit) : filteredData
}

// Get specific content by ID
export async function getContentById(id: string): Promise<Content | null> {
  const data = await readData()
  return data.find((item) => item.id === id) || null
}

// Mock data for initial setup or fallback
const mockData: Content[] = [
  {
    id: "1",
    title: "X",
    description:
      "Entrevista especial con el director del colegio hablando sobre el programa de periodismo y su visión para los próximos años. Discutimos los desafíos y oportunidades en la era digital para los jóvenes periodistas.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-audio",
    featured: true,
    createdAt: "2023-09-15",
  },
  {
    id: "2",
    title: "Noticias Semanales: Eventos culturales y académicos destacados",
    description:
      "Resumen de las noticias más importantes de la semana en el colegio, incluyendo la feria de ciencias y la visita del ministro de educación. Cobertura completa por nuestro equipo de estudiantes.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-video",
    featured: true,
    createdAt: "2023-09-20",
  },
  {
    id: "3",
    title: "Visita a Radio Nacional: Experiencia en un medio profesional",
    description:
      "Los estudiantes visitaron las instalaciones de Radio Nacional y participaron en un programa en vivo. Conocieron el funcionamiento interno y entrevistaron a periodistas con décadas de experiencia en el medio.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "estrategia-seo",
    featured: true,
    createdAt: "2023-10-05",
  },
  {
    id: "4",
    title: "Historia de la Radio en Argentina: Del inicio a la era digital",
    description:
      "Podcast educativo sobre la historia de la radio en Argentina y su impacto en la sociedad desde sus inicios hasta la actualidad. Un recorrido por los momentos más destacados de este medio.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-audio",
    featured: false,
    createdAt: "2023-10-10",
  },
  {
    id: "5",
    title: "Entrevista a Egresados Destacados: Trayectoria en medios nacionales",
    description:
      "Conversación con ex alumnos que actualmente trabajan en medios de comunicación importantes. Comparten sus experiencias, desafíos y consejos para los actuales estudiantes.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-audio",
    featured: false,
    createdAt: "2023-10-15",
  },
  {
    id: "6",
    title: "Deportes Escolares: Campeonato intercolegial 2023",
    description:
      "Cobertura de los eventos deportivos más importantes del colegio durante el último mes, incluyendo la final del campeonato de fútbol y las competencias de atletismo.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-video",
    featured: false,
    createdAt: "2023-11-01",
  },
  {
    id: "7",
    title: "Visita a FM Escolar: Aprendiendo de otros proyectos estudiantiles",
    description:
      "Documentación de la visita a una radio escolar de otro colegio de la zona. Intercambio de experiencias y conocimientos sobre la gestión de medios escolares.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "visitas-radio",
    featured: false,
    createdAt: "2023-11-15",
  },
  {
    id: "8",
    title: "Debate: El Periodismo en la Era Digital y sus Desafíos Éticos",
    description:
      "Mesa redonda donde los estudiantes debaten sobre el futuro del periodismo en la era digital y las responsabilidades éticas que conlleva. Con participación de profesionales invitados.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-audio",
    featured: true,
    createdAt: "2023-12-01",
  },
  {
    id: "9",
    title: "Celebración del Día del Estudiante: Actividades y Festival Cultural",
    description:
      "Cobertura especial de las actividades realizadas durante la celebración del Día del Estudiante en el colegio, con presentaciones artísticas y competencias recreativas.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "podcasts-video",
    featured: true,
    createdAt: "2023-09-21",
  },
]

