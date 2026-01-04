import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/PageLayout'
import { blogPosts, blogSlugs, getBlogPostBySlug } from '@/lib/blog'

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2)

  return (
    <PageLayout>
      {/* Article Header */}
      <header className="px-8 md:px-16 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray hover:text-purple transition-colors duration-300 mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <span className="text-purple">{post.category}</span>
            <span className="text-gray">•</span>
            <span className="text-gray">{post.date}</span>
            <span className="text-gray">•</span>
            <span className="text-gray">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-8">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <article className="px-8 md:px-16 py-16">
        <div
          className="max-w-3xl mx-auto prose prose-invert prose-lg prose-purple"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Author */}
      <section className="px-8 md:px-16 py-16 border-t border-charcoal">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-purple/20 flex items-center justify-center">
            <span className="text-purple font-bold text-xl">TD</span>
          </div>
          <div>
            <p className="font-medium text-white">{post.author}</p>
            <p className="text-sm text-gray">Web Design & Development Agency</p>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-8 md:px-16 py-20 border-t border-charcoal">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block border border-charcoal p-8 hover:border-purple/50 transition-all duration-300"
                >
                  <span className="text-sm text-purple">{relatedPost.category}</span>
                  <h3 className="font-serif text-2xl mt-2 mb-4 text-white group-hover:text-purple transition-colors duration-300">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-16 py-20 border-t border-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Ready to build something great?
          </h2>
          <p className="text-gray mb-8">
            Let&apos;s talk about your project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-black font-semibold tracking-wider uppercase text-sm hover:bg-purple hover:text-white transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
