import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";

/**
 * Auth.js v5 — full server-side configuration.
 * ─────────────────────────────────────────────
 * This is the MAIN auth entry point.  It merges the edge-safe config
 * (auth.config.ts) with provider definitions that may need Node.js APIs.
 *
 * Everything exported here runs ONLY on the Node.js runtime
 * (API routes, Server Components, Server Actions) — never in middleware.
 */
export const {
  /**
   * `handlers` — Next.js App Router API route handlers.
   *
   * These power the /api/auth/* endpoints that Auth.js needs:
   *   GET  /api/auth/signin      → renders the sign-in page (or redirects)
   *   POST /api/auth/signin/:provider  → initiates the OAuth flow
   *   GET  /api/auth/callback/:provider → handles the OAuth callback
   *   POST /api/auth/signout     → clears the session
   *   GET  /api/auth/session     → returns the current session as JSON
   *
   * Re-exported as `{ GET, POST }` in app/api/auth/[...nextauth]/route.ts.
   */
  handlers,

  /**
   * `auth` — the session helper.
   *
   * Call `await auth()` in any Server Component, Server Action, or
   * API Route to get the current session (or `null` if not signed in).
   *
   * Example:
   *   const session = await auth();
   *   if (!session) redirect("/");
   */
  auth,

  /**
   * `signIn` — programmatic sign-in (server-side).
   *
   * Typically called inside a Server Action or API route:
   *   await signIn("google");          // redirect to Google consent screen
   *   await signIn("google", { redirectTo: "/profile" });
   */
  signIn,

  /**
   * `signOut` — programmatic sign-out (server-side).
   *
   * Clears the JWT session cookie and optionally redirects:
   *   await signOut();
   *   await signOut({ redirectTo: "/" });
   */
  signOut,
} = NextAuth({
  // Spread the edge-safe base config (pages, session, callbacks).
  ...authConfig,

  // ── Providers ───────────────────────────────────────────────
  // This is where we wire up the actual OAuth providers.
  // Each provider handles a specific OAuth flow.
  providers: [
    Google({
      /**
       * Client credentials from the Google Cloud Console.
       * These are read from .env.local at runtime:
       *
       *   GOOGLE_CLIENT_ID     — identifies this app to Google
       *   GOOGLE_CLIENT_SECRET — the shared secret, never exposed to the browser
       *
       * Together with the registered redirect URI
       * (http://localhost:3000/api/auth/callback/google), these form the
       * "client registration" in the OAuth 2.0 spec.
       */
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      /**
       * Authorization parameters sent to Google's /authorize endpoint.
       *
       * `prompt: "consent"` — forces the Google consent screen every time,
       * which is useful during development so you can re-test the flow.
       * Remove it in production if you want silent re-authentication.
       *
       * `access_type: "offline"` — requests a refresh token alongside the
       * access token.  Google only issues a refresh token when the user
       * explicitly grants consent (hence `prompt: "consent"`).
       *
       * Auth.js uses `response_type: "code"` by default — this is the
       * standard Authorization Code flow.  The browser never sees an
       * access token; instead:
       *   1. Google redirects back with a short-lived `code`
       *   2. Auth.js exchanges that code for tokens server-side
       *      (POST to https://oauth2.googleapis.com/token)
       *   3. The tokens stay on the server — only a session cookie
       *      (encrypted JWT) is sent to the browser
       */
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // ── Debug ───────────────────────────────────────────────────
  // Set to `true` to print detailed auth logs to the server console.
  // Extremely helpful when debugging callback URLs, token exchanges,
  // and JWT contents.  Turn off before deploying.
  debug: process.env.NODE_ENV === "development",
});
