import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function createAdminUser() {
  try {
    console.log('🔧 Setting up admin user...')
    
    // Check if admin user already exists
    const existingAdmin = await prisma.adminUser.findFirst()
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. If you want to reset the password, delete the existing user first.')
      process.exit(0)
    }
    
    // Default admin credentials
    const username = process.env.ADMIN_USERNAME || 'admin'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    const email = process.env.ADMIN_EMAIL || 'admin@nobasud.com'
    const name = process.env.ADMIN_NAME || 'Administrator'
    
    // Hash the password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    // Create admin user
    await prisma.adminUser.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
        active: true
      }
    })
    
    console.log('✅ Admin user created successfully!')
    console.log(`📧 Email: ${email}`)
    console.log(`👤 Username: ${username}`)
    console.log(`🔑 Password: ${password}`)
    console.log('')
    console.log('⚠️  IMPORTANT: Change the default password after first login!')
    console.log('💡 You can set custom credentials using environment variables:')
    console.log('   ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL, ADMIN_NAME')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()