import { Navigation } from "@/components/Navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Users, ExternalLink, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/SearchBar"

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
    description: "Learn the fundamentals of ML with hands-on coding exercises using Python and scikit-learn.",
    tags: ["Beginner", "Python", "ML"],
    speaker: "Dr. Sarah Chen"
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
    description: "Industry experts discuss the ethical implications of AI and responsible development practices.",
    tags: ["Ethics", "Industry", "Discussion"],
    speaker: "Panel of Industry Experts"
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
    description: "Intensive full-day bootcamp covering neural networks, CNNs, and RNNs with TensorFlow.",
    tags: ["Advanced", "TensorFlow", "Deep Learning"],
    speaker: "Alex Rodriguez & Team"
  }
]

const pastEvents = [
  {
    title: "AI Career Fair 2023",
    date: "2023-12-10",
    participants: 300,
    type: "Career Fair"
  },
  {
    title: "Kaggle Competition Workshop",
    date: "2023-11-25",
    participants: 120,
    type: "Workshop"
  },
  {
    title: "Computer Vision Hackathon",
    date: "2023-11-18",
    participants: 80,
    type: "Hackathon"
  }
]

export default function Events() {
  const [search, setSearch] = useState("")
  const q = search.trim().toLowerCase()
  const filteredUpcoming = !q
    ? upcomingEvents
    : upcomingEvents.filter((e: any) => {
        const haystack = [
          e.title,
          e.description,
          e.speaker,
          e.location,
          e.type,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        const tagMatch = Array.isArray(e.tags)
          ? (e.tags as string[]).some((t) => (t || "").toLowerCase().includes(q))
          : false
        return haystack.includes(q) || tagMatch
      })

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Upcoming <span className="ai-text-gradient">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our workshops, seminars, and networking events to expand your AI knowledge 
              and connect with fellow enthusiasts.
            </p>
          </motion.div>

          {/* Upcoming Events */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
            <div className="max-w-md mx-auto mb-8">
              <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
            </div>
            <div className="space-y-8">
              {filteredUpcoming.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="ai-card group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -2 }}
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
                          <p className="text-muted-foreground mb-4">{event.description}</p>
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
                      
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-muted-foreground">
                          Speaker: <span className="text-foreground font-medium">{event.speaker}</span>
                        </p>
                        <button className="ai-button-primary flex items-center gap-2">
                          Register Now
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  className="ai-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    {event.participants} participants
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Event Calendar CTA */}
          <motion.div
            className="ai-card text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our calendar to get notified about upcoming workshops, seminars, and networking events.
              Be the first to secure your spot!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ai-button-primary">
                Subscribe to Calendar
              </button>
              <button className="ai-button-accent">
                Suggest an Event
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}