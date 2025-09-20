import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern-white.png')] opacity-10"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <div className="container-standard relative">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to Craft Your Success Story?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how AdCraftors can transform your digital presence and drive measurable results for your
            business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg group"
              asChild
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/contact">
                <MessageCircle className="mr-2 h-5 w-5" />
                Start a Conversation
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>Free consultation • No commitment required • Response within 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  )
}
