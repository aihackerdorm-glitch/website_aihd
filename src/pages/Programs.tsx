import { Navigation } from "@/components/Navigation"
import { motion } from "framer-motion"
import { BookOpen, Code, Brain, Rocket, Users, Trophy } from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Beginner Track",
    subtitle: "AI Foundations",
    duration: "8 weeks",
    level: "Beginner",
    description: "Perfect for newcomers to AI. Learn the fundamentals of machine learning, Python programming, and basic neural networks.",
    topics: ["Python Basics", "Data Science Fundamentals", "Introduction to ML", "Basic Neural Networks", "Hands-on Projects"],
    color: "text-blue-500"
  },
  {
    icon: Code,
    title: "Build Track",
    subtitle: "Practical AI Applications",
    duration: "12 weeks",
    level: "Intermediate",
    description: "Build real-world AI applications using popular frameworks like TensorFlow, PyTorch, and scikit-learn.",
    topics: ["Deep Learning", "Computer Vision", "NLP Projects", "Model Deployment", "MLOps", "Portfolio Building"],
    color: "text-green-500"
  },
  {
    icon: Brain,
    title: "Research Track",
    subtitle: "Advanced AI Research",
    duration: "16 weeks",
    level: "Advanced",
    description: "Dive deep into cutting-edge AI research and contribute to the scientific community.",
    topics: ["Research Methodology", "Paper Writing", "Advanced Algorithms", "Novel Architectures", "Publication Process"],
    color: "text-purple-500"
  }
]

const specialPrograms = [
  {
    icon: Rocket,
    title: "AI Hacker House",
    description: "Intensive 48-hour bootcamp where teams build AI solutions to real-world problems.",
    features: ["Industry Mentors", "Prizes Worth RM10K", "Job Opportunities", "Certificate"]
  },
  {
    icon: Users,
    title: "AI for All Initiative",
    description: "Making AI education accessible to everyone regardless of background or experience.",
    features: ["Free Workshops", "Community Support", "Diversity Scholarships", "Inclusive Learning"]
  },
  {
    icon: Trophy,
    title: "Competition Training",
    description: "Prepare for national and international AI competitions with expert guidance.",
    features: ["Kaggle Competitions", "Hackathons", "Research Competitions", "Team Formation"]
  }
]

export default function Programs() {
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
              Our <span className="ai-text-gradient">Programs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths designed to take you from AI curious to AI expert, 
              with hands-on projects and industry mentorship.
            </p>
          </motion.div>

          {/* Learning Tracks */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Learning Tracks</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  className="ai-card group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4`}>
                        <program.icon className={`h-6 w-6 ${program.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{program.title}</h3>
                        <p className="text-sm text-muted-foreground">{program.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {program.duration}
                      </span>
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                        {program.level}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">{program.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold mb-3">What You'll Learn:</h4>
                      {program.topics.map((topic, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span className="text-sm text-muted-foreground">{topic}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="ai-button-primary w-full mt-6">
                      Enroll Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Special Programs */}
          <div>
            <h2 className="text-3xl font-bold mb-12 text-center">Special Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {specialPrograms.map((program, index) => (
                <motion.div
                  key={program.title}
                  className="ai-card text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <program.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{program.title}</h3>
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {program.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <button className="ai-button-accent w-full mt-6">
                    Learn More
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="ai-card text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their careers through our comprehensive AI programs.
              Start with any track and progress at your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="ai-button-primary">
                Apply for Programs
              </button>
              <button className="ai-button-accent">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}