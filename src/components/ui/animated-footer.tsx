"use client"
import React, { useEffect, useRef, useState } from "react";
import { LiquidLogo } from "@/components/ui/liquid-logo";
import { useSiteVisibility } from "@/context/SiteVisibilityContext";

interface LinkItem {
  href: string;
  label: string;
}

interface FooterProps {
  leftLinks: LinkItem[];
  rightLinks: LinkItem[];
  copyrightText: string;
  barCount?: number; 
}

const Footer: React.FC<FooterProps> = ({
  leftLinks,
  rightLinks,
  copyrightText,
  barCount = 23, 
}) => {
  const { isLinkVisible } = useSiteVisibility();
  const filteredLeft = leftLinks.filter((l) => isLinkVisible(l.href));
  const filteredRight = rightLinks.filter((l) => isLinkVisible(l.href));
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let t = 0; 

    const animateWave = () => {
      const waveElements = waveRefs.current;
      let offset = 0;

      waveElements.forEach((element, index) => {
        if (element) {
          offset += Math.max(0, 20 * Math.sin((t + index) * 0.3)); 
          element.style.transform = `translateY(${index + offset}px)`;
        }
      });

      t += 0.1;
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    if (isVisible) {
      animateWave();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <footer
      ref={footerRef}
      className="bg-background text-foreground relative flex flex-col w-full justify-start select-none border-t border-border"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between w-full gap-4 pb-8 pt-8 px-4">
        <div className="space-y-2">
          <ul className="flex flex-wrap gap-4">
            {filteredLeft.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-sm hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm mt-4">{copyrightText}</p>
        </div>
        <div className="space-y-4">
          {/* Liquid logo animation (desktop-only by default) */}
          <div className="flex justify-end">
            <LiquidLogo height={80} hideOnMobile={false} />
          </div>
          <ul className="flex flex-wrap gap-4">
            {filteredRight.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-sm hover:text-primary transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <button className="text-sm hover:underline inline-flex items-center">
              Back to top
            </button>
          </div>
        </div>
      </div>
      <div
        id="waveContainer"
        aria-hidden="true"
        style={{ overflow: "hidden", height: 140 }}
      >
        <div style={{ marginTop: 0 }}>
          {Array.from({ length: barCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => { waveRefs.current[index] = el; }}
              className="wave-segment"
              style={{
                height: `${index + 1}px`,
                backgroundColor: "hsl(var(--primary))",
                transition: "transform 0.1s ease",
                willChange: "transform",
                marginTop: "-2px",
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;