import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6">
            <h2 className="font-serif text-xl font-bold mb-4">Colegio Cristo Rey</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Formando futuros profesionales en periodismo y radiodifusión, comprometidos con la verdad, la ética y la
              excelencia en la comunicación.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-serif text-lg font-bold mb-4">Secciones</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/podcasts-audio" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Podcasts de Audio
                </Link>
              </li>
              <li>
                <Link href="/podcasts-video" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Podcasts de Video
                </Link>
              </li>
              <li>
                <Link href="/estrategia-seo" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Visitas a la Radio
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-serif text-lg font-bold mb-4">Contacto</h3>
            <address className="not-italic text-neutral-400 text-sm space-y-2">
              <p>San cristobal Tachira</p>
              <p>Prof. Laura Castillo</p>
              <p>periodismo.cristo.rey@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">© {currentYear} Colegio Cristo Rey - Periodismo y Radiodifusión Digital</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Términos y Condiciones
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

