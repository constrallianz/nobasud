const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedStatistics() {
  console.log('Seeding statistics...')
  
  const statistics = [
    {
      key: 'projects',
      value: '15+',
      label: 'Projets réalisés',
      order: 1,
      active: true
    },
    {
      key: 'experience',
      value: '15+',
      label: 'Années d\'expérience',
      order: 2,
      active: true
    }
  ]

  for (const stat of statistics) {
    await prisma.statistic.upsert({
      where: { key: stat.key },
      update: stat,
      create: stat
    })
    console.log(`✓ Seeded statistic: ${stat.label}`)
  }

  console.log('Statistics seeding completed!')
}

seedStatistics()
  .catch((e) => {
    console.error('Error seeding statistics:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
