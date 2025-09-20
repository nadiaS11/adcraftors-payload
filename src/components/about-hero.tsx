import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 animate-fade-in-up">
            Empowering Businesses Through <span className="text-accent">Data-Driven Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
            Since 2018, MarketPro has been helping thousands of businesses unlock their growth potential through
            advanced marketing analytics and competitive intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
              Join Our Mission
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              View Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
