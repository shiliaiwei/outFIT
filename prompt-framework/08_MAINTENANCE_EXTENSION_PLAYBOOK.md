# MODULE 08 — MAINTENANCE & EXTENSION PLAYBOOK

---

## §1 PLAYBOOK: ADD A NEW ROLE (Example: WAREHOUSE role)

Addition of any new role is a 6-step process. Never add roles by just updating the enum.

| Step | File/Area | Change Required |
|---|---|---|
| **1. Types layer** | `src/types/rbac.types.ts` | Append `WAREHOUSE = "warehouse"` to Role enum. Insert rank between STAFF(1) and CASHIER(2) → then renumber all ranks to avoid gaps (STAFF=1, WAREHOUSE=2, CASHIER=3, MANAGER=4, ADMIN=5). |
| **2. Permissions** | `src/lib/rbac-matrix.ts` | Add new entry `warehouse: [ "inventory:read", "stockmovement:view", "batch:manage", ... ]`. Grant permissions consistent with the new role's job scope. Typically WAREHOUSE receives: inventory read + stockmovement view + batch manage + purchase receive. |
| **3. 4th Palette** | `tailwind.config.ts` + `components/ui/*.tsx` | Add palette token `warehouse: { bg, primary, border, ... }` (use Anthropic Green `#788C5D` as primary to visually differentiate from existing 3). Add CVA `variant="warehouse"` axis to Card/Button/Input. |
| **4. Middleware** | `src/middleware.ts` + Route Group | Add new patterns `/warehouse/*` → minRole WAREHOUSE. Create folder `app/(warehouse)/` with `layout.tsx` containing WAREHOUSE chrome (sidebar, header, role banner). |
| **5. UI components** | `components/warehouse/` | Build role-specific pages (Stock Receiving, Putaway, Batch QC, Transfer Receipt). Reuse DataTable/Form primitives via SKILL 04/05 (swap palette in CVA). |
| **6. Tests + Audit** | Matrix + E2E + Credentials | Append **+5 new rows** (WAREHOUSE × new routes + existing routes) to RBAC Matrix Module 02 §2. Re-run Playwright suite before merge. Add `warehouse:{u,p}` to CREDS in Playwright spec, and to Postman Section 00 login folder. |

---

## §2 PLAYBOOK: CROSS-FRAMEWORK PORT (Vue 3 / Nuxt / Remix / SvelteKit)

All OutFIT components and logic are designed to be portable. Execute this split.

### SHARED CORE — publish `@outfit/core` npm package:
```
@outfit/core/src/
  rbac-matrix.ts           (identical to src/lib/rbac-matrix.ts)
  zod-schemas/*            (identical — framework-agnostic Zod)
  api-client.ts            (axios wrapper, replace cookie getter per framework)
  errors.ts, env.ts        (identical)
  currency.ts, dates.ts, utils.ts
  types/*                  (identical)
```

### FRAMEWORK PORT LAYER (example: Vue 3 + Nuxt 3):
| Our Next.js construct | Vue/Nuxt equivalent |
|---|---|
| TanStack React Query v5 | `@tanstack/vue-query` — identical query keys, same stale/cache times |
| shadcn/ui primitives | `shadcn-vue` — same primitive set, swap Radix Vue variants |
| class-variance-authority (CVA) | `cva` works in Vue template bindings |
| `(route groups)` + middleware.ts | `~/middleware/role.global.ts` + `definePageMeta({ minRole })` |
| `app/layout.tsx` (role-palette) | `layouts/shop.vue` / `layouts/staff.vue` / `layouts/admin.vue` |
| React Hook Form + Zod resolver | `vee-validate` + zod (`@vee-validate/zod`) |
| React Hook barcode scanner | Vue wrapper around same `@zxing/browser` (vanilla lib) |
| react-to-print | `vue3-print-nb` or vanilla window.print() + `@media print` stylesheet |
| Recharts (SVG) | Works identically in Vue via `recharts-vue` wrapper or raw SVG |
| Sonner toasts | `vue-sonner` |

### BRAND PORT:
- Share `tailwind.config.ts` 3-palette tokens VERBATIM across frameworks
- Reuse SVG logos in `/public/logo/` — same `<img src>` regardless of framework
- Neo-brutalism rules (Module 00 §2.1) translate 1:1 — same zero-radius, 2px border classes

---

## §3 PLAYBOOK: ADD A NEW API ENDPOINT

1. **Open `OutfitShop_Master_Collection.json`** → insert the endpoint in the CORRECT Section folder (e.g. new analytics route → Section 18 "MANAGER & Above — Analytics & Forecasting"). Document required role with folder name: `MANAGER & Above`, `CASHIER & Above`, `ADMIN ONLY`, `PUBLIC`.

2. **Copy prompt **SKILL 03: api-integration-hook** (Module 03), fill:
   - Postman Section number + name
   - HTTP Method, Endpoint with `:param` placeholders
   - Authorization line (exact role scope)
   - Zod request/response schemas (follow existing patterns)
   
   → Generate the new hook file `use<NewEndpoint>.ts` under `src/hooks/api/`.

3. **If it introduces a NEW permission** (e.g. `promo:crud`):
   - Append a new `PermissionBit` to the union in `rbac.types.ts`
   - Add the bit to appropriate roles in `ROLE_PERMISSIONS` matrix (typically MANAGER+ unless POSTMAN folder is lower)
   - Rebuild

4. **RBAC Test:**
   - Append E2E row to `rbac-access.spec.ts`
   - If MANAGER+/ADMIN → verify lower roles are blocked
   - Unit test: success + 403

---

## §4 PLAYBOOK: BRAND IDENTITY REFRESH

1. **Logos:** Replace SVG files in `/public/logo/`:
   - `outfit-wordmark.svg`
   - `outfit-wordmark.reverse.svg`
   - `outfit-monogram.svg`
   - `outfit-monogram.reverse.svg`
   - `outfit-lockup.svg`
   
   All components consume from `components/brand/{OutfitWordmark, OutfitMonogram, OutfitLockup}.tsx`, which import from `/public/logo/` — single source of truth. Every reference updates automatically.

2. **Palettes:** Edit ONLY `tailwind.config.ts` `theme.extend.colors` → 3 palettes:
   - `public: { ... }`
   - `staff:  { ... }`
   - `admin:  { ... }`
   
   Every component uses `bg-public-*` / `text-staff-primary` tokens. Colors propagate throughout.

3. **Typography:**
   - Update `app/layout.tsx` `next/font/google` imports (Poppins + Lora → new pairing)
   - Update `tailwind.config.ts` `fontFamily` keys → swap Poppins/Lora with new vars
   - **Neo-brutalist audit re-run:** Module 06 §2 CI check ensures shop public still has 0 rounded/0 shadow

4. **Marketing:** Re-render `/public/opengraph-image.png` with new lockup/colors.

---

## §5 COMPONENT REUSABILITY METRICS (TARGET ≥ 70%)

Before any new file in `components/{shop,pos,admin}/`, run these steps — REJECT new components that should have been shared:

1. **Primitive exists?** Check `components/ui/` first. If yes → extend via CVA variant, don't create new file.
2. **Role-specific only in palette?** If yes → add palette axis to CVA of the existing shared base component instead of 3 copies.
3. **Sibling role has it?** If building POS DataTable and Admin DataTable exists → extract shared `components/shared/DataTableCore.tsx`, wrap each role with a tiny shell that passes palette CVA props.

**Definition of reusable:**
```
Reusable % = (Lines of code in components/ui + components/shared)
             / (Total lines of code in components/*)
```
Threshold = ≥ 70%. If lower → refactor pass before PR merge.

---

## APPENDIX A — DEFINITION OF DONE (13 GATES)

| Gate # | Criterion | How to validate | Target |
|---|---|---|---|
| G1 | **RBAC 220 Matrix** (44 routes × 5 roles) | `npm run test:e2e` Playwright spec `rbac-access.spec.ts` | **220/220 PASS** |
| G2 | **Visual Differentiation** | Human compare 3 screenshots (shop vs staff vs admin) side-by-side | Distinguishable in < 1 second human glance |
| G3 | **Neo-Brutalism Audit (Public)** | CI grep (Module 06 §2) `rounded/shadow` public search | **0 hits** |
| G4 | **Brand Consistency** | Manual inspect 5 sample pages (home, login, pos, dashboard, receipt) | All 5 show OutfitWordmark/Monogram in correct palette, Poppins headings, Lora body |
| G5 | **Strict TypeScript** | `npm run typecheck` (tsconfig `strict` + `noUncheckedIndexedAccess`) | **0 type errors** |
| G6 | **Accessibility** | Axe-core 5 landing page scans | **0 serious/critical** each; WCAG 2.1 AA |
| G7 | **Receipt Print** | react-to-print → 3 browsers (Chrome, Safari, Firefox) print preview | 3/3 no cutoff, fits 80mm thermal + A4 |
| G8 | **Barcode Scan** | Camera scan SKU-GUC-0182 (Postman variable) | Resolves to product in ≤ 2 seconds |
| G9 | **Admin Analytics** | Dashboard KPI grid (4 cards) | 4 Recharts charts render; legends toggle correctly; palettes = Admin (Blue/Green/Orange) |
| G10 | **Offline POS** | DevTools offline → 3 transactions → reconnect | 3/3 synced; receipts printed; no data loss |
| G11 | **⛔ Admin-only Triple Lock** | MANAGER role → employees/accounts/monitor × (URL, button in UI, API call) | 9/9 checks BLOCKED (3 pages × L1/L2/L3 layers) |
| G12 | **Next.js Build** | `npm run build` | Success; each landing route initial JS ≤ 100 KB |
| G13 | **43 Hook Tests** | Each hook 1 success + 1 error case (86 assertions) | 86/86 PASS |

---

## APPENDIX B — API CONTRACT INDEX (Postman 43 Sections → Hook Files)

| Section # | Name of Section | Min Role Scope | Hook File(s) in `src/hooks/api/` |
|---|---|---|---|
| 00 | Login & Auth Setup | All | `useAuth.ts` |
| 01 | System & Health | PUBLIC (all) | `useSystem.ts` |
| 02 | Currency | PUBLIC (all) | `useCurrency.ts` |
| 03 | STAFF Read — Products | STAFF+ | `useProducts.ts` read |
| 04 | STAFF Read — Variants & Barcode | STAFF+ | `useVariants.ts` read |
| 05 | STAFF Read — Categories, Brands, Sizes, Colors | STAFF+ | `useCatalog.ts` read |
| 06 | STAFF Read — Bundles, Promotions, Branches | STAFF+ | `useBundles.ts`, `usePromotions.ts`, `useBranches.ts` read |
| 07 | STAFF Read — Inventory, Banners, Settings | STAFF+ | `useInventory.ts` read, `useBanners.ts` read, `useSettings.ts` |
| 08 | STAFF Use — Cart | STAFF+ | `useCart.ts` |
| 09 | STAFF Use — Wishlist | STAFF+ | `useWishlist.ts` |
| 10 | STAFF Use — Payments & Receipts | STAFF+ | `usePayments.ts` |
| 11 | CASHIER+ Session Management | CASHIER+ | `useSessions.ts` |
| 12 | CASHIER+ Customers CRUD | CASHIER+ | `useCustomers.ts` |
| 13 | CASHIER+ POS Shifts | CASHIER+ | `useShifts.ts` |
| 14 | CASHIER+ Orders & POS Checkout | CASHIER+ | `useOrders.ts` |
| 15 | CASHIER+ Invoices, Estimates, Gift Cards | CASHIER+ | `useInvoices.ts`, `useGiftCards.ts` |
| 16 | CASHIER+ Shipping & Offline Sync | CASHIER+ | `useShipping.ts` |
| 17 | CASHIER+ Dashboard & Alerts | CASHIER+ | `useStaffAlerts.ts` |
| 18 | MANAGER+ Analytics & Forecasting | MANAGER+ | `useAnalytics.ts` |
| 19 | MANAGER+ Categories CRUD | MANAGER+ | `useCatalog.ts` mutations (via `useCategoriesCrud`) |
| 20 | MANAGER+ Brands CRUD | MANAGER+ | `useCatalog.ts` mutations (`useBrandsCrud`) |
| 21 | MANAGER+ Sizes & Colors CRUD | MANAGER+ | `useCatalog.ts` mutations (`useAttributesCrud`) |
| 22 | MANAGER+ Products CRUD | MANAGER+ | `useProducts.ts` mutations |
| 23 | MANAGER+ Variants CRUD | MANAGER+ | `useVariants.ts` mutations |
| 24 | MANAGER+ Bundles CRUD | MANAGER+ | `useBundles.ts` mutations |
| 25 | MANAGER+ Promotions CRUD | MANAGER+ | `usePromotions.ts` mutations |
| 26 | MANAGER+ Suppliers CRUD | MANAGER+ | `useSuppliers.ts` |
| 27 | MANAGER+ Purchases CRUD | MANAGER+ | `usePurchases.ts` |
| 28 | MANAGER+ Stock Movements & Bulk Ops | MANAGER+ | `useInventory.ts` movements mutations |
| 29 | MANAGER+ Stock Transfers (5-Stage Lifecycle) | MANAGER+ | `useInventory.ts` transfers + sub-hooks |
| 30 | MANAGER+ Inventory Batches FIFO | MANAGER+ | `useInventory.ts` batches |
| 31 | MANAGER+ Branches | MANAGER+ | `useBranches.ts` mutations |
| 32 | MANAGER+ Image Uploads (Cloudinary) | MANAGER+ | `useImages.ts` |
| 33 | MANAGER+ Order Void | MANAGER+ | `useOrders.ts` `voidOrder()` mutation |
| 34 | MANAGER+ Audit Logs | MANAGER+ | `useAudit.ts` |
| 35 | MANAGER+ Marketing Banners CRUD | MANAGER+ | `useBanners.ts` mutations |
| 36 | MANAGER+ File Exports | MANAGER+ | `useExports.ts` |
| 37 | MANAGER+ MIS Reports | MANAGER+ | `useMISReports.ts` |
| 38 | MANAGER+ AI Intelligence | MANAGER+ | `useAI.ts` |
| 39 | MANAGER+ GDPR Compliance | MANAGER+ | `useGDPR.ts` |
| 40 | MANAGER+ Webhooks | MANAGER+ | `useWebhooks.ts` |
| 41 | ⛔ ADMIN ONLY — Employees CRUD | ADMIN ONLY | `useEmployees.ts` (triple-locked) |
| 42 | ⛔ ADMIN ONLY — User Account Management | ADMIN ONLY | `useAccounts.ts` (triple-locked) |
| 43 | ⛔ ADMIN ONLY — System Monitoring & Analytics | ADMIN ONLY | `useMonitor.ts` (triple-locked) |

> Count: **43 Sections** → **~41 named hook files** (sections combined where read+mutate target same resource, e.g. Products 03 + 22 = one `useProducts.ts`).

---

# END OF MASTER PROMPT FRAMEWORK

```
╔══════════════════════════════════════════════════════════════════╗
║  OutFIT — Master Prompt Engineering Framework                  ║
║  Built with: brand-guidelines skill x UX/UI Prompt Design       ║
║  Domain: outfit.kesararamwithdigital.tech                      ║
║  Copyright © 2026 OutFIT — Kesararam With Digital              ║
╚══════════════════════════════════════════════════════════════════╝
```
