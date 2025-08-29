import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { getAdminAuthHeaders } from "@/lib/adminAuth";

export type PageSlug =
  | "about"
  | "team"
  | "programs"
  | "events"
  | "projects"
  | "resources"
  | "join"
  | "dashboard"
  | "dashboard-landing"
  | "spiral"
  | "wavy";

const ALWAYS_VISIBLE = new Set<string>(["/", "/contact"]);

const KNOWN_PAGES: { slug: PageSlug; title: string }[] = [
  { slug: "about", title: "About" },
  { slug: "team", title: "Team" },
  { slug: "programs", title: "Programs" },
  { slug: "events", title: "Events" },
  { slug: "projects", title: "Projects" },
  { slug: "resources", title: "Resources" },
  { slug: "join", title: "Join" },
  { slug: "dashboard", title: "Dashboard" },
  { slug: "dashboard-landing", title: "Dashboard Landing" },
  { slug: "spiral", title: "Spiral" },
  { slug: "wavy", title: "Wavy" },
];

export interface SiteVisibilityState {
  map: Record<string, boolean>; // slug -> visible
  loading: boolean;
  error?: string;
  refresh: () => Promise<void>;
  setVisible: (slug: string, visible: boolean) => Promise<void>;
  isLinkVisible: (href: string) => boolean;
  knownPages: typeof KNOWN_PAGES;
}

const SiteVisibilityContext = createContext<SiteVisibilityState | null>(null);

export function SiteVisibilityProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchPages = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch("/api/public/pages");
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Array<{ slug: string; visible: boolean }>;
      const next: Record<string, boolean> = {};
      for (const row of data || []) next[row.slug] = !!row.visible;
      setMap(next);
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const setVisible = async (slug: string, visible: boolean) => {
    // optimistic update
    setMap((m) => ({ ...m, [slug]: visible }));
    try {
      const headers = await getAdminAuthHeaders();
      await fetch(`/api/admin/pages/${slug}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ visible }),
      });
    } catch {
      // ignore – admins mainly toggle via the admin page which handles errors/toasts
    }
  };

  const isLinkVisible = (href: string) => {
    if (!href) return true;
    if (!href.startsWith("/")) return true; // external links unaffected
    if (ALWAYS_VISIBLE.has(href)) return true;
    const slug = href.replace(/^\//, "");
    const visible = map[slug];
    // default to true if unknown
    return visible !== false;
  };

  const value: SiteVisibilityState = useMemo(
    () => ({ map, loading, error, refresh: fetchPages, setVisible, isLinkVisible, knownPages: KNOWN_PAGES }),
    [map, loading, error]
  );

  return <SiteVisibilityContext.Provider value={value}>{children}</SiteVisibilityContext.Provider>;
}

export function useSiteVisibility() {
  const ctx = useContext(SiteVisibilityContext);
  if (!ctx) throw new Error("useSiteVisibility must be used within SiteVisibilityProvider");
  return ctx;
}
