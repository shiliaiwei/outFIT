# MODULE 10 — MASTER DESIGN SYSTEM & BRAND IDENTITY RECORD

> **Authoritative Specification Document** for OutFIT UI System  
> **Official Domain:** `theoufit.kesararamwithdigital.tech`  
> **Edge Layer:** Cloudflare TLS 1.3  
> **Database:** SS-MIS (Store Stock & POS Information System) PostgreSQL Schema  
> **Status:** Fully Standardized, Implemented & Verified in `index.html` and `landingpage.html`

---

## 1. OFFICIAL BRAND LOGOTYPE SPECIFICATION

### §1.1 Two-Tone Wordmark Hierarchy (`OUT` + `FIT`)
The OutFIT wordmark is an asymmetric two-tone typographical lockup engineered for high-fashion editorial clarity and high-contrast digital POS visibility:

```html
<!-- Canonical Two-Tone HTML Markup -->
<div class="brand-wordmark-twotone" id="sidebarBrandWordmark">
  <span class="brand-out">OUT</span><span class="brand-fit">FIT</span>
</div>
```

```css
/* Canonical Two-Tone CSS Implementation */
.brand-wordmark-twotone {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}

/* Color 1: OUT */
.brand-wordmark-twotone .brand-out {
  font-weight: 900;
  color: #1E2631; /* Mineral Charcoal */
}

/* Color 2: FIT */
.brand-wordmark-twotone .brand-fit {
  font-weight: 700;
  color: #C84428; /* Warm Terracotta */
  margin-left: 1px;
}
```

### §1.2 Two-Tone Color Variants Matrix
| Variant | `OUT` Color & Weight | `FIT` Color & Weight | Canvas / Context |
|---|---|---|---|
| **Master Brand (Terracotta)** | `#1E2631` (Weight 900) | `#C84428` (Weight 700) | Light Canvas (`#F8F7F4`), Headers, Sidebar |
| **Dark Inverted (Night Mode)** | `#FFFFFF` (Weight 900) | `#D97757` (Weight 700) | Dark Canvas (`#1E2631`), Footer, Terminal |
| **Gold Luxury Accent** | `#1E2631` (Weight 900) | `#C5A059` (Weight 800) | Limited VIP Editions, Capsule Collections |

### §1.3 Brand Monogram Badge
* **Frame:** 36px / 40px square card with `9px` border radius (`--radius-card: 9px;`).
* **Border:** 1px solid `rgba(255, 255, 255, 0.92)` / `rgba(90, 102, 120, 0.15)`.
* **Surface:** Pure solid `#FFFFFF` with soft specular elevation (`box-shadow: 0 2px 8px -2px rgba(30, 38, 49, 0.04)`).
* **Asset:** Scalable SVG vector (`./OutFIT/OutFIT.svg` / `./OutFIT/OutFIT.png`).

---

## 2. STRICT BORDER RADIUS HIERARCHY

The design system enforces a strict 2-tier border radius scale to maintain visual hierarchy between small metadata badges and structural layout containers:

```css
:root {
  /* TIER 1: BADGES, TAGS, PILLS & CHIPS — STRICTLY 2PX */
  --radius-badge: 2px;
  --radius-tag: 2px;

  /* TIER 2: CONTAINERS, CARDS, BUTTONS, MODALS & PANELS — STRICTLY 9PX */
  --radius-card: 9px;
  --radius-btn: 9px;
  --radius-all: 9px;
}
```

### §2.1 Tier 1: Strict `2px` Radius Elements
* Product metadata status tags (`.product-tag`)
* Category filter chips (`.cat-pill-btn`)
* Size selector buttons (`.size-selector-btn`)
* Active role status pills (`.active-role-status-badge`)
* Domain certification pills (`.domain-pill-sidebar`, `.domain-pill-header`)
* Color swatch chips (`.color-swatch-chip`)

### §2.2 Tier 2: Strict `9px` Radius Elements
* Product cards & shop tiles (`.shop-product-card`)
* Hero banner cards & video frames (`.hero-banner-card`, `.shop-video-card`)
* Liquid glass containers & background panels (`.liquid-glass`, `.liquid-glass-elevated`)
* Interactive buttons (`.btn-action`, `.btn-terracotta`, `.btn-liquid`, `.btn-charcoal`)
* Slide-over shopping bag drawer (`.drawer-panel`)
* Modal overlays & popups (`.modal-gold-card`)
* Cashier POS quick tiles (`.pos-product-tile`)
* KPI metric calculation containers (`.kpi-card-box`)
* Editorial legal cards (`.editorial-legal-card`)

---

## 3. ZERO EMOJIS ENFORCEMENT POLICY

* ❌ **Zero Unicode Emojis Allowed**: No emojis are permitted anywhere in the user interface, product titles, descriptions, status tags, buttons, modals, or toast notifications.
* ✅ **Vector SVG Icons Only**: 100% of visual iconography must use Lucide React / Lucide SVG vector icons with standard `1.75px` stroke weight.

---

## 4. PROMOTIONAL BADGE ELIMINATION POLICY

* ❌ **No "Rare Drop" or "Vault" Gimmick Badges**: Promotional badges that distract from authentic quiet luxury tailoring have been completely removed.
* ✅ **Authentic Product Presentation**: Products display clean numbered index tags (`01`, `02`, `03`, `04`), precise SKU metadata (`OUTFIT-LN-092`), exact stock availability (`14 In Stock`), and direct add-to-bag actions.

---

## 5. DUAL ARTIFACT ARCHITECTURE

The application is structured into two complementary entrypoints:

### §5.1 `landingpage.html` — Standalone Public Storefront
* **Target Audience:** Public retail customers and capsule shoppers.
* **Key Features:**
  1. Top announcement bar with complimentary shipping threshold ($120.00 USD).
  2. Sticky glassmorphic header with two-tone `OUTFIT` wordmark and domain copy pill.
  3. Hero showcase with embedded high-resolution video stream (`OutFIT/OutFIT.mp4`).
  4. Real-time telemetry meters (*280 GSM Normandy Linen, 100 Units Batch, POS Synced*).
  5. Interactive catalog filter bar (*All Pieces, Overshirts, Knits & Polos, Trousers*).
  6. Product cards with interactive size selector pills (`S`, `M`, `L`, `XL`) and `+ Add to Bag`.
  7. Slide-over shopping bag drawer with subtotal, Cloudflare edge shipping, and checkout link.
  8. Atelier craft story and omnichannel POS database synchrony section.
  9. Editorial footer with legal navigation and Cloudflare TLS 1.3 certificate tag.

### §5.2 `index.html` — Unified Full-Stack Operations Hub
* **Target Audience:** Store staff, cashiers, store managers, and administrators.
* **Key Features:**
  1. 4-Role RBAC Quick Switcher:
     * **Staff / Cashier POS**: Barcode scanner, POS quick tiles, active ticket stream, cash/card tendering.
     * **Super Admin**: Multi-register live telemetry, financial volume tracking, operator oversight.
     * **Store Manager**: Shift override approvals (VIP discounts), drawer float reconciliation.
     * **Warehouse Logistics**: Inbound stock intake and SKU location tracking.
  2. **Brand Identity Hub (`panelBrand`)**: Live visual showcase of the two-tone typography specifications and dark mode previews.
  3. **Editorial Legal Policies**: Full-text Terms of Service and Privacy Policy formatted to GitHub Shop standards.
  4. Direct bridge link to open the standalone `landingpage.html`.

---

## 6. COLOR TOKENS MASTER TABLE

| Category | Token Name | Hex Code | Purpose |
|---|---|---|---|
| **Primary Accent** | `--brand-terracotta` | `#C84428` | Primary CTA, `FIT` wordmark, active highlights |
| **Terracotta Light** | `--brand-terracotta-light` | `#D97757` | Hover states, dark mode `FIT` wordmark |
| **Terracotta Soft** | `--brand-terracotta-soft` | `rgba(200, 68, 40, 0.10)` | Background tints, status pill fills |
| **Mineral Charcoal** | `--text-main` | `#1E2631` | Body headings, `OUT` wordmark, primary text |
| **Slate Gray** | `--text-secondary` | `#5A6678` | Subtitles, SKU codes, secondary labels |
| **Light Slate** | `--text-muted` | `#8E9AA8` | Placeholder text, timestamps, borders |
| **Canvas Background**| `--canvas-bg` | `#F8F7F4` | Warm off-white atelier canvas |
| **Glass Background** | `--glass-bg` | `rgba(255, 255, 255, 0.85)` | Frosted glass card surfaces (blur 24px) |
| **Liquid Border** | `--liquid-border` | `rgba(255, 255, 255, 0.92)` | Top specular reflection border |
| **Liquid Gray Border**| `--liquid-border-gray`| `rgba(90, 102, 120, 0.15)` | Subtle 1px structural card outline |

---

## 7. VERIFICATION PROTOCOL
Any future modifications to either `index.html` or `landingpage.html` must pass this 4-step verification:

1. **Two-Tone Check:** Ensure `<span class="brand-out">OUT</span><span class="brand-fit">FIT</span>` is preserved.
2. **Radius Audit:** Ensure `--radius-badge: 2px` and `--radius-card: 9px` are strictly applied.
3. **Emoji Audit:** Ensure regex test `/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu` returns `0` matches.
4. **Domain Consistency:** Ensure `theoufit.kesararamwithdigital.tech` is present and functional in clipboard copying triggers.
