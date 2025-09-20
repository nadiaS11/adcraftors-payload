import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const caseStudies = [
  {
    id: 1,
    title: "E-commerce Revolution",
    client: "FashionForward",
    description: "Complete digital transformation resulting in 450% increase in online sales",
    results: [
      { metric: "Sales Increase", value: "450%" },
      { metric: "Conversion Rate", value: "8.2%" },
      { metric: "ROI", value: "320%" },
    ],
    image: "/ecommerce-fashion-website-modern.png",
    category: "E-commerce",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "SaaS Growth Strategy",
    client: "CloudTech Solutions",
    description: "Strategic campaign that tripled user acquisition and reduced CAC by 60%",
    results: [
      { metric: "User Growth", value: "300%" },
      { metric: "CAC Reduction", value: "60%" },
      { metric: "MRR Growth", value: "280%" },
    ],
    image: "/saas-dashboard-analytics-modern.png",
    category: "SaaS",
    color: "bg-accent",
  },
  {
    id: 3,
    title: "Brand Transformation",
    client: "GreenLife Organics",
    description: "Complete rebrand and digital strategy that established market leadership",
    results: [
      { metric: "Brand Awareness", value: "180%" },
      { metric: "Market Share", value: "25%" },
      { metric: "Customer Loyalty", value: "92%" },
    ],
    image: "/organic-food-brand-website-green.png",
    category: "Branding",
    color: "bg-secondary",
  },
]

export function CaseStudiesPreview() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every project is a partnership. Here are some of the transformative results we've achieved with our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card
              key={study.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card border-border"
            >
              <div className="relative overflow-hidden">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute top-4 left-4 ${study.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {study.category}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-3">{study.client}</p>
                  <p className="text-muted-foreground leading-relaxed">{study.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                      <div className="text-xs text-muted-foreground">{result.metric}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${study.id === 1 ? "ecommerce-revolution" : study.id === 2 ? "saas-growth-strategy" : "brand-transformation"}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/case-studies">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
