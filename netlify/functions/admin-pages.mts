import { createClient } from "@supabase/supabase-js";

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
  const slug = url.pathname.split("/").pop();

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("site_pages")
      .select("slug,title,visible")
      .order("slug", { ascending: true });
    if (error) return new Response(error.message, { status: 500 });
    return Response.json(data || []);
  }

  if (req.method === "PATCH" && slug) {
    const body = await req.json();
    const { visible, title } = body as { visible?: boolean; title?: string };
    if (typeof visible !== "boolean" && typeof title !== "string") {
      return new Response("No changes provided", { status: 400 });
    }
    const update: any = {};
    if (typeof visible === "boolean") update.visible = visible;
    if (typeof title === "string") update.title = title;

    const { error } = await supabase
      .from("site_pages")
      .update(update)
      .eq("slug", slug);
    if (error) return new Response(error.message, { status: 500 });

    const { data } = await supabase
      .from("site_pages")
      .select("slug,title,visible")
      .eq("slug", slug)
      .single();
    return Response.json(data);
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config = {
  path: [
    "/api/admin/pages",
    "/api/admin/pages/:slug",
  ],
};
