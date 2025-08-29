import { motion } from "framer-motion"
import { BookOpen, Code, Brain, Rocket, Users, Trophy } from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Beginner Track",
    subtitle: "AI Foundations",
    duration: "8 weeks",
    level: "Beginner",
    description:
      "Perfect for newcomers to AI. Learn the fundamentals of machine learning, Python programming, and basic neural networks.",
    topics: [
      "Python Basics",
      "Data Science Fundamentals",
      "Introduction to ML",
      "Basic Neural Networks",
      "Hands-on Projects",
    ],
    color: "text-blue-500",
  },
  {
    icon: Code,
    title: "Build Track",
    subtitle: "Practical AI Applications",
    duration: "12 weeks",
    level: "Intermediate",
    description:
      "Build real-world AI applications using popular frameworks like TensorFlow, PyTorch, and scikit-learn.",
    topics: [
      "Deep Learning",
      "Computer Vision",
      "NLP Projects",
      "Model Deployment",
      "MLOps",
      "Portfolio Building",
    ],
    color: "text-green-500",
  },
  {
    icon: Brain,
    title: "Research Track",
    subtitle: "Advanced AI Research",
    duration: "16 weeks",
    level: "Advanced",
    description:
      "Dive deep into cutting-edge AI research and contribute to the scientific community.",
    topics: [
      "Research Methodology",
      "Paper Writing",
      "Advanced Algorithms",
      "Novel Architectures",
      "Publication Process",
    ],
    color: "text-purple-500",
  },
]

const specialPrograms = [
  {
    icon: Rocket,
    title: "AI Hacker House",
    description:
      "Intensive 48-hour bootcamp where teams build AI solutions to real-world problems.",
    features: ["Industry Mentors", "Prizes Worth RM10K", "Job Opportunities", "Certificate"],
  },
  {
    icon: Users,
    title: "AI for All Initiative",
    description:
      "Making AI education accessible to everyone regardless of background or experience.",
    features: ["Free Workshops", "Community Support", "Diversity Scholarships", "Inclusive Learning"],
  },
  {
    icon: Trophy,
    title: "Competition Training",
    description:
      "Prepare for national and international AI competitions with expert guidance.",
    features: ["Kaggle Competitions", "Hackathons", "Research Competitions", "Team Formation"],
  },
]

export function ProgramsSection() {
  return (
    <section id="programs" className="pt-16 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="ai-text-gradient">Programs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Structured learning paths to take you from AI curious to AI expert.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              className="ai-card group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4`}>
                    <program.icon className={`h-6 w-6 ${program.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">{program.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {program.duration}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs">
                    {program.level}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Special Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                className="ai-card text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <program.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{program.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {program.features.map((f, i) => (
                    <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
