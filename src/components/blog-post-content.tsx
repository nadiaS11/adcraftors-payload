import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Linkedin, Twitter, Facebook, Mail } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article>
      <header className="relative py-20 overflow-hidden">
        <div className="absolute inset-0"></div>

        {/* Modern geometric pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/modern-geometric-pattern-2025.png')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            animation: "float 25s ease-in-out infinite",
          }}
        />

        {/* Subtle noise texture for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-white/3 backdrop-blur-[0.5px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/80 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                AdCraftors
              </Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>›</span>
              <span className="text-white font-medium">{post.category}</span>
            </nav>

            {/* Title with modern typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
              {post.title}
            </h1>

            {/* Meta Info with modern styling */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xs font-bold">{post.author.charAt(0)}</span>
                </div>
                <span className="font-medium">{post.author}</span>
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  {/* Article intro */}
                  <div className="mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">{post.excerpt}</p>
                  </div>

                  {/* Article Content */}
                  <div
                    className="prose prose-lg max-w-none
                      prose-headings:font-bold prose-headings:text-gray-900
                      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
                      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                      prose-ul:text-gray-700 prose-ol:text-gray-700
                      prose-li:mb-1 prose-li:leading-relaxed
                      prose-blockquote:border-l-accent prose-blockquote:bg-gray-50
                      prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                      prose-blockquote:text-gray-700 prose-blockquote:font-medium
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Share</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Linkedin className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Twitter className="h-4 w-4 text-blue-400" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                          <Facebook className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-50">
                          <Mail className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 uppercase tracking-wide">TABLE OF CONTENTS</h3>
                    <nav className="space-y-3">
                      <a
                        href="#analyze-visibility"
                        className="block text-sm text-gray-600 hover:text-accent transition-colors leading-relaxed"
                      >
                        1. Analyze Your Brand's Current Visibility in AI Mode
                      </a>
                      <a
                        href="#identify-priorities"
                        className="block text-sm text-gray-600 hover:text-accent transition-colors leading-relaxed"
                      >
                        2. Identify Priorities to Prioritize for Your Content
                      </a>
                      <a
                        href="#analyze-sentiment"
                        className="block text-sm text-gray-600 hover:text-accent transition-colors leading-relaxed"
                      >
                        3. Analyze Your Brand's Sentiment in AI Mode
                      </a>
                      <button className="text-sm text-accent hover:underline font-medium">
                        Show all table of contents
                      </button>
                    </nav>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 text-center">Find Keyword Ideas in Seconds</h3>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Boost SEO results with powerful keyword research
                    </p>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        placeholder="Enter keyword"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <Button size="sm" className="bg-accent hover:bg-accent/90 px-4">
                        →
                      </Button>
                    </div>
                    <p className="text-xs text-center text-gray-500">Free Keyword Research Tool</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
