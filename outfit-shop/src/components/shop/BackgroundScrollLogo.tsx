'use client';

import React, { useState, useEffect } from 'react';

export function BackgroundScrollLogo() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [docHeight, setDocHeight] = useState<number>(3000);
  const [windowHeight, setWindowHeight] = useState<number>(900);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateDimensions = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0) setDocHeight(height);
      setWindowHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Scroll ratio across the whole page (0.0 at top to 1.0 at footer bottom)
  const scrollRatio = Math.min(Math.max(scrollY / Math.max(docHeight, 1), 0), 1);

  // Bottom Footer Pop-up Trigger (activates in the final 22% of page scroll)
  const isNearBottom = scrollRatio > 0.78;
  const bottomProgress = isNearBottom ? Math.min(1, (scrollRatio - 0.78) / 0.22) : 0;

  // Real Deep Blur Mechanics:
  // - Top (Hero): 0px (Solid, crisp & single in hero position)
  // - Middle (Catalog): Deep real blur up to 42px as it drifts down
  // - Bottom (Footer): Un-blurs back to 0px and pops up prominently in center!
  let currentBlur = 0;
  if (!isNearBottom) {
    currentBlur = Math.min(42, scrollY * 0.045);
  } else {
    currentBlur = Math.max(0, 42 * (1 - bottomProgress * 1.3));
  }

  // Vertical Parallax & Footer Center Pop-up:
  const translateY = !isNearBottom
    ? scrollY * 0.18
    : (scrollY * 0.18) * (1 - bottomProgress) + (windowHeight * 0.18) * bottomProgress;

  // Scale:
  // - Top: 1.0x
  // - Middle: 1.02x
  // - Bottom: Pops up to 1.15x center grand scale
  const scale = 1 + (!isNearBottom ? scrollRatio * 0.04 : 0.04 + bottomProgress * 0.12);

  // Opacity:
  // - Top (Hero): 0.95 (High crisp visibility)
  // - Middle (Catalog): 0.25 (Subtle atmospheric ambient background)
  // - Bottom (Footer): 0.95 (Pops up with full brilliance in center at footer)
  const opacity = !isNearBottom
    ? Math.max(0.22, 0.95 - scrollRatio * 1.15)
    : 0.22 + bottomProgress * 0.73;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-start justify-center pt-24 sm:pt-28 select-none will-change-transform"
      aria-hidden="true"
    >
      <div 
        className="flex items-center justify-center gap-1 sm:gap-4 tracking-tighter leading-none w-full px-2 text-center transition-all duration-100 ease-out"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          opacity: opacity,
          filter: `blur(${currentBlur}px)`,
          WebkitFilter: `blur(${currentBlur}px)`
        }}
      >
        {/* Liquid Glass Charcoal OUT (Single crisp instance) */}
        <span className="text-[20vw] sm:text-[16vw] lg:text-[14vw] font-display font-black liquid-glass-logo-charcoal select-none">
          OUT
        </span>
        {/* Liquid Glass Terracotta FIT (Single crisp instance) */}
        <span className="text-[20vw] sm:text-[16vw] lg:text-[14vw] font-display font-black liquid-glass-logo-terracotta select-none">
          FIT
        </span>
      </div>
    </div>
  );
}
