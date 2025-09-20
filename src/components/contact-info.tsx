import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Users } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our support team",
    contact: "support@marketpro.com",
    availability: "24/7 Response",
    badge: "Primary",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our team",
    contact: "+1 (555) 123-4567",
    availability: "Mon-Fri, 9AM-6PM EST",
    badge: "Business Hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Instant help when you need it",
    contact: "Available in-app",
    availability: "24/7 Available",
    badge: "Instant",
  },
]

const officeLocations = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 400",
    zipCode: "San Francisco, CA 94105",
    type: "Headquarters",
  },
  {
    city: "New York",
    address: "456 Broadway, Floor 12",
    zipCode: "New York, NY 10013",
    type: "East Coast Office",
  },
  {
    city: "London",
    address: "789 Oxford Street",
    zipCode: "London, UK W1C 1DX",
    type: "European Office",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="font-serif text-2xl flex items-center gap-2">
            <Users className="h-6 w-6 text-accent" />
            Contact Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <method.icon className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{method.title}</h3>
                  <Badge variant="outline" className="text-xs border-accent/20 bg-accent/10 text-accent">
                    {method.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <p className="font-medium text-foreground">{method.contact}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {method.availability}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Office Locations */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="font-serif text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6 text-accent" />
            Our Offices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {officeLocations.map((office, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">{office.city}</h3>
                <Badge variant="outline" className="text-xs border-border">
                  {office.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{office.address}</p>
              <p className="text-sm text-muted-foreground">{office.zipCode}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <h3 className="font-serif font-semibold text-lg mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">How quickly do you respond to inquiries?</p>
              <p className="text-muted-foreground">
                We aim to respond to all inquiries within 24 hours during business days.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Do you offer custom enterprise solutions?</p>
              <p className="text-muted-foreground">
                Yes, we provide tailored solutions for enterprise clients with dedicated support.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Can I schedule a demo?</p>
              <p className="text-muted-foreground">
                Select "Request a Demo" in the contact form to schedule a personalized walkthrough.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
