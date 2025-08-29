import { useEffect, useState } from "react";
import { useSiteVisibility } from "@/context/SiteVisibilityContext";
import { getAdminAuthHeaders } from "@/lib/adminAuth";
import { toast } from "sonner";

export default function PagesVisibility() {
  const { knownPages, map, refresh, loading } = useSiteVisibility();
  const [savingSlug, setSavingSlug] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, []);

  const updateVisible = async (slug: string, visible: boolean) => {
    try {
      setSavingSlug(slug);
      const headers = await getAdminAuthHeaders();
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ visible }),
      });
      if (!res.ok) throw new Error(await res.text());
      await refresh();
      toast.success("Updated");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update");
    } finally {
      setSavingSlug(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pages Visibility</h1>
        <button onClick={() => refresh()} className="ai-button-primary">Refresh</button>
      </div>
      <p className="text-sm text-muted-foreground">Toggle visibility of pages. Home and Contact remain visible and are not listed here.</p>

      <div className="divide-y divide-border rounded-md border">
        {knownPages
          .filter((p) => p.slug !== "dashboard-landing")
          .map((p) => (
            <div key={p.slug} className="flex items-center justify-between p-3">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">/{p.slug}</div>
              </div>
              <input
                type="checkbox"
                checked={map[p.slug] !== false}
                onChange={(e) => updateVisible(p.slug, !!e.target.checked)}
                disabled={loading || savingSlug === p.slug}
              />
            </div>
          ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Note: Hiding "About" will also place a condensed About section on the Home page automatically, as requested.
      </p>
    </div>
  );
}
