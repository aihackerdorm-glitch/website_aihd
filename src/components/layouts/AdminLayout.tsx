import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">AI HackerDorm</Link>
          <div className="text-sm text-muted-foreground">Admin</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="md:sticky md:top-16 h-max">
          <nav className="flex md:flex-col gap-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium border ${isActive ? 'bg-muted text-primary border-primary/30' : 'border-transparent hover:bg-muted/40'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/pages"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium border ${isActive ? 'bg-muted text-primary border-primary/30' : 'border-transparent hover:bg-muted/40'}`
              }
            >
              Pages
            </NavLink>
            <NavLink
              to="/admin/events"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium border ${isActive ? 'bg-muted text-primary border-primary/30' : 'border-transparent hover:bg-muted/40'}`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/admin/projects"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium border ${isActive ? 'bg-muted text-primary border-primary/30' : 'border-transparent hover:bg-muted/40'}`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/admin/members"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium border ${isActive ? 'bg-muted text-primary border-primary/30' : 'border-transparent hover:bg-muted/40'}`
              }
            >
              Members
            </NavLink>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-h-[60vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
