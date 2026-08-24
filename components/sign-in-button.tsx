"use client";

import { signIn } from "next-auth/react";

/**
 * Google Sign-In button — client component.
 *
 * Calls `signIn("google")` from next-auth/react, which:
 * 1. Redirects the browser to /api/auth/signin/google
 * 2. Auth.js builds the Google authorization URL with the configured
 *    client_id, redirect_uri, response_type=code, scope, etc.
 * 3. Browser redirects to Google's consent screen
 * 4. On approval, Google redirects back to /api/auth/callback/google
 *    with the authorization code
 *
 * `callbackUrl: "/profile"` tells Auth.js where to send the user
 * AFTER the token exchange and session creation are complete.
 */
export function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/profile" })}
      className="
        group inline-flex items-center gap-3
        bg-[#f6f4f0] text-[#1a1816]
        pl-4 pr-5 py-3
        rounded-lg
        text-sm font-medium tracking-wide
        transition-all duration-150 ease-[cubic-bezier(0.2,0,0,1)]
        hover:bg-white hover:shadow-[0_2px_12px_-2px_rgba(246,244,240,0.25)]
        active:scale-[0.98] active:bg-[#edeae4]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3bbfa8]
      "
    >
      {/* Official Google "G" logo — using brand-approved SVG paths and colors */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
}
