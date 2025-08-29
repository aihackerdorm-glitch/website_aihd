import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // All gating is handled by AdminPasswordGate wrapping this component in App.tsx
  return <>{children}</>;
}

