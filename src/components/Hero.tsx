import { motion } from "framer-motion"
import { Brain, Zap, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextRotate } from "@/components/ui/text-rotate"
import { FallingPattern } from "@/components/ui/falling-pattern"
import { Globe } from "@/components/ui/globe"
import { ThreeHero } from "@/components/ui/three-hero"
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { COPY } from "@/content/copy"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Falling Pattern Background */}
      <FallingPattern 
        className="absolute inset-0 z-0" 
        color="hsl(var(--primary) / 0.1)"
        duration={180}
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient opacity-90 z-10" />
      {/* Three.js animated particles background (desktop only) */}
      <div className="absolute inset-0 z-[15] hidden md:block">
        <ThreeHero />
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid z-20" />
      {/* Globe Background (interactive) - hidden on mobile for performance */}
      <div className="absolute inset-0 z-[25] hidden md:flex pointer-events-none items-center justify-center">
        <Globe className="top-24" />
      </div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 z-30">
        <motion.div
          className="absolute top-20 left-20 text-primary/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Brain size={40} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-accent/20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <Zap size={32} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-40 text-primary/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        >
          <Users size={36} />
        </motion.div>
      </div>

      <div className="relative z-40 text-center max-w-4xl mx-auto px-6">
        {/* Subtle blue backdrop for text readability */}
        <div className="absolute -inset-6 bg-sky-500/10 rounded-3xl blur-sm pointer-events-none" aria-hidden />
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
              {COPY.hero.welcomeBadge}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="ai-text-gradient">AI</span>
            <br />
            <TextRotate
              texts={COPY.hero.rotateWords}
              mainClassName="inline-block"
              rotationInterval={3000}
            />
          </h1>
          
          <p className="text-xl md:text-2xl text-primary/80 mb-2 max-w-2xl mx-auto">
            {COPY.hero.tagline}
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SignedOut>
              <Button asChild className="ai-button-primary group">
                <a href="https://forms.gle/pbG4FWuLXUFnrmsb7" target="_blank" rel="noopener noreferrer">
                  {COPY.hero.ctas.join}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button className="ai-button-primary group">
                  {COPY.hero.ctas.dashboard}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </SignedIn>
            <Link to="/projects">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                {COPY.hero.ctas.exploreProjects}
              </Button>
            </Link>
            <a
              href="https://forms.gle/pbG4FWuLXUFnrmsb7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="bg-accent/20 hover:bg-accent/30">
                Apply to Join the Team
              </Button>
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}