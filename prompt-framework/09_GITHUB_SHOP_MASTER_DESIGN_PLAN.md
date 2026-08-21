# OUTFIT — MASTER DESIGN PLAN: GitHub Shop-Inspired UI/UX Brand Shop

> **Brand:** OutFIT · Tagline: *Wear. Confidence.*  
> **Domain:** outfit.kesararamwithdigital.tech  
> **Aesthetic North Star:** GitHub's shop.thegithubshop.com × Minimalist Neo-Brutalism (zero radius, zero shadow, 2px black borders).  
> **Reference Stack:** Next.js 14 · TypeScript strict · Tailwind + shadcn/ui · TanStack Query v5  
> **Brand Continuity:** This plan is COMPATIBLE and CONSISTENT with the existing 10-module prompt framework (see `/prompt-framework/` folder). It expands the PUBLIC SHOP layer (Palette A).

---

# ═══════════════════════════════════════════════════════════
# PART 1 — SITE STRUCTURE & PROJECT ORGANIZATION
# ═══════════════════════════════════════════════════════════

---

## 1.1 Information Architecture — Inspired by GitHub Shop

GitHub Shop IA is **flat, search-first, category-driven** without mega-menus. OutFIT adapts this to apparel: 4 primary top-level destinations, everything else accessible via search or structured category landing pages.

```
                        ┌───────────────────────────────┐
                        │      OutFIT WORDMARK + Search │
                        │   Cart (N)  ·  Wishlist  ·  Me│
                        └─────────┬─────────────────────┘
                                  │ PRIMARY NAV (4 items)
               ┌──────────┬───────┴───────┬──────────┬──────────────┐
               │          │               │          │              │
            NEW         SHOP          BRANDS      LOOKBOOK      ACCOUNT
          (landing)   (catalog)    (brand list)  (editorial)  (menu flyout)
               │          │               │          │              │
               ▼          ▼               ▼          ▼              ▼
         ┌─────────┬──────────┐   ┌────────────┐  Stories   ┌────────────┐
         │ Featured│Just In   │   │A-Z Brand   │  Outfit   │  Orders    │
         │ Drops   │Curated   │   │grid        │  Ideas    │  Wishlist  │
         └────┬────┴────┬─────┘   └─────┬──────┘  3-5 posts │  Addresses │
              │         │              │                │   │  Returns   │
              ▼         ▼              ▼                ▼   └────────────┘
         Category   Collection    Brand Landing    Lookbook Detail
         Landing    Page          Page (hero +     (image +
         (hero +    (lookbook-style  product grid)  shoppable
         product     editorial)                      hotspots)
         grid)
              │
              ▼
       Product Detail Page (PDP)
          ┌───┴───┐
     Gallery   Info ┈┈ Size/Color/Fit ┈┈ Add to Cart / Wishlist
          │
          ▼
      Recently Viewed
```

---

## 1.2 Tiered Navigation Framework (3 Nav layers + Mobile)

### LAYER 1 — GLOBAL HEADER (sticky, `components/layout/PublicHeader.tsx`)
| Element | Desktop Behavior | Mobile Behavior |
|---|---|---|
| **OutFIT Wordmark** | Left, 100px width, links to `/` | Left, 80px width |
| **Search (icon or full bar)** | Full input 320px w/ placeholder "Search tees, hoodies, SKU-GUC-0182" | Icon → tap expands fullscreen overlay input |
| **Primary Nav (NEW / SHOP / BRANDS / LOOKBOOK)** | 4 links inline, underline on hover + active state | Collapses into ☰ hamburger → sheet drawer |
| **Utility:** Wishlist ♡ | Icon + count badge | Icon only |
| **Utility:** Cart 🛒 | Icon + count badge + Hover preview sheet | Icon + badge |
| **Utility:** Account 👤 | Signed in → avatar + role badge; guest → "Sign in" | Same (inside hamburger if < sm) |

**Search keyboard:** Cmd/Ctrl+K → focuses search. `/` hotkey on non-input elements too.

### LAYER 2 — CATEGORY FLYOUT / BREADCRUMBS
On the **SHOP** landing page (`/products`), a sticky **FilterSidebar** (left 220px or top on mobile) provides:
- Categories checkboxes
- Brands checkboxes  
- Size swatches (S/M/L/XL — 28px squares)
- Color dot swatches
- Price range dual slider
- Fit (Regular/Slim/Oversized/Running) enum
- Sort (Featured / Newest / Price ↑↓ / Best selling)

All filter state syncs to `?searchParams=` so URLs are shareable. Breadcrumbs render on every level ≥ 2 deep:
> Home / Shop / Tops / Graphic Tees / "Octocat Stack Tee"

### LAYER 3 — FOOTER (4 columns, content-dense minimal)
| Col 1: OutFIT | Col 2: Shop | Col 3: Support | Col 4: Company |
|---|---|---|---|
| Monogram lockup, tagline | New Arrivals, All Products, Tops, Bottoms, Outerwear, Accessories, Sale | Shipping & Returns, Size Guide, Contact Us, FAQ, Track Order | About OutFIT, Careers, Press, Sustainability, Terms, Privacy |
| + Newsletter (email input → signup) | | | |

---

## 1.3 Product Categorization System (Taxonomy & URLs)

### Primary Category Tree (apparel-centric)
```
/products
├── /tops
│   ├── /t-shirts
│   ├── /hoodies-sweatshirts
│   ├── /long-sleeve
│   ├── /button-ups
│   └── /jackets-outerwear
├── /bottoms
│   ├── /pants
│   ├── /shorts
│   └── /skirts-dresses
├── /accessories
│   ├── /hats-caps
│   ├── /bags-backpacks
│   ├── /socks
│   ├── /stickers-patches
│   └── /phone-cases
├── /footwear
├── /collections
│   ├── /github-archive
│   ├── /inclusive-technology
│   └── /limited-drops
└── /sale
```

### Product Detail Page (PDP) URL Pattern:
`/products/[category]/[slug]` → example: `/products/t-shirts/octocat-stack-tee`

### Product Schema (Catalog Page Fields):
```ts
interface Product {
  id: number | string;
  sku: string;                 // "SKU-GUC-0182" (from Postman)
  slug: string;                // kebab-case SEO
  name: string;                // "Octocat Stack Tee — Black"
  category: CategoryRef;
  brand: BrandRef;
  price: number;               // retail
  salePrice?: number;          // if on sale → red badge
  status: "active" | "draft" | "archived";
  fit: "regular" | "slim" | "oversized" | "running";
  colors: Color[];             // dot swatches + label
  sizes: Size[];               // size key: S/M/L, label, in-stock bool
  images: Image[];             // [0]=default hero, then alt angles, lifestyle
  thumbnail: Image;            // grid card image
  description: string;         // Lora body copy
  materials: string;           // "100% organic cotton, 220 gsm"
  care: string[];              // ["Machine wash cold", ...]
  rating: number;              // 0-5
  reviewCount: number;
  tags: string[];              // ["new","bestseller","limited"]
  relatedIds: string[];        // "you may also like"
  createdAt: string;
}
```

---

## 1.4 User Account Management & Authentication Modules

### Public Pages (no auth required):
- `/login` — credentials OR OAuth (Google, GitHub if backend supports) + remember me
- `/register` — minimal fields (name, email, password)
- `/forgot-password`, `/reset-password`
- `/cart`, `/products/*`, `/collections/*`, `/brands/*`, `/lookbook/*`

### Customer-Authenticated `(customer)` Route Group:
```
app/(customer)/
├── layout.tsx                     # Account sidebar chrome
├── account/
│   ├── page.tsx                   # Dashboard — recent orders, wishlist shortcut, size profile
│   ├── orders/
│   │   ├── page.tsx               # Orders DataTable: # / Date / Items / Total / Status
│   │   └── [orderId]/page.tsx     # Order detail + tracking + return CTA + reorder
│   ├── wishlist/
│   │   └── page.tsx               # Wishlist grid + share/export + move to cart
│   ├── addresses/
│   │   ├── page.tsx               # Saved address book (max 6)
│   │   ├── new/page.tsx           # Add address form
│   │   └── [id]/edit/page.tsx
│   ├── returns/
│   │   └── page.tsx               # Return requests status
│   └── profile/
│       ├── page.tsx               # Name, email, password change
│       └── size-profile/page.tsx  # Height/weight/preferred fit for size recommendations
```

### Access control for customer routes:
- Use existing `middleware.ts` pattern with `MIN_ROLE = PUBLIC (authenticated customer flag)`
- All customer pages wrapped in `<RequireRole allowed=[CUSTOMER,STAFF,CASHIER,MANAGER,ADMIN]>`

---

## 1.5 Checkout Flow Framework (4 Steps, Low Friction)

**Goal:** ≤ 3 minutes from Add-to-Cart → Thank-You. 4 maximum screens, minimal fields.

```
Step 1: CART                    Step 2: INFORMATION
┌──────────────────────────┐    ┌────────────────────────────────────┐
│ Line items / qty / price │    │ Contact: email (already logged in?)│
│ Promo code / gift card   │    │ Shipping: 1-click (saved address) │
│ Est. shipping + tax      │    │                                    │
│ [Proceed to Checkout →]  │    │   [Continue to Shipping →]        │
└──────────────────────────┘    └────────────────────────────────────┘
          │                                 │
          └──────────┬──────────────────────┘
                     ▼
Step 3: SHIPPING METHOD          Step 4: PAYMENT + REVIEW
┌──────────────────────────────┐ ┌─────────────────────────────────────┐
│ ⚪ Standard (5-7d)  $5.99     │ │ Card number (Stripe-style fields) │
│ 🔵 Express  (2-3d)  $14.99    │ │ Exp / CVV / Cardholder name       │
│ 🟥 Overnight (1d)  $29.00    │ │ Billing address (same as shipping?)│
│ [Continue to Payment →]      │ │ ☐ Save card for next time         │
└──────────────────────────────┘ │ Summary: items, ship, tax, total  │
                                 │ [Complete Order] primary big CTA  │
                                 │ Order #1042 Thank-You (receipt)   │
                                 └────────────────────────────────────┘
```

**Guest checkout:** Yes, allow. Step 2 asks email only. No account **required** — but post-purchase we show: "Create password → save order history".

**Fields per step (count audit):**
- Cart: 0 manual fields; qty steppers (UI control)
- Info: 1 (email) + 6 address if guest; 1-click if logged-in + saved address
- Shipping: 0 fields (radio select)
- Payment: Stripe card widget (externalized) + billing same toggle (1 checkbox)
- **TOTAL MAX INPUT FIELDS per guest checkout:** ~8
- **TOTAL MAX INPUT FIELDS per logged-in + saved address:** email + 4 card fields → **5 fields total**

---

## 1.6 Project File Structure Extensions (PUBLIC Shop Layer)

Building on top of existing structure from `01_ARCHITECTURE_FOLDER_TREE.md`:

```
src/app/(shop)/
├── layout.tsx
├── page.tsx                              # Home (NEW landing)
├── products/
│   ├── layout.tsx                        # FilterSidebar chrome
│   ├── page.tsx                          # SHOP landing = All products
│   ├── [category]/
│   │   ├── page.tsx                      # /products/tops → category listing
│   │   └── [slug]/page.tsx               # PDP
│   └── search/page.tsx                   # Search results (for Cmd+K /search?q=)
├── collections/
│   ├── page.tsx                          # Collection index
│   └── [slug]/page.tsx                   # Collection landing (editorial)
├── brands/
│   ├── page.tsx                          # A-Z brand grid
│   └── [slug]/page.tsx                   # Brand page (hero + products)
├── lookbook/
│   ├── page.tsx                          # Editorial feed
│   └── [slug]/page.tsx                   # Story + shoppable hotspots
├── sale/
│   └── page.tsx                          # Sale grid w/ %-off badges
├── cart/
│   └── page.tsx                          # Step 1 Cart
├── checkout/
│   ├── layout.tsx                        # Progress steps bar
│   ├── information/page.tsx              # Step 2
│   ├── shipping/page.tsx                 # Step 3
│   └── payment/page.tsx                  # Step 4 + success
└── account/
    └── ... (see §1.4)

src/components/shop/                      # extends existing shop/ folder
├── navigation/
│   ├── PublicHeader.tsx                  # Layer 1
│   ├── PublicHeaderMobile.tsx
│   ├── SearchOverlay.tsx                 # Cmd/Ctrl+K sheet
│   ├── NavFlyoutMenu.tsx                 # Category mega-menu
│   ├── Breadcrumbs.tsx
│   └── PublicFooter.tsx
├── collection/
│   ├── CategoryHero.tsx
│   ├── CollectionGrid.tsx
│   └── BrandGrid.tsx
├── lookbook/
│   ├── StoryCard.tsx
│   ├── ShoppableHotspot.tsx
│   └── LookbookGallery.tsx
├── product/
│   ├── ProductCard.tsx                   # Grid card
│   ├── ProductCardListVariant.tsx        # List variant
│   ├── ProductGrid.tsx                   # Container
│   ├── ProductListSkeleton.tsx           # Loading
│   ├── FilterSidebar.tsx
│   ├── FilterChipRow.tsx
│   ├── PDPGallery.tsx
│   ├── PDPInfo.tsx
│   ├── SizeFitPicker.tsx
│   ├── ColorSwatches.tsx
│   ├── SizeGuideModal.tsx
│   ├── QuantityStepper.tsx
│   ├── RatingStars.tsx                   # SVG stars (NO emoji ⭐)
│   ├── ReviewsList.tsx
│   ├── BadgeGroup.tsx                    # "New" / "Sale" / "Limited"
│   ├── RecentlyViewed.tsx
│   └── YouMayAlsoLike.tsx
├── cart/
│   ├── CartDrawer.tsx                    # Header mini-cart preview
│   ├── CartLineItems.tsx
│   ├── CartEmptyState.tsx
│   └── PromoGiftCardField.tsx
├── checkout/
│   ├── CheckoutProgress.tsx              # 4-step stepper
│   ├── AddressForm.tsx
│   ├── ShippingOptions.tsx
│   ├── PaymentWidget.tsx
│   └── OrderSummary.tsx
└── editorial/
    ├── NewsletterSignup.tsx
    ├── HeroSplit.tsx
    ├── BrandStoryBanner.tsx
    └── DroppedBanner.tsx                 # "Just dropped — limited"
```

### Content & Asset Organization:
```
public/
├── images/
│   ├── products/                         # SKU-named: SKU-GUC-0182_hero.jpg
│   │   └── [SKU]/
│   │       ├── 1_hero.jpg, 2_angle.jpg, 3_lifestyle.jpg
│   ├── collections/
│   ├── brands/
│   ├── lookbook/
│   └── pages/                            # Home hero split image etc.
└── content/                              # Optional: local MDX if no CMS
    ├── lookbook/
    │   └── [slug].mdx
    └── pages/
        └── about.mdx

# Content platform recommendation:
#   - If Headless CMS → Sanity / Contentful — PDP long copy in CMS
#   - Static-only → MDX in public/content (above)
```

---

# ═══════════════════════════════════════════════════════════
# PART 2 — ANIMATION STRATEGY (Minimal, Purpose-Driven, Performance-Safe)
# ═══════════════════════════════════════════════════════════

> **Philosophy (GitHub-inspired):** Animation must **communicate state change or improve usability**. Zero decorative "look cool" animations that don't carry UX meaning. Target: ≤ 200ms, 60fps on 2018 mid-tier phones, **NO layout shift, NO LCP impact**.

## 2.1 Animation Implementation Stack

| Technique | When to use | Notes |
|---|---|---|
| **Pure CSS transitions** (Tailwind `transition-*`) | Hover, active, focus states, toggles | GPU-only: `transform`, `opacity`, `background-color`. Avoid animating `width/height/margin/padding`. |
| **CSS `@keyframes`** + Tailwind `animate-*` | Page load stagger, loading skeletons pulse | Max 2 keyframe anims per page at once |
| **Framer Motion** if installed; else fallback: **View Transitions API** + `startViewTransition` | Page transition: product list → PDP back | Only if Next.js 14 supports (it does via experimental flag). Default to route-change opacity + slide. |
| **IntersectionObserver** + `.animate-in` data attr | Scroll-triggered content reveal | `threshold: 0.15`. Root margin -50px top. |
| **TanStack Query `isPending` state flags** | Loading skeletons, button spinners | NEVER use global loading bars; use per-element skeleton shapes. |
| **`prefers-reduced-motion: reduce`** media query | GLOBAL: reduce ALL animations to 0ms opacity changes only | Add to globals.css as override. NON-NEGOTIABLE for a11y. |

---

## 2.2 Prioritized Animation Index (21 Animations, Priority 1 = Ship first)

### TIER 1 — P0 (Ship day 1. Critical usability feedback.)

| # | Name | Where | Animation Spec | Duration | Easing |
|---|---|---|---|---|---|
| 01 | **Product Card Hover — Lift** | `components/shop/product/ProductCard.tsx` on `group-hover` | `transform: translate(-1px, -1px)` + `border-width: 3px` (Neo-Brutalist press-up) + `bg: #F6F8FA` | 80ms | `ease-out` |
| 02 | **Product Card — Active Press** | Same, on `:active` (mouse/touch down) | `transform: translate(1px, 1px)` + `border-width: 1px` (press-in) | 60ms | `ease-in` |
| 03 | **Primary CTA Button Hover** | All `<Button variant=primary>` | translate(-1,-1) + border 3px | 80ms | ease-out |
| 04 | **Wishlist Heart Fill** | Product card ♡ click | Empty SVG heart → filled heart. Stroke-dash 100% → 0 draw-on (SVG `stroke-dashoffset`) | 200ms | ease-out |
| 05 | **Add-to-Cart Success Fly-in** | PDP / product card — "Added" state + Cart badge count increment | Cart nav icon pulses scale(1→1.15→1); count `0`→`1` fades up from below; small checkmark ✔ SVG toast slides in | 240ms total | ease-out-back |
| 06 | **Line-Item Qty Stepper +/-** | Cart line items, PDP | Numeric value increments with a micro translateY (old value up+out, new value down+in) | 120ms | ease |
| 07 | **Input/Combobox Focus Ring** | All form controls | Outline width 0 → 3px solid #0969DA, outline-offset 0 | 80ms | ease-out |
| 08 | **Loading Skeleton Shimmer** | All DataTables / ProductGrid while `isPending=true` | Background gradient sweep L→R loop on skeleton placeholders | 1500ms loop | linear infinite |

### TIER 2 — P1 (Ship within Phase 3. Adds polish.)

| # | Name | Where | Spec | Duration |
|---|---|---|---|---|
| 09 | **Page-Enter Stagger (Cards)** | ProductGrid on first render | `opacity 0→1, translateY(8px→0)` each card +20ms delay per index (stagger). Cap stagger max 400ms. | 180ms per card |
| 10 | **Product List → PDP Transition** | Navigate `/products` → `/products/t-shirts/octocat` | Shared element animation on the product image (scale + move to PDP gallery hero if DOM is adjacent). Fallback: fade previous route 0.2s + fade new route 0.3s. | 260ms total |
| 11 | **Filter Drawer (Mobile)** | FilterSidebar `< sm` breakpoint | Slide in from right edge (full-height sheet, 92% width). Backdrop: bg #000 30% opacity 0→1. | 220ms | ease |
| 12 | **Cart Drawer Open/Close** | Header 🛒 click | Slide from right 380px width. Backdrop. Body scroll lock. | 240ms | ease-out |
| 13 | **Size Guide Modal** | SizeFitPicker "View size guide" | Centered modal fade+scale(0.96→1). Backdrop fade in. Esc key closes. | 180ms | ease |
| 14 | **Checkout Progress Fill** | `CheckoutProgress.tsx` 4-step bar | Active step → `w-0→w-full` on the connecting bar; step number circle fills color. | 300ms per step |

### TIER 3 — P2 (Ship after P0/P1 stable. Delight, not usability.)

| # | Name | Where | Spec | Duration |
|---|---|---|---|---|
| 15 | **Scroll Reveal — Section Blocks** | Home page section-by-section (Hero → New Drops → Featured → Brands → Newsletter → Footer) | Fade + translateY(16→0). Trigger when 15% in viewport via IntersectionObserver. ONCE only, no retrigger on scroll back. | 420ms |
| 16 | **Collection Hero Parallax (Subtle)** | `/collections/[slug]` large hero image | Background-image translate 0 → -20px relative to scroll. 0.12 parallax factor (VERY subtle). **Disabled on mobile / reduced motion.** | continuous |
| 17 | **Recently Viewed Stack** | PDP bottom "Recently viewed" carousel | Swipeable horizontal rail w/ snap points. Slide left as new item pushed (max 6 items; oldest pops out). | 200ms |
| 18 | **Sale Badge Flash-in** | Grid cards with sale price | Badge scale 0.8 → 1 bounce + opacity 0 → 1 on first render (staggered). | 180ms |
| 19 | **Logo Nav Scroll-Shrink** | PublicHeader: scrollY > 200px | Logo scale 1→0.85, header height 72→60, padding top reduces. Eased transition. | 160ms |
| 20 | **Toast Confirmation** | Add-to-cart / saved address / order placed (Sonner `toast.success`) | Enter: slide up + fade. Exit: fade + translate down. Minimal text. | 220ms |
| 21 | **Empty State Illustration Fade** | CartEmptyState / 0-results search | Centered SVG illustration fades in, soft bounce on the graphic. | 500ms |

---

## 2.3 Explicitly EXCLUDED Animations (Do not implement)

| ❌ DO NOT ADD | Why |
|---|---|
| Confetti, fireworks, particle bursts on purchase | Performance hit, distracting, breaks GitHub-minimal tone. |
| Parallax > 0.2 factor | Causes jank on mobile, LCP degradation. |
| Animated gradient backgrounds / aurora effects on page elements | Heavy GPU use, distracting, not brand-aligned. |
| Auto-rotating carousel hero (no user input) | A11y nightmare (motion pollution), ignores WCAG 2.2 pause requirement. Use static hero OR manual arrows only. |
| 3D CSS transforms (perspective, rotateY etc.) on product cards | High GPU cost, breaks brand aesthetic (no neo-brutalist flat style). |
| Text "typewriter" or fade-per-letter headlines | Slows comprehension, CLS risk, reduces text scanability. |
| Spinner / loader that blocks page (> 40px) above-the-fold | Skeleton shapes ALWAYS preferred. No circular spinner overlay. |
| Cursor-tracking custom cursor, hover trailing glow, "follow pointer" | Brand = utilitarian GitHub Shop. Zero cursor gimmicks. |
| Infinite scroll with auto append (without explicit "Load more" button) | Memory leaks, SEO pagination broken, scroll hijacking. Use cursor pagination WITH button or proper `<Link>` rel=next. |
| "Back to top" floating button with animated rocket/arrow | Unnecessary; users have scroll gestures. Only add if pages reach > 4000px average. |
| Animated progress bar at top of page (YouTube-style) on route change | Decorative, Next.js already provides Suspense skeletons at component level. |

---

## 2.4 Animation Accessibility & Performance Rules

1. **Reduced-motion override:** In `globals.css` add:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.001ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.001ms !important;
     }
   }
   ```
   → This **forces every animation** to instant toggle (no transition). Safe default.

2. **No animation during page load (LCP/FID):**
   - Never animate: hero image, first 6 product cards, search box, header CTAs.
   - Wait for `window.load` (or `useEffect` mount + rAF double rAF) before triggering Tier 3 scroll animations.

3. **`will-change: transform, opacity`** pre-hint ONLY on elements that WILL animate (ProductCard, CartDrawer, backdrop). Remove after animation completes if used sparingly.

4. **Performance budget:**
   - Any single animation ≤ **400ms** total (except loops like shimmer).
   - Max **4 concurrent** animations at any frame.
   - DevTools Performance tab recording for typical task: load `/products` → 1 PDP → add to cart → open cart drawer: frame drops **< 3 total dropped frames** on M1 Air.

5. **SEO:** Never animate content that contains text that will be indexed (e.g. page H1). Animations on decorative elements only.

---

# ═══════════════════════════════════════════════════════════
# PART 3 — DO'S AND DON'TS FRAMEWORK
# ═══════════════════════════════════════════════════════════

---

## 3.1 Mandatory Do's (Must-Ship with Every Feature)

### 3.1.1 Responsive Design — Seamless Across All Device Sizes

- **Mobile-first development workflow:** Start CSS at `min-width: 0` (no media query), then progressively enhance `sm` (640), `md` (768), `lg` (1024), `xl` (1280), `2xl` (1536). Never style desktop-first and patch mobile.
- **Grid breakpoints for ProductGrid:** 1 col (`< 640px`) → 2 col (sm) → 3 col (lg) → 4 col (xl). Verified visually at 360px (iPhone SE) / 768px (iPad mini) / 1440px (laptop).
- **Touch targets ≥ 44×44 CSS pixels** on: add-to-cart, qty stepper, filter chip close, wishlist, nav icons, checkout steps radio.
- **Fluid typography** with `clamp()`:
  - H1: `clamp(2rem, 4vw + 1rem, 3.5rem)`
  - Body: `clamp(0.95rem, 0.85rem + 0.25vw, 1.05rem)`
- **No horizontal scroll at ANY breakpoint:** Audit with DevTools device emulation at 320px → `document.body.scrollWidth === document.body.clientWidth` must be `true`.
- **Safe area insets** on iOS notch: `padding-left: env(safe-area-inset-left)` on sidebars, `padding-bottom` on fixed-bottom checkout CTAs.

### 3.1.2 WCAG 2.1 Accessibility — 100% of Interactive Elements

- **Color contrast ≥ 4.5:1** (AA) for all body text; ≥ 3:1 for large text ≥ 18pt bold; ≥ 3:1 for UI components (button borders against their background). Run axe-core on every page before PR.
- **Skip-to-content link:** First focusable element on every page: `<a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2">` — visible only on Tab focus.
- **All interactive elements focusable via Tab** in logical DOM order. Focus ring NEVER removed (no `outline: none` without substitute). Use `focus-visible` for aesthetic focus.
- **`<img>` alt tags:**
  - Product image: `alt="${product.name} — ${product.colors[0].name}, size ${product.sizes[2].label}"` (descriptive, not empty)
  - Decorative: `alt=""` + `aria-hidden="true"`
- **Icon-only buttons MUST have `aria-label`:**
  - ❌ Bad: `<Button><Heart /></Button>`
  - ✅ Good: `<Button aria-label="Add to wishlist: Octocat Tee"><Heart /></Button>`
- **Form fields:** Every `<Input>` MUST have a `<label htmlFor=...>` (or `aria-label` for search). No placeholder-as-label.
- **Color is never the only meaning:** `Sale` badges = red background **AND** text "Sale 30% OFF" (not just red text). Low stock = orange + "Only 2 left" copy.
- **Keyboard equivalents for drag/swipe:**
  - Shoppable hotspots: Tab navigates between them, Enter opens.
  - Horizontal recently-viewed carousel: arrow keys scroll, Home/End jump to ends.
- **Screen-reader landmarks:** `<header role="banner">`, `<main id="main">`, `<nav aria-label="Primary">`, `<aside aria-label="Filters">`, `<footer role="contentinfo">`.

### 3.1.3 Consistent Typography System (Modern + Readable)

- **One H1 per page, semantic:** `<h1>` only on page-level title (home hero headline; PDP product name; collection title). H2-H6 hierarchy sequential. Never skip a heading level.
- **Brand fonts loaded synchronously with `swap` display:** Poppins/Lora via `next/font/google` — no FOUT. Fallback stack (Arial / Georgia) must visually match Poppins/Lora metrics to reduce CLS.
- **Max line length (measure):** Body-copy columns cap at 65-75 characters (≈ 28-32em). Use `max-w-prose` + `leading-7` (1.75 line-height).
- **Paragraph spacing:** 1.5rem margin bottom; never `<br><br>`. Blockquotes / lists get their own vertical rhythm.
- **No italics on UI microcopy.** Italics only allowed in:
  1. Product review quotes (Lora Italic)
  2. Lockup tagline "Wear. Confidence."
  3. Editorial lookbook article body emphasis (use sparingly, < 5% of text)
- **All caps / tight tracked small caps:** Reserved for filter section labels and breadcrumb trail. Never on paragraph text.

### 3.1.4 Asset Optimization — Sub-2s LCP Target

- **Images:** `next/image` mandatory. Every product image served as:
  - AVIF / WebP (next/image auto), `quality=75`, responsive `sizes` attribute correct
  - LCP hero image → `priority={true}` + `fetchpriority="high"`
  - All below-fold images → `loading="lazy"` (next/image default)
  - `placeholder="blur"` + static `blurDataURL` (SVG data URI generated per SKU)
- **Lazy load below-fold iframes** (YouTube product video, reviews widget).
- **SVG icons:** `lucide-react` (cherry-pick per file, NO whole-package import). SVG logos: single color paths, no embedded raster, optimized via SVGO (strip metadata).
- **Fonts:** Preload 2 weights only (Poppins 600, 900; Lora 400) — others `display:swap`.
- **Bundle:** `next build` audit → `< 100KB` initial JS per landing route. Run `@next/bundle-analyzer` weekly. Tree-shake Recharts (import only the chart components used per page, not the entire package).
- **CSS:** Tailwind JIT purges unused classes. Total CSS bundle `< 30KB`.

### 3.1.5 Clear, Consistent CTAs — E-commerce Usability Patterns

- **Primary button (one per page above fold):** Always `#D97757` (Anthropic Orange public-primary) background / `#FFFFFF` text / 1px espresso border rgba(74,63,53,0.06) / rounded-xl 12px radius. Copy VERB-FIRST (Add to Cart / Checkout Now / Save Changes). ⛔ NEVER 2px #1F2328 black border or 0 radius.
- **Secondary button (non-destructive neutral):** White pill-chip style. Background #FFFFFF, border 1px rgba(74,63,53,0.06) warm espresso alpha, rounded-2xl 16px.
- **Destructive button:** Red `#CF222E` bg, white text, rounded-xl. NEVER use for "Remove from cart" (use secondary X icon instead). Save destructive for "Cancel order", "Delete account".
- **Button copy consistency:**
  - ❌ "Go", "Submit", "Okay", "Send it!"
  - ✅ "Place Order", "Save Address", "Apply Promo Code", "Add to Wishlist"
- **Loading state:** All async CTAs get disabled + `aria-busy=true` + spinner INSIDE (text stays, spinner right-aligned). Width of button never changes on loading.
- **CTA hierarchy on PDP (from most important to least):**
  1. **[Add to Cart]** — Primary, full width, height 56px (big touch target), always sticky on mobile scroll.
  2. **♡ Wishlist** — Secondary, equal height, adjacent or below.
  3. **Share / Size guide / Shipping estimate** — Ghost/tertiary, smaller, inline link style.

### 3.1.6 User-Friendly Search + Filtering

- **Global search (Cmd+K):** Debounced 250ms; results group into: Products (prioritized) / Collections / Brands / Lookbook articles. Each result shows thumbnail + price + breadcrumb.
- **Empty search:** Show popular categories + "Trending searches" chips.
- **Filtering (always visible sidebar on desktop, sheet on mobile):**
  - **Active filter chips row** above grid — each chip can be clicked × to remove; "Clear all" link at end of row.
  - **Result count** always visible ("Showing 1-24 of 347 tees") + sort select adjacent.
  - **No "View all" infinite pages.** Every category page has working pagination ≤ 100 results per page.
  - **Zero-results friendly:** `"No products match your filters. Try clearing filters →" + "Reset filters" button + suggested alternatives grid.`
- **Faceted filter logic:** Multi-select `OR` within same group, `AND` across groups (e.g., colors: Black OR White AND sizes: XL).

---

## 3.2 Critical Don'ts (Zero Tolerance, Fail PR Immediately)

### 3.2.1 Page Clutter — Never Overcrowd

- **NEVER fill > 40% of the viewport area with product cards above-the-fold.** Hero + 1 CTA row + max 4 "new drop" cards = enough. Trust whitespace.
- **Grid gutters ≥ 24px between cards** (`gap-6`). No wall-to-wall images. Visual breathing room = brand perception of quality.
- **Sidebar items capped per group:** Max 10 categories with "Show more" expand. Never 30 checkboxes open at once.
- **Home page: ≤ 6 sections total.** No 20-scroll long landing page with 12 mini-collections. Content-dense ≠ dense. If user scrolls past 2x viewport → refactor to a collection page instead.
- **No cross-sell panels inside checkout flow.** Step 1-4 = linear, no "You may also like" detours until thank-you page post-purchase.
- **No floating widgets (WhatsApp chat bubble, cookie banner blocking CTA, AI assistant).** Cookie consent = footer-height dismissable bar. No floating icons on product content.

### 3.2.2 Performance NEVER Sacrificed for Decorative Animation

- **Any animation ≥ 500ms → automatic PR rejection.** (Exception: shimmer skeleton infinite loop, but that's 1500ms lineared, justified as loading communication — pure CSS.)
- **No Lighthouse performance score < 90.** CI enforces it.
- **No page > 2MB total transfer (uncompressed) on first visit (hero + 6 products).** Use WebPageTest budget from day one.
- **No JS blocking critical rendering path.** All non-critical scripts: `defer` attribute (Next.js does most by default — audit).
- **"It looks cooler" is NEVER a reason to add animation.** If the PR description can't explain "state change communicated = X", delete the animation.

### 3.2.3 Consistent Branding / Design — No Style Bloat Across Pages

- **NEVER introduce new colors outside Module 00 §2 PALETTE A.** PR adding a `#ff00cc` to a product badge = rejected. Use public-success/public-danger tokens. ⛔ NO BLACK: `#1F2328` and `#141413` permanently BANNED. espresso `#4A3F35` = max dark text/stroke only.
- **Border-radius checklist.design soft rounded on Public shop.** Category cards rounded-3xl (24px), inner pills rounded-2xl (16px), buttons rounded-xl (12px). CI grep: `grep -rn 'rounded-none' src/app/(shop) src/components/shop` → must return ZERO hits on UI elements (dividers OK). No "just this one modal" sharp corner exceptions.
- **Box shadows on Public shop = soft 2-layer espresso alpha.** Cards: shadow-crisp rgba(74,63,53,...). CI grep for `rgba(0,0,0` or `rgba(20,20,19` → MUST return 0. (Never pure black alpha shadow.)
- **Typography components only:** Headlines never set with arbitrary `text-5xl font-serif` inline. Always use the semantic H1-H6 classes + utility `.font-heading` / `.font-body`.
- **No emoji.** Zero. Not in chip labels, not in empty-state illustrations, not in footer "Made with ❤️ OutFIT". Replace "Made with ❤" → `Made with <Heart icon>` (SVG solid heart, same color as text).
- **Gradient count = 0 public shop.** No button gradients, no hero overlays, no product image overlays. Flat color, always. (Neo-brutalist rule.)

### 3.2.4 Checkout Flow — No Excessive Inputs

- **Max 8 fields for GUEST checkout (logged-in = 5 fields, see §1.5).** If adding fields ("How did you hear about us?" / "Birthday for 10% off") → push them to a post-purchase optional survey on the thank-you page, NEVER block the buy.
- **"Create account" checkbox = NEVER pre-checked.** GDPR. Default unchecked.
- **No mandatory phone number field** (unless shipping provider legitimately requires it; make it conditional).
- **No multi-page per-step redirects.** Single-page app-style 4 steps with `<Suspense>` client transitions; URL updates `/checkout/information` → `/checkout/shipping` etc., but no full server redirect flash.
- **No back navigation kills cart state.** Navigating from step 3 → step 2 must preserve all inputs. `Back` browser button works.

### 3.2.5 Readability — Never Low-Contrast Text

- **Any text contrast < 4.5:1 (body) or 3:1 (large UI text) = automatic PR failure.** Use Stark plugin or WebAIM Contrast Checker on every new color pair.
- **NO `#999999` on `#FFFFFF`** (ratio 2.86:1, FAILS). Use the `--public-muted` token `#656D76` which passes at 4.54:1. Audit every muted timestamp, meta line, SKU label.
- **NO `color: inherit` on disabled buttons** with opacity 0.4. Compute the resulting contrast — if fails, use a darker gray explicit disabled token.
- **Never put light text on a lifestyle image without a 40%+ opaque dark gradient overlay.** If that breaks neo-brutalism flat rule → put text below image instead.
- **No `text-2xs` / font-size < 12px for user content.** Minimum readable size = 12px (only for legal disclaimers); body baseline = 16px.

### 3.2.6 Accessibility Testing — Never Skip It

- **No PR merges to main for (shop) pages without axe-core passing locally.** Add a Husky pre-push hook that runs component a11y unit tests.
- **No custom radio / checkbox without a full label hit-area wrapper.** Clicking the label MUST toggle the control.
- **Never use CSS `pointer-events: none` on a non-decorative element** — it removes keyboard + screen-reader access.
- **No fixed header that obscures focus-on-scroll.** If focus lands on an anchor, use `scroll-margin-top: 80px` on main content to account for sticky header height.
- **Every modal/drawer/sheet:** Test these 6 items manually:
  1. Focus trapped inside (Tab doesn't escape).
  2. Esc key closes.
  3. Click backdrop closes.
  4. Focus returns to trigger element on close.
  5. Screen reader announces role="dialog" + aria-labelledby.
  6. Body scroll is locked while open.
- **No toast that auto-dismisses in < 5 seconds** WCAG 2.2. Minimum 5s; allow "Dismiss" button. Critical errors (payment failed) → no auto dismiss.

---

## 3.3 Extended: Tone-of-Voice Copywriting Do's & Don'ts (Brand Alignment)

### ✅ Copy Do's
- Write the way GitHub Shop writes: **Warm, confident, a little dry-witted**, never hype-bro.
- Product title: `"Octocat Stack Tee — Black"` (descriptive, factual, emoji-free).
- Button CTAs: Verb-first direct.
- Empty cart: `"Your cart is waiting for its next favorite piece. Let's go find it. →"` CTA "Start Shopping".
- Out-of-stock size: `"XL in Black sold out. Notify me when restocked →"` (not "Sorry, we're out! 😭")

### ❌ Copy Don'ts
- No exclamation marks on product tiles (max 1 per 5 pages total on home/editorial only).
- No ALL CAPS PARAGRAPHS shouting.
- No "HOT DEAL!! 🔥 FLASH SALE!!" clickbait — OutFIT communicates value, not urgency scams.
- No first-person "We at OutFIT believe..." marketing fluff inside PDP specs. Move to About/Lookbook if it belongs anywhere.

---

# ═══════════════════════════════════════════════════════════
# PART 4 — EXECUTION PRIORITY ROADMAP (Ship Order)
# ═══════════════════════════════════════════════════════════

| Sprint | Scope | Key Outputs |
|---|---|---|
| **WEEK 1** | Site Structure (Part 1) | Global header + footer + 4-item nav, blank Home + Products + PDP shell routes, Taxonomy URL structure, Customer account skeleton (stubs), Checkout 4-step empty shells. |
| **WEEK 2** | P0 Animations (2.2 Tier 1) + all Do's | ProductCard + hover/press, Wishlist heart, Add-to-cart fly-in, Focus rings, Skeleton shimmer; Responsive + a11y audits passing on 3 pages. |
| **WEEK 3** | Complete catalog + search | Filter sidebar, search overlay, breadcrumbs, collection/brand pages, CategoryFlyout menu; P1 Tier 2 animations (stagger + transitions + drawers). |
| **WEEK 4** | Checkout + account + PDP polish | 4-step functional checkout + post-purchase receipt; Recently viewed, size guide modal, reviews list, wishlist CRUD; P2 Tier 3 delights where budget allows. |
| **WEEK 5** | Lookbook + editorial + Do/Don't final audit | Lookbook index + story + shoppable hotspots; Neo-brutalism final grep audit; Contrast final pass; Bundle size; A11y regression suite; Copy pass. |

---

# APPENDIX A: Quick Reference Card (Print & Tape to Monitor)

```
┌────────────────────────────────────────────────────────────────────────┐
│        OUTFIT — PUBLIC SHOP DESIGN GUARDRAILS (FAILURE = PR REJECT)    │
├────────────────────────────────────────────────────────────────────────┤
│  BORDERS: Always 2px solid #1F2328    │  RADIUS: ZERO (grep audit)     │
│  SHADOWS: NONE ever                  │  COLORS: Only Palette A tokens │
│  EMOJI: 0 in DOM                     │  GRADIENTS: 0                  │
│  FONTS: Poppins (H1-H6) / Lora body  │  CONTRAST ≥ 4.5:1 on all text  │
│  CTA: Verb first / Blue #0969DA bg   │  TOUCH TARGET ≥ 44×44          │
│  ANIM DUR ≤ 400ms, transform/opacity │  REDUCED MOTION: respected     │
│  CHECKOUT ≤ 8 fields (guest)         │  SKIP-TO-CONTENT: first focus  │
└────────────────────────────────────────────────────────────────────────┘
```

---

# APPENDIX B: Design System Reference — GitHub Shop → OutFIT Equivalence

| GitHub Shop Concept | OutFIT Implementation |
|---|---|
| GitHub Monogram Logo + "The GitHub Shop" wordmark | OutFIT Monogram circle-O-F + OutFIT Wordmark with hanger F ligature |
| Invertocat / Octocat mascot apparel theme | No mascot yet; create "Hangerman" — stylized F-hook as a character — used on tees, 404 pages, loading skeletons. (Optional P2 task.) |
| Shop / Collections / Brands / Merch categories | NEW / SHOP / BRANDS / LOOKBOOK (§1.1) |
| "All Products" grid with sidebar facets | FilterSidebar + ProductGrid (§1.2 + §1.3) |
| Product Detail with size/color picker | PDPGallery + SizeFitPicker + ColorSwatches (§1.6) |
| Minimal black borders + GitHub blue CTAs | 2px black borders + `#0969DA` primary = strict match 🍾 |
| Free shipping threshold banner | Top thin dismissable bar: "Free standard shipping on orders ≥ $75" |
| Size guide modal + care instructions below PDP | SizeGuideModal component + care/materials accordion |
| Returns page link in footer | Support column, plus customer Orders CTA for easy self-return |
