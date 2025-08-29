import { ReactNode, useMemo, useState } from "react";

export default function AdminPasswordGate({ children }: { children: ReactNode }) {
  const required = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || "";
  const needsPassword = required.length > 0;
  const [ok, setOk] = useState<boolean>(() => {
    if (!needsPassword) return true;
    try {
      return sessionStorage.getItem("admin_pass_ok") === "1";
    } catch {
      return false;
    }
  });

  const [input, setInput] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === required) {
      try {
        sessionStorage.setItem("admin_pass_ok", "1");
        sessionStorage.setItem("admin_password", input);
      } catch {}
      setOk(true);
    } else {
      alert("Incorrect admin password");
    }
  };

  if (!needsPassword || ok) return <>{children}</>;

  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <form onSubmit={onSubmit} className="ai-card p-6 space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-semibold">Admin Password</h2>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 bg-background"
          placeholder="Enter admin password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="ai-button-primary w-full">Continue</button>
      </form>
    </div>
  );
}
