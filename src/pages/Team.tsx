import { Navigation } from "@/components/Navigation"
import { motion } from "framer-motion"
import { Linkedin, Mail, Award } from "lucide-react"

const founders = [
  {
    name: "Sharat Chandra Reddy Thimmareddy",
    role: "Co - President (Interim)",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=face",
    bio:
      "Skilled at reaching out and connecting with top AI companies locally and globally for partnerships, events, and student access. Strong background in tech events, PR, and student engagement. Creative visionary passionate about building, learning, and exploring new technologies, especially in AI.",
    links: { linkedin: "#", email: "aihackerdorm@gmail.com" },
  },
  {
    name: "Shannon Choo Ru Xin",
    role: "Co - President",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    bio:
      "Strong network in AI communities in Kuala Lumpur (AI Tinkerers KL, BuildClub KL, Loophole Hackers KL, Build with AI). Well-connected in the venture capital and startup ecosystem, offering visibility into real-world AI trends, funding landscapes, and opportunities for student founders. Bridges the gap between technical and non-technical domains.",
    links: { linkedin: "#", email: "aihackerdorm@gmail.com" },
  },
  {
    name: "Hein Wunna (Logan)",
    role: "Vice President",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    bio: "Supporting operations, member success, and partnerships.",
    links: { linkedin: "#", email: "aihackerdorm@gmail.com" },
  },
]

const boardMembers: Array<{ name: string; role: string; image: string; bio: string }> = []

export default function Team() {
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
              <span className="ai-text-gradient">Founding Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The founding leaders building AI Hackerdorm and its global student builder community.
            </p>
          </motion.div>

          {/* Founders & Leadership */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {founders.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="ai-card text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                  <div className="flex justify-center space-x-3">
                    {member.links.linkedin && (
                      <a href={member.links.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.links.email && (
                      <a href={`mailto:${member.links.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Board Members (render only when available) */}
          {boardMembers.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-12 text-center">Board of Directors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {boardMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="ai-card text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                    />
                    <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Join the Team CTA */}
          <motion.div
            className="ai-card text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our leadership team. 
              If you're interested in making a difference in the AI community, we'd love to hear from you.
            </p>
            <a
              className="ai-button-primary inline-flex items-center"
              href="https://forms.gle/pbG4FWuLXUFnrmsb7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply to Join the Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}