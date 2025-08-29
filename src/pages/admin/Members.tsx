import { useEffect, useState, useMemo } from "react";
import { getAdminAuthHeaders } from "@/lib/adminAuth";
import { toast } from "sonner";

interface MemberRow {
  id: string;
  user_id: string;
  role: "member" | "lead" | "admin";
  joined_at: string;
  profile?: {
    user_id: string;
    name: string;
    visibility: boolean | null;
  } | null;
}

export default function AdminMembers() {
  const [rows, setRows] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r =>
      (r.profile?.name || "").toLowerCase().includes(q) ||
      r.user_id.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q)
    );
  }, [rows, query]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        const headers = await getAdminAuthHeaders({ json: false });
        const res = await fetch(`/api/admin/members`, { headers });
        if (!res.ok) throw new Error(await res.text());
        const data = (await res.json()) as MemberRow[];
        if (!active) return;
        setRows(data);
      } catch (e: any) {
        toast.error(e?.message || "Failed to load members");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { active = false };
  }, []);

  const updateRole = async (userId: string, role: MemberRow["role"]) => {
    try {
      const headers = await getAdminAuthHeaders();
      const res = await fetch(`/api/admin/members/${userId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = (await res.json()) as MemberRow;
      setRows(prev => prev.map(r => r.user_id === userId ? updated : r));
      toast.success("Role updated");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update role");
    }
  };

  const updateVisibility = async (userId: string, visibility: boolean) => {
    try {
      const headers = await getAdminAuthHeaders();
      const res = await fetch(`/api/admin/members/${userId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ visibility }),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = (await res.json()) as MemberRow;
      setRows(prev => prev.map(r => r.user_id === userId ? updated : r));
      toast.success("Visibility updated");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update visibility");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Members</h1>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="border rounded px-2 py-1"
          placeholder="Search by name, role, or user id"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="border rounded px-3 py-1 text-sm hover:bg-muted" onClick={() => setQuery("")}>Clear</button>
      </div>

      {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
      {!loading && filtered.length === 0 && (
        <div className="text-sm text-muted-foreground">No members found.</div>
      )}

      <div className="space-y-2">
        {filtered.map((m) => (
          <div key={m.id} className="border border-border rounded-md px-3 py-2">
            <div className="grid gap-2 md:grid-cols-[1fr_160px_160px_160px] items-center">
              <div>
                <div className="font-medium">{m.profile?.name || "Unnamed"}</div>
                <div className="text-xs text-muted-foreground">{m.user_id}</div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Role</label>
                <select
                  className="border rounded-md bg-background px-2 py-1 text-sm"
                  value={m.role}
                  onChange={(e) => updateRole(m.user_id, e.target.value as MemberRow["role"]) }
                >
                  <option value="member">member</option>
                  <option value="lead">lead</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Profile Visible</span>
                <input
                  type="checkbox"
                  checked={!!m.profile?.visibility}
                  onChange={(e) => updateVisibility(m.user_id, e.target.checked)}
                />
              </div>

              <div className="justify-self-end">
                <span className="text-xs text-muted-foreground">Joined {new Date(m.joined_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
