import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Globe, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    description: "Businesses trust our platform",
  },
  {
    icon: Globe,
    value: "120+",
    label: "Countries",
    description: "Global reach and impact",
  },
  {
    icon: TrendingUp,
    value: "2.5B+",
    label: "Data Points",
    description: "Analyzed monthly",
  },
  {
    icon: Award,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable service guarantee",
  },
]

export function CompanyStats() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform powers marketing decisions for businesses of all sizes, from startups to Fortune 500 companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardContent className="pt-8 pb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-serif font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
