import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const upcomingEvents = [
  {
    id: 1,
    title: "Introduction to Machine Learning Workshop",
    date: "2024-01-15",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 3, Block A",
    type: "Workshop",
    capacity: 50,
    registered: 34,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop",
    description:
      "Learn the fundamentals of ML with hands-on coding exercises using Python and scikit-learn.",
    tags: ["Beginner", "Python", "ML"],
    speaker: "Dr. Sarah Chen",
  },
  {
    id: 2,
    title: "AI Ethics Panel Discussion",
    date: "2024-01-22",
    time: "6:00 PM - 8:00 PM",
    location: "Virtual Event",
    type: "Panel",
    capacity: 200,
    registered: 156,
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&h=300&fit=crop",
    description:
      "Industry experts discuss the ethical implications of AI and responsible development practices.",
    tags: ["Ethics", "Industry", "Discussion"],
    speaker: "Panel of Industry Experts",
  },
  {
    id: 3,
    title: "Deep Learning Bootcamp",
    date: "2024-01-29",
    time: "9:00 AM - 6:00 PM",
    location: "Innovation Hub",
    type: "Bootcamp",
    capacity: 30,
    registered: 28,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
    description:
      "Intensive full-day bootcamp covering neural networks, CNNs, and RNNs with TensorFlow.",
    tags: ["Advanced", "TensorFlow", "Deep Learning"],
    speaker: "Alex Rodriguez & Team",
  },
]

const pastEvents = [
  { title: "AI Career Fair 2023", date: "2023-12-10", participants: 300, type: "Career Fair" },
  { title: "Kaggle Competition Workshop", date: "2023-11-25", participants: 120, type: "Workshop" },
  { title: "Computer Vision Hackathon", date: "2023-11-18", participants: 80, type: "Hackathon" },
]

export function EventsSection() {
  return (
    <section id="events" className="pt-16 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="ai-text-gradient">Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our workshops, panels, and hackathons to level up and meet the community.
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="ai-card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{event.type}</Badge>
                        {event.registered >= event.capacity * 0.9 && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Zap size={12} />
                            Almost Full
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-2">{event.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {event.registered}/{event.capacity} registered
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">Past Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((e, index) => (
              <motion.div
                key={e.title}
                className="ai-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{e.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(e.date).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-base font-semibold mb-1">{e.title}</h4>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  {e.participants} participants
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
