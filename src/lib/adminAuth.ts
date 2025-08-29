export async function getAdminAuthHeaders(opts?: { json?: boolean }): Promise<HeadersInit> {
  const headers: Record<string, string> = {};
  if (!opts || opts.json !== false) headers["Content-Type"] = "application/json";

  // Password header
  try {
    const pwd = globalThis?.sessionStorage?.getItem("admin_password");
    if (pwd) headers["x-admin-password"] = pwd;
  } catch {
    // ignore
  }
  return headers;
}
