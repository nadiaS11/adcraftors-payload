import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const timelineEvents = [
  {
    year: "2018",
    title: "Company Founded",
    description: "MarketPro was founded with a vision to democratize marketing analytics for businesses of all sizes.",
    milestone: "Founding",
  },
  {
    year: "2019",
    title: "First 1,000 Users",
    description:
      "Reached our first major milestone with 1,000 active users and launched our competitive analysis tools.",
    milestone: "Growth",
  },
  {
    year: "2020",
    title: "Series A Funding",
    description: "Secured $10M in Series A funding to accelerate product development and expand our team.",
    milestone: "Funding",
  },
  {
    year: "2021",
    title: "AI Integration",
    description: "Launched AI-powered insights and predictive analytics, revolutionizing how users interpret data.",
    milestone: "Innovation",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Expanded to serve customers in over 50 countries with localized analytics and multi-language support.",
    milestone: "Expansion",
  },
  {
    year: "2023",
    title: "Enterprise Platform",
    description:
      "Launched enterprise-grade features including advanced security, custom integrations, and dedicated support.",
    milestone: "Enterprise",
  },
  {
    year: "2024",
    title: "50,000+ Users",
    description: "Celebrating over 50,000 active users and continuing to innovate in the marketing analytics space.",
    milestone: "Milestone",
  },
]

export function CompanyTimeline() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From a small startup to a leading marketing analytics platform, here's how we've grown over the years.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-16 h-16 bg-accent rounded-full items-center justify-center text-accent-foreground font-bold text-sm flex-shrink-0 relative z-10">
                    {event.year}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 group hover:shadow-lg transition-all duration-300 border-border bg-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-accent/10 text-accent border-accent/20">{event.milestone}</Badge>
                        <span className="md:hidden text-sm font-bold text-accent">{event.year}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-foreground mb-2">{event.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
