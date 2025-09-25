import { formatDate } from "@/lib/media-utils";
import Image from "next/image";
import Link from "next/link";

export function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200/60 dark:border-gray-700/60">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
      {children}
    </section>
  );
}

export function SidebarList({ articles }: { articles: Array<any> }) {
  return (
    <ul className="space-y-4">
      {articles.slice(0, 5).map((a) => (
        <li key={a.id || a.slug}>
          <Link
            href={`/media/${a.slug}`}
            className="group flex gap-3 items-center"
          >
            {/* thumb */}
            <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
              {a.imageUrl && (
                <Image
                  src={a.imageUrl}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            {/* text */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-brand-orange">
                {a.title}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatDate(a.publishedAt)} · {a.readTime}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
