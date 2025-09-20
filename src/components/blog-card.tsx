import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured?: boolean
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardClass = featured
    ? "group hover:shadow-xl transition-all duration-300 border-border bg-card max-w-4xl mx-auto"
    : "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"

  const layoutClass = featured ? "md:flex md:items-center md:gap-8" : ""

  const imageClass = featured ? "md:w-1/2 md:flex-shrink-0" : ""

  const contentClass = featured ? "md:w-1/2" : ""

  return (
    <Card className={cardClass}>
      <div className={layoutClass}>
        <div className={imageClass}>
          <div className="relative aspect-video overflow-hidden rounded-t-lg md:rounded-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className={contentClass}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                {post.category}
              </Badge>
            </div>
            <Link href={`/blog/${post.id}`}>
              <h3
                className={`font-serif font-bold group-hover:text-accent transition-colors ${
                  featured ? "text-2xl md:text-3xl" : "text-xl"
                }`}
              >
                {post.title}
              </h3>
            </Link>
          </CardHeader>

          <CardContent>
            <p className={`text-muted-foreground mb-4 leading-relaxed ${featured ? "text-lg" : ""}`}>{post.excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Link
              href={`/blog/${post.id}`}
              className="inline-block mt-4 text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Read More →
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
