import { motion } from "framer-motion"
import { Brain, Code, Users, Rocket, BookOpen, Trophy } from "lucide-react"
import { COPY } from "@/content/copy"

const features = [
  {
    icon: Brain,
    title: "AI Learning Tracks",
    description: "Structured pathways from beginner to advanced AI concepts with hands-on projects."
  },
  {
    icon: Code,
    title: "Coding Workshops",
    description: "Weekly sessions on Python, TensorFlow, PyTorch, and emerging AI frameworks."
  },
  {
    icon: Users,
    title: "Collaborative Community",
    description: "Connect with like-minded peers, mentors, and industry professionals."
  },
  {
    icon: Rocket,
    title: "Innovation Labs",
    description: "Access to cutting-edge tools and resources for your AI projects."
  },
  {
    icon: BookOpen,
    title: "Research Opportunities",
    description: "Participate in groundbreaking research with faculty and industry partners."
  },
  {
    icon: Trophy,
    title: "Competitions & Hackathons",
    description: "Showcase your skills in local and international AI competitions."
  }
]

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Join <span className="ai-text-gradient">{COPY.brand.shortName}</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities that will shape your future in artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="ai-card group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}