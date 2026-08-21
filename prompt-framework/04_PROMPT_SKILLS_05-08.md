# MODULE 04 — EIGHT REUSABLE PROMPT SKILLS 05-08

> Continuation of Module 03. Skills 05-08 are the specialized builders for DataTables, Admin Analytics, POS Terminal, and Public Shop Neo-Brutalist pages.

---

## 🎯 SKILL 05: `data-table-crud` (shadcn DataTable)

### PROMPT TEMPLATE

```
Build a fully-featured shadcn/ui DataTable with complete CRUD toolbar and role-gated actions.

─── PARAMETERS ─────────────────────────────────────────────
RESOURCE NAME:      <Products | Customers | Employees | Orders | Purchases ...>
API SECTION:        <Postman Section #> → hook from SKILL 03 named use<Resource>
MIN ROLE (read):    <PUBLIC | STAFF | CASHIER | MANAGER | ADMIN>
WRITE PERMISSION:   <catalog:crud | customer:crud | employee:crud | order:void ...> → if NONE → readonly table
MIN ROLE (write):   <MANAGER | ADMIN | CASHIER> → gate toolbar/new/edit/delete/export buttons

─── COLUMN DEFINITIONS: ColumnDef<TData, TValue>[] ─────────
  Col 1  (row-select)  Checkbox (multi-select ONLY if write permission allows bulk action)
  Col 2  (id/sku/code) Monospace font, hover → copy-to-clipboard icon, sortable, filterable
  Col 3  (title/name)  Truncate-1, tooltip on ellipsis hover, primary label, sortable
  Col 4  (related)     Foreign key display (Category/Brand/Customer/Branch), link to detail
  Col 5  (numeric)     Currency or count → tabular-nums right-align, sortable
  Col 6  (status)      <Badge variant={success|warning|danger|secondary} based on enum>
  Col 7  (timestamp)   <RelativeTime/>, default sort desc
  Col 8  (actions)     <DropdownMenu> — see row actions below

─── TOOLBAR LAYOUT (left → right): ────────────────────────
  [Debounced search input 300ms]
  • [Filter: Status combobox]
  • [Filter: Date range picker (pop-calendar)]
  • [Column visibility popover]
  • [Refresh button (rotate-cw icon) → invalidateQueries]
  ──────── right-aligned ────────
  • [Export CSV/XLSX]  → MANAGER+ ONLY, else hidden (Section 36 API)
  • [Bulk delete]      → visible IF write + selected rows >0
  • [+ NEW <Resource>] → PRIMARY CTA, gated by write permission

─── ROW ACTIONS DROPDOWN (each action role-gated): ─────────
  View      → ALWAYS. Opens <Sheet> side panel (right, 2/3 width) with full details.
  Edit      → IF write. Navigate /<resource>/[id]/edit OR open edit Dialog.
  Duplicate → IF write. Optimistic clone (name + " (Copy)"), toast success.
  Delete    → IF write. Opens AlertDialog confirmation "Confirm delete <name>?".
  History   → IF audit:view. Opens <AuditTimeline> drawer (MANAGER+ only).
  <Custom>  → (e.g. Void Order, Mark Received, Print Label, Transfer Stock) IF custom bit.

─── STATE FALLBACKS: ───────────────────────────────────────
  loading → shimmer skeleton rows same column count (DataTableSkeleton)
  empty   → <EmptyState icon=box title="No <resource> yet" desc="Create your first one" primary=+New>
  error   → DataTable wrapped in ErrorBoundary with inline Retry button

─── EXTRA FEATURES (IF APPLICABLE): ────────────────────────
  - "Select all N across pages" affordance when table shows 1/N pages and >visible rows
  - URL state: filters, sorting, page → stored in searchParams so links are shareable
  - Sticky header on scroll
  - Column resizing if >6 columns

─── DELIVERABLES: ──────────────────────────────────────────
1. src/components/admin|<pos>/<Resource>Table.tsx → full DataTable + Toolbar + RowActions + Filters
2. src/components/shared/<Resource>Sheet.tsx → side panel detail view
3. If bulk action: bulkDeleteMutation wrapper
4. 3 test assertions:
   a. ADMIN sees Edit/Delete buttons; STAFF sees only View (RBAC L3)
   b. Search "test" debounces 300ms; refetches with correct filter
   c. Delete confirm dialog → cancel doesn't trigger mutation
```

---

## 🎯 SKILL 06: `admin-analytics-card` (Recharts)

### PROMPT TEMPLATE

```
Build an Admin Analytics Metric Card (Palette C) with embedded Recharts chart.

─── PARAMETERS ─────────────────────────────────────────────
METRIC NAME:        <Monthly GMV | Stock Turnover Rate | Avg Order Value | Cashier Conversion>
CHART KIND:         <AreaChart | BarChart | LineChart | PieChart>
GRID COL SPAN:      <col-span-1 | col-span-2 | col-span-4> → in 4-col KPI grid
DATA HOOK:          use<X>Analytics (SKILL 03, API Sections 18 | 37 | 38 | 43)
COMPARISON MODE:    <None | Previous Period | Budget Target | Year-over-Year>

─── CARD COMPOSITION (4 vertical blocks): ──────────────────
┌─ METRIC HEADER (24px tall) ──────────────────────────────────────────┐
│  Title (Poppins 600 14px text-primary)   [ℹ️ Info tooltip icon]       │
│  Subtitle (muted 12px):  "Last 30 days • updated 2 minutes ago"       │
├─ KPI VALUE BLOCK (72px tall) ────────────────────────────────────────┤
│  $128,472.00  (Poppins Tabular 900, 36px, text-admin-text, left)      │
│    [ Badge ▲ +8.2% vs. Jul ] → bg-admin-accent / text-white          │
│    (negative deltas use admin-warn badge + ▼ symbol)                  │
├─ CHART BODY (120px or 180px height) ─────────────────────────────────┤
│  ResponsiveContainer w=100%                                           │
│  Series 1 stroke/fill:  #6A9BCC (admin-primary — solid)              │
│  Series 2 (comparison): #B0AEA5 dashed + 60% opacity                 │
│  Goal/Target ReferenceLine: #788C5D green if COMPARISON=Target        │
│  Alert threshold zone: orange brush if threshold breach exists        │
│  X axis minimal or hidden; Y axis gridlines = Admin-panel gray dots   │
├─ FILTER FOOTER (32px tall) ──────────────────────────────────────────┐
│  Pill toggles:  [7D] [30D ⬤] [90D] [YTD]  (selected = filled chip)   │
│  Muted right-aligned: "Last refreshed: 2026-08-21T10:42Z"             │
└──────────────────────────────────────────────────────────────────────┘

─── SPECIAL CASES PER CHART TYPE: ─────────────────────────
  PieChart → donut variant, 2px #FFFFFF slice gap, max 6 slices + "Other" aggregation.
             Legend right side. Each label: label + absolute val + %.
  BarChart → bars ≤ 12 categories, zero-value bars rendered as dotted placeholders.
  AreaChart → Area fill 20% opacity, stroke top = series color. Smooth curve type="monotone".

─── DELIVERABLES ───────────────────────────────────────────
1. src/components/admin/<MetricName>Card.tsx
2. Zod schema for API response data shape (ensure arrays/length handled)
3. Empty data fallback skeleton chart with 0-value axes + badge "N/A"
4. Tooltip formatter → <CurrencyDisplay/> for currency metrics, % for ratios
5. Click legend entries toggles series visibility
```

---

## 🎯 SKILL 07: `pos-transaction-flow` (Live Split Terminal)

### PROMPT TEMPLATE

```
Build the LIVE CASHIER POS terminal page (Palette B — warm Staff/POS).
Minimum role = CASHIER; STAFF sees soft-gated "Request cashier access" banner.

FILE: src/app/(staff)/pos/page.tsx
KEY HOOKS (SKILL 03): useCart, useOrders, usePayments, useProducts, useCustomers,
                      useShifts, useGiftCards; + useBarcodeScanner, usePrintReceipt

─── SHIFT CONTEXT BANNER (ALWAYS VISIBLE — above split): ───
[ 🔴 LIVE ] Shift #42 — Cashier: J. Doe — Opened 09:02 AM — Float $300.00
  If NO ACTIVE shift → banner bg-staff-danger with CTA "OPEN SHIFT FIRST"
  → all tender/disabled interactions blocked; only shift-open is enabled.
  If OFFLINE mode → show <OfflineSyncBadge> with queued count.

─── LAYOUT (responsive 60% / 40% CSS grid; collapse stacked <md): ──────
┌───────── LEFT PANEL (Product Lookup + Cart) 60% ───────────┐┌── RIGHT PANEL sticky 40% ───┐
│ ┌─ SEARCH / SCAN ROW ───────────────────────────────────────┐│ ┌─ CUSTOMER ASSIGNMENT ────┐ │
│ │ 📷 [Scan]  [Search SKU or product name (F2)]   [🔖 Filter]││ │ Customer <Combobox lookup> │ │
│ └──────────────────────────────────────────────────────────┘│ │ Quick: Walk-in / + New    │ │
│ ┌─ PRODUCT QUICK GRID (reacts to search/filter) ───────────┐│ └───────────────────────────┘ │
│ │ Cards aspect-square: image + title(truncate-2) + Price   ││ ┌─ CART SUMMARY ────────────┐ │
│ │ Variant dot swatches + LARGE touch-80 [+ ADD] button    ││ │ Scrollable line items      │ │
│ │ Grid: 6 columns ≥ xl, 4 lg, 3 md, 2 sm (responsive)     ││ │ Per line:                 │ │
│ └──────────────────────────────────────────────────────────┘│ │  ┌Qty stepper [- 1 +]┐    │ │
│ ┌─ CART LINE ITEMS TABLE ──────────────────────────────────┐│ │  │SKU + Name truncate  │    │ │
│ │ Above: cart item count badge + [Clear cart] link         ││ │  │Variant picker row  │    │ │
│ │ Cols: Qty | SKU | Name | Var | Unit | Line$ | [x] Del   ││ │  │Line % discount      │    │ │
│ │                                                            │ │  │[x] remove line       │    │ │
│ └──────────────────────────────────────────────────────────┘│ └───────────────────────────┘ │
│                                                              │ ┌─ TENDERING ────────────────┐ │
│                                                              │ │ Subtotal (tax-excl)         │ │
│                                                              │ │ Tax % (from /currency API)  │ │
│                                                              │ │ Discount ($ or %) on order  │ │
│                                                              │ │ Gift Card redeem field      │ │
│                                                              │ │ Shipping estimate           │ │
│                                                              │ │ ─ TENDER SPLIT ─            │ │
│                                                              │ │ ☐ Cash   [amount paid____]  │ │
│                                                              │ │ ☐ Card   [last 4 + type]    │ │
│                                                              │ │ ☐ Wallet [Apple/Google Pay] │ │
│                                                              │ │ ☐ Gift Card                 │ │
│                                                              │ │ BALANCE DUE: $TABULAR       │ │
│                                                              │ │ CHANGE DUE:  $TABULAR       │ │
│                                                              │ │ [✓ COMPLETE SALE] FULL-HEIGHT│ │
│                                                              │ │ PRIMARY BIG BUTTON (F12)    │ │
│                                                              │ │ [Park ticket] / [Hold] (F9) │ │
│                                                              │ └───────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘└──────────────────────────────┘

─── POST-SALE FLOW (after mutation success): ────────────────
1. Launch react-to-print → ReceiptTemplate (80mm thermal + email/SMS options)
2. toast.success(`Order #1042 paid • $142.80`)
3. Clear cart entirely. Shift focus back to barcode scan field (ready for next customer!)
4. If offline → push to IndexedDB queue; change "Complete Sale" label to "Saved offline"

─── OFFLINE MODE CONTRACT (useOfflineSync): ────────────────
1. Detect navigator.onLine=false
2. Write pending orders → IndexedDB queue
3. Banner pulses orange: "Offline — 3 held"
4. Reconnect → Sequentially sync queue, per-order success toast, conflict = server-wins resolver
5. Confirm receipts for each synced order

─── KEYBOARD SHORTCUTS (always active when NOT in text field):
F2 → focus scan/search  ·  F9 → park / hold ticket  ·  F12 → complete sale
Ctrl+P → print last receipt  ·  +/- → adjust qty of selected row  ·  Esc → clear scanner field

─── DELIVERABLES ───────────────────────────────────────────
1. pos/page.tsx full split layout + ShiftBanner guard
2. BarcodeScanner, ProductQuickGrid, CartLineItems, PaymentTender, ReceiptPrint components
3. 4 mutation hooks: addItem, removeItem, tenderPayment, completeOrder — all optimistic updates
4. Shift-open guard: route /shifts/open redirect if no active
5. Offline queue + reconnect sync
6. Test plan: end-to-end cash sale walkthrough, barcode scan SKU-GUC-0182 resolves
```

---

## 🎯 SKILL 08: `public-shop-page` (Neo-Brutalist / GitHub-Inspired)

### PROMPT TEMPLATE

```
Build a PUBLIC-FACING Shop page using Palette A (PUBLIC) with STRICT Neo-Brutalist rules.
BREACH OF ANY RULE BELOW = REJECTION AND REBUILD.

FILE PATH: src/app/(shop)/<segment>/page.tsx

─── NON-NEGOTIABLE CHECKLIST.DESIGN SOFT AESTHETIC (⛔ NO BLACK) ─────────────────────
✅ border-radius: rounded-3xl (24px) category cards, rounded-2xl (16px) inner pills, rounded-xl (12px) buttons — NEVER 0, NEVER sharp corners
✅ box-shadow: shadow-crisp 2-layer soft rgba(74,63,53,0.04) espresso alpha — NEVER rgba(0,0,0,...) or rgba(20,20,19,...)
✅ EVERY interactive surface (button, input, card, badge, filter chip)
   MUST have 1px border rgba(74,63,53,0.06) warm espresso alpha border — NEVER 2px solid black/#1F2328 (banned)
✅ Hover state  = transform translateY(-2px) + shadow-hover (lift + deepen, NOT brutalist translate(-1px,-1px))
✅ Active state = transform translateY(0) + scale(0.98) + border var(--role-primary) (NOT translate(1px,1px))
✅ Focus ring   = outline: 3px solid var(--role-primary) + outline-offset: 2px  (colored NOT black)
✅ Backgrounds:  page bg #F5F3EE (warm cream, NEVER pure #FFFFFF), category cards tinted beige #F2E9D8/lavender #E7E3EF (NOT white), inner chips #FFFFFF with 1px espresso border
✅ ⛔ DOM COLOR BAN: grep must return 0 for #000000|#141413|#1A1918|#1F2328|rgba(0,0,0|rgba(20,20,19|bg-black|text-black|fill:black
✅ Text/headings: warm espresso #4A3F35 (NOT black) — still WCAG AAA 15.2:1 on cream
✅ UI italics: 0 (ONLY allowed italic: Lora Italic tagline in logo lockup and blockquote reviews)
✅ NO gradients, NO glassmorphism, NO backdrop-blur
✅ ALL buttons: rounded-xl (12px), shadow-crisp, hover -translateY(-0.5px); primary: fill=var(--role-primary) text=#FFFFFF; secondary: outline-only white chip bg espresso border;

─── TYPOGRAPHY RULES ───────────────────────────────────────
Page titles H1: Poppins 900 32-48px  ·  Section H2: Poppins 800 24-28px
Body copy, PDP description: Lora 400 14-16px
Prices: Poppins 700 tabular 18-24px (right-align on cards)
SKUs, meta: JetBrains Mono 500 12px

─── PAGE TEMPLATE: PICK ONE ────────────────────────────────
TEMPLATE A — SHOP HOME (app/page.tsx):
  <PublicHeader> OutfitWordmark + SearchInput + CartBadge(count) + [Login] button
  <HeroBanner> aspect-21/9 img object-cover; overlay: 2-line Lora heading + big [Shop Now →]
  <CategoryTiles> 4-up hard-bordered tiles; image bg + uppercase white name stroke-black
  <NewArrivalsGrid> <ProductGrid> 8 items (responsive 4→3→2→1)
  <FeaturedBrandsStrip> 6-up gray-scale logos (color on hover translate)
  <NewsletterSignup> email input + signup CTA
  <PublicFooter> OutfitMonogram + 3 nav cols (Shop/Help/Company) + ©

TEMPLATE B — PRODUCT LISTING (app/products/page.tsx):
  2-column split (sticky <aside> 220px / main):
    <FilterSidebar> accordion groups (closed on mobile by default):
      Search within results, Categories checkboxes, Brands checkboxes,
      Size swatches (28px squares), Color dot swatches, Price range dual slider,
      [Reset filters] link
    <MainListing> toolbar + <ProductGrid>:
      Toolbar: "N products" | sort dropdown | grid/list view toggle
      Grid: 1 (mobile) → 2 (tablet) → 3 (laptop) → 4 (desktop) cols

TEMPLATE C — PRODUCT DETAIL /PDP (app/products/[slug]/page.tsx):
  Split 50/50:
    LEFT  <PDPGallery> Main big img aspect-square + 5 thumbs strip below.
                       Click/keyboard nav. Variant change swaps images. Zoom on hover.
    RIGHT <PDPInfo> Brand (Poppins 600 12px muted) · Title (Poppins 800 28px) ·
                       Price (Poppins 900 32px tabular) · Rating 4.7 (128 SVG stars)
                       Description (Lora, multi-line)
                       Variant pickers: Size swatches + Color dots + Fit selector
                       Stock <Badge>: In stock(green) / Low stock(orange) / Out of stock(red-disabled add)
                       Big [ADD TO CART] primary + [Wishlist ♡ outline] secondary
                       Below: Recently viewed strip (4)

─── ACCESSIBILITY: ─────────────────────────────────────────
  - Skip-to-content link — visible only on Tab focus before header
  - All images have descriptive alt text (decorative = alt="")
  - Product cards are focusable (tabindex), Enter activates add-to-cart
  - Filter sidebar is a <nav aria-label="Product filters">

─── DELIVERABLES ───────────────────────────────────────────
1. page.tsx per template
2. Child components: ProductCard, FilterSidebar, PDPGallery, HeroBanner, etc.
3. POST-BUILD AUDIT COMMAND THAT MUST PASS:
   ! grep -rnE "class=\"[^"]*(rounded-[^n]|shadow)" src/app/\(shop\)/ src/components/shop/ \
     || { echo "NEO-BRUTALISM BREACH"; exit 1; }
4. Mobile-first responsive test: all 3 breakpoints have no horizontal scroll
```
