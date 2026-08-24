import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /* ──────────────────────────────────────────────────────────
     * TYPE SCALE
     * ──────────────────────────────────────────────────────────
     * Explicit scale — no Tailwind defaults.  Each step has a
     * tuned line-height for its intended use case.
     *
     * Naming: size name → [fontSize, { lineHeight, letterSpacing? }]
     * ────────────────────────────────────────────────────────── */
    fontSize: {
      "2xs":     ["0.6875rem",  { lineHeight: "1rem" }],               // 11px — fine print
      "xs":      ["0.75rem",    { lineHeight: "1.125rem" }],            // 12px — labels, badges
      "sm":      ["0.8125rem",  { lineHeight: "1.25rem" }],             // 13px — captions
      "base":    ["0.9375rem",  { lineHeight: "1.5rem" }],              // 15px — body text
      "md":      ["1rem",       { lineHeight: "1.5rem" }],              // 16px — body emphasis
      "lg":      ["1.125rem",   { lineHeight: "1.625rem" }],            // 18px — lead text
      "xl":      ["1.3125rem",  { lineHeight: "1.75rem" }],             // 21px — section headers
      "2xl":     ["1.625rem",   { lineHeight: "2rem", letterSpacing: "-0.01em" }],        // 26px — card titles
      "3xl":     ["2.125rem",   { lineHeight: "2.5rem", letterSpacing: "-0.015em" }],     // 34px — page headings
      "4xl":     ["2.75rem",    { lineHeight: "3rem", letterSpacing: "-0.02em" }],         // 44px — hero headings
      "5xl":     ["3.5rem",     { lineHeight: "3.75rem", letterSpacing: "-0.025em" }],     // 56px — display
    },

    /* ──────────────────────────────────────────────────────────
     * BORDER RADIUS
     * ──────────────────────────────────────────────────────────
     * Intentional variation:
     *   - `none` / `sharp` → structural elements (containers, sections)
     *   - `DEFAULT` / `md` → cards, inputs
     *   - `lg` → buttons, interactive targets
     *   - `pill` → only for badges or tags where it's semantically natural
     * ────────────────────────────────────────────────────────── */
    borderRadius: {
      none:    "0",
      sharp:   "2px",        // Structural: table cells, toolbar segments
      sm:      "4px",        // Subtle: code blocks, small chips
      DEFAULT: "6px",        // Standard: inputs, text fields
      md:      "10px",       // Cards, panels, dropdowns
      lg:      "14px",       // Buttons, larger interactive elements
      xl:      "20px",       // Dialog windows, feature cards
      pill:    "9999px",     // Badges, tags — not for general buttons
      full:    "9999px",     // Avatars
    },

    extend: {
      /* ────────────────────────────────────────────────────────
       * COLOR TOKENS
       * ────────────────────────────────────────────────────────
       * All colors are CSS custom properties from globals.css.
       * This means themes (dark mode) swap automatically with
       * no Tailwind class changes needed.
       * ──────────────────────────────────────────────────────── */
      colors: {
        surface: {
          DEFAULT: "var(--surface)",
          raised:  "var(--surface-raised)",
          sunken:  "var(--surface-sunken)",
          overlay: "var(--surface-overlay)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted:   "var(--ink-muted)",
          faint:   "var(--ink-faint)",
          inverse: "var(--ink-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover:   "var(--accent-hover)",
          subtle:  "var(--accent-subtle)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          subtle:  "var(--danger-subtle)",
        },
        success: {
          DEFAULT: "var(--success)",
          subtle:  "var(--success-subtle)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          subtle:  "var(--warning-subtle)",
        },
        edge: {
          DEFAULT: "var(--edge)",
          strong:  "var(--edge-strong)",
        },
      },

      /* ────────────────────────────────────────────────────────
       * FONT FAMILIES
       * ──────────────────────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },

      /* ────────────────────────────────────────────────────────
       * SPACING EXTENSIONS
       * ────────────────────────────────────────────────────────
       * Tailwind's default 0–96 scale is fine for most cases.
       * These extensions add larger layout-level values.
       * ──────────────────────────────────────────────────────── */
      spacing: {
        "4.5": "1.125rem",   // 18px — between base and lg padding
        "13":  "3.25rem",    // 52px — section inner padding
        "15":  "3.75rem",    // 60px — section outer padding
        "18":  "4.5rem",     // 72px — generous section gaps
        "22":  "5.5rem",     // 88px — page-level vertical rhythm
        "30":  "7.5rem",     // 120px — hero/section height units
        "88":  "22rem",      // 352px — card widths
        "128": "32rem",      // 512px — max content width (narrow)
        "144": "36rem",      // 576px — max content width (medium)
        "192": "48rem",      // 768px — max content width (wide)
      },

      /* ────────────────────────────────────────────────────────
       * SHADOWS
       * ────────────────────────────────────────────────────────
       * Three levels only.  All warm-tinted (brown-black, not
       * blue-gray).  Used with restraint — not on every card.
       * ──────────────────────────────────────────────────────── */
      boxShadow: {
        soft:  "0 1px 2px 0 rgba(26, 24, 22, 0.04)",
        lift:  "0 4px 12px -2px rgba(26, 24, 22, 0.08), 0 1px 3px -1px rgba(26, 24, 22, 0.04)",
        heavy: "0 12px 36px -8px rgba(26, 24, 22, 0.14), 0 4px 12px -4px rgba(26, 24, 22, 0.06)",
      },

      /* ────────────────────────────────────────────────────────
       * TRANSITIONS
       * ──────────────────────────────────────────────────────── */
      transitionDuration: {
        "0":   "0ms",
        "150": "150ms",     // Micro-interactions (hover color shifts)
        "250": "250ms",     // Standard (button press, toggle)
        "400": "400ms",     // Larger transitions (panel slide)
      },
      transitionTimingFunction: {
        "snappy": "cubic-bezier(0.2, 0, 0, 1)",   // Quick in, gentle out
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",  // Material-style
      },

      /* ────────────────────────────────────────────────────────
       * ANIMATIONS — only purposeful motion
       * ──────────────────────────────────────────────────────── */
      animation: {
        "fade-in":  "fadeIn 0.25s ease-out",
        "slide-up": "slideUp 0.3s cubic-bezier(0.2, 0, 0, 1)",
        "spinner":  "spin 0.8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
