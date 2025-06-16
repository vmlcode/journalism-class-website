import { promises as fs } from 'fs';
import path from 'path';
import Image from "next/image";

export default async function EstrategiaSeoPage() {
  // Read content.json
  const filePath = path.join(process.cwd(), "data", "content.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const content = JSON.parse(fileContents);

  // Filter for Estrategia SEO articles (assuming category or another field)
  // If you want to filter by a specific category, update the filter below
  // For now, let's show all articles as an example
  const seoArticles = content.filter((item: any) => item.category === "estrategia-seo");

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Estrategia SEO</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {seoArticles.length === 0 && <p>No hay artículos de Estrategia SEO.</p>}
        {seoArticles.map((article: any) => (
          <article key={article.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            {article.thumbnail && (
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={400}
                height={300}
                className="rounded mb-4 object-cover"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">{article.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
