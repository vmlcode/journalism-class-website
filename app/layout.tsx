import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

// Serif font for headlines
const serif = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
})

// Sans-serif font for body text
const sans = Source_Sans_3({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Colegio Cristo Rey | Periodismo y Radiodifusión",
  description:
    "Plataforma de periodismo y radiodifusión del Colegio Cristo Rey, destacando el trabajo de nuestros estudiantes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'