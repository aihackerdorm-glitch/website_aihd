import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const [members, setMembers] = useState<number>(0)
  const [events, setEvents] = useState<number>(0)
  const [projects, setProjects] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [{ count: membersCount }, { count: eventsCount }, { count: projectsCount }] = await Promise.all([
          supabase.from('memberships').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('projects').select('*', { count: 'exact', head: true }),
        ])

        setMembers(membersCount || 0)
        setEvents(eventsCount || 0)
        setProjects(projectsCount || 0)
      } catch (e) {
        console.error('Error fetching admin dashboard counts:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground">Members</div>
          <div className="text-3xl font-bold mt-2">{loading ? '—' : members}</div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground">Events</div>
          <div className="text-3xl font-bold mt-2">{loading ? '—' : events}</div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <div className="text-sm text-muted-foreground">Projects</div>
          <div className="text-3xl font-bold mt-2">{loading ? '—' : projects}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/admin/events" className="border rounded px-3 py-1 text-sm hover:bg-muted">Manage Events</Link>
        <Link to="/admin/projects" className="border rounded px-3 py-1 text-sm hover:bg-muted">Manage Projects</Link>
      </div>
    </div>
  );
}
