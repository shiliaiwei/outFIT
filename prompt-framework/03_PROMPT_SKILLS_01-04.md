# MODULE 03 — EIGHT REUSABLE PROMPT SKILLS 01-04

> **Usage Pattern:** When requesting a coding-agent to build a component/page/hook/form, copy the relevant SKILL prompt and append the SPECIFIC parameters.

---

## 🎯 SKILL 01: `ui-component-build` (Universal)

### PROMPT TEMPLATE

```
Build a typed React/Next.js component for the OutFIT application following the strict rules below.

─── PARAMETERS (FILL IN BEFORE PROMPTING) ──────────────────
COMPONENT CATEGORY:  <Card | FormField | Modal | Table | Chart | Button | Badge | LayoutHeader | LayoutSidebar | Misc>
COMPONENT NAME:      <PascalCase e.g. ProductCard, RoleBadge>
TARGET ROLE:         <PUBLIC | STAFF | ADMIN>     → selects palette (Module 00 §2)
VISUAL THEME:        <Neo-Brutalist(Public) | POS-Warm(Staff) | Admin-Data(Admin)>

USER JOB TO BE DONE (1 sentence):
  "As a <role>, I want to <action> so that <outcome>."

PROPS INTERFACE (TypeScript):
  name: string                        // <purpose>
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?:    'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  on<EventName>?: (e: <EventType>) => void
  children?: React.ReactNode
  className?: string
  <+ any additional typed props, fully documented>

─── RULES ──────────────────────────────────────────────────
1. Use shadcn/ui primitives (already installed) as base. NEVER re-invent buttons/dialogs.
2. Icons from lucide-react (assume available).
3. Styling: use Tailwind classes + class-variance-authority (CVA) for variant/size/palette axes.
4. Palette tokens: reference ONLY colors from Module 00 §2 (exact hex values for the role).
5. ⛔ NO BLACK RULE (per Module 00): NEVER use #000000/#141413/#1F2328/#1A1918. Warm espresso #4A3F35 = MAX dark (text/stroke ONLY, never shape bg). If role === PUBLIC → checklist.design aesthetic: rounded-3xl category cards (24px), rounded-2xl inner pills (16px), rounded-xl buttons (12px), tinted pastel card bg (beige #F2E9D8/lavender #E7E3EF NOT white), 1px border rgba(74,63,53,0.06) (warm espresso alpha NEVER black), shadow-crisp 2-layer soft depth, hover: translateY(-2px) NOT brutalist translate(-1px,-1px).
6. Accessibility:
   - All interactive elements have aria-label / aria-labelledby / role where appropriate
   - Keyboard: Tab-ordered, Enter/Space activates buttons/links, Escape closes modals/dialogs
   - Color contrast ≥ 4.5:1 (WCAG AA)
7. Memoization: wrap with React.memo() if component will be re-rendered in lists.
8. Forward refs where the component wraps a DOM element (forwardRef + ForwardRefExoticComponent type).
9. Exports:
   - Named export for Props interface (export interface Props { ... })
   - Default export OR named export of component (be consistent)
   - CVA variant record exported for reuse

─── DELIVERABLES TO OUTPUT ─────────────────────────────────
1. Full TypeScript source of src/components/<folder>/<ComponentName>.tsx
2. If form-bearing → Zod validation schema for the value shape
3. Usage example snippet: <ComponentName variant='primary' size='md' onX={...}>children</ComponentName>
4. Unit test checklist: 5-8 assertions (renders correctly, events fire, states work, a11y)
5. Visual diff note: what it SHOULD look like next to sibling components
```

---

## 🎯 SKILL 02: `rbac-page-layout`

### PROMPT TEMPLATE

```
Scaffold a role-gated Next.js 14 App Router page for OutFIT.

─── PARAMETERS ─────────────────────────────────────────────
PAGE PATH:      src/app/<(shop)|(staff)|(admin)>/<subroute>/page.tsx
PARENT LAYOUT:  <(shop) | (staff) | (admin)> → chrome wrapper
PAGE CATEGORY:  <Dashboard | CRUD-list | CRUD-form | POS-terminal | Report | Settings | Detail-view>

MINIMUM ROLE:   <STAFF | CASHIER | MANAGER | ADMIN>     (see Module 02 Matrix)
REQUIRED PERMISSION BIT:  <e.g. "catalog:crud" — see Module 02 §1 PermissionBit>
ADMIN ONLY:     <true | false>

NAV CONTEXT:
  Sidebar parent:  e.g. "Analytics > Sales"
  Breadcrumb trail: ["Home","Analytics","Sales"]
  Page title:      <"Sales Analytics Dashboard">
  Subtitle:        <"Track GMV, AOV, basket composition by period.">

CONTENT BLOCKS (render top→bottom; ALL required unless marked N/A):
  1. <PageHeader> — title, subtitle, right-side primary CTA group, <RoleBadge/>, period filter combobox
  2. <RoleBanner elevation> — "VIEWING AS MANAGER: You have extended privileges. Actions are audited."
  3. <SearchFilterBar> — debounced search 300ms, 2-4 facet comboboxes (Status, Category, DateRange, etc.), reset button, refresh button (invalidates queries)
  4. <MainContent> — pick ONE:
       • DataTable (for CRUD-list / Report / Detail grid) — use SKILL 05
       • ChartGrid (for Dashboard / Report) — MetricCard grid + Recharts
       • Form (for CRUD-form / Settings) — use SKILL 04
       • SplitPanel (for POS) — use SKILL 07
  5. <EmptyState> — icon + title + primary CTA (rendered when main content returns 0 records)
  6. <PaginationFooter> — if list: pageSize selector + prev/next + results summary "Showing 1-15 of 2,847"

─── RBAC LAYER ENFORCEMENT (ALL 3 LAYERS — MANDATORY) ─────
  Layer 1 middleware.ts: already configured in Module 01 §1.4 → verify route pattern listed.
  Layer 2 <RequireRole>: wrap the page's ROOT element with:
    <RequireRole allowed={[<MIN_ROLE>]} redirect={true}> ... </RequireRole>
  Layer 3 Button-level: wrap each sensitive CTA with hasPermission() check:
    {hasPermission(role,"<permission_bit>") && <Button>Action</Button>}

─── TANSTACK QUERY PATTERN ─────────────────────────────────
  • Server side (generateMetadata): await queryClient.prefetchQuery()
  • Client: useSuspenseQuery() inside <HydrationBoundary>
  • Loading: <SkeletonGroup> matching grid of main content
  • Error: ErrorBoundary with friendly message + Retry button

─── DELIVERABLES ───────────────────────────────────────────
1. page.tsx file (Next.js 14 App Router, default export async function)
2. All subcomponents inline or referenced
3. generateMetadata() SEO function with role-aware title
4. 3 RBAC layer markers (code comments // L1, // L2, // L3 at each enforcement point)
5. Test plan: which 5 routes/users to test
```

---

## 🎯 SKILL 03: `api-integration-hook` (TanStack Query v5)

### PROMPT TEMPLATE

```
Create a typed TanStack Query v5 integration hook for OutFIT, matching Postman contract.

─── CONTRACT PARAMETERS (MUST MATCH OutfitShop_Master_Collection.json EXACTLY) ─────
Postman Section:     <# Section 00-43, e.g. "Section 03 - STAFF Can Read — Products">
HTTP Method:         <GET|POST|PUT|PATCH|DELETE>
Endpoint:            <full path, use :paramName for placeholders — e.g. /products/:id>
Base URL:            $NEXT_PUBLIC_API_BASE (https://api.kesararamwithdigital.tech/api/v1)
Authorization:       <"PUBLIC — none" | "Bearer token (any role)" | "Bearer CASHIER+" | "Bearer MANAGER+" | "⛔ Bearer ADMIN ONLY">

ZOD REQUEST SCHEMA (for params, query, body):
  z.object({
    <fieldName>: <zod validator with full constraints>,
    ...
  })

ZOD RESPONSE SCHEMA:
  z.object({
    success: z.literal(true),
    data:    z.object({ <shape of the returned data> }),
    message: z.string(),
    meta:    z.object({ page: z.number(), per_page: z.number(), total: z.number() }).partial().optional(),
  })

─── HOOK NAMING / CONFIG ───────────────────────────────────
EXPORTED HOOK NAME:      use<PascalCaseResource>  (e.g. useProducts, useCreateProduct)
QUERY KEY (for reads):   ['<resource>','<scope>', <serialized_filter_object>]
STALE TIME (ms):         <Dynamic POS: 30000  | Catalog list: 300000  | Static ref: Infinity>
CACHE TIME (ms):         <2 × staleTime>
SUSPENSE WRAP:           <true for page-critical data | false for background>
REFETCH ON MOUNT:        <false for long caches | true for live>

─── ERROR HANDLING SWITCH (per response status) ────────────
  401 → logout() → redirect `/login?returnUrl=<current>` (handled by axios interceptor already)
  403 → render <PermissionDenied/> inline + toast.warning("Role scope insufficient")
  422 → Zod.safeParse the error response → map per-field errors to setError() (RHF forms)
  429 → Read Retry-After header → toast.error(`Ratelimited. Retry in <X>s.`) + exponential backoff
  5xx → logger capture + render ErrorBoundary fallback with Retry button (server issues)
  0 (network offline) → OfflineSyncProvider queues mutation + retry when back online

─── MUTATIONS (for POST/PUT/PATCH/DELETE) ──────────────────
  onMutate:   (variables) → snapshot current queryCache data, set optimistic value, RETURN { snapshot }
  onError:    (_err, _vars, ctx) → rollback cache = ctx.snapshot → toast.error()
  onSuccess:  (_data, vars, _ctx) → invalidateQueries({ queryKey: affectedKeys })
  onSettled:  () → additional refetches if needed

─── PAGINATION ─────────────────────────────────────────────
  For list endpoints → implement keepPreviousData for smooth transitions;
  Pass per_page / page from request schema;
  Export useInfiniteQuery variant if dataset supports cursor pagination.

─── DELIVERABLES ───────────────────────────────────────────
1. src/hooks/api/use<X>.ts file
2. Exported query-key factory:
   const productKeys = { all:['products'], list:(f)=>['products','list',f], detail:(id)=>['products','detail',id] }
3. Re-exported Zod schemas for use in forms (SKILL 04)
4. Two test assertions minimum:
   a. Mock success response → parse succeeds, data structure matches Zod
   b. Mock 403 → component renders PermissionDenied, no crash
```

---

## 🎯 SKILL 04: `form-with-validation` (RHF + Zod)

### PROMPT TEMPLATE

```
Build a React Hook Form v7 + Zod v3 form for OutFIT.

─── PARAMETERS ─────────────────────────────────────────────
FORM PURPOSE:       <"Create Product" | "Customer Checkout" | "Employee Edit" | "Shift Open">
API ROUTE:          <METHOD /path — matched via SKILL 03 hook>
MIN ROLE:           <PUBLIC | STAFF | CASHIER | MANAGER | ADMIN>

ZOD SCHEMA (copy/expand from SKILL 03 response/request schemas):
  z.object({
    name:        z.string().min(2).max(120).trim(),
    sku:         z.string().regex(/^SKU-[A-Z]{3}-\d{4}$/),
    price:       z.coerce.number().positive().lte(999999),
    category_id: z.coerce.number().int().positive(),
    status:      z.enum(["active","draft","archived"]),
    <+ any additional fields; add .refine() custom rules when >1 field interact>
  })
  .refine( (data) => data.salePrice ? data.salePrice < data.price : true, {
     path:["salePrice"], message:"Sale price must be below retail"
  })

LAYOUT PATTERN:  <Single-page | Stepper(n) | Tabbed(n) | ModalDialog>

─── FIELD → CONTROL MAP (per field): ───────────────────────
  short string        → <Input> (shadcn) with placeholder
  long text / rich    → <Textarea> rows=6
  enum (<=6)          → <RadioGroup> inline
  enum (>6) / FK      → <Combobox searchable> with async fetcher (SKILL 03)
  boolean / toggle    → <Switch> inline w/ description
  number / currency   → <Input type=number> + left adornment (currency symbol from /currency API)
  date / datetime     → <Popover + Calendar> date picker (shadcn)
  image(s)            → CloudinaryUploader component (SKILL 05/API Section 32) + thumbnail preview
  barcode / SKU       → Hidden field + launch <BarcodeScanner> popover (SKILL 07)
  tags                → multi-select <Combobox creatable>

─── SUBMIT FLOW (5 steps — atomic): ────────────────────────
  1. CLIENT VALIDATE: form.trigger() → all field errors render inline (red text below label + red Input border)
  2. LOADING STATE:   submitBtn.disabled + <Spinner/>, aria-busy=true on form, rest aria-disabled
  3. MUTATION:        call use<Resource>Mutation() from SKILL 03
  4. SUCCESS:         toast.success("Saved • <id>", {description}) → form.reset() → router.push(`/parent/${id}`)
  5. ERROR Triage:    422 → map fieldErrors via setError; 403 → overlay PermissionDenied; 5xx → toast.error summary

─── FORM LAYOUT DETAILS: ───────────────────────────────────
  - max-w-2xl centered unless large CRUD (then 4-col grid)
  - Field groups with <Label> above, helper text below, error below helper
  - Asterisk (*) in label for z.required() fields
  - Dirty indicator: dot next to modified field labels (optional)
  - Reset button secondary variant; Submit primary
  - If Stepper → progress bar at top, stepper state stored in formState

─── DELIVERABLES ───────────────────────────────────────────
1. src/components/<folder>/<FormName>.tsx
2. Exported <zodSchema> (reuse in SKILL 03 validation)
3. defaultValues() function → prefills edit mode from router.query id
4. Two unit test cases:
   a. Valid submit → mock mutation called with correct payload shape
   b. Invalid submit → each error message appears correctly mapped to its field
```
