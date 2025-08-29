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
    const insertBody = {
      title: body.title,
      summary: body.summary ?? null,
      description: body.description ?? null,
      repo_url: body.repo_url ?? null,
      demo_url: body.demo_url ?? null,
      image_url: body.image_url ?? null,
      tags: body.tags ?? null,
      status: body.status ?? "pending",
      owner_id: body.owner_id ?? userId,
    };
    const { data, error } = await supabase.from("projects").insert(insertBody).select();
    if (error) return new Response(error.message, { status: 500 });
    return Response.json(data[0]);
  }
  if (req.method === "PATCH" && id) {
    const body = await req.json();
    const { data, error } = await supabase.from("projects").update(body).eq("id", id).select();
    if (error) return new Response(error.message, { status: 500 });
    return Response.json(data[0]);
  }
  if (req.method === "DELETE" && id) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return new Response(error.message, { status: 500 });
    return new Response(null, { status: 204 });
  }
  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: [
    "/api/admin/projects",
    "/api/admin/projects/:id",
  ],
};
