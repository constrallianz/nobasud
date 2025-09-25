'use client'
import { Button } from '@/components/ui/button'
import { 
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useFeedbacks } from '@/hooks/useFeedbacks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TestimonialsGrid() {
  const { feedbacks, loading } = useFeedbacks();
  const pathname = usePathname();

  const displayedFeedbacks =
    pathname === "/feedback" ? feedbacks : feedbacks.slice(0, 2);

  return (
    <section id="avis" className="py-24 bg-white dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Témoignages <span className="text-brand-orange">clients</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez les retours d&apos;expérience de nos clients sur leurs projets 
            réalisés avec NOBASUD.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Chargement des avis clients...
            </p>
          </div>
        ) : displayedFeedbacks.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Aucun avis pour le moment
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Soyez le premier à partager votre expérience avec NOBASUD.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {displayedFeedbacks.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">
                          {testimonial.name}
                        </h4>
                        <CheckCircleIcon className="w-5 h-5 text-brand-blue" />
                      </div>
                      {testimonial.email && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.email}
                        </p>
                      )}
                      {testimonial.company && (
                        <p className="text-sm text-brand-orange font-medium">
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIconSolid
                        key={star}
                        className={`w-5 h-5 ${
                          star <= testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  &quot;{testimonial.message}&quot;
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    {testimonial.project && (
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                        {testimonial.project}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {new Date(testimonial.createdAt).toLocaleDateString(
                      "fr-FR"
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {pathname !== "/feedback" && (
          <div className="text-center mt-12">
            <Link href="/feedback">
              <Button size="lg" variant="outline">
                Voir plus d&apos;avis
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
