import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getAdminAuthHeaders } from "@/lib/adminAuth";

interface ProjectRow {
  id: string;
  title: string;
  summary?: string | null;
  description?: string | null;
  repo_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
  tags?: string[] | null;
  status?: string | null;
}

export default function AdminProjects() {
  const [items, setItems] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [repo, setRepo] = useState("");
  const [demo, setDemo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [tagsCsv, setTagsCsv] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editRepo, setEditRepo] = useState("");
  const [editDemo, setEditDemo] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTagsCsv, setEditTagsCsv] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,summary,description,repo_url,demo_url,image_url,tags,status")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) toast.error("Failed to load projects");
      else setItems((data as any) ?? []);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const startEdit = (p: ProjectRow) => {
    setEditingId(p.id);
    setEditTitle(p.title ?? "");
    setEditRepo(p.repo_url ?? "");
    setEditDemo(p.demo_url ?? "");
    setEditImageUrl(p.image_url ?? "");
    setEditSummary(p.summary ?? "");
    setEditDescription(p.description ?? "");
    setEditTagsCsv(Array.isArray(p.tags) ? p.tags.join(",") : "");
    setEditStatus(p.status ?? "");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    try {
      if (!editingId) return;
      const headers = await getAdminAuthHeaders();
      const res = await fetch(`/api/admin/projects/${editingId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          title: editTitle,
          summary: editSummary || null,
          description: editDescription || null,
          repo_url: editRepo || null,
          demo_url: editDemo || null,
          image_url: editImageUrl || null,
          tags: editTagsCsv
            ? editTagsCsv.split(',').map((t) => t.trim()).filter(Boolean)
            : null,
          status: editStatus || null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Update failed");
      }
      const updated = await res.json();
      setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
      setEditingId(null);
      toast.success("Project updated");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update project");
    }
  };

  const add = async () => {
    try {
      if (!title.trim()) {
        toast.error("Please provide a project name");
        return;
      }
      const headers = await getAdminAuthHeaders();
      const res = await fetch(`/api/admin/projects`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title,
          summary: summary || null,
          description: description || null,
          repo_url: repo || null,
          demo_url: demo || null,
          image_url: imageUrl || null,
          tags: tagsCsv ? tagsCsv.split(',').map((t) => t.trim()).filter(Boolean) : null,
          status: status || null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create project");
      }
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setTitle("");
      setRepo("");
      setDemo("");
      setImageUrl("");
      setSummary("");
      setDescription("");
      setTagsCsv("");
      setStatus("");
      toast.success("Project created");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create project");
    }
  };

  const remove = async (id: string) => {
    try {
      const headers = await getAdminAuthHeaders({ json: false });
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Delete failed");
      }
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted");
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Projects</h1>

      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <input className="border rounded px-2 py-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Repository URL" value={repo} onChange={(e) => setRepo(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Demo URL" value={demo} onChange={(e) => setDemo(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <button className="border rounded px-3 py-1 text-sm hover:bg-muted" onClick={add}>Add</button>
        <input className="border rounded px-2 py-1 md:col-span-2" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Tags (comma-separated)" value={tagsCsv} onChange={(e) => setTagsCsv(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Status (draft/pending/approved/featured)" value={status} onChange={(e) => setStatus(e.target.value)} />
        <textarea className="border rounded px-2 py-1 md:col-span-5" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="space-y-2">
        {items.length === 0 && (
          <div className="text-sm text-muted-foreground">No projects yet.</div>
        )}
        {items.map((p) => (
          <div key={p.id} className="border border-border rounded-md px-3 py-2">
            {editingId === p.id ? (
              <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_220px] items-end">
                <input className="border rounded px-2 py-1" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Repository URL" value={editRepo} onChange={(e) => setEditRepo(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Demo URL" value={editDemo} onChange={(e) => setEditDemo(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Image URL" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} />
                <div className="flex gap-2">
                  <button className="border rounded px-2 py-1 text-sm" onClick={saveEdit}>Save</button>
                  <button className="border rounded px-2 py-1 text-sm" onClick={cancelEdit}>Cancel</button>
                </div>
                <input className="border rounded px-2 py-1 md:col-span-2" placeholder="Summary" value={editSummary} onChange={(e) => setEditSummary(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Tags (comma-separated)" value={editTagsCsv} onChange={(e) => setEditTagsCsv(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Status" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
                <textarea className="border rounded px-2 py-1 md:col-span-5" placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.title}</div>
                  {p.repo_url && (
                    <a href={p.repo_url} target="_blank" rel="noreferrer" className="text-xs text-primary underline">
                      {p.repo_url}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button className="border rounded px-2 py-1 text-sm" onClick={() => startEdit(p)}>Edit</button>
                  <button className="border rounded px-2 py-1 text-sm text-red-600" onClick={() => remove(p.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
