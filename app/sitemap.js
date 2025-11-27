export default function sitemap() {
  const baseUrl = 'https://tdstudiosny.com'

  // Static pages
  const routes = ['', '/about', '/contact', '/websites', '/cannabis', '/work'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Case study pages
  const caseStudies = [
    'apex-ventures',
    'emerald-valley',
    'modernist-studio',
    'high-tide-collective',
    'northwind-tech',
    'terra-bloom',
    'cascade-financial',
    'green-state-labs'
  ].map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...routes, ...caseStudies]
}
