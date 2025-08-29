import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx'
import './index.css'

// Get your publishable key from Clerk Dashboard
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const rootEl = document.getElementById("root")!;

if (PUBLISHABLE_KEY) {
  createRoot(rootEl).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </StrictMode>
  );
} else {
  // Render without Clerk to avoid runtime crash during initial deploy.
  console.warn("Clerk Publishable Key missing. Rendering app without ClerkProvider. Set VITE_CLERK_PUBLISHABLE_KEY and redeploy.");
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
