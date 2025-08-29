import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
// Public tab pages are temporarily hidden and redirected to Home
import DashboardComingSoon from "./pages/DashboardComingSoon";
import NotFound from "./pages/NotFound";
// Experimental pages remain accessible as needed
import Spiral from "./pages/Spiral";
import Wavy from "./pages/Wavy";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEvents from "./pages/admin/Events";
import AdminProjects from "./pages/admin/Projects";
import DashboardLanding from "./pages/DashboardLanding";
import AdminMembers from "./pages/admin/Members";
import { SiteVisibilityProvider } from "./context/SiteVisibilityContext";
import PageGate from "./components/PageGate";
import AdminPasswordGate from "./components/admin/AdminPasswordGate";
import ShaderDemo from "./pages/ShaderDemo";
import AdminPagesVisibility from "./pages/admin/PagesVisibility";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteVisibilityProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          {/* Redirect public tabs to Home while we consolidate content on the Home page */}
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/team" element={<Navigate to="/" replace />} />
          <Route path="/programs" element={<Navigate to="/" replace />} />
          <Route path="/events" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Navigate to="/" replace />} />
          <Route path="/resources" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="/join" element={<Navigate to="/" replace />} />
          {/* Dashboard shows Coming Soon for now */}
          <Route path="/dashboard" element={<DashboardComingSoon />} />
          <Route path="/dashboard-landing" element={<PageGate slug="dashboard-landing"><DashboardLanding /></PageGate>} />
          <Route path="/spiral" element={<PageGate slug="spiral"><Spiral /></PageGate>} />
          <Route path="/wavy" element={<PageGate slug="wavy"><Wavy /></PageGate>} />
          <Route path="/shader-demo" element={<ShaderDemo />} />
          {/* Global error route */}
          <Route path="/error" element={<NotFound />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminPasswordGate>
                  <AdminLayout />
                </AdminPasswordGate>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="pages" element={<AdminPagesVisibility />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SiteVisibilityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
