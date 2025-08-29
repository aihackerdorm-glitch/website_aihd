import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Play, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Tables<'projects'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'featured')
        .order('updated_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching featured projects', error);
      }
      setProjects(data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading || projects.length === 0) return null;

  return (
    <section className="container mx-auto px-6 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <Link to="/projects">
          <Button variant="outline" size="sm">Browse all</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            {p.image_url && (
              <div className="h-40 w-full overflow-hidden">
                <img src={p.image_url} alt={p.title} className="h-full w-full object-cover" />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-1">{p.title}</CardTitle>
              {p.summary && (
                <CardDescription className="line-clamp-2">{p.summary}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {(p.tags || []).slice(0, 4).map((t) => (
                  <Badge key={t} variant="outline" className="inline-flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> {t}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Link to={`/projects`}>
                  <Button size="sm" className="ai-button-primary">
                    View <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                {p.repo_url && (
                  <a href={p.repo_url} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline">
                      Code <Github className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                )}
                {p.demo_url && (
                  <a href={p.demo_url} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline">
                      Demo <Play className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
