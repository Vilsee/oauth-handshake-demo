/**
 * Auth.js API Route — catch-all handler.
 * ───────────────────────────────────────
 * Next.js App Router uses file-based routing.  The [...nextauth] dynamic
 * segment matches ANY sub-path under /api/auth/:
 *
 *   /api/auth/signin          → shows the sign-in page (or redirects to provider)
 *   /api/auth/callback/google → handles the OAuth redirect from Google
 *   /api/auth/signout         → clears the session cookie
 *   /api/auth/session         → returns current session as JSON
 *   /api/auth/csrf            → returns a CSRF token for form submissions
 *
 * Auth.js reads the sub-path to decide what action to perform.
 *
 * We import `handlers` (an object with GET and POST methods) from
 * lib/auth.ts and re-export them as named route exports, which is
 * what the App Router expects.
 */
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
