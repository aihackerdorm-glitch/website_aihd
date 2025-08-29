import { motion } from "framer-motion"
import { WavyBackground } from "@/components/ui/wavy-background"
import { Heart, Target, Eye, Lightbulb } from "lucide-react"

const values = [
  { icon: Heart, title: "Human First", description: "We prioritize human welfare and ethical AI development in everything we do." },
  { icon: Target, title: "Action First", description: "We believe in learning by doing and creating tangible impact through our projects." },
  { icon: Lightbulb, title: "Collaborative Spirit", description: "Together we achieve more. Collaboration is at the heart of innovation." },
  { icon: Eye, title: "Curiosity", description: "We foster an environment of continuous learning and questioning." },
]

export function AboutSections() {
  return (
    <section id="about" className="relative pt-12 pb-20">
      <span className="spiral-orb -top-6 -left-10 hidden md:block" />
      <span className="spiral-orb -bottom-10 -right-6 hidden md:block" />
      {/* Wavy hero */}
      <WavyBackground containerClassName="pt-10" className="px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">
          About <span className="ai-text-gradient">AI HackerDorm</span>
        </h2>
        <div className="wavy-underline mx-auto w-32 md:w-40 mb-6"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empowering the next generation of AI innovators through education, collaboration, and real-world applications.
        </p>
      </WavyBackground>

      <div className="px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="ai-card mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
            <p className="text-base text-muted-foreground leading-relaxed text-center">
              To create a vibrant community where students can explore, learn, and innovate in the field of artificial intelligence. We bridge the gap between academic theory and industry practice, fostering an environment where creativity meets cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            className="ai-card mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Our Vision</h3>
            <p className="text-base text-muted-foreground leading-relaxed text-center">
              To be the leading AI community in Malaysia, producing graduates who are not just consumers of AI technology, but creators, innovators, and ethical leaders who shape the future of artificial intelligence for the betterment of humanity.
            </p>
          </motion.div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="ai-card text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="ai-card text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Why AI Matters Now</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Artificial Intelligence is reshaping every industry and aspect of our lives. As future leaders and innovators, it's crucial that we understand not just how to use AI, but how to develop it responsibly, ethically, and for the benefit of all. Join us in building the future, one algorithm at a time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
