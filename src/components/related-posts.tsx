import { BlogCard } from "@/components/blog-card"

// Mock related posts data
const allPosts = [
  {
    id: "content-marketing-trends",
    title: "Content Marketing Trends That Will Dominate 2024",
    excerpt:
      "From AI-generated content to interactive experiences, explore the trends shaping the future of content marketing.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Content Marketing",
    image: "/content-marketing-trends-2024.png",
  },
  {
    id: "competitor-analysis-guide",
    title: "The Complete Guide to Competitor Analysis in 2024",
    excerpt:
      "Learn how to conduct thorough competitor research and use insights to gain a competitive advantage in your market.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Strategy",
    image: "/competitor-analysis-business-strategy.png",
  },
  {
    id: "social-media-roi",
    title: "Measuring Social Media ROI: A Data-Driven Approach",
    excerpt:
      "Stop guessing and start measuring. Here's how to calculate the real return on investment from your social media efforts.",
    author: "David Park",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Analytics",
    image: "/social-media-analytics-roi-measurement.png",
  },
]

interface RelatedPostsProps {
  currentPostId: string
}

export function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  // Filter out current post and get first 3 related posts
  const relatedPosts = allPosts.filter((post) => post.id !== currentPostId).slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
