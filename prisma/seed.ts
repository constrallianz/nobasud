import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Cleaning existing data...')
  await prisma.newsletter.deleteMany()
  await prisma.contactMessage.deleteMany()
  await prisma.feedback.deleteMany()
  await prisma.application.deleteMany()
  await prisma.job.deleteMany()
  await prisma.article.deleteMany()
  await prisma.project.deleteMany()
  await prisma.statistic.deleteMany()
  await prisma.location.deleteMany()
  await prisma.adminUser.deleteMany()

  // Create Admin User
  console.log('👤 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.adminUser.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@nobasud.com',
      name: 'Administrator',
      active: true,
    },
  })
  console.log(`✅ Admin user created: ${admin.username}`)

  // Create Statistics
  console.log('📊 Creating statistics...')
  const stats = await prisma.statistic.createMany({
    data: [
      { key: 'projects', value: '150+', label: 'Projets Réalisés', order: 1, active: true },
      { key: 'clients', value: '100+', label: 'Clients Satisfaits', order: 2, active: true },
      { key: 'experience', value: '15+', label: 'Ans d\'Expérience', order: 3, active: true },
      { key: 'team', value: '50+', label: 'Experts', order: 4, active: true },
    ],
  })
  console.log(`✅ Created ${stats.count} statistics`)

  // Create Locations
  console.log('📍 Creating locations...')
  const locations = await prisma.location.createMany({
    data: [
      {
        name: 'Siège Social',
        address: 'Quartier Industriel, Agadir',
        city: 'Agadir',
        lat: 30.4278,
        lng: -9.5981,
        order: 1,
        active: true,
      },
      {
        name: 'Bureau Casablanca',
        address: 'Boulevard Moulay Slimane, Casablanca',
        city: 'Casablanca',
        lat: 33.5731,
        lng: -7.5898,
        order: 2,
        active: true,
      },
    ],
  })
  console.log(`✅ Created ${locations.count} locations`)

  // Create Projects
  console.log('🏗️  Creating projects...')
  const projects = [
    {
      name: 'Centre Commercial Marina',
      slug: 'centre-commercial-marina',
      type: 'Commercial',
      location: 'Agadir',
      description: 'Construction d\'un centre commercial moderne avec parkings souterrains et espaces verts',
      images: JSON.stringify(['/uploads/projects/marina-1.jpg']),
    },
    {
      name: 'Résidence Al Andalous',
      slug: 'residence-al-andalous',
      type: 'Résidentiel',
      location: 'Marrakech',
      description: 'Complexe résidentiel de luxe avec piscines, jardins et équipements modernes',
      images: JSON.stringify(['/uploads/projects/andalous-1.jpg']),
    },
    {
      name: 'Autoroute Agadir-Marrakech',
      slug: 'autoroute-agadir-marrakech',
      type: 'Infrastructure',
      location: 'Agadir - Marrakech',
      description: 'Conception et construction d\'un tronçon autoroutier de 100 km',
      images: JSON.stringify(['/uploads/projects/autoroute-1.jpg']),
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }
  console.log(`✅ Created ${projects.length} projects`)

  // Create Articles
  console.log('📰 Creating articles...')
  const articles = [
    {
      title: 'Innovation dans la Construction Durable',
      slug: 'innovation-construction-durable',
      excerpt: 'Découvrez comment NOBASUD intègre les technologies vertes dans ses projets',
      content: 'Le secteur de la construction évolue rapidement vers des pratiques plus durables...',
      coverImageUrl: '/uploads/articles/sustainable-1.jpg',
      tags: JSON.stringify(['Innovation', 'Durabilité', 'Construction']),
      published: true,
    },
    {
      title: 'Les Métiers de l\'Ingénierie Civile',
      slug: 'metiers-ingenierie-civile',
      excerpt: 'Explorez les différentes carrières disponibles dans le génie civil',
      content: 'L\'ingénierie civile offre une grande variété de parcours professionnels...',
      coverImageUrl: '/uploads/articles/engineering-1.jpg',
      tags: JSON.stringify(['Carrière', 'Ingénierie', 'Formation']),
      published: true,
    },
  ]

  for (const article of articles) {
    await prisma.article.create({ data: article })
  }
  console.log(`✅ Created ${articles.length} articles`)

  // Create Jobs
  console.log('💼 Creating jobs...')
  const jobs = [
    {
      title: 'Ingénieur Civil Senior',
      slug: 'ingenieur-civil-senior',
      department: 'Ingénierie',
      location: 'Agadir',
      type: 'CDI',
      experience: '5-10 ans',
      education: 'Master en Génie Civil',
      salary: '20 000 - 30 000 MAD',
      description: 'Nous recherchons un ingénieur civil expérimenté pour superviser nos projets majeurs',
      requirements: JSON.stringify(['Master en Génie Civil', '5+ ans d\'expérience', 'Maîtrise d\'AutoCAD']),
      benefits: JSON.stringify(['Assurance santé', 'Formation continue', 'Bonus performance']),
      deadline: new Date('2025-12-31'),
      published: true,
      urgent: true,
    },
    {
      title: 'Chef de Projet Construction',
      slug: 'chef-projet-construction',
      department: 'Gestion de projet',
      location: 'Casablanca',
      type: 'CDI',
      experience: '3-5 ans',
      education: 'Licence en Gestion de Projet',
      salary: '15 000 - 25 000 MAD',
      description: 'Gérer et coordonner les projets de construction du début à la fin',
      requirements: JSON.stringify(['Licence en Gestion', '3+ ans d\'expérience', 'Leadership']),
      benefits: JSON.stringify(['Voiture de fonction', 'Assurance', 'Primes']),
      deadline: new Date('2025-11-30'),
      published: true,
      urgent: false,
    },
    {
      title: 'Architecte Junior',
      slug: 'architecte-junior',
      department: 'Architecture',
      location: 'Agadir',
      type: 'CDD',
      experience: '1-3 ans',
      education: 'Master en Architecture',
      salary: '10 000 - 15 000 MAD',
      description: 'Rejoignez notre équipe créative pour concevoir des bâtiments innovants',
      requirements: JSON.stringify(['Master en Architecture', 'Portfolio', 'Créativité']),
      benefits: JSON.stringify(['Formation', 'Assurance', 'Environnement créatif']),
      deadline: new Date('2025-10-31'),
      published: true,
      urgent: true,
    },
  ]

  for (const job of jobs) {
    await prisma.job.create({ data: job })
  }
  console.log(`✅ Created ${jobs.length} jobs`)

  // Create Sample Feedbacks
  console.log('⭐ Creating feedbacks...')
  const feedbacks = [
    {
      name: 'Ahmed Benali',
      email: 'ahmed.benali@example.com',
      company: 'Immobilière Al Amal',
      project: 'Résidence Al Andalous',
      rating: 5,
      message: 'Excellent travail ! L\'équipe NOBASUD a dépassé nos attentes. Professionnalisme et qualité au rendez-vous.',
      published: true,
    },
    {
      name: 'Fatima Zahra',
      email: 'fatima.zahra@example.com',
      company: 'Groupe Tanger Développement',
      project: 'Centre Commercial Marina',
      rating: 5,
      message: 'Un partenaire fiable et compétent. Nous avons été impressionnés par leur expertise technique.',
      published: true,
    },
    {
      name: 'Mohammed Alaoui',
      email: 'mohammed.alaoui@example.com',
      company: 'Ministère de l\'Équipement',
      project: 'Autoroute Agadir-Marrakech',
      rating: 4,
      message: 'Très bon travail dans l\'ensemble. Respect des délais et qualité de construction remarquable.',
      published: true,
    },
  ]

  for (const feedback of feedbacks) {
    await prisma.feedback.create({ data: feedback })
  }
  console.log(`✅ Created ${feedbacks.length} feedbacks`)

  // Create Newsletter Subscribers
  console.log('📧 Creating newsletter subscribers...')
  const newsletters = await prisma.newsletter.createMany({
    data: [
      { email: 'subscriber1@example.com', active: true },
      { email: 'subscriber2@example.com', active: true },
      { email: 'subscriber3@example.com', active: true },
    ],
  })
  console.log(`✅ Created ${newsletters.count} newsletter subscribers`)

  console.log('✅ Database seeding completed successfully!')
  console.log('\n📝 Credentials:')
  console.log('   Username: admin')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
