import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth-utils'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (handle empty database gracefully)
  try {
    await prisma.feedback.deleteMany()
    await prisma.application.deleteMany()
    await prisma.article.deleteMany()
    await prisma.job.deleteMany()
    await prisma.project.deleteMany()
    await prisma.adminUser.deleteMany()
    console.log('🧹 Cleared existing data')
  } catch (error) {
    console.log('ℹ️ Database is empty, proceeding with seeding...')
  }

  // Seed Admin User
  const hashedPassword = await hashPassword('admin123')
  await prisma.adminUser.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@nobasud.ma',
      name: 'Administrateur NOBASUD',
      active: true
    }
  })

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Résidence Al Manar',
        slug: 'residence-al-manar',
        type: 'Bâtiment',
        location: 'Casablanca',
        description: 'Complexe résidentiel moderne de 120 appartements avec espaces verts et équipements de loisirs. Architecture contemporaine alliant confort et durabilité.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ])
      }
    }),
    prisma.project.create({
      data: {
        name: 'Boulevard Mohammed VI',
        slug: 'boulevard-mohammed-vi',
        type: 'Infrastructure',
        location: 'Marrakech',
        description: 'Réaménagement complet du boulevard principal sur 5 km avec pistes cyclables, éclairage LED et espaces piétons sécurisés.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ])
      }
    }),
    prisma.project.create({
      data: {
        name: 'Centre Commercial Atlas',
        slug: 'centre-commercial-atlas',
        type: 'Commercial',
        location: 'Agadir',
        description: 'Centre commercial moderne de 25 000 m² avec 80 boutiques, hypermarché et parking souterrain de 500 places.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ])
      }
    }),
    prisma.project.create({
      data: {
        name: 'Quartier Résidentiel Anfa',
        slug: 'quartier-residentiel-anfa',
        type: 'Aménagement',
        location: 'Casablanca',
        description: 'Développement d\'un nouveau quartier résidentiel avec villas, espaces verts et infrastructures modernes.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ])
      }
    }),
    prisma.project.create({
      data: {
        name: 'Pont Hassan II',
        slug: 'pont-hassan-ii',
        type: 'Infrastructure',
        location: 'Rabat',
        description: 'Construction d\'un pont moderne de 800m reliant les deux rives avec architecture innovante et éclairage artistique.',
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1573160103600-30d74e3fcd14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ])
      }
    })
  ])

  // Seed Articles
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: 'NOBASUD remporte le Grand Prix de l\'Innovation BTP 2024',
        slug: 'grand-prix-innovation-btp-2024',
        excerpt: 'Notre entreprise a été récompensée pour ses innovations en matière de construction durable.',
        content: `
NOBASUD a été honorée lors de la cérémonie annuelle du Grand Prix de l'Innovation BTP 2024, organisée par la Fédération Marocaine du Bâtiment et des Travaux Publics.

## Une reconnaissance méritée

Cette distinction récompense nos efforts constants en matière d'innovation et de développement durable. Notre approche unique combinant tradition architecturale marocaine et technologies modernes a particulièrement séduit le jury.

## Nos innovations primées

- **Béton écologique** : Utilisation de matériaux recyclés réduisant l'empreinte carbone de 30%
- **Système de gestion énergétique** : Integration de panneaux solaires et récupération d'eau de pluie
- **Méthodes de construction modulaire** : Réduction des délais de construction de 25%

Cette récompense nous encourage à poursuivre nos efforts d'innovation au service de nos clients et de l'environnement.
        `,
        coverImageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: JSON.stringify(['Innovation', 'Prix', 'Durabilité', 'BTP']),
        publishedAt: new Date('2024-03-15'),
        published: true
      }
    }),
    prisma.article.create({
      data: {
        title: 'Nouveau partenariat avec l\'Université Mohammed V',
        slug: 'partenariat-universite-mohammed-v',
        excerpt: 'NOBASUD s\'associe avec l\'université pour développer les compétences des futurs ingénieurs.',
        content: `
NOBASUD annonce la signature d'un partenariat stratégique avec l'École Nationale Supérieure d'Architecture de l'Université Mohammed V de Rabat.

## Objectifs du partenariat

Ce partenariat vise à :
- Former les futurs talents du BTP aux dernières technologies
- Développer des projets de recherche appliquée
- Offrir des stages et opportunités d'emploi aux étudiants
- Créer un laboratoire d'innovation partagé

## Premiers projets

Dès septembre 2024, nous accueillerons 15 stagiaires pour travailler sur nos projets d'envergure, notamment le développement du nouveau quartier d'affaires de Casablanca.
        `,
        coverImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: JSON.stringify(['Partenariat', 'Formation', 'Université', 'Innovation']),
        publishedAt: new Date('2024-02-20'),
        published: true
      }
    }),
    prisma.article.create({
      data: {
        title: 'Lancement du projet éco-quartier de Marrakech',
        slug: 'eco-quartier-marrakech',
        excerpt: 'Un nouveau projet ambitieux alliant tradition et modernité au cœur de la ville rouge.',
        content: `
NOBASUD est fière d'annoncer le lancement du projet d'éco-quartier de Marrakech, un développement urbain innovant de 50 hectares.

## Vision du projet

Ce quartier nouvelle génération intégrera :
- **Architecture bioclimatique** respectant les codes traditionnels
- **Mobilité douce** avec pistes cyclables et transport électrique
- **Gestion durable** de l'eau et des déchets
- **Espaces verts** représentant 40% de la superficie

## Planning

- Phase 1 (2024-2025) : Infrastructure et premiers logements
- Phase 2 (2025-2026) : Centre commercial et équipements publics
- Phase 3 (2026-2027) : Finalisation et espaces de loisirs

Livraison prévue fin 2027 pour 2 000 nouveaux logements.
        `,
        coverImageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: JSON.stringify(['Éco-quartier', 'Marrakech', 'Développement durable', 'Urbanisme']),
        publishedAt: new Date('2024-01-10'),
        published: true
      }
    })
  ])

  // Seed Jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Ingénieur Civil Senior',
        slug: 'ingenieur-civil-senior',
        department: 'Technique',
        location: 'Casablanca',
        description: `
## À propos du poste

Nous recherchons un Ingénieur Civil Senior pour rejoindre notre équipe technique et superviser nos projets d'infrastructure majeurs.

## Responsabilités

- Conception et supervision de projets de construction
- Management d'équipes techniques
- Suivi de la qualité et des délais
- Interface avec les clients et partenaires

## Profil recherché

- Diplôme d'ingénieur civil avec 5+ ans d'expérience
- Maîtrise des logiciels CAO/DAO
- Expérience en management d'équipe
- Excellentes capacités de communication

## Nous offrons

- Salaire compétitif selon expérience
- Formation continue
- Évolution de carrière
- Avantages sociaux complets
        `,
        published: true
      }
    }),
    prisma.job.create({
      data: {
        title: 'Chef de Projet BTP',
        slug: 'chef-de-projet-btp',
        department: 'Gestion de Projet',
        location: 'Marrakech',
        description: `
## Mission

Planifier, organiser et superviser l'exécution de projets de construction de A à Z.

## Compétences requises

- Formation supérieure en BTP ou équivalent
- 3-5 ans d'expérience en gestion de projet
- Maîtrise des outils de planification (MS Project, Primavera)
- Leadership et esprit d'équipe

## Avantages

- Package salarial attractif
- Véhicule de fonction
- Participation aux bénéfices
- Plan de formation personnalisé
        `,
        published: true
      }
    }),
    prisma.job.create({
      data: {
        title: 'Architecte d\'Intérieur',
        slug: 'architecte-interieur',
        department: 'Design',
        location: 'Agadir',
        description: `
## Votre rôle

Concevoir et réaliser l'aménagement intérieur de nos projets résidentiels et commerciaux haut de gamme.

## Profil idéal

- Diplôme en architecture d'intérieur
- Portfolio créatif et innovant
- Maîtrise des logiciels 3D (3ds Max, SketchUp, V-Ray)
- Sens artistique développé

## Ce que nous proposons

- Projets variés et stimulants
- Environnement créatif
- Rémunération selon profil
- Possibilité de télétravail partiel
        `,
        published: true
      }
    })
  ])

  // Seed sample feedback testimonials
  const feedbacks = await Promise.all([
    prisma.feedback.create({
      data: {
        name: 'Amina Benjelloun',
        email: 'amina.b@email.com',
        company: 'Société Immobilière Atlas',
        project: 'Résidence Al Manar',
        rating: 5,
        message: 'Je tiens à féliciter l\'équipe NOBASUD pour la qualité exceptionnelle de la résidence Al Manar. Les finitions sont parfaites et les espaces verts magnifiquement aménagés. Une équipe professionnelle et à l\'écoute.',
        published: true
      }
    }),
    prisma.feedback.create({
      data: {
        name: 'Hassan Alami',
        email: 'h.alami@email.com',
        company: 'Entreprise Alami & Fils',
        project: 'Centre Commercial Atlas',
        rating: 5,
        message: 'Le nouveau centre commercial est une réussite ! Architecture moderne, espaces fonctionnels et parking pratique. Les délais ont été respectés et la qualité est au rendez-vous. Bravo à toute l\'équipe.',
        published: true
      }
    }),
    prisma.feedback.create({
      data: {
        name: 'Mohamed Fassi',
        email: 'm.fassi@email.com',
        company: 'Cabinet d\'Architecture Fassi',
        project: 'Boulevard Mohammed VI',
        rating: 4,
        message: 'Excellent travail sur le réaménagement du Boulevard Mohammed VI. L\'équipe a su minimiser les nuisances pour les riverains tout en respectant les délais. Très professionnel.',
        published: true
      }
    }),
    prisma.feedback.create({
      data: {
        name: 'Fatima Zahra Bennani',
        email: 'fz.bennani@email.com',
        project: 'Quartier Résidentiel Anfa',
        rating: 5,
        message: 'Nous avons fait appel à NOBASUD pour notre projet résidentiel et nous ne regrettons pas ce choix. Équipe compétente, suivi rigoureux, et résultat final exceptionnel. Je recommande vivement.',
        published: true
      }
    }),
    prisma.feedback.create({
      data: {
        name: 'Rachid Tounsi',
        email: 'r.tounsi@email.com',
        company: 'Groupe Tounsi Development',
        project: 'Pont Hassan II',
        rating: 4,
        message: 'Projet complexe mené avec succès. L\'expertise technique de NOBASUD est remarquable. Quelques ajustements en cours de route mais résultat final très satisfaisant.',
        published: true
      }
    }),
    prisma.feedback.create({
      data: {
        name: 'Aicha El Mansouri',
        email: 'a.elmansouri@email.com',
        project: 'Villa individuelle',
        rating: 5,
        message: 'Construction de notre villa de rêve ! NOBASUD a su comprendre nos attentes et les concrétiser. Suivi personnalisé, conseils avisés, et finitions impeccables.',
        published: false // En attente de validation
      }
    })
  ])

  // Seed sample applications
  const applications = await Promise.all([
    prisma.application.create({
      data: {
        name: 'Youssef Rachidi',
        email: 'y.rachidi@email.com',
        cvUrl: '/uploads/cv-youssef-rachidi.pdf',
        coverLetterUrl: '/uploads/lettre-motivation-youssef.pdf',
        message: 'Ingénieur civil avec 3 ans d\'expérience, passionné par les projets d\'infrastructure. Je souhaite rejoindre NOBASUD pour contribuer à vos projets innovants.',
      }
    }),
    prisma.application.create({
      data: {
        name: 'Fatima Zahra Bennani',
        email: 'fz.bennani@email.com',
        cvUrl: '/uploads/cv-fatima-bennani.pdf',
        message: 'Architecte fraîchement diplômée, créative et motivée. J\'aimerais mettre mes compétences au service de vos projets résidentiels.',
      }
    })
  ])

  // Seed sample contact messages
  const contacts = await Promise.all([
    prisma.contactMessage.create({
      data: {
        name: 'Ahmed Tazi',
        email: 'ahmed.tazi@entreprise.ma',
        message: 'Bonjour, nous sommes intéressés par vos services pour la construction d\'un complexe industriel à Tanger. Pouvez-vous nous envoyer une proposition ?',
      }
    }),
    prisma.contactMessage.create({
      data: {
        name: 'Société Immobilière Atlas',
        email: 'contact@atlas-immo.ma',
        message: 'Nous recherchons un partenaire BTP fiable pour le développement d\'un projet résidentiel de 200 logements. Merci de nous contacter.',
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:
  - 1 admin user
  - ${projects.length} projects
  - ${articles.length} articles  
  - ${jobs.length} jobs
  - ${feedbacks.length} feedbacks
  - ${applications.length} applications
  - 2 contact messages`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })