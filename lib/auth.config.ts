import type { NextAuthConfig } from "next-auth";

/**
 * Auth.js v5 — edge-safe configuration.
 * ──────────────────────────────────────
 * This file is deliberately kept SEPARATE from lib/auth.ts because
 * Next.js middleware runs on the Edge Runtime, which cannot import
 * heavy Node.js modules (database drivers, bcrypt, etc.).
 *
 * By isolating provider-less config here, the middleware can read
 * session data and make authorization decisions without pulling in
 * server-only code.  The full provider list is merged in lib/auth.ts.
 */
export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  // ── Custom Pages ──────────────────────────────────────────────
  // Override the default Auth.js sign-in page with our own route.
  // When an unauthenticated user is redirected, they land at "/" (home)
  // rather than the built-in /api/auth/signin scaffold.
  pages: {
    signIn: "/",
    error: "/",
  },

  // ── Session Strategy ──────────────────────────────────────────
  // "jwt" (default) — session data is stored in an encrypted cookie,
  // no database required.  This is fine for an OAuth-only setup.
  // Switch to "database" if you later add an Adapter (Prisma, Drizzle…).
  session: {
    strategy: "jwt",
  },

  // ── Callbacks ─────────────────────────────────────────────────
  // Callbacks let you hook into various stages of the auth lifecycle.
  // They run on every request (middleware) or during sign-in/session reads.
  callbacks: {
    /**
     * `authorized` — called by the middleware on every matched request.
     *
     * Return `true`  → request proceeds normally.
     * Return `false` → user is redirected to `pages.signIn`.
     * Return a `Response` / `NextResponse` → custom redirect.
     *
     * This is the primary gate for route protection.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/profile");

      if (isProtected && !isLoggedIn) {
        // Unauthenticated user trying to access /profile → redirect to home.
        // Returning `false` sends them to `pages.signIn` (which we set to "/").
        return false;
      }

      // All other routes (home, public pages, API) are freely accessible.
      return true;
    },

    /**
     * `jwt` — called whenever a JSON Web Token is created or updated.
     *
     * On initial sign-in, `account` and `profile` are populated with
     * data from the OAuth provider.  On subsequent requests, only `token`
     * is available (the previous JWT contents).
     *
     * Use this to persist provider-specific data (access tokens, user IDs)
     * into the JWT so it's available in `session()`.
     */
    jwt({ token, account, profile }) {
      if (account) {
        // First sign-in: copy relevant fields into the JWT.
        // `account.providerAccountId` is the Google user ID.
        // `account.access_token` is the short-lived OAuth access token
        //  Google issued after the authorization code exchange.
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (profile) {
        // `profile` contains the decoded ID token claims from Google:
        //  sub, name, email, picture, email_verified, etc.
        token.id = profile.sub;
      }
      return token;
    },

    /**
     * `session` — called whenever a session is read (on the server via
     * `auth()`, or on the client via `useSession()`).
     *
     * The JWT contents are passed in as `token`.  Whatever you return
     * in `session` becomes the shape of the session object your app sees.
     */
    session({ session, token }) {
      // Expose the Google user ID and the OAuth access token
      // to server components and client hooks.
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // ── Providers ─────────────────────────────────────────────────
  // Left empty here; merged with the Google provider in lib/auth.ts.
  // This keeps the middleware import lightweight.
  providers: [],
} satisfies NextAuthConfig;
