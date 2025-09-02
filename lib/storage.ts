import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export async function saveUpload(file: File, subdir = ''): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Create directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', subdir)
    await fs.mkdir(uploadsDir, { recursive: true })
    
    // Use UUID for unique filenames
    const uniqueId = randomUUID()
    const extension = file.name.split('.').pop() || ''
    const sanitizedExt = extension.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    
    const fileName = `${uniqueId}.${sanitizedExt}`
    const filePath = path.join(uploadsDir, fileName)
    
    await fs.writeFile(filePath, buffer)
    return `/uploads/${subdir ? `${subdir}/` : ''}${fileName}`
  } catch (error) {
    console.error('Error saving upload:', error)
    throw new Error('Failed to save file')
  }
}

export function getExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || ''
}

export function isValidImageFile(file: File): boolean {
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  const extension = getExtension(file.name)
  return validExtensions.includes(extension)
}

export function isValidDocumentFile(file: File): boolean {
  const validExtensions = ['pdf', 'doc', 'docx']
  const extension = getExtension(file.name)
  return validExtensions.includes(extension)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
