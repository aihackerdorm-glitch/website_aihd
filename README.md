# Welcome to your Lovable project

## Project info

**URL**: https://aihackerdrom.netlify.app/

## How can I edit this code?

There are several ways of editing your application.

https://aihackerdrom.netlify.app/

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# AI HackerDorm Website

This repository powers the AI HackerDorm website. It is a Vite + React + TypeScript application styled with Tailwind CSS and shadcn-ui, deployed on Netlify with serverless functions and Supabase for data.

## Tech Stack
- Vite (React + TypeScript)
- Tailwind CSS (`tailwind.config.ts`, `postcss.config.js`)
- shadcn-ui (Radix primitives) with components under `src/components/ui/`
- React Router v6
- TanStack Query
- Sonner + custom Toaster
- Netlify Functions (`netlify/functions/`)
- Supabase (service role used server-side)
- Three.js (shader demo)

## Project Structure
- `src/components/ui/` — shadcn components (default path). Keep UI primitives here for consistency.
- `src/pages/` — route views. For now, main tabs render `Index` (Home) content.
- `src/components/admin/AdminPasswordGate.tsx` — prompts for admin password and stores it in `sessionStorage`.
- `src/components/auth/ProtectedRoute.tsx` — no-op wrapper; gating handled by password gate.
- `src/context/SiteVisibilityContext.tsx` — loads public page visibility and updates via admin API.
- `netlify/functions/` — API (public pages + admin Pages/Projects/Events/Members).

## Setup
Prerequisites: Node 18+ and npm.

```bash
npm i
npm run dev
```

## Environment Variables
Create `.env` in project root with:

```bash
VITE_SUPABASE_URL=<your_supabase_url>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>   # used by Netlify functions only
ADMIN_PASSWORD=<strong_password>                     # server
VITE_ADMIN_PASSWORD=<same_strong_password>          # client (must match)
```

- Admin auth uses only the admin password (`x-admin-password` header). No Clerk is required.
- Netlify: set the same envs in site settings (Build and Functions).

## Admin Authentication (Password-Only)
- All admin APIs require `x-admin-password` to equal `ADMIN_PASSWORD`.
- Frontend gate (`AdminPasswordGate`) prompts once and stores `sessionStorage.admin_password`.
- Helper `getAdminAuthHeaders()` sends the header for admin requests.

## Page Visibility System
- Public read: `netlify/functions/public-pages.mts` (no auth).
- Admin write: `netlify/functions/admin-pages.mts` (password required).
- Context: `SiteVisibilityContext` fetches visibility and exposes `setVisible(slug, visible)`.
- Guard: `PageGate` wraps routes to block hidden pages.

## Routes Overview
- Main tabs (`/about`, `/team`, `/programs`, `/events`, `/projects`, `/resources`, `/contact`, `/join`) render `Index` (Home) content for now.
- `/dashboard` — shows a simple "Coming Soon" page.
- `/shader-demo` — Three.js shader demo using `ShaderAnimation`.
- Admin area under `/admin` (Pages/Projects/Events/Members): gated by password.

## Shader Demo
- Component: `src/components/ui/shader-animation.tsx`
- Page: `src/pages/ShaderDemo.tsx`
- Visit `/shader-demo` to see it.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Deployment (Netlify)
- Build command: `npm run build`
- Publish directory: `dist/`
- Functions directory: `netlify/functions/`
- Configure env vars in Netlify: `VITE_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `VITE_ADMIN_PASSWORD`.

## Branding & Accounts
- Brand string: use exactly "AI HackerDorm" (capital D) across UI and content.
- All project-related accounts are linked to: `aihackerdorm@gmail.com`.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/55f1ed52-4363-482f-93eb-dce8aae77b0c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
