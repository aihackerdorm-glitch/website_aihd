"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { COPY } from "@/content/copy";

export function SparklesBand() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      {/* Particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="sparkles-band"
          background="transparent"
          minSize={0.6}
          maxSize={1.2}
          particleDensity={160}
          particleColor="#7dd3fc" /* sky-300 */
          speed={0.6}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-6 text-center">
        <p className="text-sm uppercase tracking-wider text-primary/70 mb-2">Our Promise</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          {COPY.hero.slogan}
        </h2>
      </div>

      {/* gradient mask to soften edges */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_60%_at_center,black,transparent)]" />
    </section>
  );
}
