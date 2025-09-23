'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  PlusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface ArticlePageHeaderProps {
  readonly articlesCount: number;
}

export default function ArticlePageHeader({ articlesCount }: ArticlePageHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Retour</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion des Articles</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gérez vos articles et contenus de blog ({articlesCount} article{articlesCount !== 1 ? 's' : ''})
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/admin/articles/new">
              <Button className="bg-brand-blue hover:bg-brand-blue/90 flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>Nouvel article</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}