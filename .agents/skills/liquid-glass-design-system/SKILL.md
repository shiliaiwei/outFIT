---
name: liquid-glass-design-system
description: >
  Comprehensive guide and rules for creating, styling, and implementing Liquid Glass UI elements,
  cards, containers, modals, dynamic buttons with 360-degree specular highlights (top, left, right,
  bottom), and Dual-Split Parallax Blur typography architectures. Trigger on: "liquid glass",
  "glassmorphism", "glass button", "specular reflection", "dual split blur", "border radius", "outfit design", "modern glass".
---

# Liquid Glass UI & Dual-Split Parallax Blur Design System

This skill acts as the permanent specification, CSS engineering formulas, and implementation rules for **Liquid Glass UI surfaces, Dual-Split Parallax Blur typography, 360° dynamic interactive buttons, and pure CSS alpha-masked marquee showcases** across luxury e-commerce, POS terminals, and modern web applications.

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
 │ 2. ON SCROLL (Diverging Depth Split):                                     │
 │    ▲ TOP LAYER: Floats UPWARD (-translateY), soft blur (0px ➔ 24px)       │
 │    ▼ BOTTOM LAYER: Drifts DOWNWARD (+translateY), deep blur (0px ➔ 48px)  │
 │    ➔ Creates a cinematic liquid-glass depth divergence effect!            │
 └───────────────────────────────────────────────────────────────────────────┘
```

### TypeScript / JSX Implementation:
```tsx
// Dual-Split Calculations
const topLayerTranslateY = -scrollY * 0.38;
const topLayerOpacity = Math.max(0, 1 - scrollY * 0.0035);
const topLayerBlur = Math.min(24, scrollY * 0.045);

const bottomLayerTranslateY = scrollY * 0.42;
const bottomLayerOpacity = Math.max(0, 0.90 - scrollY * 0.0022);
const bottomLayerBlur = Math.min(48, scrollY * 0.075);

return (
  <div className="relative w-full h-[19vw] sm:h-[15vw] lg:h-[13vw] min-h-[110px] flex items-center justify-center select-none overflow-visible">
    
    {/* BOTTOM LAYER: Drifts DOWNWARD with DEEP real blur */}
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-100 ease-out z-0 will-change-transform"
      style={{
        transform: `translate3d(0, ${bottomLayerTranslateY}px, 0)`,
        opacity: bottomLayerOpacity,
        filter: `blur(${bottomLayerBlur}px)`,
        WebkitFilter: `blur(${bottomLayerBlur}px)`
      }}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-3 tracking-tighter leading-none w-full px-2 text-center">
        <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black liquid-glass-logo-charcoal select-none">OUT</span>
        <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black liquid-glass-logo-terracotta select-none">FIT</span>
      </div>
    </div>

    {/* TOP LAYER: Floats UPWARD on scroll with soft blur */}
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-100 ease-out z-10 will-change-transform"
      style={{
        transform: `translate3d(0, ${topLayerTranslateY}px, 0)`,
        opacity: topLayerOpacity,
        filter: `blur(${topLayerBlur}px)`,
        WebkitFilter: `blur(${topLayerBlur}px)`
      }}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-3 tracking-tighter leading-none w-full px-2 text-center">
        <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black liquid-glass-logo-charcoal select-none">OUT</span>
        <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black liquid-glass-logo-terracotta select-none">FIT</span>
      </div>
    </div>

  </div>
);
```

---

## 3 · Canonical 360° Liquid Glass Buttons Suite

```css
/* Base 360° Liquid Button */
.btn-liquid {
  position: relative;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: var(--radius-btn, 2px);
  overflow: hidden;
  
  /* 4-Position Inset Specular Glass Bevel Lighting */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.85),  /* Top Specular Edge */
    inset 1px 0 0 rgba(255, 255, 255, 0.45),  /* Left Specular Edge */
    inset -1px 0 0 rgba(255, 255, 255, 0.25), /* Right Specular Edge */
    inset 0 -1px 0 rgba(0, 0, 0, 0.18),       /* Bottom Refractive Depth */
    0 1px 3px rgba(30, 38, 49, 0.06);        /* Ambient Drop Shadow */
}

/* Full 4-Sided Perimeter Specular Highlight (Top, Left, Right, Bottom) */
.btn-liquid::before {
  content: '';
  position: absolute;
  inset: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.90);
  border-left: 1px solid rgba(255, 255, 255, 0.55);
  border-right: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

/* Diagonal Glass Sheen & Ambient Refraction */
.btn-liquid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, transparent 55%, rgba(0, 0, 0, 0.08) 100%);
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

/* 1. Primary Terracotta Liquid Glass Button */
.btn-liquid-terracotta {
  background: rgba(200, 68, 40, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #FFFFFF;
}

.btn-liquid-terracotta:hover {
  background: rgba(179, 57, 32, 0.98);
  border-color: rgba(255, 255, 255, 0.65);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 1px 0 0 rgba(255, 255, 255, 0.60),
    inset -1px 0 0 rgba(255, 255, 255, 0.40),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25),
    0 4px 14px rgba(200, 68, 40, 0.30);
  transform: translateY(-1px);
}

/* 2. Dark Mineral Charcoal Liquid Glass Button */
.btn-liquid-charcoal {
  background: rgba(30, 38, 49, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

.btn-liquid-charcoal:hover {
  background: rgba(200, 68, 40, 0.95);
  border-color: rgba(255, 255, 255, 0.55);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.90),
    inset 1px 0 0 rgba(255, 255, 255, 0.50),
    inset -1px 0 0 rgba(255, 255, 255, 0.30),
    inset 0 -1px 0 rgba(0, 0, 0, 0.30),
    0 4px 14px rgba(30, 38, 49, 0.25);
  transform: translateY(-1px);
}

/* 3. Translucent Light Glass Button */
.btn-liquid-glass {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(90, 102, 120, 0.18);
  color: #1E2631;
}

.btn-liquid-glass:hover {
  background: rgba(255, 255, 255, 0.98);
  border-color: rgba(200, 68, 40, 0.45);
  color: #C84428;
  box-shadow: 
    inset 0 1px 0 #FFFFFF,
    inset 1px 0 0 rgba(255, 255, 255, 0.70),
    inset -1px 0 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 0 rgba(200, 68, 40, 0.15),
    0 4px 12px rgba(30, 38, 49, 0.08);
  transform: translateY(-1px);
}
```

---

## 4 · Pure CSS Alpha-Mask Marquee Loop

```css
/* Hardware-Accelerated 65s Luxury Pace */
@keyframes marquee-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.animate-marquee-loop {
  display: flex;
  width: max-content;
  animation: marquee-scroll 65s linear infinite;
  will-change: transform;
}

.animate-marquee-loop:hover {
  animation-play-state: paused;
}
```

### Pure Edge Masking (Zero Cloudy Div Overlays):
```tsx
<div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] py-1">
  <div className="animate-marquee-loop flex items-center gap-3.5 py-1">
    {/* Psychological Anchor Pricing & Pure PNG Pieces */}
  </div>
</div>
```

---

## 5 · Clean Modal Header & Top-Right Close Button Architecture

Never position close buttons with floating absolute styles that collide with brand logos:
```tsx
<div className="flex items-center justify-between pb-3 border-b border-[#5A6678]/15 mb-4">
  <div className="flex items-center gap-2">
    <BrandWordmark size="sm" />
    <span className="text-xs font-mono font-bold text-[#8E9AA8]">/ Atelier Checkout</span>
  </div>
  
  {/* Non-overlapping Top-Right Close Button */}
  <button
    onClick={onClose}
    className="btn-liquid btn-liquid-glass p-1.5 rounded-[2px] cursor-pointer hover:border-[#C84428] text-[#5A6678] hover:text-[#1E2631] transition-colors"
    title="Close Checkout"
  >
    <X className="w-4 h-4" />
  </button>
</div>
```

---

## 6 · Golden Rules for Liquid Glass Systems

1. **360° Refraction Lighting**: Top = `0.90`, Left = `0.55`, Right = `0.35`, Bottom = `0.15` dark grounding line.
2. **Always Inherit Border Radius (`border-radius: inherit`)**: Both `::before` and `::after` must specify `border-radius: inherit` so specular highlights curve seamlessly on any radius (`2px`, `4px`, pills, or circles).
3. **No Overlapping Fixed Layers at Footer**: Ensure floating background effects don't bleed into footer text; let the footer render its own clean, solid centerpiece logo.
4. **No Cloudy Overlay Shapes**: Always use CSS `mask-image` for clean edge alpha dissolving.
5. **Smooth Non-Glitching Pagination**: Maintain scroll anchor and state continuity when appending new catalog chunks.
