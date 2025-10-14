import type { Metadata } from 'next'
import ApplicationForm from '@/components/career/ApplicationForm'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface JobPageProps {
	params: { slug: string }
}

async function fetchJob(slug: string) {
  try {
    const job = await prisma.job.findFirst({
      where: { 
        slug,
        published: true 
      }
    })
    return job
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await fetchJob(params.slug)
  return job
    ? { title: `Postuler: ${job.title} | NOBASUD`, description: job.description }
    : { title: 'Postuler | NOBASUD', description: 'Postulez pour un emploi chez NOBASUD.' }
}

export default async function JobApplicationPage({ params }: JobPageProps) {
	 const job = await fetchJob(params.slug)
  if (!job) return notFound()

	return (
		<div className="container mx-auto py-12 px-4 lg:px-8">
			<div className="max-w-3xl mx-auto mb-10">
				<Link 
					href="/carriere" 
					className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 group"
				>
					<ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
					<span>Retour aux offres d'emploi</span>
				</Link>
				<h1 className="text-3xl font-bold text-primary mb-4">{job.title}</h1>
				<div className="mb-2 text-muted-foreground">{job.type} | {job.location} | Département: {job.department}</div>
				<div className="mb-2 text-muted-foreground">Expérience: {job.experience} | Éducation: {job.education}</div>
				{job.salary && <div className="mb-2 text-muted-foreground">Salaire: {job.salary}</div>}
				{job.deadline && <div className="mb-2 text-muted-foreground">Date limite: {new Date(job.deadline).toLocaleDateString('fr-FR')}</div>}
				<div className="mb-4 text-muted-foreground">{job.description}</div>
				{job.requirements && <div className="mb-4"><strong>Exigences:</strong> <span className="text-muted-foreground">{job.requirements}</span></div>}
				{job.benefits && <div className="mb-4"><strong>Avantages:</strong> <span className="text-muted-foreground">{job.benefits}</span></div>}
			</div>
			<div className="max-w-3xl mx-auto">
				<ApplicationForm jobId={job.id} />
			</div>
		</div>
	)
}
