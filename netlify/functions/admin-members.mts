import { createClient } from "@supabase/supabase-js";

// Lazy init inside handler to avoid crashing at cold start if envs missing

async function verifyAdmin(req: Request) {
  const headerPwd = req.headers.get("x-admin-password");
  const adminPwd = (process.env.ADMIN_PASSWORD as string) || (process.env.VITE_ADMIN_PASSWORD as string) || "";
  if (adminPwd && headerPwd && headerPwd === adminPwd) return true;
  return new Response("Unauthorized", { status: 401 });
}

export default async (req: Request, _context: any) => {
  const authRes: any = await verifyAdmin(req);
  if (authRes instanceof Response) return authRes;

  const urlEnv = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!urlEnv || !serviceKey) {
    return new Response("Server misconfigured: missing SUPABASE env vars", { status: 500 });
  }
  const supabase = createClient(urlEnv, serviceKey);

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // user_id for PATCH

  if (req.method === "GET") {
    // List memberships with basic profile info
    const { data: memberships, error: mErr } = await supabase
      .from("memberships")
      .select("id,user_id,role,joined_at")
      .order("joined_at", { ascending: false });
    if (mErr) return new Response(mErr.message, { status: 500 });

    const userIds = (memberships || []).map((m: any) => m.user_id);
    let profilesByUser: Record<string, any> = {};
    if (userIds.length) {
      const { data: profiles, error: pErr } = await supabase
        .from("profiles")
        .select("user_id,name,visibility").in("user_id", userIds);
      if (pErr) return new Response(pErr.message, { status: 500 });
      for (const p of profiles || []) profilesByUser[p.user_id] = p;
    }

    const result = (memberships || []).map((m: any) => ({
      ...m,
      profile: profilesByUser[m.user_id] || null,
    }));
    return Response.json(result);
  }

  if (req.method === "PATCH" && id) {
    const body = await req.json();
    const { role, visibility } = body as { role?: string; visibility?: boolean };

    // Update role in memberships
    if (role) {
      const { error: rErr } = await supabase
        .from("memberships")
        .update({ role })
        .eq("user_id", id);
      if (rErr) return new Response(rErr.message, { status: 500 });
    }

    // Update profile visibility
    if (typeof visibility === "boolean") {
      const { error: vErr } = await supabase
        .from("profiles")
        .update({ visibility })
        .eq("user_id", id);
      if (vErr) return new Response(vErr.message, { status: 500 });
    }

    // Return latest row
    const { data: membership, error: gErr } = await supabase
      .from("memberships")
      .select("id,user_id,role,joined_at")
      .eq("user_id", id)
      .single();
    if (gErr) return new Response(gErr.message, { status: 500 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("user_id,name,visibility")
      .eq("user_id", id)
      .single();

    return Response.json({ ...membership, profile: profile || null });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: [
    "/api/admin/members",
    "/api/admin/members/:id",
  ],
};
