import { Navigation } from "@/components/Navigation"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { PartnersWall } from "@/components/home/PartnersWall"
import Footer from "@/components/ui/animated-footer"
import { SparklesBand } from "@/components/home/SparklesBand"
import { FoundingTeam } from "@/components/home/FoundingTeam"
import { AboutSections } from "@/components/home/AboutSections"
import { ContactSection } from "@/components/home/ContactSection"
import { ComingSoonSection } from "@/components/home/ComingSoonSection"

const Index = () => {
  const location = useLocation()
  // Scrollspy: update URL hash based on section in view
  useEffect(() => {
    const ids = ["about", "events", "projects", "team", "contact"]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (sections.length === 0) return

    const navHeightVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-height")
      .trim()
    const navHeight = parseInt(navHeightVar || "80", 10) || 80

    let currentHash = location.hash
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const id = visible.target.getAttribute("id")
        if (!id) return
        const nextHash = `#${id}`
        if (nextHash !== currentHash) {
          currentHash = nextHash
          // Replace without adding history entries
          history.replaceState(null, "", `/${nextHash}`)
          // Notify listeners (NavBar) since replaceState doesn't fire hashchange
          window.dispatchEvent(new HashChangeEvent("hashchange"))
        }
      },
      {
        // Top offset so section counts as active slightly after passing under navbar
        root: null,
        rootMargin: `-${navHeight + 10}px 0px -60% 0px`,
        threshold: [0.15, 0.3, 0.6],
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // On mount, if a hash is present (e.g., /#about), smooth-scroll to that section
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Hero />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
        <SparklesBand />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
        <Features />
      </motion.div>
      {/* About Section (full) */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
        <AboutSections />
      </motion.div>
      {/* Programs Section removed */}
      {/* Events Section */}
      <ComingSoonSection id="events" title="Events" />
      <ComingSoonSection id="projects" title="Projects" />
      {/* Partners showcase */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
        <PartnersWall />
      </motion.div>
      {/* Team section */}
      <motion.section id="team" className="px-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
        <div className="max-w-6xl mx-auto">
          <FoundingTeam />
        </div>
      </motion.section>
      {/* Contact Section (last before footer) */}
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
        <ContactSection />
      </motion.div>
      <Footer
        leftLinks={[{ href: "/#about", label: "About" }, { href: "/#events", label: "Events" }]}
        rightLinks={[{ href: "/#contact", label: "Contact" }, { href: "#", label: "Privacy" }]}
        copyrightText="© 2025 AI HackerDorm"
      />
    </div>
  );
};

export default Index;
