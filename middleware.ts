import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Next.js Middleware — runs on the Edge Runtime BEFORE every matched request.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * HOW THIS CONNECTS TO AUTH:
 * 1. `NextAuth(authConfig)` returns an object with an `.auth` property —
 *    a middleware-compatible function that reads the session from the
 *    encrypted JWT cookie.
 * 2. On every request, `.auth` decodes the cookie, populates `auth`
 *    (the session), and invokes the `authorized` callback from authConfig.
 * 3. If `authorized` returns `false`, the middleware redirects to
 *    `pages.signIn` (our home page "/").
 * 4. If `authorized` returns `true`, the request proceeds normally.
 *
 * WHY auth.config.ts AND NOT auth.ts?
 * Middleware runs on the Edge Runtime, which has a restricted API surface.
 * auth.config.ts contains NO providers (Google, GitHub, etc.) — those
 * require Node.js APIs (HTTP requests to token endpoints, crypto for
 * PKCE, etc.).  The middleware only needs to READ the session cookie,
 * not perform OAuth flows, so the lightweight config is sufficient.
 *
 * PROTECTED ROUTES:
 * Currently, the `authorized` callback in auth.config.ts protects
 * any route starting with "/profile".  Unauthenticated users are
 * redirected to "/" (home).
 */
export default NextAuth(authConfig).auth;

/**
 * Matcher configuration — tells Next.js WHICH routes this middleware applies to.
 *
 * The regex below matches everything EXCEPT:
 *   - /api/*            → API routes (Auth.js needs these to be unblocked)
 *   - /_next/static/*   → static assets (JS, CSS bundles)
 *   - /_next/image/*    → optimized images
 *   - /favicon.ico      → browser icon
 *
 * Without a matcher, middleware would run on EVERY request including
 * static files, which wastes compute and can cause redirect loops
 * on the Auth.js callback URL.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
