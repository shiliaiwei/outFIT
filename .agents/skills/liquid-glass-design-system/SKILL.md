---
name: liquid-glass-design-system
description: >
  Comprehensive guide and rules for creating, styling, and implementing Liquid Glass UI elements,
  cards, containers, modals, dynamic buttons with 360-degree specular highlights (top, left, right,
  bottom), Dual-Split Parallax Blur typography architectures, deterministic SSR catalog hydration,
  and precision floating dropdown geometry. Trigger on: "liquid glass", "glassmorphism", "glass button",
  "specular reflection", "dual split blur", "border radius", "outfit design", "modern glass".
---

# Liquid Glass UI & Dual-Split Parallax Blur Design System

This skill acts as the authoritative master specification, CSS engineering formulas, and implementation rules for **Liquid Glass UI surfaces, Dual-Split Parallax Blur typography, 360° dynamic interactive buttons, deterministic SSR hydration, and precision floating overlay geometry** across luxury e-commerce, POS terminals, and modern web applications.

---

## 1 · 360° Liquid Glass Architectural Core

A true physical liquid glass button or surface reflects light on **all 4 edges** while maintaining directional lighting (light source from top-left):

1. **Top Edge**: Highest specular reflection highlight (`border-top: 1px solid rgba(255, 255, 255, 0.90)` + `inset 0 1px 0 rgba(255, 255, 255, 0.85)`).
2. **Left Edge**: Secondary specular highlight (`border-left: 1px solid rgba(255, 255, 255, 0.55)` + `inset 1px 0 0 rgba(255, 255, 255, 0.45)`).
3. **Right Edge**: Diffused glass ambient rim (`border-right: 1px solid rgba(255, 255, 255, 0.35)` + `inset -1px 0 0 rgba(255, 255, 255, 0.25)`).
4. **Bottom Edge**: Refractive grounding shadow line (`border-bottom: 1px solid rgba(0, 0, 0, 0.15)` + `inset 0 -1px 0 rgba(0, 0, 0, 0.18)`).
5. **Surface Sheen (`::after`)**: 135-degree diagonal ambient light gradient simulating the glass dome/bevel.

---

## 2 · Dual-Split Parallax Blur Typography Architecture

To achieve dramatic depth without duplicate ghosting, use the **Dual-Split Parallax Blur** pattern:

```
 ┌───────────────────────────────────────────────────────────────────────────┐
 │ 1. AT REST (scrollY = 0):                                                 │
 │    Both Top & Bottom layers are locked at (0, 0) with 0px blur            │
 │    ➔ Renders as ONE SINGLE SOLID CRISP LIQUID GLASS LOGO                  │
 ├───────────────────────────────────────────────────────────────────────────┤
 │ 2. ON SCROLL (Asymmetric Depth Divergence):                               │
 │    ▲ TOP LAYER: Floats SLOWLY UPWARD (-0.16x), soft blur (0px ➔ 18px)     │
 │    ▼ BOTTOM LAYER: Dives RAPIDLY DOWNWARD (+0.95x), deep blur (0px ➔ 60px)│
 │    ➔ Creates a cinematic liquid-glass depth divergence effect!            │
 └───────────────────────────────────────────────────────────────────────────┘
```

### TypeScript / JSX Implementation:
```tsx
// Dual-Split Asymmetric Calculations
const bottomLayerTranslateY = scrollY * 0.95;
const bottomLayerOpacity = Math.max(0, 0.95 - scrollY * 0.0055);
const bottomLayerBlur = Math.min(60, scrollY * 0.14);

const topLayerTranslateY = -scrollY * 0.16;
const topLayerOpacity = Math.max(0, 1 - scrollY * 0.0018);
const topLayerBlur = Math.min(18, scrollY * 0.020);

return (
  <div className="relative w-full h-[19vw] sm:h-[15vw] lg:h-[13vw] min-h-[110px] flex items-center justify-center select-none overflow-visible">
    
    {/* BOTTOM LAYER: Dives DOWNWARD with DEEP real blur */}
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      style={{
        transform: `translate3d(0, ${bottomLayerTranslateY}px, 0)`,
        opacity: bottomLayerOpacity,
        filter: `blur(${bottomLayerBlur}px)`,
        transition: 'filter 0.05s linear'
      }}
    >
      <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black text-[#1E2631]">OUT</span>
      <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black text-[#C84428]">FIT</span>
    </div>

    {/* TOP LAYER: Floats UPWARD with SOFT blur */}
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      style={{
        transform: `translate3d(0, ${topLayerTranslateY}px, 0)`,
        opacity: topLayerOpacity,
        filter: `blur(${topLayerBlur}px)`,
        transition: 'filter 0.05s linear'
      }}
    >
      <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black text-[#1E2631]">OUT</span>
      <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black text-[#C84428]">FIT</span>
    </div>
  </div>
);
```

---

## 3 · Precision Floating Overlay Geometry (Zero Document Shift)

Dropdown menus and popovers must never alter document flow or push adjacent navigation items:

```
        ┌─────────────┐
        │   USD  ▾    │  (Relative Trigger Button)
        └──────┬──────┘
        ┌──────┴──────┐
        │  CURRENCY   │  (Centered Absolute Overlay)
        │ ─────────── │   position: absolute; top: 100%; left: 50%;
        │  USD      ✓ │   transform: translateX(-50%); z-index: 50;
        │  KHR        │
        │  EUR        │
        └─────────────┘
```

1. **Trigger Container**: `position: relative` with `useRef` click-outside event listener.
2. **Dropdown Element**: `position: absolute; top: 100%; left: 50%; transform: translateX(-50%); z-index: 50;`.
3. **Solid Presentation**: Solid opaque or ultra-high opacity frosted background (`bg-white` / `bg-white/98`), sharp 2px border radius, and deep `shadow-2xl`.
4. **No Nested Pseudo-Elements**: Never place `.btn-liquid` inside dropdown list item rows to avoid stacked double border artifacts.

---

## 4 · Deterministic SSR Catalog Hydration

To prevent Next.js React hydration mismatches between Server-Side Rendering and client mount:

* **Rule:** Never use `Math.random()` during initial component render or `useMemo`.
* **Deterministic Prime Stride Pattern:**
  ```ts
  const step = 7;
  const selected: ShopProduct[] = [];
  const seen = new Set<string>();

  for (let i = 0; selected.length < 16 && i < pool.length * 2; i++) {
    const idx = (i * step) % pool.length;
    const item = pool[idx];
    if (item && !seen.has(String(item.id))) {
      seen.add(String(item.id));
      selected.push(item);
    }
  }
  ```

---

## 5 · Strict Image & Asset Quality Defense

* **Placeholder Blacklist:** Explicitly ban placeholder/corrupt URLs (such as `bleu-SNPCodeLab.png`).
* **Validation Standard:**
  ```ts
  const isValidImg = (url?: string | null): boolean => {
    if (!url || typeof url !== 'string') return false;
    if (url.includes('bleu-SNPCodeLab') || url.endsWith('null') || url.includes('placeholder')) return false;
    return url.startsWith('http');
  };
  ```

---

## 6 · Streamlined Minimalist Luxury Toolbar

* **Single-Row High-Density Layout:** Left-aligned curated collection chips (`All`, `Ready-to-Wear`, `T-Shirts`, etc.) + right-aligned brand filters and 1-tap outside sort pills (`Featured`, `Price ↑`, `Price ↓`, `Stock`).
* **No Hidden Dropdown Clutter:** Direct 1-tap switching on the surface.
* **Strict Tokens:** Strict `2px` border radius (`rounded-[2px]`), Charcoal `#1E2631`, Terracotta `#C84428`, Ecru `#F8F7F4`.
