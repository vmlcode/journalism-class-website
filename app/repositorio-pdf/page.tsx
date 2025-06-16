import { promises as fs } from 'fs';
import path from 'path';
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export default async function PDFRepoPage() {
  const filePath = path.join(process.cwd(), "data", "content.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const content = JSON.parse(fileContents);
  const pdfs = content.filter((item: any) => item.category === "repositorio-pdf");

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-8">Noticias</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {pdfs.map((pdf: any) => (
          <div key={pdf.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 text-center">{pdf.title}</h2>
            <p className="text-gray-700 mb-2 text-center">{pdf.description}</p>
            <span className="text-neutral-500 text-xs mb-2">{formatDate(pdf.createdAt)}</span>
            <Link
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Abrir PDF
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
