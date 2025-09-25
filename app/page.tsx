"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CheckBadgeIcon,
  BuildingOffice2Icon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useProjects } from "@/components/admin/projects/listing";
import { ProjectWithImages } from "@/types/realisations";
import { services, statsMain } from "@/data/realisations";
import { LoadingState } from "@/components/admin/projects/states";
import TestimonialsGrid from "@/components/feedback/TestimonialsGrid";

export default function HomePage() {
  const { projects, loading } = useProjects();

  const projectsWithImages: ProjectWithImages[] = projects.map((project) => {
    const images = project.images ? JSON.parse(project.images) : [];
    const image =
      images.length > 0
        ? images[0]
        : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    return {
      ...project,
      type: project.type as string,
      images,
      image,
    };
  });

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue via-brand-blue to-brand-orange text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-brand-orange/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-brand-orange/30 rounded-full animate-bounce delay-500"></div>

        <div className="container relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
              Construire l&apos;
              <span className="text-brand-orange">avenir</span>
              <br />
              du <span className="text-brand-orange">Maroc</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto">
              NOBASUD, votre partenaire de confiance pour tous vos projets de
              construction, d&apos;infrastructure et d&apos;aménagement urbain
              depuis plus de 15 ans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                >
                  Demander un devis
                  <ArrowRightIcon className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href="/realisations">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-blue px-8 py-4 text-lg font-semibold"
                >
                  Voir nos projets
                </Button>
              </Link>
            </div>

            {/* Floating stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {statsMain.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
              Nos <span className="text-brand-orange">services</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Une expertise complète pour tous vos projets de construction et
              d&apos;aménagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={i}
                  className="group bg-white dark:bg-gray-700 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-orange rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects showcase */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
              Nos dernières{" "}
              <span className="text-brand-orange">réalisations</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Découvrez quelques-uns de nos projets les plus emblématiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <LoadingState />
            ) : (
              projectsWithImages.slice(0, 3).map((project, i) => (
                <div
                  key={project.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                        Réalisé
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-brand-orange text-white rounded-full text-sm font-medium">
                        {new Date(project.createdAt).getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-brand-blue transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-sm text-brand-orange font-medium">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.location}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/realisations">
              <Button
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue/90 px-8 py-4 text-lg"
              >
                Voir tous nos projets
                <ArrowRightIcon className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 bg-gradient-to-br from-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Pourquoi choisir{" "}
              <span className="text-brand-orange">NOBASUD</span> ?
            </h2>
            <p className="text-xl md:text-2xl mb-16 leading-relaxed">
              Une expertise reconnue, une équipe passionnée et un engagement
              total pour votre satisfaction
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <CheckBadgeIcon className="w-16 h-16 mx-auto mb-6 text-brand-orange" />
                <h3 className="text-2xl font-bold mb-4">Qualité garantie</h3>
                <p className="text-lg opacity-90">
                  Certifications ISO et respect des normes les plus strictes
                </p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="w-16 h-16 mx-auto mb-6 text-brand-orange" />
                <h3 className="text-2xl font-bold mb-4">Équipe experte</h3>
                <p className="text-lg opacity-90">
                  200+ professionnels qualifiés à votre service
                </p>
              </div>
              <div className="text-center">
                <TruckIcon className="w-16 h-16 mx-auto mb-6 text-brand-orange" />
                <h3 className="text-2xl font-bold mb-4">Délais respectés</h3>
                <p className="text-lg opacity-90">
                  98% de nos projets livrés dans les temps
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-brand-blue hover:bg-white/90 px-8 py-4 text-lg font-semibold"
                >
                  Contactez-nous
                  <ArrowRightIcon className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link href="/a-propos">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-brand-blue px-8 py-4 text-lg font-semibold"
                >
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
        <TestimonialsGrid />
    </div>
  );
}
