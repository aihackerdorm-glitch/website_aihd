import { createClient } from "@supabase/supabase-js";

// Public endpoint to read site page visibility without requiring client-side Supabase
// Useful to avoid RLS/policy issues and ensure consistent visibility for all users.
export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const urlEnv = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!urlEnv || !serviceKey) {
    return new Response("Server misconfigured: missing SUPABASE env vars", { status: 500 });
  }

  const supabase = createClient(urlEnv, serviceKey);

  const { data, error } = await supabase
    .from("site_pages")
    .select("slug,title,visible")
    .order("slug", { ascending: true });

  if (error) return new Response(error.message, { status: 500 });
  return Response.json(data || []);
};

export const config = {
  path: [
    "/api/public/pages",
  ],
};
