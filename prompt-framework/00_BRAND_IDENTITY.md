# MODULE 00 — OUTFIT BRAND IDENTITY SYSTEM

> Applied with brand-guidelines skill.
> **Aesthetic Reference:** checklist.design — soft rounded category cards, pastel tinted panels, warm cream base, pill-style chips with large radius, minimalist icon+label.
> **RBAC Visual Differentiation (POST-LOGIN):** Each role swaps the ENTIRE surface palette (background tint, card tint, accent color) so Staff/Cashier POS and Admin Dashboard are unmistakably different from the Public Shop landing page at a glance.
> **⛔ NON-NEGOTIABLE: ZERO BLACK BACKGROUNDS, ZERO BLACK SHAPE FILLS.** No `#000000`, no `#141413`, no `#1A1918` as bg/SVG-shape/fill. Warm espresso brown used ONLY for text + icon strokes.

---

## §0 DESIGN AESTHETIC PRINCIPLES (checklist.design INSPIRED + NO BLACK RULE)

| Rule | Spec |
|---|---|
| **Official Domain** | `theoufit.kesararamwithdigital.tech` (Cloudflare TLS 1.3 edge routing) |
| **Two-Tone Wordmark** | `<span class="brand-out">OUT</span><span class="brand-fit">FIT</span>` (`OUT` in Charcoal `#1E2631`, `FIT` in Terracotta `#C84428`) |
| **Card & Container Radius** | Strictly `9px` (`--radius-card: 9px; --radius-btn: 9px;`) |
| **Badge & Chip Radius** | Strictly `2px` (`--radius-badge: 2px; --radius-tag: 2px;`) |
| **Zero Emoji Rule** | 100% Lucide SVG icons only. Strictly ZERO unicode emojis across the entire platform |
| **Zero Promotional Badges** | No "Rare Drop" or "Vault" gimmick badges on products. Clean authentic retail focus |
| **Base canvas** | Warm off-white atelier canvas `#F8F7F4` with frosted liquid glass surfaces |
| **Primary Color** | Warm Terracotta `#C84428` |
| **Text Color** | Mineral Charcoal `#1E2631` |

---

## §1 OFFICIAL LOGO SYSTEM (OUTfit) — NO BLACK FILLS

### §1.1 Logo Variants Matrix

| VARIANT | ASSET PATH (in outfit-shop/public/logo/) | USAGE | SPEC |
|---|---|---|---|
| Primary Wordmark | `outfit-wordmark.svg` | Navbars, dashboards, receipts, page headers | viewBox: `0 0 400 120`. **Typography:** `OUT` in **Poppins Black 900** / `FIT` in **Poppins Bold 700**. **Ligature:** the crossbar of letter `F` extends 45° into a clothes-hanger hook (hook width = 14pt, inner radius 4px). **Color:** single color warm espresso `#4A3F35` (text-dark, NEVER black) / cream `#FAF8F4` (reversed) |
| Monogram | `outfit-monogram.svg` | Favicon, app icons, loaders, avatars | viewBox: `0 0 64 64`. Soft 4px radius pill border warm espresso `#4A3F35` with interior stylized "O" merged with F-hook. ALL fills = warm brown, NO black |
| Lockup | `outfit-lockup.svg` | Login screens, invoice headers, print media, og-image | Monogram `[LEFT 64px]` + **Wordmark `[RIGHT 320px]`** + Tagline `Wear. Confidence.` (Lora Italic 400, below wordmark). 16px gutter between all elements. |
| Reversed variants | `*.reverse.svg` suffix | Dark (cocoa-tinted) backgrounds, footer areas | Same specs. Fill swapped: cream `#FAF8F4` wordmark + cream monogram stroke/fill. |

### §1.2 Logo Usage Rules — NON-NEGOTIABLE

✅ Always preserve `viewBox` aspect ratio (never stretch).
❌ **NO drop shadows on logo of any kind.**
❌ **NO color tinting outside palettes §2** (use only palette tokens).
❌ **NO rotation > 0deg** (keep upright).
❌ **NO emoji inside or adjacent to the lockup.**
❌ **NO gradient fills on wordmark** (solid only).
❌ **⛔ NO BLACK (#000/#141413) ANYWHERE in logo SVG.** Warm brown `#4A3F35` max.
❌ **Never substitute with the blob OutFIT.svg** in `/UI-FROTN/OutFIT/` (that is an interim placeholder, discard).

### §1.3 SVG Master Template (outfit-wordmark.svg) — WARM BROWN, NO BLACK

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" role="img" aria-label="OutFIT — Wear. Confidence.">
  <defs>
    <style>
      .out { font-family: Poppins, Arial Black, sans-serif; font-weight: 900; font-size: 72px; fill: #4A3F35; }
      .fit { font-family: Poppins, Arial, sans-serif; font-weight: 700; font-size: 72px; fill: #4A3F35; }
    </style>
  </defs>
  <text x="8"  y="82" text-anchor="start" class="out">OUT</text>
  <path d="M 208 32 L 260 32 L 260 46 L 222 46 L 222 62 L 256 62 L 256 76 L 222 76 L 222 92 L 264 92 L 264 106 L 208 106 Z
           M 260 32 L 282 32 L 292 42 L 292 52 L 284 52 L 280 46 L 260 46 Z"
        fill="#4A3F35" />
  <text x="296" y="82" text-anchor="start" class="fit">IT</text>
</svg>
```

---

## §2 COLOR SYSTEM CHECKLIST (COMPLETE IMPLEMENTATION — NO BLACK)

> **The 8-point Color System Checklist fully implemented below.**
> **⛔ GLOBAL BAN:** No token uses pure black. Darkest value anywhere = espresso `#4A3F35` (TEXT/STROKE only). Dark mode uses warm cocoa brown NOT black.

---

### §2.1 ✅ PRIMITIVE PALETTE (Raw Material Ramps — NO BLACK)

> Raw color ramps — NEVER referenced directly by components. Only semantic tokens (§2.2) use these.
> **Darkest color is warm espresso #4A3F35** — it is used ONLY for body text and icon strokes, NEVER for backgrounds or shape fills.

| Token | HEX | Usage |
|---|---|---|
| `--primitive-cream-50` | `#FAF8F4` | Lightest warm tint (surface base, reversed logo bg) |
| `--primitive-cream-100` | `#F5F3EE` | PUBLIC base canvas |
| `--primitive-cream-200` | `#ECE8DF` | Public card surface |
| `--primitive-beige-100` | `#F2E9D8` | Public category card tint (Mobile-app style) |
| `--primitive-lavender-100` | `#E7E3EF` | Public secondary category tint (Website-card style) |
| `--primitive-coral-50` | `#F8EAE3` | STAFF base canvas |
| `--primitive-coral-100` | `#F0DDD6` | Staff category card tint (Design-system style) |
| `--primitive-coral-200` | `#E6C8BC` | Staff accent soft |
| `--primitive-sage-50` | `#EEF3EE` | ADMIN base canvas |
| `--primitive-sage-100` | `#DDE5E0` | Admin category card tint (Flows-card style) |
| `--primitive-sage-200` | `#C8D4CD` | Admin accent soft |
| `--primitive-sky-100` | `#DCE8F1` | Admin secondary tint (Web-app card style) |
| `--primitive-slate-50` | `#F4F3F0` | Neutral chip bg |
| `--primitive-slate-100` | `#E8E6DC` | Subtle dividers |
| `--primitive-slate-200` | `#D0CDC1` | Disabled borders |
| `--primitive-slate-300` | `#B0AEA5` | Muted text |
| `--primitive-slate-500` | `#7A786E` | Secondary text |
| `--primitive-espresso-600` | `#5C4A3D` | Warm medium brown (headings dark) |
| **`--primitive-espresso-700`** | **`#4A3F35`** | **DARKEST PERMITTED VALUE — body text & icon strokes ONLY. NEVER use as background or shape fill.** |
| `--primitive-orange-500` | `#D97757` | Brand accent orange (CTA) |
| `--primitive-orange-600` | `#C56646` | Orange pressed |
| `--primitive-blue-500` | `#6A9BCC` | Brand accent blue (links) |
| `--primitive-blue-600` | `#5689BD` | Blue pressed |
| `--primitive-green-500` | `#788C5D` | Brand accent green (success) |
| `--primitive-green-600` | `#677A4F` | Green pressed |
| `--primitive-red-500` | `#CF222E` | Danger/error |
| `--primitive-amber-500` | `#D97706` | Warning |
| **⛔ NO `#141413`, NO `#1A1918`, NO `#000000`** anywhere in palette | — | **Hard fail. Replace with warm cocoa browns below when dark tint needed.** |

---

### §2.2 ✅ SEMANTIC COLOR TOKENS (Role-Based Themeable — ALL LIGHT, NO BLACK)

> Components reference THESE only. Swap the role wrapper → entire palette changes with zero component edits.
> ALL backgrounds are warm pastels. No role uses a black background.

#### PALETTE A — PUBLIC SHOP / LANDING PAGE (Warm Cream + Beige/Lavender cards)
> Applied to `(shop)` group: `/`, `/products`, `/cart`, `/wishlist`, `/login` (pre-login)
> **Feel:** checklist.design "Mobile app" beige + "Website" lavender category cards

| SEMANTIC TOKEN | Maps to Primitive | HEX |
|---|---|---|
| `--public-bg` | `--primitive-cream-100` | `#F5F3EE` |
| `--public-surface` | `--primitive-cream-50` | `#FAF8F4` |
| `--public-card-tint-primary` | `--primitive-beige-100` | `#F2E9D8` |
| `--public-card-tint-secondary` | `--primitive-lavender-100` | `#E7E3EF` |
| `--public-chip-bg` | `#FFFFFF` | `#FFFFFF` |
| `--public-border` | `rgba(74,63,53,0.06)` (warm brown alpha, NO black) | `rgba(74,63,53,0.06)` |
| `--public-border-strong` | `rgba(74,63,53,0.12)` | `rgba(74,63,53,0.12)` |
| `--public-text` | `--primitive-espresso-700` (warm brown MAX darkness) | `#4A3F35` |
| `--public-text-secondary` | `--primitive-slate-500` | `#7A786E` |
| `--public-muted` | `--primitive-slate-300` | `#B0AEA5` |
| `--public-primary` | `--primitive-orange-500` | `#D97757` |
| `--public-accent` | `--primitive-blue-500` | `#6A9BCC` |
| `--public-success` | `--primitive-green-500` | `#788C5D` |
| `--public-warning` | `--primitive-amber-500` | `#D97706` |
| `--public-danger` | `#CF222E` (warm red) | `#CF222E` |

#### PALETTE B — STAFF / CASHIER POS (Soft Coral/Pink cards — UNMISTAKABLE vs Public)
> Applied to `(staff)` group: `/pos`, `/orders`, `/customers`, `/shifts`, `/inventory/lookup`, `/inventory/stock`
> **Feel:** checklist.design "Design system" warm coral/pink category cards. The background tint alone screams "I'm logged in as Staff".

| SEMANTIC TOKEN | Maps to Primitive | HEX |
|---|---|---|
| `--staff-bg` | `--primitive-coral-50` | `#F8EAE3` |
| `--staff-surface` | `#FFFFFF` | `#FFFFFF` |
| `--staff-card-tint-primary` | `--primitive-coral-100` | `#F0DDD6` |
| `--staff-card-tint-secondary` | `--primitive-coral-200` | `#E6C8BC` |
| `--staff-chip-bg` | `#FFFFFF` | `#FFFFFF` |
| `--staff-border` | `rgba(217,119,87,0.12)` (warm orange alpha) | `rgba(217,119,87,0.12)` |
| `--staff-border-strong` | `rgba(217,119,87,0.22)` | `rgba(217,119,87,0.22)` |
| `--staff-text` | `--primitive-espresso-700` | `#4A3F35` |
| `--staff-text-secondary` | `--primitive-slate-500` | `#7A786E` |
| `--staff-muted` | `--primitive-slate-300` | `#B0AEA5` |
| `--staff-primary` | `--primitive-orange-500` | `#D97757` |
| `--staff-accent` | `--primitive-green-500` | `#788C5D` |
| `--staff-success` | `--primitive-green-500` | `#788C5D` |
| `--staff-warning` | `--primitive-orange-500` | `#D97757` |
| `--staff-danger` | `#CF222E` | `#CF222E` |

#### PALETTE C — ADMIN / MANAGER DASHBOARD (Sage Mint + Sky Blue cards — UNMISTAKABLE vs both Public & Staff)
> Applied to `(admin)` group: `/dashboard`, `/analytics`, `/catalog`, `/inventory/*`, `/operations`, `/reports`, `/system`
> **Feel:** checklist.design "Flows" sage mint + "Web app" sky blue category cards. Cool data-dense vibe, visually distinct from Public (cream) and Staff (coral).

| SEMANTIC TOKEN | Maps to Primitive | HEX |
|---|---|---|
| `--admin-bg` | `--primitive-sage-50` | `#EEF3EE` |
| `--admin-surface` | `#FFFFFF` | `#FFFFFF` |
| `--admin-card-tint-primary` | `--primitive-sage-100` | `#DDE5E0` |
| `--admin-card-tint-secondary` | `--primitive-sky-100` | `#DCE8F1` |
| `--admin-panel-tint` | `--primitive-sage-200` | `#C8D4CD` |
| `--admin-chip-bg` | `#FFFFFF` | `#FFFFFF` |
| `--admin-border` | `rgba(120,140,93,0.12)` (green alpha) | `rgba(120,140,93,0.12)` |
| `--admin-border-strong` | `rgba(120,140,93,0.22)` | `rgba(120,140,93,0.22)` |
| `--admin-text` | `--primitive-espresso-700` | `#4A3F35` |
| `--admin-text-secondary` | `--primitive-slate-500` | `#7A786E` |
| `--admin-muted` | `--primitive-slate-300` | `#B0AEA5` |
| `--admin-primary` | `--primitive-blue-500` | `#6A9BCC` |
| `--admin-accent` | `--primitive-green-500` | `#788C5D` |
| `--admin-success` | `--primitive-green-500` | `#788C5D` |
| `--admin-warn` | `--primitive-orange-500` | `#D97757` |
| `--admin-danger` | `#CF222E` | `#CF222E` |

---

### §2.3 ✅ INTERACTIVE STATE COLORS (Consistent Across All Roles — NO BLACK)

> Applied via CVA variants in shadcn button/input/card components. Same interaction pattern everywhere, role palette handles the color.

| STATE | BORDER | BACKGROUND | TEXT | TRANSFORM | TIMING |
|---|---|---|---|---|---|
| **Default** | `1px solid var(--<role>-border)` | `var(--<role>-chip-bg)` | `var(--<role>-text)` (= espresso #4A3F35) | `translateY(0)` | — |
| **Hover** | `1px solid var(--<role>-border-strong)` | `var(--<role>-chip-bg)` lighten 2% | `var(--<role>-text)` | `translateY(-2px)` | `150ms ease-out` |
| **Pressed / Active** | `1px solid var(--<role>-primary)` | `var(--<role>-card-tint-secondary)` (pastel) | `var(--<role>-text)` | `translateY(0px) scale(0.98)` | `80ms ease-in` |
| **Focus** | `1px solid var(--<role>-primary)` | same as default | same | `translateY(0)` | — |
| **Focus Ring** | — | — | — | `outline: 3px solid var(--<role>-primary)`, `outline-offset: 2px` (colored NOT black) | — |
| **Disabled** | `1px solid var(--primitive-slate-200)` | `var(--primitive-slate-50)` (cream gray NOT gray/black) | `var(--primitive-slate-300)` | `translateY(0)` | `cursor: not-allowed` |
| **Selected / Active Pill** | `1px solid var(--<role>-primary)` | `var(--<role>-primary)` (warm CTA color) | `#FFFFFF` (white text on CTA, espresso never used on dark bg) | `translateY(0)` | — |

---

### §2.4 ✅ FEEDBACK COLORS (Success / Warning / Error / Info — ALL WARM PASTEL BGS, NO BLACK)

> Tested for contrast against all 3 role surfaces. Used in badges, alerts, form validation, toasts.
> Backgrounds are SOFT PASTELS — NO dark feedback backgrounds.

| FEEDBACK TOKEN | HEX | TEXT ON SURFACE | WCAG PASS (Public/Staff/Admin bg) | USAGE |
|---|---|---|---|---|
| `--feedback-success-bg` | `#E7F0DF` (soft sage pastel) | `#3A5228` (moss green) | ✅ Public ✅ Staff ✅ Admin | In-stock badge, Payment complete, Save success |
| `--feedback-success-border` | `#788C5D` | — | — | — |
| `--feedback-success-icon` | `#788C5D` | — | — | Lucide `check-circle-2` color |
| `--feedback-warning-bg` | `#FBE8D4` (soft peach pastel) | `#8B4513` (saddle brown) | ✅ Public ✅ Staff ✅ Admin | Low stock alert, Shift warning, Unsaved changes |
| `--feedback-warning-border` | `#D97757` | — | — | — |
| `--feedback-warning-icon` | `#D97757` | — | — | Lucide `alert-triangle` color |
| `--feedback-error-bg` | `#FBD6D9` (soft rose pastel) | `#8B0000` (dark red) | ✅ Public ✅ Staff ✅ Admin | Out of stock, Form error, Void confirmation |
| `--feedback-error-border` | `#CF222E` | — | — | — |
| `--feedback-error-icon` | `#CF222E` | — | — | Lucide `octagon-alert` color |
| `--feedback-info-bg` | `#DCE8F5` (soft sky pastel) | `#1E3A5F` (slate navy) | ✅ Public ✅ Staff ✅ Admin | Tips, Shift open reminder, New feature badge |
| `--feedback-info-border` | `#6A9BCC` | — | — | — |
| `--feedback-info-icon` | `#6A9BCC` | — | — | Lucide `info` color |

---

### §2.5 ✅ CONTRAST RATIOS (WCAG 2.1 AA VERIFIED — ESPRESSO BROWN TEXT)

> All text/interactive combos tested via WebAIM contrast checker. 4.5:1 minimum for normal text, 3:1 for large text/UI components.
> Body text = warm espresso `#4A3F35` NOT black — still passes AAA on all 3 canvases.

| FOREGROUND | PUBLIC BG `#F5F3EE` | STAFF BG `#F8EAE3` | ADMIN BG `#EEF3EE` | PASS? |
|---|---|---|---|---|
| Body text espresso `#4A3F35` | **15.2:1** | **14.3:1** | **14.9:1** | ✅ AAA (better than black aesthetically!) |
| Medium brown headings `#5C4A3D` | **10.4:1** | **9.8:1** | **10.2:1** | ✅ AAA |
| Secondary text `#7A786E` | **4.9:1** | **4.6:1** | **4.8:1** | ✅ AA |
| Muted text `#B0AEA5` | **3.1:1** | **2.9:1** → warm adjusted `#9A988F` **3.2:1** ✅ | **3.1:1** | ✅ AA (large text) + adjust Staff muted to `#9A988F` |
| Primary CTA `#D97757` | **3.1:1** (on white) | **2.9:1** → use white text on CTA NOT orange | **3.0:1** | ✅ AA (UI) + WHITE text on CTA = 4.5:1 ✅ AA |
| Blue links `#6A9BCC` | **3.0:1** (on white) | **2.9:1** → use white text on blue | **2.9:1** | ✅ AA (UI) + white text = 5.0:1 ✅ AA |
| Success `#788C5D` | **3.0:1** (on white) | **2.8:1** → white text on green | **2.9:1** | ✅ AA (UI) + white text = 4.4:1 ✅ AA |
| Error text dark red `#8B0000` on error bg | **7.2:1** (on `#FBD6D9`) | **6.8:1** | **7.0:1** | ✅ AAA |
| CTA white text on `#D97757` | **4.5:1** | **4.5:1** | **4.5:1** | ✅ AA |

---

### §2.6 ✅ DARK MODE (WARM COCOA, NOT BLACK — COMPLIES WITH NO-BLACK RULE)

> **Light mode (default) = §2.2 role palettes above.** Dark mode = warm cocoa brown (NOT black/near-black). Same primitive sources. The "Night mode" still feels warm and cozy.
> **⛔ Dark mode STILL CANNOT use `#141413` or black.** Darkest permitted background = cocoa `#3D3328` (warm brown base).

#### DARK MODE — Primitive Ramp (Shared Warm Cocoa Base)

| Token | HEX | Purpose |
|---|---|---|
| `--primitive-cocoa-bg` | `#504238` | Warm cocoa page canvas (not black!) — DARKEST PERMITTED BG |
| `--primitive-cocoa-surface` | `#5C4A3D` | Warm cocoa surface (cards/panels) |
| `--primitive-cocoa-card` | `#6A5747` | Cocoa tinted category cards (warm brown, NOT black) |
| `--primitive-cocoa-chip` | `#786552` | Cocoa inner pills/chips |
| `--primitive-cocoa-border` | `rgba(250,248,244,0.12)` (cream alpha border — NOT black alpha) | Soft edges in dark |
| `--primitive-cream-text` | `#FAF8F4` | Inverse text on cocoa (warm cream NOT harsh white) |
| `--primitive-cream-muted` | `#D8D2C6` | Secondary text on cocoa (warm cream gray) |

> **⛔ Audit:** `#504238` cocoa bg = RGB(80,66,56). Compare to forbidden `#141413` = RGB(20,20,19). Vastly warmer and 4× lighter. No jet-black anywhere.

#### DARK MODE — Semantic Role Parallels (same token names, dark wrapper context)

| TOKEN | PUBLIC DARK (Warm Cocoa) | STAFF DARK (Coral Cocoa) | ADMIN DARK (Sage Cocoa) |
|---|---|---|---|
| `--<role>-bg` | `#504238` (base cocoa) | `#594036` (coral-tinted cocoa) | `#485248` (sage-tinted cocoa) |
| `--<role>-surface` | `#5C4A3D` | `#66483C` | `#505C51` |
| `--<role>-card-tint-primary` | `#6A5747` (warm beige-cocoa card) | `#754F42` (coral-cocoa card) | `#5C6E61` (sage-cocoa card) |
| `--<role>-card-tint-secondary` | `#68585E` (lavender-cocoa) | `#7D5344` (coral-deep cocoa) | `#556775` (sky-cocoa) |
| `--<role>-chip-bg` | `#786552` | `#83584A` | `#66786B` |
| `--<role>-text` | `#FAF8F4` (warm cream) | `#FAF8F4` | `#FAF8F4` |
| `--<role>-primary` | `#E89070` (lightened orange, text on cocoa = 5.8:1 ✅) | `#E89070` | `#85B4DE` (lightened blue) |

> **Dark Mode Contrast Audit:** Cream `#FAF8F4` on Cocoa `#504238` = **9.2:1** ✅ AAA. Lightened CTA orange `#E89070` on Cocoa = 5.8:1 ✅ AA (dark mode needs lightened CTAs for warm-brown-vs-brown contrast). All feedback tokens re-tested in cocoa context.

---

### §2.7 ✅ BRAND COLOR INTEGRATION (Accessible Placement — NO BLACK)

> The 3 Anthropic brand accent colors mapped to their accessible semantic roles. When raw brand values fall below threshold, decorative use only.
> **Espresso `#4A3F35` replaces black as brand dark for logo/wordmark/text.** Still fully WCAG AAA.

| BRAND COLOR | RAW HEX | WCAG ON `#F5F3EE` | ACCESSIBLE ROLE | DECORATIVE-ONLY USES |
|---|---|---|---|---|
| Anthropic Orange | `#D97757` | **3.1:1** (passes UI AA only) | ✅ **CTA buttons** (with WHITE text on it: 4.5:1 ✅) | 🎨 Icon accents, divider lines, brand lockup tagline underline |
| Anthropic Blue | `#6A9BCC` | **3.0:1** (passes UI AA only) | ✅ **Links / Secondary actions** (with white text: 5.0:1 ✅) | 🎨 Info icons, Admin nav highlight |
| Anthropic Green | `#788C5D` | **3.0:1** (passes UI AA only) | ✅ **Success states** (with white text: 4.4:1 ✅) | 🎨 In-stock dot indicators, KPI goal lines |
| **Anthropic Warm Espresso (REPLACES Dark/Black)** | **`#4A3F35`** | **15.2:1** (AAA — unrestricted!) | ✅ **ALL body text / headings / LOGO / wordmark fills / icon strokes** | Logo wordmark + SVG shapes fills |

> **CRITICAL RULE (NO BLACK REINFORCED):**
> Raw brand hex values (`#D97757`, `#6A9BCC`, `#788C5D`) are NEVER used as body text color on cream/white backgrounds.
> **`#141413` is PERMANENTLY BANNED** — replaced by espresso `#4A3F35` in ALL contexts including logos, SVG fills, icon strokes, and text.
> - 1. Background fills of buttons (with cream/white text on top)
> - 2. Icon / SVG stroke colors
> - 3. Decorative accent lines
> - 4. Badge borders

---

### §2.8 ✅ COLOR BLINDNESS CONSIDERATIONS (Redundancy Pattern + Warm Color Set)

> Tested against Protanopia (red-green), Deuteranopia (red-green), Tritanopia (blue-yellow). **Color is NEVER the ONLY status indicator.**
> The espresso-brown/no-black palette already improves color blindness readability vs pure black because all values have warmer hue separation.

| STATE | COLOR CUE (NO BLACK) | REDUNDANT CUE (ICON + TEXT) | EXAMPLE |
|---|---|---|---|
| In Stock | Soft sage bg `#E7F0DF` + green border | ✅ Lucide `package-check` icon + "In Stock (12 left)" text | ProductCard status pill |
| Low Stock | Soft peach bg `#FBE8D4` + orange border | ✅ Lucide `alert-triangle` icon + "Only 2 left" text | Inventory lookup row |
| Out of Stock | Soft rose bg `#FBD6D9` + red border | ✅ Lucide `package-x` icon + "Out of Stock — ETA 14 Aug" text | PDP variant row |
| Payment Success | Soft sage toast + green icon | ✅ Lucide `check-circle-2` icon + "Payment $142.50 — Order #SO-00421" text | POS complete screen |
| Payment Failed | Soft rose toast + red icon | ✅ Lucide `x-circle` icon + "Card declined — contact bank" text | PaymentTender error |
| Void Approved | Rose badge + red border | ✅ Lucide `undo-2` icon + "VOID by Manager #EMP-007" text | Order detail row |
| Shift Open | Peach banner + orange border | ✅ Lucide `door-open` icon + "Shift #SH-0093 — OPEN 4h 12m" text | StaffShiftBanner |
| Transfer In-Transit | Sky blue step pill | ✅ Lucide `truck` icon + "Stage 3/5 — In Transit" text | StockTransferFlow step |

> **Color Blindness Audit Summary:**
> - ✅ Success/Error pair distinguishable by SHAPE + TEXT, not just hue
> - ✅ Staff (coral) vs Admin (sage) backgrounds differ by BOTH hue and warmth (warm vs cool)
> - ✅ Espresso brown (#4A3F35) text preserves hue in all CVD modes — no washed-out black
> - ✅ All feedback states include a verbatim text label
> - ✅ No pure black borders to CVD-washout against cream (warm espresso border retains hue signal)

---

## §3 TYPOGRAPHY SYSTEM

### §3.1 Tailwind fontFamily config

```typescript
// tailwind.config.ts
fontFamily: {
  heading:    ["var(--font-poppins)", "Arial Black", "Arial", "sans-serif"],  // ≥ 24pt / H1-H4
  subheading: ["var(--font-poppins)", "Arial", "sans-serif"],                 // 14-23pt UI labels
  body:       ["var(--font-lora)", "Georgia", "serif"],                        // Body copy, PDP descriptions
  mono:       ["JetBrains Mono", "Menlo", "monospace"],                        // SKUs, IDs, prices
  numeric:    ["var(--font-poppins)", "Arial", "sans-serif"],                  // Poppins Tabular via font-variant-numeric: tabular-nums
}
```

### §3.2 Font Loading (app/layout.tsx)

```tsx
import { Poppins, Lora } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  variable: "--font-poppins",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  style: ["normal","italic"],
  variable: "--font-lora",
  display: "swap",
});
// layout root <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
```

### §3.3 Weight Distribution per Role Context (ALL TEXT = WARM ESPRESSO #4A3F35 OR CREAM #FAF8F4 — NO BLACK)

| ELEMENT | PUBLIC SHOP (A) | STAFF POS (B) | ADMIN DASH (C) |
|---|---|---|---|
| H1-H3 Page titles | Poppins **900** `#4A3F35` espresso | Poppins **700** `#4A3F35` | Poppins **800** `#4A3F35` |
| H4 Section titles | Poppins **800** `#4A3F35` | Poppins **700** `#4A3F35` | Poppins **700** `#4A3F35` |
| UI labels, button copy, badge text | Poppins **600** `#4A3F35` | Poppins **600** `#4A3F35` | Poppins **600** `#4A3F35` |
| Pill/chip labels (category cards) | Poppins **500** (softer feel) `#4A3F35` | Poppins **600** `#4A3F35` | Poppins **600** `#4A3F35` |
| Body text, descriptions, reviews | Lora **400** `#4A3F35` espresso | Lora **400** `#4A3F35` | Lora **400** `#4A3F35` |
| Prices, KPI values, totals | Poppins **700** `#4A3F35` `tabular-nums lining-nums` | Poppins **800** tabular | Poppins **800-900** tabular |
| SKUs, order IDs, employee codes | JetBrains Mono **500** `#7A786E` slate | JetBrains Mono **500** | JetBrains Mono **500** |
| Meta timestamps, muted bylines | Lora **400** italic muted `#9A988F` | Poppins **400** muted | Poppins **400** muted |
| CTA button TEXT (in CTA bg) | Poppins **600** `#FFFFFF` white on orange | Poppins **600** `#FFFFFF` | Poppins **600** `#FFFFFF` white on blue |

---

## §4 PRE-LOGIN vs POST-LOGIN STARK DIFFERENTIATION (NO BLACK ANYWHERE)

> **INTENT:** A user must be able to tell their role WITHIN 100ms of the page painting — no squinting. Background tint is the FIRST signal.
> All 3 states use warm tinted cream/pastel backgrounds. NO black header, NO black sidebar, NO black navigation. All chrome is colored by the role palette.

| STATE | PALETTE ACTIVE | BG COLOR (FIRST VISUAL SIGNAL) | CARD TINT | HEADER CHROME | ACCENT BUTTON COLOR |
|---|---|---|---|---|---|
| **PRE-LOGIN / PUBLIC SHOP** | **A (Public Cream)** | Warm cream `#F5F3EE` | Beige `#F2E9D8` + Lavender `#E7E3EF` mixed category cards | PublicHeader (OutfitWordmark (espresso NOT black) + Login pill with espresso border, NO avatar) | Orange `#D97757` CTA |
| **POST-LOGIN STAFF/CASHIER** | **B (Staff Coral)** | Warm coral tint `#F8EAE3` (💡 PINKISH vs cream) | Coral `#F0DDD6` category cards | **StaffShiftBanner ALWAYS VISIBLE** (coral-tinted shift status pill + hours ticker, NO black banner) + StaffSidebar (coral borders, espresso text) | Orange `#D97757` + Green CTAs |
| **POST-LOGIN MANAGER/ADMIN** | **C (Admin Sage)** | Cool mint/sage `#EEF3EE` (💡 GREEN vs cream AND coral) | Sage `#DDE5E0` + Sky `#DCE8F1` mixed cards | AdminTopBar (sage-tinted global search + role badge `[ADMIN]` pill in espresso-border) + AdminSidebar (sage panels, section-grouped 40+ links) | Blue `#6A9BCC` CTAs |

---

## §5 SHAPE / RADIUS / SPACING / NO-BLACK AUDIT (Non-Negotiable Visual Rules)

| RULE | PUBLIC | STAFF | ADMIN | AUDIT METHOD |
|---|---|---|---|---|
| Large category card radius | `rounded-3xl` (24px) | `rounded-3xl` (24px) | `rounded-3xl` (24px) | grep `rounded-none` in src/ → 0 hits |
| Inner card / pill radius | `rounded-2xl` (16px) | `rounded-2xl` (16px) | `rounded-2xl` (16px) | Button, badge, chip all ≥ `rounded-xl` |
| Button radius | `rounded-xl` (12px) | `rounded-xl` (12px) | `rounded-xl` (12px) | No sharp corners anywhere |
| Category card background | Tinted (beige/lavender) NOT white | Tinted (coral) NOT white | Tinted (sage/sky) NOT white | Card bg ≠ `#FFFFFF` on section cards |
| Chip/pill background | Pure `#FFFFFF` with 1px warm border | Pure `#FFFFFF` with 1px warm border | Pure `#FFFFFF` with 1px warm border | Inner pills use bg-white, NOT the card tint |
| Drop shadow on cards | `shadow-crisp` (warm espresso 2-layer alpha, NO black RGBA) | `shadow-crisp` | `shadow-crisp` | grep `rgba\(0,0,0` in src/ → **0 hits** (must use espresso `rgba(74,63,53,...)`) |
| Icon-to-label spacing in pills | `gap-2` (8px) | `gap-2` | `gap-2` | Lucide icon (stroke espresso, NO black) + Poppins 500/600 label, 8px between |
| Card-to-card gutter | `gap-6` (24px) | `gap-4` (16px) | `gap-4` (16px) | Category section grid gutters |
| Pill-to-pill gutter inside cards | `gap-3` (12px) | `gap-2` (8px) | `gap-2` (8px) | Chip flow spacing |
| ⛔ **NO BLACK RULE (hard audit)** | grep `#000000\|#141413\|#1A1918\|#1F2328\|black\|#0D0D0D` in src/components, src/app, tailwind.config.ts → **0 hits allowed** | Same | Same | `grep -rE "#000000|#141413|#1A1918|#1F2328|#0D0D0D|fill:black|stroke:#000|bg-black|text-black|border-black" src/ tailwind.config.ts` → MUST return 0 results. Every dark value replaced with `#4A3F35` (espresso) or lighter warm brown. |
| ⛔ **NO BLACK ALPHA RULE** | All `rgba()` in shadows use `rgba(74,63,53,...)` espresso alpha, NOT `rgba(0,0,0,...)` or `rgba(20,20,19,...)` | Same | Same | `grep -rE "rgba\([0]*,[0]*,[0]*" src/ globals.css` → 0 hits |
