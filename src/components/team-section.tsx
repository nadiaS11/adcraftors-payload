import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    bio: "Former VP of Marketing at TechCorp with 15+ years of experience in digital marketing and analytics.",
    expertise: ["Strategy", "Leadership", "Marketing"],
    image: "/team-sarah-johnson-ceo.png",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer specializing in machine learning and large-scale data processing systems.",
    expertise: ["Engineering", "AI/ML", "Data Science"],
    image: "/team-michael-chen-cto.png",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Product",
    bio: "Product leader with a passion for user experience and data-driven product development.",
    expertise: ["Product", "UX Design", "Analytics"],
    image: "/team-emily-rodriguez-vp-product.png",
  },
  {
    name: "David Park",
    role: "Head of Data Science",
    bio: "PhD in Statistics with expertise in predictive modeling and business intelligence.",
    expertise: ["Data Science", "Statistics", "Research"],
    image: "/team-david-park-data-science.png",
  },
]

export function TeamSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of experts is passionate about helping businesses succeed through data-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardContent className="pt-6 text-center">
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="text-2xl font-serif font-bold text-accent">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {member.expertise.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs border-border bg-background/50">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
