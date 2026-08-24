# Design Tokens — oauth-demo

## Concept: "Warm Ink on Parchment"

This app avoids every generic AI-template tell. No blue-to-purple gradients, no Inter everywhere, no `rounded-full` on every button, no default Tailwind palette.

Instead: a warm, editorial feel — like a well-designed product onboarding, not a SaaS template.

---

## Typography

| Role | Font | Why |
|------|------|-----|
| **Display** (headings) | Source Serif 4 | A modern transitional serif by Frank Grießhammer (Adobe). Variable-weight, optical sizing. Gives headings editorial warmth — immediately signals "this isn't another geometric-sans AI app." |
| **Body** | Inter Tight | Not plain Inter. The condensed variant reads crisper at small sizes and has a distinct rhythm. The tight tracking contrasts naturally against the wider serif. |
| **Mono** (code) | JetBrains Mono | Purpose-built for code. Ligatures, distinct 0/O/l/1. Only used for technical labels and code blocks. |

### Type Scale

All sizes are explicitly defined — not Tailwind defaults:

| Token | Size | Line Height | Use |
|-------|------|-------------|-----|
| `2xs` | 11px | 16px | Fine print, legal |
| `xs` | 12px | 18px | Labels, badges |
| `sm` | 13px | 20px | Captions, metadata |
| `base` | 15px | 24px | Body text |
| `md` | 16px | 24px | Emphasized body |
| `lg` | 18px | 26px | Lead paragraphs |
| `xl` | 21px | 28px | Section subheadings |
| `2xl` | 26px | 32px | Card titles |
| `3xl` | 34px | 40px | Page headings |
| `4xl` | 44px | 48px | Hero headings |
| `5xl` | 56px | 60px | Display text |

Headings (`h1`–`h4`) default to the serif display font and tight letter-spacing (`-0.01em` to `-0.025em`) — this creates clear hierarchy without needing size alone.

---

## Color Palette

### Light Theme

```
Surface (backgrounds)
├── surface         #f6f4f0   Warm parchment — main bg
├── surface-raised  #ffffff   Cards, modals — true white for lift
├── surface-sunken  #edeae4   Inset areas, code blocks
└── surface-overlay rgba(246,244,240,0.88)

Ink (text hierarchy)
├── ink             #1a1816   Primary — almost-black with warmth
├── ink-muted       #5c564e   Secondary — captions, metadata
├── ink-faint       #9e968b   Tertiary — placeholders, disabled
└── ink-inverse     #f6f4f0   Text on dark/accent backgrounds

Accent — Deep Teal
├── accent          #1a7a6d   Primary actions, links, focus rings
├── accent-hover    #145f55   Darkened for hover
└── accent-subtle   #e6f5f2   Tinted backgrounds, tags

Semantic
├── danger          #c4342d / #fdf0ef
├── success         #2d8659 / #ecf7f1
└── warning         #b8860b / #fdf8eb

Borders
├── edge            #dfd9d0   Default — warm, not gray
└── edge-strong     #c7bfb3   Emphasized dividers
```

### Dark Theme

Same hue families, inverted lightness. Accent shifts to `#3bbfa8` (brighter teal) for contrast on dark surfaces. Shadows use warm-tinted rgba — never blue-gray.

### Why These Colors?

- **Neutrals are warm** (stone/sand). Most AI demos use `gray-50` through `gray-900` which reads cold and generic. Warm neutrals feel intentional.
- **Accent is teal-green** (`#1a7a6d`). Uncommon in the AI-demo space. It's confident without being loud. Pairs naturally with warm stone tones.
- **No purple, no blue.** These are the two most overused AI app colors. Deliberately avoided.
- **Semantic colors are muted.** `#c4342d` for danger is a brick red, not the default `red-600`. It matches the warm palette.

---

## Border Radius

Intentionally varied — not `rounded-full` on everything:

| Token | Value | Use Case |
|-------|-------|----------|
| `none` | 0 | — |
| `sharp` | 2px | Structural: table cells, toolbar segments |
| `sm` | 4px | Subtle: code blocks, small chips |
| `DEFAULT` | 6px | Standard: inputs, text fields |
| `md` | 10px | Cards, panels, dropdowns |
| `lg` | 14px | Buttons, larger interactive elements |
| `xl` | 20px | Dialogs, feature cards |
| `pill` | 9999px | **Only** for badges and tags |
| `full` | 9999px | **Only** for avatars |

> [!IMPORTANT]
> General buttons use `rounded-lg` (14px), NOT `rounded-full`. The pill shape is reserved for small status indicators where it's semantically natural.

---

## Shadows

Three levels only. All warm-tinted (`rgba(26, 24, 22, ...)` — the warm ink color, not default gray):

| Token | Purpose |
|-------|---------|
| `shadow-soft` | Barely-there — default card resting state. Most cards don't even need this. |
| `shadow-lift` | Hover state, active cards, floating elements |
| `shadow-heavy` | Modals, dialogs — used sparingly |

> [!TIP]
> Shadows are NOT applied to every card by default. The `.card` class in globals.css uses a border — shadow is added intentionally on hover or for floating elements.

---

## Spacing Extensions

Beyond Tailwind's 0–96 defaults, these layout-level tokens are available:

| Token | Value | Typical Use |
|-------|-------|-------------|
| `4.5` | 18px | Between-component padding |
| `13` | 52px | Section inner padding |
| `15` | 60px | Section outer padding |
| `18` | 72px | Large section gaps |
| `22` | 88px | Page-level vertical rhythm |
| `30` | 120px | Hero height units |
| `88` | 352px | Card widths |
| `128` | 512px | Narrow content max-width |
| `144` | 576px | Medium content max-width |
| `192` | 768px | Wide content max-width |

---

## Transitions

| Token | Duration | Use |
|-------|----------|-----|
| `duration-150` | 150ms | Micro: hover color shifts |
| `duration-250` | 250ms | Standard: button press, toggle |
| `duration-400` | 400ms | Larger: panel slide, drawer |
| `ease-snappy` | `cubic-bezier(0.2, 0, 0, 1)` | Quick acceleration, gentle stop |
| `ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard Material-style ease |

---

## Files

| File | What It Defines |
|------|-----------------|
| [globals.css](file:///c:/Users/VILSEESHANDILYA/OneDrive/Desktop/oauth/app/globals.css) | CSS custom properties (light + dark), base resets, `.card` component |
| [tailwind.config.ts](file:///c:/Users/VILSEESHANDILYA/OneDrive/Desktop/oauth/tailwind.config.ts) | Tailwind token mapping, type scale, radius, spacing, shadows, transitions |
| [layout.tsx](file:///c:/Users/VILSEESHANDILYA/OneDrive/Desktop/oauth/app/layout.tsx) | Font loading via `next/font/google`, CSS variable binding |
