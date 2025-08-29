import { createClient } from "@supabase/supabase-js";

async function verifyAdmin(req: Request) {
  const headerPwd = req.headers.get("x-admin-password");
  const adminPwd = (process.env.ADMIN_PASSWORD as string) || (process.env.VITE_ADMIN_PASSWORD as string) || "";
  if (adminPwd && headerPwd && headerPwd === adminPwd) return { userId: "password-admin" };
  return new Response("Unauthorized", { status: 401 });
}

export default async (req: Request, _context: any) => {
  const authRes: any = await verifyAdmin(req);
  if (authRes instanceof Response) return authRes;

  const { userId } = authRes;
  const urlEnv = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!urlEnv || !serviceKey) {
    return new Response("Server misconfigured: missing SUPABASE env vars", { status: 500 });
  }
  const supabase = createClient(urlEnv, serviceKey);
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (req.method === "POST") {
    const body = await req.json();
    const { data, error } = await supabase.from("events").insert({
      title: body.title,
      description: body.description ?? null,
      starts_at: body.starts_at,
      ends_at: body.ends_at ?? null,
      venue: body.venue ?? null,
      luma_url: body.luma_url ?? null,
      image_url: body.image_url ?? null,
      is_online: body.is_online ?? null,
      capacity: typeof body.capacity === 'number' ? body.capacity : null,
      tags: body.tags ?? null,
      status: body.status ?? null,
      created_by: body.created_by ?? userId,
    }).select();
    if (error) return new Response(error.message, { status: 500 });
    return Response.json(data[0]);
  }
  if (req.method === "PATCH" && id) {
    const body = await req.json();
    const { data, error } = await supabase.from("events").update(body).eq("id", id).select();
    if (error) return new Response(error.message, { status: 500 });
    return Response.json(data[0]);
  }
  if (req.method === "DELETE" && id) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return new Response(error.message, { status: 500 });
    return new Response(null, { status: 204 });
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: [
    "/api/admin/events",
    "/api/admin/events/:id",
  ],
};
