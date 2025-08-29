import { Navigation } from "@/components/Navigation"
import { motion } from "framer-motion"
import { Heart, Target, Eye, Lightbulb } from "lucide-react"
import { WavyBackground } from "@/components/ui/wavy-background"

const values = [
  {
    icon: Heart,
    title: "Human First",
    description: "We prioritize human welfare and ethical AI development in everything we do."
  },
  {
    icon: Target,
    title: "Action First",
    description: "We believe in learning by doing and creating tangible impact through our projects."
  },
  {
    icon: Lightbulb,
    title: "Collaborative Spirit",
    description: "Together we achieve more. Collaboration is at the heart of innovation."
  },
  {
    icon: Eye,
    title: "Curiosity",
    description: "We foster an environment of continuous learning and questioning."
  }
]

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Wavy hero */}
      <WavyBackground containerClassName="pt-20" className="px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          About <span className="ai-text-gradient">AI Hackerdorm</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering the next generation of AI innovators through education, collaboration, and real-world applications.
        </p>
      </WavyBackground>

      <section className="pt-12 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="ai-card mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              To create a vibrant community where students can explore, learn, and innovate in the field of artificial intelligence. 
              We bridge the gap between academic theory and industry practice, fostering an environment where creativity meets cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            className="ai-card mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              To be the leading AI community in Malaysia, producing graduates who are not just consumers of AI technology, 
              but creators, innovators, and ethical leaders who shape the future of artificial intelligence for the betterment of humanity.
            </p>
          </motion.div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="ai-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="ai-card text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-6">Why AI Matters Now</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Artificial Intelligence is reshaping every industry and aspect of our lives. As future leaders and innovators, 
              it's crucial that we understand not just how to use AI, but how to develop it responsibly, ethically, and for the benefit of all.
              Join us in building the future, one algorithm at a time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}