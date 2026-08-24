import type { Metadata } from "next";
import { Source_Serif_4, Inter_Tight, JetBrains_Mono } from "next/font/google";
import AuthSessionProvider from "@/components/auth-session-provider";
import "./globals.css";

/**
 * FONT PAIRING RATIONALE
 *
 * Display: Source Serif 4
 *   A modern transitional serif with optical sizing and variable weight.
 *   Gives headings warmth and editorial authority — immediately breaks
 *   the "every AI app uses Inter" look.  The 4 in the name = 4th revision
 *   by Frank Grießhammer at Adobe, with tighter spacing than Source Serif Pro.
 *
 * Body: Inter Tight
 *   Not plain Inter — Inter Tight is a condensed variant that reads
 *   crisper at small sizes and has a more distinct personality than
 *   standard Inter.  The tighter letter-spacing pairs well against
 *   a wider serif like Source Serif.
 *
 * Mono: JetBrains Mono
 *   Designed for code.  Ligatures, distinct 0/O/l/1 glyphs.
 *   Used only for code snippets and technical labels.
 */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "oauth-demo",
  description: "OAuth authentication demo built with Next.js and Auth.js",
};

/**
 * Root Layout — Server Component.
 *
 * Wraps the entire app in `<AuthSessionProvider>` so that any client
 * component anywhere in the tree can call `useSession()` to read the
 * current authentication state.
 *
 * The layout itself remains a Server Component (no "use client" here).
 * Only the AuthSessionProvider is a client component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
      >
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
