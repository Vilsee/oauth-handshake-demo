"use client";

/**
 * SessionProvider wrapper for client components.
 * ───────────────────────────────────────────────
 * Auth.js v5 provides a `<SessionProvider>` that uses React Context
 * to make session data available to any client component via the
 * `useSession()` hook.
 *
 * HOW IT WORKS:
 * 1. On mount, SessionProvider fetches GET /api/auth/session
 * 2. The response (user name, email, image, expiry) is stored in context
 * 3. Any descendant client component can call `useSession()` to read it
 * 4. The provider also handles automatic session polling / refetching
 *    when the browser tab regains focus (configurable via `refetchInterval`)
 *
 * WHY A WRAPPER FILE?
 * Next.js App Router layouts are Server Components by default.
 * `<SessionProvider>` uses React Context (a client-only API), so it
 * needs the `"use client"` directive.  Rather than making the entire
 * root layout a client component, we isolate the provider here.
 */

import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      // `refetchOnWindowFocus` (default: true) — re-fetches the session
      // when the user switches back to this browser tab.  Ensures the UI
      // reflects sign-out events that happened in other tabs.
    >
      {children}
    </SessionProvider>
  );
}
