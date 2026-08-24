/**
 * Loading page for the /profile route.
 * ──────────────────────────────────────
 * In Next.js App Router, placing a `loading.tsx` file inside a route
 * segment automatically wraps the page component in a React Suspense
 * boundary.
 *
 * This renders instantly on navigation while the server checks the
 * session via auth() and prepares the server component payload.
 *
 * DESIGN:
 * Matches the layout structure of profile/page.tsx (asymmetric header,
 * two-column grid) using quiet skeletons and a custom branded spinner.
 */
export default function ProfileLoading() {
  return (
    <main className="min-h-screen bg-surface px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-4xl opacity-60">
        
        {/* ── Header Skeleton ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-18 pb-8 border-b border-edge">
          <div className="max-w-xl w-full">
            <div className="flex items-center gap-3 mb-4">
              {/* Spinning accent loader */}
              <div className="w-3.5 h-3.5 border-2 border-accent/20 border-t-accent rounded-full animate-spinner" />
              <span className="font-mono text-2xs uppercase tracking-widest text-accent font-semibold">
                Authenticating session...
              </span>
            </div>
            
            <div className="h-8 bg-edge rounded-sharp w-2/3 mb-4" />
            <div className="space-y-2">
              <div className="h-3.5 bg-edge rounded-sharp w-full" />
              <div className="h-3.5 bg-edge rounded-sharp w-5/6" />
            </div>
          </div>

          {/* 3D Visual Box placeholder */}
          <div className="w-48 h-48 bg-surface-sunken border border-edge rounded-lg shrink-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-edge-strong border-t-ink-muted rounded-full animate-spinner" />
          </div>
        </div>

        {/* ── Two-Column Grid Skeleton ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Card Skeleton */}
          <div className="lg:col-span-5 bg-surface-raised border border-edge rounded-md p-6 relative">
            {/* Avatar Circle skeleton */}
            <div className="absolute -top-6 left-6 w-14 h-14 rounded-full bg-surface-sunken border border-edge-strong shadow-soft" />

            <div className="pt-8 space-y-6">
              <div>
                <div className="h-2 bg-edge rounded-sharp w-1/4 mb-2" />
                <div className="h-4 bg-edge rounded-sharp w-3/4" />
              </div>

              <div>
                <div className="h-2 bg-edge rounded-sharp w-1/3 mb-2" />
                <div className="h-4 bg-edge rounded-sharp w-5/6" />
              </div>

              <div>
                <div className="h-2 bg-edge rounded-sharp w-1/2 mb-2" />
                <div className="h-4 bg-edge rounded-sharp w-1/3" />
              </div>
            </div>
          </div>

          {/* Code Inspection Panel Skeleton */}
          <div className="lg:col-span-7 bg-surface-sunken border border-edge rounded-md p-6 space-y-4">
            <div className="h-4 bg-edge rounded-sharp w-1/3" />
            <div className="h-3 bg-edge rounded-sharp w-2/3" />
            <div className="h-32 bg-surface-raised border border-edge rounded-sm w-full" />
          </div>

        </div>

      </div>
    </main>
  );
}
