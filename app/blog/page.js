'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import PageHeader from '@/components/PageHeader'
import { blogPosts, blogCategories } from '@/lib/blog'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <PageLayout>
      <PageHeader
        label="Insights"
        title="Blog"
        description="Thoughts on design, development, branding, and building digital products that perform."
      />

      {/* Category Filter */}
      <section className="px-8 md:px-16 py-8 border-b border-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-purple text-white'
                    : 'border border-charcoal text-gray hover:border-purple hover:text-purple'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-8 md:px-16 py-20 border-t border-charcoal">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Stay in the loop
          </h2>
          <p className="text-gray mb-8">
            Get insights on design, development, and digital strategy delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-charcoal border border-charcoal focus:border-purple outline-none text-white placeholder:text-gray"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-black font-semibold tracking-wider uppercase text-sm hover:bg-purple hover:text-white transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  )
}

function BlogCard({ post }) {
  const categoryColor = {
    Development: 'text-purple',
    Branding: 'text-pink',
    Cannabis: 'text-green-400',
    'E-Commerce': 'text-purple',
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="border border-charcoal p-8 hover:border-purple/50 transition-all duration-300 h-full flex flex-col">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className={categoryColor[post.category] || 'text-purple'}>
            {post.category}
          </span>
          <span className="text-gray">•</span>
          <span className="text-gray">{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl md:text-3xl mb-4 text-white group-hover:text-purple transition-colors duration-300">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray leading-relaxed mb-6 flex-1">
          {post.excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-2 text-sm text-purple tracking-wider uppercase">
          Read Article
          <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </article>
    </Link>
  )
}
