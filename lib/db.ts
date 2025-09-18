// This file is no longer needed - using Prisma instead
// If you need to use MongoDB, remove Prisma and implement this properly
// For now, this file is disabled to avoid conflicts

export function dbConnect() {
  throw new Error('MongoDB connection disabled - using Prisma with PostgreSQL instead')
}
