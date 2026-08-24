import dynamic from "next/dynamic";
import { GoogleSignInButton } from "@/components/sign-in-button";

/**
 * Dynamic import — BrokenByDesign uses browser-only APIs.
 * Disabling SSR gates hydration mismatches.
 */
const BrokenByDesign = dynamic(
  () => import("@/components/ui/broken-by-design"),
  { ssr: false }
);

interface HomeProps {
  searchParams?: {
    error?: string;
  };
}

/**
 * Returns a specific, non-dramatic plain-language message for NextAuth error query keys.
 */
function getErrorMessage(errorType: string): string {
  switch (errorType) {
    case "AccessDenied":
      return "Access was denied by the identity provider or the request was canceled.";
    case "Configuration":
      return "There is a configuration issue with the server authentication settings.";
    case "Verification":
      return "The verification link has expired or has already been used.";
    default:
      return "An authentication error occurred. Please try signing in again.";
  }
}

export default function Home({ searchParams }: HomeProps) {
  const errorCode = searchParams?.error;

  return (
    <main className="relative h-screen overflow-hidden bg-[#030407]">
      {/* ── Visual backdrop ────────────────────────────────── */}
      <div className="absolute inset-0">
        <BrokenByDesign
          title="oauth"
          height="100%"
          sound={false}
          interactive={true}
        />
      </div>

      {/* ── Content overlay ────────────────────────────────── */}
      <div className="relative z-10 pointer-events-none flex h-full flex-col justify-end">
        <div className="pointer-events-auto p-6 pb-14 sm:p-10 sm:pb-20 lg:pl-16 lg:pb-24 max-w-xl">
          
          {/* Error Callout Banner — styled specifically for the dark hero */}
          {errorCode && (
            <div className="mb-6 flex gap-3 bg-[#2e1412] border border-[#e85d56]/20 text-[#e85d56] px-4 py-3 rounded-md text-xs font-mono leading-relaxed animate-slide-up">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 shrink-0 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <span className="font-semibold block mb-0.5 uppercase tracking-wide">
                  Handshake failed [{errorCode}]
                </span>
                {getErrorMessage(errorCode)}
              </div>
            </div>
          )}

          {/* Heading — serif display font, tight tracking */}
          <h1 className="font-display text-[1.75rem] sm:text-[2.125rem] lg:text-[2.75rem] text-[#ede9e3] tracking-tight leading-[1.15] mb-3">
            OAuth, from redirect{" "}
            <span className="text-[#3bbfa8]">to session.</span>
          </h1>

          {/* Description — one direct sentence, no marketing filler */}
          <p className="text-[0.9375rem] text-[#a09889] mb-8 max-w-sm leading-relaxed">
            A working demo of Google&apos;s authorization code flow.
            Sign in, then inspect the handshake on your profile.
          </p>

          {/* Single CTA */}
          <GoogleSignInButton />
        </div>
      </div>
    </main>
  );
}
