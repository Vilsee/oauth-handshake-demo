"use client";

import { signOut } from "next-auth/react";

/**
 * Sign-out button component.
 *
 * Calls NextAuth's `signOut` action to clear the encrypted JWT cookie.
 * Upon completion, it redirects the user back to the home page ("/").
 * Styled to look secondary/quiet as it is not the primary action of the page.
 */
export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="
        text-xs font-mono uppercase tracking-wider text-ink-muted
        hover:text-danger hover:border-danger/30
        border border-edge-strong bg-surface-sunken
        px-3 py-1.5 rounded-sm
        transition-all duration-150 ease-snappy
        active:scale-[0.98]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger
      "
    >
      Disconnect Session
    </button>
  );
}
