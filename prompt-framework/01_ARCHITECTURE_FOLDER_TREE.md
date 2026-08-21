# MODULE 01 — PROJECT ARCHITECTURE (FOLDER GAL STRUCTURE)

> Output root: `/Users/Apple16/Documents/trae_projects/UI-FROTN/outfit-shop/`
> Refer to `00_BRAND_IDENTITY.md` for palettes applied per route group.

---

## §0 FULL FOLDER TREE

```
outfit-shop/
├── package.json                          # See §1.1 exact manifest
├── tsconfig.json                         # strict: true, noUncheckedIndexedAccess: true (§1.2)
├── next.config.mjs                       # images.remotePatterns, CSP headers
├── tailwind.config.ts                    # 3 palette tokens (§1.3)
├── postcss.config.js
├── .env.local                            # NEXT_PUBLIC_API_BASE + NEXT_PUBLIC_APP_DOMAIN
│
├── public/
│   ├── logo/
│   │   ├── outfit-wordmark.svg
│   │   ├── outfit-wordmark.reverse.svg
│   │   ├── outfit-monogram.svg
│   │   ├── outfit-monogram.reverse.svg
│   │   └── outfit-lockup.svg
│   ├── favicon.ico                       # → outfit-monogram
│   ├── opengraph-image.png               # OutfitLockup + Wear. Confidence.
│   └── robots.txt
│
└── src/
    │
    ├── app/
    │   ├── layout.tsx                    # Root: Poppins/Lora fonts, <Providers/>, metadata
    │   ├── page.tsx                      # ✅ PUBLIC: Shop Home (Skill 08)
    │   ├── globals.css                   # Tailwind layers + 3 palettes + neo-brutalist utilities
    │   ├── not-found.tsx                 # Role-scoped chrome
    │   │
    │   ├── (auth)/                       # No chrome overlap (group w/o segments)
    │   │   ├── layout.tsx                # Centered card, lockup above
    │   │   ├── login/page.tsx            # Role-redirecting login (all 4 roles)
    │   │   └── unauthorized/page.tsx     # 403 screen + role badge + back link
    │   │
    │   ├── (shop)/                       # ✅ PUBLIC — Palette A (Neo-Brutalist)
    │   │   ├── layout.tsx                # PublicHeader + PublicFooter
    │   │   ├── products/
    │   │   │   ├── page.tsx              # Catalog grid + FilterSidebar
    │   │   │   └── [slug]/page.tsx       # PDP: variant, size, color, add-to-cart
    │   │   ├── cart/page.tsx
    │   │   ├── wishlist/page.tsx
    │   │   ├── brands/[slug]/page.tsx
    │   │   ├── categories/[slug]/page.tsx
    │   │   └── checkout/page.tsx
    │   │
    │   ├── (staff)/                      # ✅ STAFF / CASHIER — Palette B (Warm POS)
    │   │   ├── layout.tsx                # StaffShiftBanner + StaffSidebar
    │   │   ├── pos/
    │   │   │   ├── page.tsx              # LIVE POS (Skill 07 split 60/40)
    │   │   │   └── receipts/
    │   │   │       └── [id]/print.tsx    # react-to-print template
    │   │   ├── orders/
    │   │   │   ├── page.tsx              # DataTable CRUD-read
    │   │   │   ├── [id]/page.tsx
    │   │   │   └── [id]/void/page.tsx    # MANAGER+ (API Section 33)
    │   │   ├── customers/                # CASHIER+ layout guard
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── inventory/
    │   │   │   ├── lookup/page.tsx       # Barcode → detail
    │   │   │   └── stock/page.tsx
    │   │   └── shifts/                   # CASHIER+ only
    │   │       ├── open/page.tsx
    │   │       └── close/page.tsx
    │   │
    │   └── (admin)/                      # ✅ MANAGER / ADMIN — Palette C (Dashboard)
    │       ├── layout.tsx                # AdminSidebar (section-grouped) + AdminTopBar
    │       ├── dashboard/page.tsx        # KPI grid (Skill 06)
    │       ├── analytics/
    │       │   ├── sales/page.tsx
    │       │   ├── inventory/page.tsx
    │       │   ├── forecasting/page.tsx
    │       │   └── ai/page.tsx           # AI Intelligence (API 38)
    │       ├── catalog/
    │       │   ├── products/page.tsx
    │       │   ├── products/new/page.tsx
    │       │   ├── products/[id]/edit/page.tsx
    │       │   ├── variants/page.tsx
    │       │   ├── categories/page.tsx
    │       │   ├── brands/page.tsx
    │       │   ├── sizes/page.tsx
    │       │   ├── colors/page.tsx
    │       │   ├── bundles/page.tsx
    │       │   └── promotions/page.tsx
    │       ├── inventory/
    │       │   ├── purchases/page.tsx
    │       │   ├── suppliers/page.tsx
    │       │   ├── movements/page.tsx
    │       │   ├── transfers/page.tsx    # Visual 5-stage lifecycle
    │       │   └── batches/page.tsx      # FIFO
    │       ├── operations/
    │       │   ├── branches/page.tsx
    │       │   ├── banners/page.tsx
    │       │   ├── images/page.tsx       # Cloudinary upload (API 32)
    │       │   ├── gift-cards/page.tsx
    │       │   └── shipping/page.tsx
    │       ├── reports/
    │       │   ├── exports/page.tsx      # MANAGER+
    │       │   └── mis/page.tsx          # MIS Reports
    │       └── system/                   # RBAC TRIPLE-LOCKED
    │           ├── audit/page.tsx        # MANAGER+
    │           ├── webhooks/page.tsx     # MANAGER+
    │           ├── gdpr/page.tsx         # MANAGER+
    │           ├── voids/page.tsx        # MANAGER+
    │           ├── employees/page.tsx    # ⛔ ADMIN ONLY
    │           ├── accounts/page.tsx     # ⛔ ADMIN ONLY
    │           ├── monitor/page.tsx      # ⛔ ADMIN ONLY
    │           └── settings/page.tsx
    │
    ├── components/
    │   ├── ui/                           # shadcn/ui primitives (generated)
    │   │   ├── button.tsx                # CVA: variant(4)×size(3)×palette(3)
    │   │   ├── input.tsx                 # same axes
    │   │   ├── card.tsx                  # variant: public|staff|admin
    │   │   ├── data-table.tsx
    │   │   ├── form.tsx
    │   │   ├── badge.tsx
    │   │   ├── dialog.tsx, sheet.tsx, combobox.tsx, calendar.tsx
    │   │   ├── + 20 standard shadcn primitives (see §1.1 install)
    │   │
    │   ├── brand/
    │   │   ├── OutfitWordmark.tsx
    │   │   ├── OutfitMonogram.tsx
    │   │   ├── OutfitLockup.tsx
    │   │   └── RoleBadge.tsx            # Color-coded per role
    │   │
    │   ├── layout/
    │   │   ├── PublicHeader.tsx
    │   │   ├── PublicFooter.tsx
    │   │   ├── StaffSidebar.tsx
    │   │   ├── StaffShiftBanner.tsx     # ALWAYS visible in (staff) group
    │   │   ├── AdminSidebar.tsx
    │   │   ├── AdminTopBar.tsx
    │   │   ├── RequireRole.tsx          # RBAC component guard (Module 02 §4)
    │   │   └── ThemePaletteWrapper.tsx  # Injects A/B/C CSS vars
    │   │
    │   ├── shop/                         # PUBLIC shop subcomponents
    │   │   ├── ProductCard.tsx           # 0 radius, 2px border, 0 shadow
    │   │   ├── ProductGrid.tsx
    │   │   ├── FilterSidebar.tsx
    │   │   ├── VariantSwatches.tsx
    │   │   └── PDPGallery.tsx
    │   │
    │   ├── pos/                          # STAFF POS subcomponents
    │   │   ├── BarcodeScanner.tsx        # @zxing/browser + manual fallback
    │   │   ├── CartLineItems.tsx
    │   │   ├── PaymentTender.tsx
    │   │   ├── ReceiptPrint.tsx          # react-to-print trigger
    │   │   ├── ReceiptTemplate.tsx       # 80mm thermal template
    │   │   ├── CustomerLookup.tsx
    │   │   └── OfflineSyncBadge.tsx
    │   │
    │   ├── admin/                        # ADMIN dashboard subcomponents
    │   │   ├── MetricCard.tsx
    │   │   ├── KpiGrid.tsx
    │   │   ├── AuditTimeline.tsx
    │   │   ├── StockTransferFlow.tsx     # 5-stage visual
    │   │   ├── ExportButtons.tsx
    │   │   ├── CloudinaryUploader.tsx
    │   │   └── SystemMonitorGrid.tsx
    │   │
    │   └── shared/
    │       ├── RoleBanner.tsx
    │       ├── PermissionDenied.tsx
    │       ├── EmptyState.tsx
    │       ├── SearchFilterBar.tsx
    │       ├── CurrencyDisplay.tsx
    │       ├── CopyToClipboard.tsx
    │       ├── RelativeTime.tsx
    │       ├── DataTableToolbar.tsx
    │       ├── PaginationFooter.tsx
    │       └── ConfirmDialog.tsx
    │
    ├── hooks/
    │   ├── rbac/
    │   │   ├── useRbac.ts                # hasRole / isAtLeast composables
    │   │   └── usePermission.ts
    │   │
    │   ├── api/                          # 1 file per Postman section (00-43)
    │   │   ├── useAuth.ts                # Section 00
    │   │   ├── useSystem.ts              # 01
    │   │   ├── useCurrency.ts            # 02
    │   │   ├── useProducts.ts            # 03 + 22
    │   │   ├── useVariants.ts            # 04 + 23
    │   │   ├── useCatalog.ts             # 05 + 19/20/21
    │   │   ├── useBundles.ts             # 06 + 24
    │   │   ├── usePromotions.ts          # 06 + 25
    │   │   ├── useBranches.ts            # 06 + 31
    │   │   ├── useInventory.ts           # 07 + 28/29/30
    │   │   ├── useBanners.ts             # 07 + 35
    │   │   ├── useSettings.ts            # 07
    │   │   ├── useCart.ts                # 08
    │   │   ├── useWishlist.ts            # 09
    │   │   ├── usePayments.ts            # 10
    │   │   ├── useSessions.ts            # 11
    │   │   ├── useCustomers.ts           # 12
    │   │   ├── useShifts.ts              # 13
    │   │   ├── useOrders.ts              # 14 + 33 (void)
    │   │   ├── useInvoices.ts            # 15
    │   │   ├── useGiftCards.ts           # 15
    │   │   ├── useShipping.ts            # 16
    │   │   ├── useStaffAlerts.ts         # 17
    │   │   ├── useAnalytics.ts           # 18
    │   │   ├── useSuppliers.ts           # 26
    │   │   ├── usePurchases.ts           # 27
    │   │   ├── useImages.ts              # 32
    │   │   ├── useAudit.ts               # 34
    │   │   ├── useExports.ts             # 36
    │   │   ├── useMISReports.ts          # 37
    │   │   ├── useAI.ts                  # 38
    │   │   ├── useGDPR.ts                # 39
    │   │   ├── useWebhooks.ts            # 40
    │   │   ├── useEmployees.ts           # 41 ⛔ ADMIN
    │   │   ├── useAccounts.ts            # 42 ⛔ ADMIN
    │   │   └── useMonitor.ts             # 43 ⛔ ADMIN
    │   │
    │   ├── useBarcodeScanner.ts
    │   ├── useOfflineSync.ts
    │   ├── useDebouncedSearch.ts
    │   ├── usePrintReceipt.ts
    │   └── useCurrencyFormatter.ts
    │
    ├── lib/
    │   ├── api-client.ts                 # Axios instance + auth/error interceptors
    │   ├── query-client.ts               # TanStack defaults
    │   ├── rbac-matrix.ts                # Role ↔ PermissionBit mapping (Module 02 §3)
    │   ├── zod-schemas/                  # Request/Response Zod per resource
    │   │   ├── auth.schemas.ts
    │   │   ├── product.schemas.ts
    │   │   ├── order.schemas.ts
    │   │   ├── customer.schemas.ts
    │   │   ├── employee.schemas.ts
    │   │   └── ... (one per API section)
    │   ├── env.ts                        # Zod-validated process.env
    │   ├── currency.ts                   # Formatter registry from API
    │   ├── dates.ts                      # date-fns + relative strings
    │   ├── storage.ts                    # localStorage + IndexedDB wrappers
    │   ├── errors.ts                     # AppError class, 401/403/422/429/5xx map
    │   ├── seo.ts                        # Metadata factory per page+role
    │   ├── barcode.ts                    # SKU normalization helpers
    │   ├── receipt-builder.ts            # Print template data shaping
    │   └── utils.ts                      # cn(), twMerge, type helpers
    │
    ├── providers/
    │   ├── TanstackQueryProvider.tsx
    │   ├── ThemeProvider.tsx
    │   ├── AuthProvider.tsx              # Session, JWT, user/role state
    │   ├── ToastProvider.tsx             # Sonner
    │   └── OfflineSyncProvider.tsx
    │
    ├── types/
    │   ├── rbac.types.ts
    │   ├── api.types.ts                  # {success, data, message, meta} envelope
    │   ├── product.types.ts
    │   ├── order.types.ts
    │   ├── employee.types.ts
    │   ├── inventory.types.ts
    │   └── ...
    │
    ├── middleware.ts                     # ❗ CRITICAL RBAC ROUTE GUARD (§1.4)
    │
    └── test/
        ├── unit/
        ├── integration/
        │   └── rbac-permissions.test.tsx
        ├── e2e/
        │   └── rbac-access.spec.ts       # Playwright route×role matrix (Module 06)
        └── fixtures/
            ├── mock-users.json
            └── mock-api-responses/
```

---

## §1.1 package.json — EXACT DEPENDENCY MANIFEST

```json
{
  "name": "outfit-shop",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "tsc --noEmit && next lint",
    "typecheck": "tsc --noEmit",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "shadcn:add": "npx shadcn@latest add"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.50.0",
    "@tanstack/react-query-devtools": "^5.50.0",
    "@hookform/resolvers": "^3.9.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.8",
    "@zxing/browser": "^0.1.5",
    "react-to-print": "^2.15.1",
    "recharts": "^2.12.7",
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.427.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "sonner": "^1.5.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.2",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-progress": "^1.1.0",
    "axios": "^1.7.5",
    "date-fns": "^3.6.0",
    "dayjs": "^1.11.13",
    "next-themes": "^0.3.0",
    "idb": "^8.0.0",
    "nanoid": "^5.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.4",
    "tailwindcss": "^3.4.9",
    "postcss": "^8.4.41",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "@tanstack/eslint-plugin-query": "^5.50.0",
    "vitest": "^2.0.5",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/user-event": "^14.5.2",
    "@playwright/test": "^1.46.0",
    "@axe-core/playwright": "^4.10.0",
    "jsdom": "^24.1.1",
    "msw": "^2.3.5"
  }
}
```

---

## §1.2 tsconfig.json — STRICT MODE MANDATORY

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## §1.3 tailwind.config.ts — 3-PALETTE ROLE-AWARE (checklist.design SOFT AESTHETIC + ⛔ NO BLACK RULE)

> Replaces neo-brutalism. All soft rounded cards, pastel tinted panels, pill chips, ultra-soft depth.
> 3-role differentiation via role-css-var wrapper in ThemePaletteWrapper.tsx.
> **⛔ GLOBAL ENFORCEMENT:** No `#000000`, `#141413`, `#1A1918` anywhere. Darkest value = warm espresso `#4A3F35` (TEXT/STROKE only).

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1440px" } },
    extend: {
      fontFamily: {
        heading:    ["var(--font-poppins)", "Arial Black", "Arial", "sans-serif"],
        subheading: ["var(--font-poppins)", "Arial", "sans-serif"],
        body:       ["var(--font-lora)", "Georgia", "serif"],
        mono:       ["JetBrains Mono", "Menlo", "monospace"],
        numeric:    ["var(--font-poppins)", "Arial", "sans-serif"],
      },
      colors: {
        // ── PRIMITIVE RAMPS (§00 §2.1 — NO BLACK, EVER) ──
        primitive: {
          cream:    { 50: "#FAF8F4", 100: "#F5F3EE", 200: "#ECE8DF" },
          beige:    { 100: "#F2E9D8" },
          lavender: { 100: "#E7E3EF" },
          coral:    { 50: "#F8EAE3", 100: "#F0DDD6", 200: "#E6C8BC" },
          sage:     { 50: "#EEF3EE", 100: "#DDE5E0", 200: "#C8D4CD" },
          sky:      { 100: "#DCE8F1" },
          slate:    { 50: "#F4F3F0", 100: "#E8E6DC", 200: "#D0CDC1", 300: "#B0AEA5", 500: "#7A786E" },
          espresso: { 600: "#5C4A3D", 700: "#4A3F35" }, // ⛔ MAX DARKEST. Text/stroke ONLY. No shape bg.
          // ── DARK MODE = COCOA (warm browns, NEVER black) ──
          cocoa:    { bg: "#504238", surface: "#5C4A3D", card: "#6A5747", chip: "#786552",
                      border: "rgba(250,248,244,0.12)", creamText: "#FAF8F4", creamMuted: "#D8D2C6" },
          orange: { 500: "#D97757", 600: "#C56646" },
          blue:   { 500: "#6A9BCC", 600: "#5689BD" },
          green:  { 500: "#788C5D", 600: "#677A4F" },
          red:    { 500: "#CF222E" },
          amber:  { 500: "#D97706" },
          // ⛔ BANNED: `primitive.dark.*` removed entirely. Use cocoa (warm brown only).
        },
        // ── SEMANTIC: PUBLIC SHOP (Cream + Beige/Lavender cards) ──
        public: {
          bg:               "#F5F3EE",
          surface:          "#FAF8F4",
          "card-primary": "#F2E9D8",   // checklist.design "Mobile app" beige card
          "card-secondary": "#E7E3EF", // lavender card (Website style)
          chip:            "#FFFFFF",
          border:          "rgba(74,63,53,0.06)",   // warm ESPRESSO alpha, NEVER black
          "border-strong": "rgba(74,63,53,0.12)",
          text:            "#4A3F35",   // espresso DARKEST — used ONLY for text/stroke
          "text-secondary":"#7A786E",
          muted:           "#9A988F",   // bumped from B0AEA5 for Staff BG AA compliance
          primary:         "#D97757",
          accent:          "#6A9BCC",
          success:         "#788C5D",
          warning:         "#D97706",
          danger:          "#CF222E",
        },
        // ── SEMANTIC: STAFF POS (Coral/Pink cards — WARM vs Public) ──
        staff: {
          bg:               "#F8EAE3",   // 💡 pinkish tint — INSTANTLY different from cream
          surface:          "#FFFFFF",
          "card-primary": "#F0DDD6",   // checklist.design "Design system" coral card
          "card-secondary": "#E6C8BC",
          chip:            "#FFFFFF",
          border:          "rgba(217,119,87,0.12)",
          "border-strong": "rgba(217,119,87,0.22)",
          text:            "#4A3F35",   // espresso
          "text-secondary":"#7A786E",
          muted:           "#9A988F",
          primary:         "#D97757",
          accent:          "#788C5D",
          success:         "#788C5D",
          warning:         "#D97757",
          danger:          "#CF222E",
        },
        // ── SEMANTIC: ADMIN DASH (Sage Mint/Sky cards — COOL vs both) ──
        admin: {
          bg:               "#EEF3EE",   // 💡 mint tint — different from cream AND coral
          surface:          "#FFFFFF",
          "card-primary": "#DDE5E0",   // checklist.design "Flows" sage card
          "card-secondary": "#DCE8F1",   // "Web app" sky card
          panel:           "#C8D4CD",
          chip:            "#FFFFFF",
          border:          "rgba(120,140,93,0.12)",
          "border-strong": "rgba(120,140,93,0.22)",
          text:            "#4A3F35",   // espresso
          "text-secondary":"#7A786E",
          muted:           "#9A988F",
          primary:         "#6A9BCC",
          accent:          "#788C5D",
          success:         "#788C5D",
          warn:            "#D97757",
          danger:          "#CF222E",
        },
        // ── FEEDBACK (shared §00 §2.4 — SOFT PASTEL bgs, never dark) ──
        feedback: {
          success: { bg: "#E7F0DF", border: "#788C5D", icon: "#788C5D", text: "#3A5228" },
          warning: { bg: "#FBE8D4", border: "#D97757", icon: "#D97757", text: "#8B4513" },
          error:   { bg: "#FBD6D9", border: "#CF222E", icon: "#CF222E", text: "#8B0000" },
          info:    { bg: "#DCE8F5", border: "#6A9BCC", icon: "#6A9BCC", text: "#1E3A5F" },
        },
      },
      borderRadius: {
        // checklist.design SOFT ROUNDED — NO sharp corners on UI elements
        none: "0",       // use ONLY for dividers, not cards
        soft: "2px",
        DEFAULT: "12px",  // button radius (rounded-xl)
        lg:   "16px",  // inner card/pill (rounded-2xl)
        xl:   "16px",
        "2xl": "20px",
        "3xl": "24px",  // ✅ LARGE category cards (checklist.design style)
      },
      boxShadow: {
        none: "none",             // use on inner chips only
        // ⛔ ALL shadows use espresso alpha rgba(74,63,53,...) — NEVER rgba(0,0,0,...) or rgba(20,20,19,...)
        soft:  "0 1px 2px rgba(74,63,53,0.04)",
        crisp: "0 1px 2px rgba(74,63,53,0.04), 0 4px 16px rgba(74,63,53,0.04)",
        hover: "0 4px 8px rgba(74,63,53,0.06), 0 8px 24px rgba(74,63,53,0.06)",
      },
      borderWidth: { "3": "3px" },
      keyframes: {
        "hover-lift":  { "0%": { transform: "translateY(0)" }, "100%": { transform: "translateY(-2px)" } },
        "shift-pulse": { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
        "fade-in":    { "0%": { opacity: "0", transform: "translateY(4px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "hover-lift":  "hover-lift 150ms ease-out",
        "shift-pulse": "shift-pulse 2s ease-in-out infinite",
        "fade-in":    "fade-in 200ms ease-out",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

---

## §1.3b app/globals.css — ROLE PALETTE WRAPPER + CSS VAR INJECTION (⛔ NO BLACK)

> The real theming engine. `ThemePaletteWrapper.tsx` adds `.palette-public` / `.palette-staff` / `.palette-admin` wrapper per route group.
> **⛔ NO `#141413`/`#1A1918`/`#000000` in this file.** Espresso #4A3F35 for text, Cocoa #504238 for dark bg (warm brown, NEVER black).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Default = PUBLIC palette (§00 §2.2 Palette A) */
    --bg: #F5F3EE;
    --surface: #FAF8F4;
    --card-tint-primary: #F2E9D8;
    --card-tint-secondary: #E7E3EF;
    --chip-bg: #FFFFFF;
    --border: rgba(74,63,53,0.06);    /* warm ESPRESSO alpha, NEVER black */
    --border-strong: rgba(74,63,53,0.12);
    --text: #4A3F35;                   /* espresso MAX dark — text/stroke ONLY */
    --text-secondary: #7A786E;
    --muted: #9A988F;
    --primary: #D97757;
    --accent: #6A9BCC;
    --success: #788C5D;
    --warning: #D97706;
    --danger: #CF222E;
    --font-poppins: 'Poppins', sans-serif;
    --font-lora: 'Lora', serif;
  }

  /* ── Role palette overrides — applied by ThemePaletteWrapper on body ancestor */
  .palette-public  { --bg:#F5F3EE; --card-tint-primary:#F2E9D8; --card-tint-secondary:#E7E3EF; --primary:#D97757; --border:rgba(74,63,53,0.06); }
  .palette-staff   { --bg:#F8EAE3; --card-tint-primary:#F0DDD6; --card-tint-secondary:#E6C8BC; --primary:#D97757; --border:rgba(217,119,87,0.12); }
  .palette-admin   { --bg:#EEF3EE; --card-tint-primary:#DDE5E0; --card-tint-secondary:#DCE8F1; --primary:#6A9BCC; --border:rgba(120,140,93,0.12); }

  /* ── Dark mode overrides (§00 §2.6 — COCOA, NEVER black!) ──
     RGB audit: cocoa bg #504238 = R80 G66 B56. Compare to banned #1A1918 = R20 G20 B19.
     4× lighter, warm brown. Still has cream-contrast: cream #FAF8F4 on cocoa = 9.2:1 AAA */
  .dark {
    --bg:#504238;          /* cocoa page canvas (NOT black) */
    --surface:#5C4A3D;     /* cocoa surface */
    --chip-bg:#786552;     /* cocoa chip */
    --text:#FAF8F4;        /* warm CREAM inverse — not harsh white */
    --text-secondary:#D8D2C6;
    --muted:#D8D2C6;
    --border:rgba(250,248,244,0.12);  /* cream alpha border, NOT black alpha */
  }
  /* role-tinted dark — distinct but still cocoa warm, NEVER black */
  .dark.palette-staff { --bg:#594036; --card-tint-primary:#754F42; --card-tint-secondary:#7D5344; }
  .dark.palette-admin { --bg:#485248; --card-tint-primary:#5C6E61; --card-tint-secondary:#556775; }

  html, body { background-color: var(--bg); color: var(--text); }
  body { font-feature-settings: "ss01", "cv11"; }
}

@layer components {
  /* Category tint card — checklist.design style (rounded-3xl, tinted, shadow, lift hover) */
  .category-card {
    @apply rounded-3xl p-6 shadow-crisp transition-all duration-150 ease-out-soft
           hover:-translate-y-0.5 hover:shadow-hover;
    background-color: var(--card-tint-primary);
    border: 1px solid var(--border);
  }
  .category-card-secondary { background-color: var(--card-tint-secondary); }

  /* Inner pill chip (white bg, 1px espresso border, rounded-2xl, icon left + label */
  .pill-chip {
    @apply inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl
           border transition-all duration-150 ease-out-soft
           hover:-translate-y-0.5 hover:shadow-soft
           text-subheading font-medium;
    background-color: var(--chip-bg);
    border-color: var(--border);
    color: var(--text);
  }
  .pill-chip:active { @apply translate-y-0 scale-[0.98]; }
  .pill-chip[aria-selected="true"] {
    background-color: var(--primary);
    color: #FFFFFF;
    border-color: var(--primary);
  }

  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
           font-subheading font-semibold transition-all duration-150 ease-out-soft
           hover:-translate-y-0.5 hover:shadow-hover active:translate-y-0 active:scale-[0.98]
           focus:outline-none;
    background-color: var(--primary);
    color: #FFFFFF;
  }
  .btn-primary:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px; }

  .role-card {
    @apply rounded-3xl p-6 shadow-crisp transition-all duration-200;
    background-color: var(--surface);
    border: 1px solid var(--border);
  }
}
```

---

## §1.4 middleware.ts — CRITICAL RBAC ROUTE GUARD (Layer 1)

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { Role, ROLE_RANK } from "@/types/rbac.types";

const ROUTE_ROLE_MAP: Array<{
  pattern: RegExp;
  minRole: Role;
  adminOnly?: boolean;
}> = [
  // STAFF group
  { pattern: /^\/pos(\/|$)/,            minRole: Role.STAFF },
  { pattern: /^\/inventory\/lookup/,    minRole: Role.STAFF },
  { pattern: /^\/inventory\/stock/,     minRole: Role.STAFF },
  { pattern: /^\/orders(\/|$)/,         minRole: Role.STAFF },
  // CASHIER group
  { pattern: /^\/customers(\/|$)/,      minRole: Role.CASHIER },
  { pattern: /^\/shifts(\/|$)/,         minRole: Role.CASHIER },
  // MANAGER group (admin base)
  { pattern: /^\/dashboard(\/|$)/,       minRole: Role.MANAGER },
  { pattern: /^\/analytics(\/|$)/,       minRole: Role.MANAGER },
  { pattern: /^\/catalog(\/|$)/,         minRole: Role.MANAGER },
  { pattern: /^\/inventory\/purchases/,  minRole: Role.MANAGER },
  { pattern: /^\/inventory\/suppliers/,  minRole: Role.MANAGER },
  { pattern: /^\/inventory\/movements/,  minRole: Role.MANAGER },
  { pattern: /^\/inventory\/transfers/,  minRole: Role.MANAGER },
  { pattern: /^\/inventory\/batches/,    minRole: Role.MANAGER },
  { pattern: /^\/operations(\/|$)/,      minRole: Role.MANAGER },
  { pattern: /^\/reports(\/|$)/,         minRole: Role.MANAGER },
  { pattern: /^\/system\/audit(\/|$)/,   minRole: Role.MANAGER },
  { pattern: /^\/system\/webhooks/,      minRole: Role.MANAGER },
  { pattern: /^\/system\/gdpr(\/|$)/,    minRole: Role.MANAGER },
  { pattern: /^\/system\/voids(\/|$)/,   minRole: Role.MANAGER },
  { pattern: /^\/system\/settings/,      minRole: Role.MANAGER },
  // ⛔ ADMIN ONLY — triple-locked
  { pattern: /^\/system\/employees/,     minRole: Role.ADMIN, adminOnly: true },
  { pattern: /^\/system\/accounts(\/|$)/,minRole: Role.ADMIN, adminOnly: true },
  { pattern: /^\/system\/monitor(\/|$)/, minRole: Role.ADMIN, adminOnly: true },
];

function roleFromCookie(req: NextRequest): Role {
  const token = req.cookies.get("outfit_token")?.value;
  if (!token) return Role.PUBLIC;
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1] ?? "", "base64").toString()
    );
    return (payload.role as Role) ?? Role.PUBLIC;
  } catch {
    return Role.PUBLIC;
  }
}

export function middleware(req: NextRequest) {
  const userRole = roleFromCookie(req);
  const path = req.nextUrl.pathname;
  const match = ROUTE_ROLE_MAP.find(r => r.pattern.test(path));
  if (!match) return NextResponse.next();

  const userRank     = ROLE_RANK[userRole] ?? 0;
  const requiredRank = ROLE_RANK[match.minRole];

  if (userRank >= requiredRank) {
    const res = NextResponse.next();
    res.headers.set("X-Outfit-User-Role", userRole);
    if (match.adminOnly) res.headers.set("X-Outfit-Admin-Only", "1");
    return res;
  }

  if (userRole === Role.PUBLIC) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnUrl", path);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

export const config = {
  matcher: [
    "/pos/:path*", "/orders/:path*", "/customers/:path*", "/shifts/:path*",
    "/inventory/:path*", "/dashboard/:path*", "/analytics/:path*",
    "/catalog/:path*", "/operations/:path*", "/reports/:path*",
    "/system/:path*",
  ],
};
```
