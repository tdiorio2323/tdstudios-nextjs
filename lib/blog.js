/**
 * Blog post data
 * This can be replaced with a CMS integration (Contentful, Sanity, etc.)
 */

export const blogPosts = [
  {
    slug: 'why-your-website-needs-to-load-in-under-3-seconds',
    title: 'Why Your Website Needs to Load in Under 3 Seconds',
    excerpt: 'Speed isn\'t just a nice-to-have. It directly impacts your conversions, SEO rankings, and user experience. Here\'s what you need to know.',
    content: `
      <p>In the digital age, patience is a scarce commodity. Studies show that 53% of mobile users abandon sites that take longer than 3 seconds to load. That's more than half your potential customers, gone before they even see what you offer.</p>

      <h2>The Real Cost of Slow Loading</h2>
      <p>Every second of delay in page load time can result in a 7% reduction in conversions. For an e-commerce site making $100,000 per day, that's a potential loss of $2.5 million per year from just a one-second delay.</p>

      <h2>What Affects Load Time?</h2>
      <ul>
        <li>Unoptimized images and media</li>
        <li>Excessive JavaScript and CSS</li>
        <li>Poor server response times</li>
        <li>Lack of caching strategies</li>
        <li>Third-party scripts and widgets</li>
      </ul>

      <h2>How We Optimize</h2>
      <p>At TD Studios, performance is built into our development process from day one. We use modern frameworks like Next.js that enable static generation, automatic code splitting, and image optimization out of the box.</p>

      <p>The result? Sites that load fast, rank high, and convert visitors into customers.</p>
    `,
    category: 'Development',
    author: 'TD Studios',
    date: '2024-12-15',
    readTime: '4 min read',
    image: '/images/blog/speed.jpg',
  },
  {
    slug: 'building-a-brand-that-lasts',
    title: 'Building a Brand That Lasts: Beyond the Logo',
    excerpt: 'A logo is just the beginning. True brand identity is built on strategy, consistency, and emotional connection. Here\'s how we approach it.',
    content: `
      <p>When clients come to us asking for a "logo redesign," we often have a deeper conversation. A logo is important, yes—but it's just one element of a much larger brand ecosystem.</p>

      <h2>What Makes a Brand?</h2>
      <p>Your brand is the sum of every interaction someone has with your business. It's your visual identity, your voice, your values, and the experience you deliver. It's the feeling people get when they think of you.</p>

      <h2>The Elements of Brand Identity</h2>
      <ul>
        <li><strong>Visual System:</strong> Logo, colors, typography, imagery style</li>
        <li><strong>Voice & Tone:</strong> How you communicate across channels</li>
        <li><strong>Values & Mission:</strong> What you stand for</li>
        <li><strong>Experience:</strong> Every touchpoint, from website to packaging</li>
      </ul>

      <h2>Consistency is Everything</h2>
      <p>The most powerful brands are consistent. They show up the same way everywhere—on social media, on their website, in their packaging, in their customer service. This consistency builds trust and recognition.</p>

      <p>That's why we don't just design logos. We create brand systems—comprehensive guidelines that ensure your brand stays strong as you grow.</p>
    `,
    category: 'Branding',
    author: 'TD Studios',
    date: '2024-12-01',
    readTime: '5 min read',
    image: '/images/blog/branding.jpg',
  },
  {
    slug: 'cannabis-branding-compliance-guide',
    title: 'Cannabis Branding: Navigating Compliance Without Sacrificing Creativity',
    excerpt: 'The cannabis industry has strict branding regulations. Here\'s how to create packaging that\'s both compliant and compelling.',
    content: `
      <p>Cannabis branding is a unique challenge. You're working within strict regulatory frameworks that vary by state, while trying to stand out on increasingly crowded dispensary shelves. It's a tightrope walk—but one we've mastered.</p>

      <h2>The Compliance Landscape</h2>
      <p>Regulations typically cover:</p>
      <ul>
        <li>No appeals to minors (cartoon characters, bright colors in some states)</li>
        <li>Required warnings and THC content labels</li>
        <li>Child-resistant packaging requirements</li>
        <li>Restrictions on health claims</li>
        <li>State-specific labeling requirements</li>
      </ul>

      <h2>Standing Out Within Constraints</h2>
      <p>Constraints breed creativity. Some of our most striking work has come from working within tight regulatory frameworks. The key is understanding that compliance and creativity aren't mutually exclusive.</p>

      <h2>Our Approach</h2>
      <p>We start every cannabis project with a thorough compliance audit. We know the rules inside and out, so we can push creative boundaries without crossing regulatory lines.</p>

      <p>The result? Packaging that dominates shelves, builds brand recognition, and keeps you on the right side of regulators.</p>
    `,
    category: 'Cannabis',
    author: 'TD Studios',
    date: '2024-11-20',
    readTime: '6 min read',
    image: '/images/blog/cannabis.jpg',
  },
  {
    slug: 'ecommerce-conversion-optimization',
    title: '5 E-Commerce Conversion Killers (And How to Fix Them)',
    excerpt: 'Your store is getting traffic but not sales? These common issues might be to blame.',
    content: `
      <p>Traffic is great, but traffic without conversions is just expensive. Here are the five most common reasons e-commerce sites fail to convert—and how to fix them.</p>

      <h2>1. Complicated Checkout Process</h2>
      <p>Every additional step in your checkout is an opportunity for abandonment. The best-converting stores have streamlined, single-page checkouts with guest purchase options.</p>

      <h2>2. Slow Load Times</h2>
      <p>We've said it before: speed matters. For e-commerce, it matters even more. Amazon found that every 100ms of latency cost them 1% in sales.</p>

      <h2>3. Poor Mobile Experience</h2>
      <p>Over 70% of e-commerce traffic comes from mobile devices. If your site isn't optimized for mobile, you're leaving money on the table.</p>

      <h2>4. Lack of Trust Signals</h2>
      <p>Reviews, security badges, clear return policies—these elements build the trust necessary for customers to hand over their credit card information.</p>

      <h2>5. Hidden Costs</h2>
      <p>Surprise shipping costs at checkout are the #1 reason for cart abandonment. Be upfront about all costs from the start.</p>

      <p>At TD Studios, we build e-commerce experiences designed to convert. Every element is intentional, every friction point eliminated.</p>
    `,
    category: 'E-Commerce',
    author: 'TD Studios',
    date: '2024-11-10',
    readTime: '5 min read',
    image: '/images/blog/ecommerce.jpg',
  },
]

export const blogCategories = ['All', 'Development', 'Branding', 'Cannabis', 'E-Commerce']

export function getBlogPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category) {
  if (category === 'All') return blogPosts
  return blogPosts.filter(post => post.category === category)
}

export const blogSlugs = blogPosts.map(post => post.slug)
