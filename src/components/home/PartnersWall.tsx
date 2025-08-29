import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export function PartnersWall() {
  const [partners, setPartners] = useState<Tables<'partners'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) {
        console.error('Error fetching partners', error);
      }
      setPartners(data || []);
      setLoading(false);
    };

    fetchPartners();
  }, []);

  if (loading || partners.length === 0) return null;

  return (
    <section className="container mx-auto px-6 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Our Partners</h2>
        <a href="/about" className="text-sm text-muted-foreground hover:underline">See all</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {partners.map((p) => (
          <a
            key={p.id}
            href={p.website_url || '#'}
            target={p.website_url ? "_blank" : undefined}
            rel={p.website_url ? "noreferrer" : undefined}
            className="group flex items-center justify-center rounded-xl border border-border/50 bg-card/60 backdrop-blur p-6 hover:border-primary/40 hover:bg-card/80 transition-all"
            title={p.name}
          >
            {p.logo_url ? (
              <img
                src={p.logo_url}
                alt={p.name}
                className="h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            ) : (
              <span className="ai-text-gradient font-semibold text-sm text-center">{p.name}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
