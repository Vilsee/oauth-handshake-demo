import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { ShaderBackground } from "@/components/ui/black-red-white";

/**
 * Profile Page — Protected Server Component.
 *
 * 1. Checks session server-side using Auth.js `auth()`.
 * 2. Redirects to "/" if unauthenticated (middleware also handles this,
 *    but a hard server check here provides double protection).
 * 3. Renders user details matching the warm parchment design system.
 * 4. Integrates the 21st.dev WebGL ShaderBackground in the 200x200px slot.
 */
export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const { name, email, image, id } = session.user;

  return (
    <main className="min-h-screen bg-surface px-6 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24 animate-fade-in">
      <div className="mx-auto max-w-4xl">
        
        {/* ── Asymmetric Header Layout ────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-18 pb-8 border-b border-edge">
          <div className="max-w-xl">
            <span className="font-mono text-2xs uppercase tracking-widest text-accent font-semibold mb-2 block">
              Secure Session Established
            </span>
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight leading-none mb-4">
              Authenticated Profile
            </h1>
            <p className="text-sm text-ink-muted leading-relaxed">
              Google OAuth 2.0 authorization code flow completed. Below is the token payload and session state mapped directly from the provider callbacks.
            </p>
          </div>

          {/* ── 21st.dev WebGL Shader Accent (SPLINE SLOT replacement) ── */}
          <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-edge shadow-soft shrink-0">
            <ShaderBackground className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-wider text-white/80">
              Entropy key
            </span>
          </div>
        </div>

        {/* ── Profile Details Section ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* User Card with offset avatar (asymmetric) */}
          <div className="lg:col-span-5 bg-surface-raised border border-edge rounded-md p-6 relative">
            
            {/* Offset Avatar Placement */}
            <div className="absolute -top-6 left-6 flex items-center justify-center">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={name || "User Avatar"}
                  className="w-14 h-14 rounded-full border border-edge-strong bg-surface shadow-soft"
                />
              ) : (
                <div className="w-14 h-14 rounded-full border border-edge-strong bg-accent-subtle text-accent flex items-center justify-center font-display text-xl font-bold">
                  {name ? name.charAt(0) : "U"}
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="pt-8">
              <span className="font-mono text-2xs text-ink-faint block uppercase tracking-wider mb-1">
                Name Claim
              </span>
              <h2 className="font-display text-xl leading-tight text-ink mb-4">
                {name || "Anonymous User"}
              </h2>

              <span className="font-mono text-2xs text-ink-faint block uppercase tracking-wider mb-1">
                Email Address
              </span>
              <p className="text-sm text-ink mb-6 break-all font-medium">
                {email}
              </p>

              {id && (
                <>
                  <span className="font-mono text-2xs text-ink-faint block uppercase tracking-wider mb-1">
                    Google Identity ID (sub)
                  </span>
                  <p className="font-mono text-xs text-ink bg-surface-sunken p-2 rounded-sm mb-8 break-all border border-edge">
                    {id}
                  </p>
                </>
              )}

              {/* Quiet Sign Out CTA */}
              <div className="pt-4 border-t border-edge flex items-center justify-between">
                <span className="text-2xs text-ink-faint font-mono">
                  State: authenticated
                </span>
                <SignOutButton />
              </div>
            </div>

          </div>

          {/* Session Debug/Inspection Panel */}
          <div className="lg:col-span-7 bg-surface-sunken border border-edge rounded-md p-6">
            <h3 className="font-display text-md text-ink mb-2">
              Session Handshake Payload
            </h3>
            <p className="text-xs text-ink-muted mb-4">
              Auth.js session schema decrypted and verified on the server.
            </p>
            
            <pre className="font-mono text-xs text-ink-muted bg-surface-raised border border-edge p-4 rounded-sm overflow-x-auto">
              {JSON.stringify(
                {
                  expires: session.expires,
                  user: {
                    name,
                    email,
                    image,
                    id,
                  },
                },
                null,
                2
              )}
            </pre>

            <div className="mt-4 flex items-center gap-2 text-2xs text-success bg-success-subtle border border-success/15 px-3 py-2 rounded-sm">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-success shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.8-10.3a1 1 0 011.4 1.4l-4.5 4.5a1 1 0 01-1.4 0l-2-2a1 1 0 011.4-1.4l1.3 1.3 3.8-3.8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>JWT session cookie verified by Next.js Edge Middleware.</span>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
