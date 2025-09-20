"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    content:
      "AdCraftors transformed our digital presence completely. Our conversion rates increased by 340% within just 3 months of working with them.",
    rating: 5,
    image: "/professional-woman-ceo.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    company: "GrowthCo",
    content:
      "The strategic approach and creative execution exceeded our expectations. They don't just deliver campaigns, they deliver results.",
    rating: 5,
    image: "/professional-marketing-director.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, EcoLiving",
    company: "EcoLiving",
    content:
      "Working with AdCraftors was a game-changer. Their team understood our vision and brought it to life in ways we never imagined.",
    rating: 5,
    image: "/professional-woman-founder.png",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-card">
      <div className="container-standard">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry leaders say about working with AdCraftors.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-background border-border shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <Quote className="h-12 w-12 text-primary/20" />
              </div>

              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 font-medium">
                  "{testimonials[currentIndex].content}"
                </blockquote>
              </div>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-foreground text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
                  <div className="text-primary font-medium">{testimonials[currentIndex].company}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
