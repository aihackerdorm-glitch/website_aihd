import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSiteVisibility } from "@/context/SiteVisibilityContext";

export default function PageGate({ slug, children }: { slug: string; children: ReactNode }) {
  const { map } = useSiteVisibility();
  // Unknown slugs default to visible; only block when explicitly set to false
  const visible = map[slug];
  if (visible === false) return <Navigate to="/" replace />;
  return <>{children}</>;
}
