'use client';

import React from 'react';
import { Feather, ShieldCheck, Sparkles, Gem, Clock, Scale } from 'lucide-react';

export function AtelierCraftStory() {
  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
      <div className="liquid-glass-elevated bg-white/95 border border-[#5A6678]/15 rounded-[2px] p-6 sm:p-10 shadow-sm">
        
        {/* Editorial Section Header with Psychological Hook */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span className="btn-liquid btn-liquid-glass text-[10px] font-mono font-bold uppercase tracking-widest text-[#C84428] px-3 py-1 rounded-[2px] mb-3">
            The Connoisseur’s Code • Atelier Origin
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-display font-black text-[#1E2631] tracking-tight leading-tight">
            Wear What Others Cannot Mass-Produce
          </h2>
          
          <p className="text-xs sm:text-sm text-[#5A6678] mt-2.5 leading-relaxed font-sans">
            Quiet luxury is not about logos; it is the confidence of wearing traceable textiles, architectural silhouettes, and limited archive editions that command respect without shouting.
          </p>
        </div>

        {/* 4 Psychological Luxury Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Pillar 1: Scarcity & Exclusivity */}
          <div className="p-5 bg-[#F8F7F4] border border-[#5A6678]/15 rounded-[2px] flex flex-col justify-between group hover:border-[#C84428]/40 transition-all duration-300 liquid-glass-card">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 bg-white border border-[#5A6678]/15 rounded-[2px] flex items-center justify-center text-[#C84428] shadow-2xs">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#8E9AA8] uppercase tracking-wider bg-white px-2 py-0.5 rounded-[2px] border border-[#5A6678]/10">
                  Limited Run
                </span>
              </div>
              <h3 className="text-sm font-display font-bold text-[#1E2631] mb-1.5">
                Strict 1-of-100 Batches
              </h3>
              <p className="text-xs text-[#5A6678] leading-relaxed">
                Capsule pieces are produced in small, numbered quantities. Once a drop is archived, the cut is retired to preserve your wardrobe’s absolute uniqueness.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#5A6678]/10 text-[10px] font-mono font-semibold text-[#1E2631]">
              Zero Mass-Overproduction
            </div>
          </div>

          {/* Pillar 2: Tactile Status & Terroir */}
          <div className="p-5 bg-[#F8F7F4] border border-[#5A6678]/15 rounded-[2px] flex flex-col justify-between group hover:border-[#C84428]/40 transition-all duration-300 liquid-glass-card">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 bg-white border border-[#5A6678]/15 rounded-[2px] flex items-center justify-center text-[#C84428] shadow-2xs">
                  <Feather className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#8E9AA8] uppercase tracking-wider bg-white px-2 py-0.5 rounded-[2px] border border-[#5A6678]/10">
                  Traceable Terroir
                </span>
              </div>
              <h3 className="text-sm font-display font-bold text-[#1E2631] mb-1.5">
                280 GSM Normandy Flax
              </h3>
              <p className="text-xs text-[#5A6678] leading-relaxed">
                Sourced from coastal Normandy growers in France. Extra-long staple fibers soften with every wash while retaining a structured, substantial drape.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#5A6678]/10 text-[10px] font-mono font-semibold text-[#1E2631]">
              100% Certified European Flax
            </div>
          </div>

          {/* Pillar 3: Silhouette Confidence */}
          <div className="p-5 bg-[#F8F7F4] border border-[#5A6678]/15 rounded-[2px] flex flex-col justify-between group hover:border-[#C84428]/40 transition-all duration-300 liquid-glass-card">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 bg-white border border-[#5A6678]/15 rounded-[2px] flex items-center justify-center text-[#C84428] shadow-2xs">
                  <Gem className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#8E9AA8] uppercase tracking-wider bg-white px-2 py-0.5 rounded-[2px] border border-[#5A6678]/10">
                  French Seams
                </span>
              </div>
              <h3 className="text-sm font-display font-bold text-[#1E2631] mb-1.5">
                Architectural Draping
              </h3>
              <p className="text-xs text-[#5A6678] leading-relaxed">
                Unstructured shoulder lines and bespoke chest drops engineered to enhance posture, ensuring you feel completely commanding in any room.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#5A6678]/10 text-[10px] font-mono font-semibold text-[#1E2631]">
              Effortless Executive Poise
            </div>
          </div>

          {/* Pillar 4: Direct Atelier Value */}
          <div className="p-5 bg-[#F8F7F4] border border-[#5A6678]/15 rounded-[2px] flex flex-col justify-between group hover:border-[#C84428]/40 transition-all duration-300 liquid-glass-card">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-9 h-9 bg-white border border-[#5A6678]/15 rounded-[2px] flex items-center justify-center text-[#C84428] shadow-2xs">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[#8E9AA8] uppercase tracking-wider bg-white px-2 py-0.5 rounded-[2px] border border-[#5A6678]/10">
                  Atelier Direct
                </span>
              </div>
              <h3 className="text-sm font-display font-bold text-[#1E2631] mb-1.5">
                Psychological Value
              </h3>
              <p className="text-xs text-[#5A6678] leading-relaxed">
                By cutting traditional 500% luxury markups and middleman boutique overhead, we invest directly into heavier textiles and artisan construction.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#5A6678]/10 text-[10px] font-mono font-semibold text-[#1E2631]">
              Transparent Haute Pricing
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
