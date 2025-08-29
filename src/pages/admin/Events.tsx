import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getAdminAuthHeaders } from "@/lib/adminAuth";

type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at?: string | null;
  venue: string | null;
  status: string | null;
  luma_url?: string | null;
  tags?: string[] | null;
  description?: string | null;
  image_url?: string | null;
  is_online?: boolean | null;
  capacity?: number | null;
};

export default function AdminEvents() {
  const [items, setItems] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  // Create form fields
  const [venue, setVenue] = useState("");
  const [luma, setLuma] = useState("");
  const [statusVal, setStatusVal] = useState("");
  const [tagsCsv, setTagsCsv] = useState("");
  const [featured, setFeatured] = useState(false);
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [capacity, setCapacity] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editVenue, setEditVenue] = useState("");
  const [editLuma, setEditLuma] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editFeatured, setEditFeatured] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editIsOnline, setEditIsOnline] = useState(false);
  const [editCapacity, setEditCapacity] = useState<string>("");
  const [editEndDate, setEditEndDate] = useState<string>("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("id,title,starts_at,ends_at,venue,status,luma_url,tags,description,image_url,is_online,capacity")
        .order("starts_at", { ascending: false });
      if (!active) return;
      if (error) {
        toast.error("Failed to load events");
      } else {
        setItems((data as unknown as EventRow[]) ?? []);
      }
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const add = async () => {
    try {
      if (!title.trim() || !date) {
        toast.error("Please provide title and date");
        return;
      }
      const headers = await getAdminAuthHeaders();
      const res = await fetch(`/api/admin/events`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title,
          starts_at: new Date(date).toISOString(),
          venue: venue || null,
          luma_url: luma || null,
          status: statusVal || null,
          tags: (() => {
            const base = tagsCsv
              ? tagsCsv.split(',').map((t) => t.trim()).filter(Boolean)
              : [] as string[];
            const hasFeatured = base.includes('featured');
            if (featured && !hasFeatured) base.push('featured');
            if (!featured && hasFeatured) base.splice(base.indexOf('featured'), 1);
            return base.length ? base : null;
          })(),
          description: desc || null,
          image_url: imgUrl || null,
          is_online: isOnline,
          capacity: capacity ? Number(capacity) : null,
          ends_at: endDate ? new Date(endDate).toISOString() : null,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create event");
      }
      const created = (await res.json()) as EventRow;
      setItems((prev) => [created, ...prev]);
      setTitle("");
      setDate("");
      setVenue("");
      setLuma("");
      setStatusVal("");
      setTagsCsv("");
      setFeatured(false);
      setDesc("");
      setImgUrl("");
      setIsOnline(false);
      setCapacity("");
      setEndDate("");
      toast.success("Event created");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create event");
    }
  };

  const remove = async (id: string) => {
    try {
      const headers = await getAdminAuthHeaders({ json: false });
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Delete failed");
      }
      setItems((prev) => prev.filter((it) => it.id !== id));
      toast.success("Event deleted");
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete event");
    }
  };

  const [editTagsCsvStr, setEditTagsCsvStr] = useState("");

  const startEdit = (ev: EventRow) => {
    setEditingId(ev.id);
    setEditTitle(ev.title ?? "");
    // Normalize date for input[type=date]
    try {
      setEditDate(new Date(ev.starts_at).toISOString().slice(0, 10));
    } catch {
      setEditDate("");
    }
    setEditVenue(ev.venue ?? "");
    setEditLuma(ev.luma_url ?? "");
    setEditStatus(ev.status ?? "");
    const t = (ev.tags ?? []) as string[];
    setEditTags(t);
    setEditFeatured(t.includes("featured"));
    setEditTagsCsvStr(Array.isArray(ev.tags) ? ev.tags.join(',') : "");
    setEditDescription(ev.description ?? "");
    setEditImageUrl(ev.image_url ?? "");
    setEditIsOnline(Boolean(ev.is_online));
    setEditCapacity(typeof ev.capacity === 'number' ? String(ev.capacity) : "");
    try {
      setEditEndDate(ev.ends_at ? new Date(ev.ends_at).toISOString().slice(0, 10) : "");
    } catch {
      setEditEndDate("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    try {
      if (!editingId) return;
      const headers = await getAdminAuthHeaders();
      // Assemble tags based on Featured toggle
      let nextTags = editTagsCsvStr.trim()
        ? editTagsCsvStr.split(',').map((t) => t.trim()).filter(Boolean)
        : (Array.isArray(editTags) ? [...editTags] : []);
      const idx = nextTags.indexOf("featured");
      if (editFeatured && idx === -1) nextTags.push("featured");
      if (!editFeatured && idx !== -1) nextTags.splice(idx, 1);

      const body: Partial<EventRow> & { starts_at?: string; tags?: string[] | null } = {
        title: editTitle,
        starts_at: editDate ? new Date(editDate).toISOString() : undefined,
        venue: editVenue || null,
        luma_url: editLuma || null,
        status: editStatus || null,
        tags: nextTags.length ? nextTags : null,
        description: editDescription || null,
        image_url: editImageUrl || null,
        is_online: editIsOnline,
        capacity: editCapacity ? Number(editCapacity) : null,
        ends_at: editEndDate ? new Date(editEndDate).toISOString() : null,
      };
      const res = await fetch(`/api/admin/events/${editingId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Update failed");
      }
      const updated = (await res.json()) as EventRow;
      setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
      setEditingId(null);
      toast.success("Event updated");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update event");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Events</h1>

      <div className="grid gap-3 md:grid-cols-[1fr_200px_1fr_1fr_auto] items-end">
        <input className="border rounded px-2 py-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="border rounded px-2 py-1" type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Luma URL" value={luma} onChange={(e) => setLuma(e.target.value)} />
        <button onClick={add} className="border rounded px-3 py-1 text-sm hover:bg-muted">Add</button>
        <input className="border rounded px-2 py-1" placeholder="Status" value={statusVal} onChange={(e) => setStatusVal(e.target.value)} />
        <input className="border rounded px-2 py-1" placeholder="Tags (comma-separated)" value={tagsCsv} onChange={(e) => setTagsCsv(e.target.value)} />
        <label className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Featured</span>
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        </label>
        <input className="border rounded px-2 py-1" placeholder="Image URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        <input className="border rounded px-2 py-1" type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        <label className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Online</span>
          <input type="checkbox" checked={isOnline} onChange={(e) => setIsOnline(e.target.checked)} />
        </label>
        <input className="border rounded px-2 py-1" type="date" placeholder="End Date (optional)" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <textarea className="border rounded px-2 py-1 md:col-span-5" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <div className="space-y-2">
        {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
        {!loading && items.length === 0 && (
          <div className="text-sm text-muted-foreground">No events yet.</div>
        )}
        {items.map((ev) => (
          <div key={ev.id} className="border border-border rounded-md px-3 py-2">
            {editingId === ev.id ? (
              <div className="grid gap-2 md:grid-cols-[1fr_160px_1fr_1fr_220px] items-end">
                <input className="border rounded px-2 py-1" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input className="border rounded px-2 py-1" type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Venue" value={editVenue} onChange={(e) => setEditVenue(e.target.value)} />
                <input className="border rounded px-2 py-1" placeholder="Luma URL" value={editLuma} onChange={(e) => setEditLuma(e.target.value)} />
                <div className="flex gap-2 items-center">
                  <input className="border rounded px-2 py-1" placeholder="Status" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} />
                  <input className="border rounded px-2 py-1 hidden md:block" placeholder="Tags (comma-separated)" value={editTagsCsvStr} onChange={(e) => setEditTagsCsvStr(e.target.value)} />
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-sm text-muted-foreground">Featured</span>
                    <input type="checkbox" checked={editFeatured} onChange={(e) => setEditFeatured(e.target.checked)} />
                  </div>
                  <button className="border rounded px-2 py-1 text-sm" onClick={saveEdit}>Save</button>
                  <button className="border rounded px-2 py-1 text-sm" onClick={cancelEdit}>Cancel</button>
                </div>
                <input className="border rounded px-2 py-1 md:col-span-2" placeholder="Image URL" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} />
                <input className="border rounded px-2 py-1" type="number" placeholder="Capacity" value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)} />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Online</span>
                  <input type="checkbox" checked={editIsOnline} onChange={(e) => setEditIsOnline(e.target.checked)} />
                </div>
                <input className="border rounded px-2 py-1" type="date" placeholder="End Date (optional)" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} />
                <textarea className="border rounded px-2 py-1 md:col-span-5" placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                {editLuma && (
                  <div className="md:col-span-5 mt-2">
                    <div className="text-xs text-muted-foreground mb-1">Luma Preview</div>
                    <iframe
                      src={`${editLuma}${editLuma.includes('?') ? '&' : '?'}embed=true`}
                      className="w-full h-72 rounded-md border"
                      loading="lazy"
                      allow="clipboard-write; encrypted-media"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(ev.starts_at).toLocaleString()} {ev.venue ? `• ${ev.venue}` : ""}
                  </div>
                  {Array.isArray(ev.tags) && ev.tags.includes("featured") && (
                    <div className="mt-1">
                      <span className="text-xs inline-block rounded px-2 py-0.5 bg-primary/10 text-primary">Featured</span>
                    </div>
                  )}
                  {ev.luma_url && (
                    <a href={ev.luma_url} target="_blank" rel="noreferrer" className="text-xs underline text-primary">
                      Event page
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground mr-2">{ev.status ?? ""}</div>
                  <button className="border rounded px-2 py-1 text-sm" onClick={() => startEdit(ev)}>Edit</button>
                  <button className="border rounded px-2 py-1 text-sm text-red-600" onClick={() => remove(ev.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
