import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function JoinTeamBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="mb-10 overflow-hidden rounded-xl border relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative flex items-center justify-between gap-6 p-6 md:p-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">AI HackerDorm</h2>
            <p className="text-sm text-gray-300">
              Building a global community of student AI builders.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:aihackerdorm@gmail.com">
              <Button variant="outline" className="gap-2 bg-transparent text-white border-gray-400 hover:bg-white/10 hover:text-white">
                <Mail className="h-4 w-4" /> Contact
              </Button>
            </a>
            <a
              href="https://forms.gle/pbG4FWuLXUFnrmsb7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="ai-button-primary">Apply to Join the Team</Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
