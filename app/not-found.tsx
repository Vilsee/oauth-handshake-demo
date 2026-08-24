import Link from "next/link";

/**
 * Custom 404 Page — matches the design tokens.
 *
 * Placed in app/not-found.tsx to automatically catch all unmatched paths.
 * Editorial typography, clean spacing, and a quiet back-to-safety link.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface px-6 py-24 flex items-center justify-center animate-fade-in">
      <div className="max-w-md w-full border border-edge bg-surface-raised p-8 sm:p-12 rounded-xl shadow-soft">
        
        {/* Typographic Layout */}
        <span className="font-mono text-2xs uppercase tracking-widest text-accent font-semibold mb-3 block">
          Error 404
        </span>
        
        <h1 className="font-display text-3xl tracking-tight leading-none mb-4">
          Page not found.
        </h1>
        
        <p className="text-sm text-ink-muted leading-relaxed mb-8">
          The requested URL does not exist or has been moved to a different path.
        </p>

        {/* Back Link — styled with accent tokens */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            bg-accent text-ink-inverse hover:bg-accent-hover
            px-4 py-2.5 rounded-lg
            text-sm font-medium tracking-wide
            transition-colors duration-150 ease-snappy
            active:scale-[0.98]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
          "
        >
          <span>Return home</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.22 5.03a.75.75 0 111.06-1.06l5.5 5.5a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 11-1.06-1.06l4.168-4.168H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

      </div>
    </main>
  );
}
