import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { motion } from "framer-motion";

interface ComingSoonSectionProps {
  id: string;
  title: string;
}

export function ComingSoonSection({ id, title }: ComingSoonSectionProps) {
  return (
    <motion.section
      id={id}
      className="py-16 px-6 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden border">
        <div className="absolute inset-0 z-0 h-full w-full">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/80" />
        </div>
        <div className="relative z-10 p-8 md:p-12">
          <Card className="ai-card backdrop-blur-md bg-background/60 border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold">
                <span className="ai-text-gradient">{title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="wavy-underline w-24 md:w-32 mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg">
                Exciting things are on the horizon. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
