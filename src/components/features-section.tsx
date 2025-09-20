import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Globe, Zap, Shield, BarChart } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Comprehensive keyword research, rank tracking, and technical SEO audits to boost your search visibility.",
    badge: "Popular",
  },
  {
    icon: Users,
    title: "Audience Insights",
    description: "Understand your audience behavior, demographics, and preferences with advanced analytics.",
    badge: null,
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Track performance across multiple markets and languages with localized insights.",
    badge: null,
  },
  {
    icon: Zap,
    title: "Real-time Data",
    description: "Get instant updates on your campaigns, rankings, and competitor movements.",
    badge: "New",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Enterprise-grade security with SOC 2 compliance and advanced data protection.",
    badge: null,
  },
  {
    icon: BarChart,
    title: "Custom Reports",
    description: "Create beautiful, branded reports that showcase your marketing success to stakeholders.",
    badge: null,
  },
]

export function FeaturesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-full">
        <div className="text-center mb-16">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Everything You Need to Dominate Your Market
            </h2>
            <p className="text-xl text-muted-foreground">
              Our comprehensive platform provides all the tools and insights you need to outperform competitors and
              drive sustainable growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-serif text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
