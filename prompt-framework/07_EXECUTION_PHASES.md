# MODULE 07 — EXECUTION PHASES (STEP-BY-STEP INTEGRATION ROADMAP)

---

## PHASE 0 — SCAFFOLD (Shell script, 15-30 minutes)

```bash
cd /Users/Apple16/Documents/trae_projects/UI-FROTN

# ── 0.1 Create Next.js 14 app ──────────────────────────────
npx create-next-app@latest outfit-shop \
  --ts --tailwind --app --eslint \
  --no-src-dir=false --import-alias="@/*" --use-npm --yes

cd outfit-shop

# ── 0.2 Initialize shadcn/ui (New York style) ─────────────
npx shadcn@latest init -y -b new-york --defaults

# ── 0.3 Add 24 shadcn primitives ───────────────────────────
npx shadcn@latest add button input card form data-table dialog sheet \
  combobox calendar badge tabs tooltip dropdown-menu avatar \
  alert-dialog separator scroll-area collapsible switch checkbox \
  select label textarea slider popover sonner table

# ── 0.4 Prod dependencies (Module 01 §1.1 manifest) ────────
npm install \
  @tanstack/react-query@^5.50.0 \
  @tanstack/react-query-devtools \
  @hookform/resolvers \
  react-hook-form \
  zod \
  @zxing/browser \
  react-to-print \
  recharts \
  lucide-react \
  class-variance-authority \
  clsx \
  tailwind-merge \
  tailwindcss-animate \
  sonner \
  @radix-ui/react-dialog \
  @radix-ui/react-slot \
  @radix-ui/react-label \
  @radix-ui/react-select \
  @radix-ui/react-checkbox \
  @radix-ui/react-switch \
  @radix-ui/react-tooltip \
  @radix-ui/react-popover \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-avatar \
  @radix-ui/react-tabs \
  @radix-ui/react-alert-dialog \
  @radix-ui/react-separator \
  @radix-ui/react-scroll-area \
  @radix-ui/react-collapsible \
  @radix-ui/react-slider \
  @radix-ui/react-progress \
  axios \
  date-fns \
  dayjs \
  next-themes \
  idb \
  nanoid

# ── 0.5 Dev dependencies ───────────────────────────────────
npm install -D \
  vitest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @playwright/test \
  @axe-core/playwright \
  jsdom \
  msw \
  @tanstack/eslint-plugin-query

# ── 0.6 Playwright Chromium browser ────────────────────────
npx playwright install chromium

# ── 0.7 Smoke test ─────────────────────────────────────────
npm run dev
# Expected: http://localhost:3000 renders Next.js default welcome page.
# CTRL+C after confirm.
```

### Phase 0 Acceptance
- `ls outfit-shop/node_modules/.bin/next` returns file (Next installed)
- `ls outfit-shop/components/ui/button.tsx` — shadcn primitives in place
- `npm run typecheck` → 0 errors on scaffold

---

## PHASE 1 — FOUNDATION + RBAC (1-2 days)

| # | Task | Validate |
|---|---|---|
| 1.1 | Create `src/types/rbac.types.ts` (Module 02 §1: Role, PermissionBit, ROLE_RANK) | 5 enum values + 50+ PermissionBit strings TS-valid |
| 1.2 | Create `src/lib/rbac-matrix.ts` (Module 02 §3: hasRole/hasPermission) | Unit test: `hasPermission(STAFF,"employee:crud") === false` passes |
| 1.3 | Create `src/middleware.ts` (Module 01 §1.4) | Test curl to `/system/employees` unauth → 302 to /login |
| 1.4 | Write AuthProvider + login page (credentials form, JWT cookie) | Login as admin → cookie set; route to /dashboard works |
| 1.5 | Write RequireRole component (Module 02 §4) + RoleBadge | Render denied → shows PermissionDenied fallback |
| 1.6 | `next/font/google` Poppins + Lora in root layout | Page source → both font-face declarations present |
| 1.7 | Tailwind config 3-palette tokens (Module 01 §1.3) | `<Card variant=public>` / `staff` / `admin` render distinct colors |
| 1.8 | 4 Logo brand components: OutfitWordmark, Monogram, Lockup, RoleBadge | `/login` → Lockup centered above card |
| 1.9 | `ThemePaletteWrapper`: injects CSS vars based on route group (shop/staff/admin) | Navigate between (shop) → (staff) → palette swap with no flash |

### Phase 1 Acceptance
- Login flow works for all 4 credential sets in Postman Section 00
- MANAGER attempting `/system/employees` → redirected `/unauthorized`
- Visual: Staff layout bg `#FAF9F5`, Admin `#F2F4F8`, Login `#FFFFFF`

---

## PHASE 2 — API LAYER: ALL 43 HOOK FILES (2-3 days)

Loop over Postman Collection Sections **00 → 43**; for each:

1. Read endpoint group from `OutfitShop_Master_Collection.json` (it's the source of truth!)
2. Build Zod request/response schemas → `src/lib/zod-schemas/*.ts`
3. Build typed TanStack Query hook following SKILL 03 (Module 03) → `src/hooks/api/use<X>.ts`
4. Export query-key factory
5. Wire error-handling switch per Module 05 §1 (401/403/422/429/5xx)

**Output checklist:**
- 43 files in `src/hooks/api/` (count with `ls | wc -l` = 43)
- ~25 zod schema files in `src/lib/zod-schemas/`
- Axios interceptor: manually trigger 401 (invalid token) → auto logout + redirect

---

## PHASE 3 — PUBLIC SHOP (Palette A / Neo-Brutalist — Skill 08) (1-2 days)

| # | Page/Component | Audit |
|---|---|---|
| 3.1 | `(shop)/layout.tsx` + PublicHeader + PublicFooter | Inverted color test: all buttons have 2px black borders |
| 3.2 | `app/page.tsx` → Hero + 4 categories + New Arrivals + Brands | No `rounded-` or `shadow-` classes (grep) |
| 3.3 | `app/products/page.tsx` → FilterSidebar + ProductGrid | Mobile: 1 col. Tablet: 2. Laptop: 3. Desktop: 4 |
| 3.4 | `app/products/[slug]/page.tsx` → PDP gallery + variant picker | Add to cart → cart badge increments 0→1 |
| 3.5 | `cart/page.tsx`, `wishlist/page.tsx` | Update qty → total updates reactively |
| 3.6 | Neo-brutalism CI audit (Module 06 §2) in pre-commit hook | `npm run test:neo` passes |

---

## PHASE 4 — STAFF POS (Palette B / Warm POS — Skill 07) (2-3 days)

| # | Task | Validate |
|---|---|---|
| 4.1 | `(staff)/layout.tsx` + StaffShiftBanner + StaffSidebar | No shift open → POS buttons disabled, red banner |
| 4.2 | `pos/page.tsx` → split 60/40 layout | Desktop: split. <md: stacked (scan on top) |
| 4.3 | BarcodeScanner component + @zxing/browser camera | Scan SKU-GUC-0182 → resolves product in ≤ 2s |
| 4.4 | Quick ProductGrid + add-to-cart via + button | Cart line items appear in bottom-left |
| 4.5 | PaymentTender → multi-method cash/card/giftcard/wallet | Cash $20 on $14.50 → Change due $5.50 computed |
| 4.6 | Complete Sale mutation → react-to-print ReceiptTemplate | Print preview: 80mm thermal fits all fields |
| 4.7 | Shift open/close flows with opening float count | Close shift → cash count matches expected = success toast |
| 4.8 | OfflineSyncProvider → IndexedDB queue on 0/network error | DevTools offline → 3 sales held → reconnect → 3 synced |
| 4.9 | Customers CRUD, Orders list, Inventory lookup pages (CASHIER+) | CASHIER sees customers; STAFF sees soft banner when clicking Customers |

---

## PHASE 5 — ADMIN DASHBOARD (Palette C — Skills 05+06) (3-4 days)

| # | Task | Validate |
|---|---|---|
| 5.1 | `(admin)/layout.tsx` → AdminSidebar with 40+ nav links grouped by Sections 18-43 | Sidebar has collapsible groups: Analytics / Catalog / Inventory / Operations / Reports / System |
| 5.2 | `dashboard/page.tsx` → 4 MetricCards (GMV, AOV, Orders, Low Stock Alert) | Recharts renders, period pill switches data |
| 5.3 | Catalog Products: DataTable (SKILL 05) + Create/Edit Form (SKILL 04) | Create product via form → list refreshes with new row in <1s |
| 5.4 | Analytics: Sales / Inventory / Forecasting / AI pages | AI page: markdown render of intelligence endpoint response |
| 5.5 | Remaining Catalog: variants, categories, brands, sizes, colors, bundles, promotions CRUD | All 8 pages share a single DataTable wrapper component (reuse ≥ 70%) |
| 5.6 | Inventory deep: Purchases, Suppliers, Movements, Transfers (5-stage visual), Batches FIFO | Stock transfer 5 stages render as a horizontal step flow |
| 5.7 | Operations: Branches, Banners, Cloudinary uploads, Gift Cards, Shipping | Image upload → Cloudinary → product.image_url set |
| 5.8 | Reports: Exports (CSV/XLSX, MANAGER+ only), MIS (Section 37) | Export buttons hidden for CASHIER role |
| 5.9 | ⛔ SYSTEM ADMIN ONLY (triple-locked): Employees (#41), Accounts (#42), Monitor (#43) | MANAGER attempts direct URL → 403 /unauthorized in middleware, component, AND API call |
| 5.10 | System manager pages: Audit, Webhooks, GDPR, Voids, Settings | Audit page renders timelines of Section 34 endpoints |

---

## PHASE 6 — QA, SECURITY, A11Y (1-2 days)

| # | Task | Pass Criteria |
|---|---|---|
| 6.1 | Run full Playwright RBAC suite (Module 06 §1) | **220/220 assertions green** |
| 6.2 | Axe-core 5 landing pages (Module 06 §4) | Each: 0 serious/critical violations → WCAG 2.1 AA ≥ 95 |
| 6.3 | Keyboard-only smoke: /login → POS → complete sale → close print | No mouse needed; every step Tab/Enter/Esc only |
| 6.4 | Screen reader test: PDP variant selection, Add to cart flow | NVDA/VoiceOver announces state changes |
| 6.5 | Security headers + CSP in next.config.mjs | `curl -I` returns X-Frame-Options, X-Content-Type-Options, CSP |
| 6.6 | Receipt print in Chrome + Safari + Firefox (Module 06 §5.1) | 3/3 no overflow/cutoff |
| 6.7 | Barcode scan manual test (Module 06 §5.2) | SKU-GUC-0182 resolves, manual entry matches |
| 6.8 | Offline POS manual test (Module 06 §5.3) | 3 queued, sync 100% |
| 6.9 | ⛔ Admin-only final audit: MANAGER → 3 routes × 3 layers | 9/9 checks blocked |

---

## PHASE 7 — PRODUCTION BUILD + DEPLOY

```bash
# ── 7.1 Static checks ──────────────────────────────────────
npm run lint          # tsc strict + next lint → 0 errors
npm run typecheck     # explicit tsc
npm run test:unit     # Vitest → 100% RBAC unit test suite passes

# ── 7.2 Production build ───────────────────────────────────
npm run build
# Expected: Next build succeeds; ≤ 100KB initial JS per top-level route

# ── 7.3 E2E suite ──────────────────────────────────────────
npm run test:e2e
# 220 RBAC assertions + a11y scans + navigation flows all green

# ── 7.4 Deploy to Vercel ───────────────────────────────────
#  (configure with domain outfit.kesararamwithdigital.tech)
npx vercel --prod

# ── 7.5 Post-deploy smoke ──────────────────────────────────
open "https://outfit.kesararamwithdigital.tech/"
# Login → dashboard as admin → create product → complete POS sale
# Verify API calls route through api.kesararamwithdigital.tech correctly
```

---

## DURATION SUMMARY

| Phase | Estimated Duration |
|---|---|
| 00 Scaffold | 0.5 days |
| 01 Foundation + RBAC | 1-2 days |
| 02 API Hooks 00-43 | 2-3 days |
| 03 Public Shop | 1-2 days |
| 04 Staff POS | 2-3 days |
| 05 Admin Dashboard | 3-4 days |
| 06 QA / Security / A11y | 1-2 days |
| 07 Build + Deploy | 0.5 days |
| **TOTAL** | **11-19 days (experienced Next.js team)** |
