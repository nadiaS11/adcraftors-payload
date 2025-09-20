import { Mail, MessageSquare } from "lucide-react"

export function ContactHero() {
  return (
    <section className="bg-gradient-to-br from-background to-muted py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center">
              <MessageSquare className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
            Have questions about our platform? Want to discuss how MarketPro can help grow your business? We'd love to
            hear from you.
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground animate-fade-in-up animation-delay-400">
            <Mail className="h-5 w-5" />
            <span>We typically respond within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
