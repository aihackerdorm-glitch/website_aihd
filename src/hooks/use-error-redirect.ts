import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export type ErrorRedirectMeta = {
  message?: string;
  from?: string;
  data?: unknown;
  replace?: boolean;
};

/**
 * useErrorRedirect
 * Simple hook to send users to the global "/error" route.
 * Call in catch blocks or error branches. Logs metadata to console.
 *
 * Example:
 * const redirectToError = useErrorRedirect();
 * try { ... } catch (e) { redirectToError({ message: 'Load failed', from: 'Profile' }) }
 */
export function useErrorRedirect() {
  const navigate = useNavigate();

  const redirect = useCallback((meta?: ErrorRedirectMeta) => {
    try {
      // Non-blocking console logging for diagnostics
      // eslint-disable-next-line no-console
      console.error("[ErrorRedirect]", {
        when: new Date().toISOString(),
        message: meta?.message,
        from: meta?.from,
        data: meta?.data,
      });
    } catch {}

    navigate("/error", { replace: Boolean(meta?.replace) });
  }, [navigate]);

  return redirect;
}
