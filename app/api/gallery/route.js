import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery')

    // Create directory if it doesn't exist
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true })
      return NextResponse.json({ images: [] })
    }

    const files = fs.readdirSync(galleryDir)

    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .map(file => ({
        name: file,
        url: `/gallery/${file}`,
        // Get file stats for sorting by date
        mtime: fs.statSync(path.join(galleryDir, file)).mtime
      }))
      .sort((a, b) => b.mtime - a.mtime) // Sort by newest first
      .map(({ name, url }) => ({ name, url })) // Remove mtime from response

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error reading gallery:', error)
    return NextResponse.json({ images: [], error: error.message }, { status: 500 })
  }
}
