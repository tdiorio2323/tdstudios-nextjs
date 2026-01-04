import { blogSlugs } from '@/lib/blog'

export default function sitemap() {
  const baseUrl = 'https://tdstudiosny.com'

  // Static pages
  const routes = [
    '',
    '/services',
    '/process',
    '/about',
    '/blog',
    '/faq',
    '/contact',
    '/cannabis',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Blog posts
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...routes, ...blogPages]
}
