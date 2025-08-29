import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { JoinTeamBanner } from "./JoinTeamBanner"
import { motion } from "framer-motion"

type Member = {
  name: string
  role: string
  desc?: string
  image?: string | null
}

const LEADERSHIP: Member[] = [
  {
    role: "Co-Founder & President",
    name: "Shannon Choo Ru Xin",
    desc:
      "Leads overall direction and strategy. Strong network across AI communities and the startup ecosystem.",
    image: null,
  },
  {
    role: "Co-Founder",
    name: "Sharat Chandra Reddy Thimmareddy",
    desc:
      "Partnerships, outreach, and community growth. Tech events and PR background. Passionate AI builder.",
    image: null,
  },
  {
    role: "Vice President",
    name: "Sim Hong Bing",
    desc: "Public relations and community pipeline.",
    image: null,
  },
  {
    role: "Vice President",
    name: "Hein Wunna (Logan)",
    desc: "Events and session logistics; member success.",
    image: null,
  },
]

const MARKETING: Member[] = [
  { name: "Raha", role: "Creatives", image: null },
  { name: "Yan Fong", role: "Video Team, Cameraman", image: null },
  { name: "Tia Su", role: "Creatives", image: null },
]

export function FoundingTeam() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-16">
      <JoinTeamBanner />

      {/* Spiral background accents */}
      <span className="spiral-orb -top-6 left-6 hidden md:block" />
      <span className="spiral-orb bottom-4 right-10 hidden md:block" />

      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Founding Team</h3>
        </div>
        <div className="wavy-underline w-24 md:w-32 mt-2"></div>
      </div>

      {/* Leadership */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {LEADERSHIP.map((m) => (
          <motion.div key={m.name} variants={itemVariants}>
            <Card className="p-6 h-full">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">
                  {m.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <span>{m.name.split(" ").map((n) => n[0]).slice(0,2).join("")}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm text-primary/80 font-medium">{m.role}</div>
                  <div className="text-lg font-semibold">{m.name}</div>
                </div>
              </div>
              {m.desc && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {m.desc}
                </p>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Marketing team */}
      <div className="mt-10">
        <h4 className="text-base font-semibold text-foreground/90 mb-3">Marketing</h4>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {MARKETING.map((m) => (
            <motion.div key={m.name} variants={itemVariants}>
              <Card className="p-5 h-full">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center font-semibold">
                    {m.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.image} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <span>{m.name.split(" ").map((n) => n[0]).slice(0,2).join("")}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
