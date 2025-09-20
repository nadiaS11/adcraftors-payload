import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Shield, Heart, Zap } from "lucide-react"

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We constantly push the boundaries of what's possible in marketing analytics, bringing cutting-edge solutions to our users.",
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description:
      "Your data security is our top priority. We maintain the highest standards of privacy and compliance across all our services.",
  },
  {
    icon: Heart,
    title: "Customer Success",
    description:
      "Every decision we make is guided by our commitment to helping our customers achieve their marketing goals and grow their businesses.",
  },
  {
    icon: Zap,
    title: "Performance Excellence",
    description:
      "We deliver fast, reliable, and accurate insights that enable our users to make confident, data-driven decisions.",
  },
]

export function CompanyValues() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do and shape the culture that drives our success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
