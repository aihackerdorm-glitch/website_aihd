import { Navigation } from "@/components/Navigation";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Wavy() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <WavyBackground
        className="max-w-4xl mx-auto pb-40"
        colors={["#7c3aed", "#4f46e5", "#06b6d4", "#22d3ee"]}
        blur={12}
        speed="slow"
        waveOpacity={0.35}
        backgroundFill="#0b0f1a"
        waveWidth={60}
      >
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center">
          AI Hackerdorm
        </p>
        <p className="text-base md:text-lg mt-4 text-white/80 font-normal text-center">
          Building, learning, and shipping AI together.
        </p>
      </WavyBackground>
    </div>
  );
}
