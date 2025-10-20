import { z } from 'zod'

// Validation schemas
export const feedbackSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  company: z.string().optional(),
  project: z.string().min(1, 'Le projet est requis'),
  rating: z.number().min(1).max(5),
  message: z.string().min(1, 'Le message est requis'),
  published: z.boolean().optional().default(false),
  photoUrl: z.string().optional(),
  createdAt: z.union([z.date(), z.string()]).optional().transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
  updatedAt: z.union([z.date(), z.string()]).optional().transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
})

export const applicationSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  message: z.string().optional(),
  cvUrl: z.string().min(1, 'Le CV est requis'),
  coverLetterUrl: z.string().optional(),
  status: z.enum(['nouveau', 'vu', 'en_cours', 'retenu', 'refuse']).optional().default('nouveau'),
})

export const contactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(1, 'Le message est requis'),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Le nom du projet est requis'),
  slug: z.string().min(1),
  type: z.string().min(1, 'Le type du projet est requis'),
  location: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
})

export const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImageUrl: z.string().optional(),
  tags: z.union([z.array(z.string()), z.string()]).optional().transform((val) => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }),
  publishedAt: z.union([z.date(), z.string()]).optional().transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
  published: z.boolean().default(true),
  createdAt: z.union([z.date(), z.string()]).optional().transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
  updatedAt: z.union([z.date(), z.string()]).optional().transform((val) => {
    if (typeof val === 'string') {
      return new Date(val);
    }
    return val;
  }),
})


export const jobSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1),
  department: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  published: z.coerce.boolean().default(true),
  urgent: z.coerce.boolean().default(false),
  type: z.string().nullable().optional(),
  experience: z.string().nullable().optional(),
  education: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  deadline: z.union([z.string(), z.date()]).nullable().optional().transform((val) => {
    if (!val) return null;
    if (typeof val === 'string') return new Date(val);
    return val;
  }),
  imageUrl: z.string().url().optional().nullable(),
  imageFile: z.any().optional(),
})

export type Feedback = z.infer<typeof feedbackSchema>
export type Application = z.infer<typeof applicationSchema>
export type Contact = z.infer<typeof contactSchema>
export type Project = z.infer<typeof projectSchema>
export type Article = z.infer<typeof articleSchema>
export type Job = z.infer<typeof jobSchema>
