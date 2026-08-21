'use client';

import React, { useState } from 'react';
import { BrandWordmark } from '@/components/brand/BrandWordmark';
import { Globe, Copy, Check, ArrowRight, ShieldCheck, Mail, Sparkles, Feather, Ruler, Truck, RotateCcw, Package, Layers } from 'lucide-react';
import { AtelierGuideTopic } from './AtelierGuideModal';

interface ShopFooterProps {
  onOpenTopic?: (topic: AtelierGuideTopic) => void;
}

export function ShopFooter({ onOpenTopic }: ShopFooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const copyDomain = () => {
    navigator.clipboard.writeText('theoufit.kesararamwithdigital.tech');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-[#1E2631] text-[#F8F7F4] pt-12 pb-8 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand & Newsletter Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[2px] bg-white border border-white/20 flex items-center justify-center">
                <img src="/OutFIT/OutFIT.svg" alt="OutFIT" className="w-5 h-5 object-contain" />
              </div>
              <BrandWordmark size="md" invert={true} />
            </div>

            <p className="text-xs text-[#8E9AA8] max-w-sm leading-relaxed">
              Quiet luxury tailoring, Normandy flax overshirts, and high-fashion ready-to-wear essentials. Certified on the Cloudflare Edge network.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="flex max-w-sm mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for private drops..."
                className="flex-1 px-3 py-2 bg-white/10 border border-white/15 rounded-l-[2px] text-xs text-white placeholder-[#8E9AA8] focus:outline-none focus:border-[#C84428] font-sans"
              />
              <button
                type="submit"
                className="btn-liquid btn-liquid-terracotta px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-r-[2px] cursor-pointer"
              >
                {subscribed ? 'Joined' : 'Join'}
              </button>
            </form>
          </div>

          {/* Catalog Navigation (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-2.5 text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Catalog
            </span>
            <button 
              onClick={() => onOpenTopic?.('all-pieces')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              All Pieces
            </button>
            <button 
              onClick={() => onOpenTopic?.('overshirts')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Overshirts
            </button>
            <button 
              onClick={() => onOpenTopic?.('supima-knits')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Supima Knits
            </button>
            <button 
              onClick={() => onOpenTopic?.('tailored-trousers')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Tailored Trousers
            </button>
            <button 
              onClick={() => onOpenTopic?.('capsule-drops')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Capsule Drops
            </button>
          </div>

          {/* Atelier Services (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-2.5 text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
              Atelier
            </span>
            <button 
              onClick={() => onOpenTopic?.('normandy-linen')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Normandy Linen
            </button>
            <button 
              onClick={() => onOpenTopic?.('fit-guide')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Fit Guide
            </button>
            <button 
              onClick={() => onOpenTopic?.('care-guide')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Care Guide
            </button>
            <button 
              onClick={() => onOpenTopic?.('shipping-duties')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Shipping &amp; Duties
            </button>
            <button 
              onClick={() => onOpenTopic?.('returns-exchange')}
              className="text-left text-[#8E9AA8] hover:text-[#C84428] cursor-pointer transition-colors"
            >
              Returns &amp; Exchange
            </button>
          </div>

          {/* Edge Infrastructure (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3 text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              Edge Domain
            </span>
            
            <button
              onClick={copyDomain}
              className="btn-liquid btn-liquid-glass p-2.5 bg-white/10 border-white/20 hover:border-[#C84428] rounded-[2px] text-left flex items-center justify-between text-[11px] text-white group w-full cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Globe className="w-3.5 h-3.5 text-[#C84428]" />
                <span className="truncate">theoufit.kesararam...</span>
              </div>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#8E9AA8] group-hover:text-white" />}
            </button>

            <div className="flex items-center gap-2 text-[10px] text-[#8E9AA8]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Certified Haute Atelier • Verified Archive Pieces</span>
            </div>
          </div>

        </div>

        {/* Grand Centerpiece Signature Logo Pop-up in Footer */}
        <div className="py-10 sm:py-14 flex flex-col items-center justify-center text-center select-none border-b border-white/10 overflow-hidden">
          <div className="flex items-center justify-center gap-2 sm:gap-6 tracking-tighter leading-none animate-in fade-in zoom-in-95 duration-500">
            <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black text-white/95 drop-shadow-lg">
              OUT
            </span>
            <span className="text-[19vw] sm:text-[15vw] lg:text-[13vw] font-display font-black text-[#C84428] drop-shadow-lg">
              FIT
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#8E9AA8] mt-3">
            Haute Quiet Luxury Atelier • Paris — Milan — Normandy
          </span>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8E9AA8] gap-4">
          <p>© {new Date().getFullYear()} OutFIT Haute Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onOpenTopic?.('care-guide')} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</button>
            <button onClick={() => onOpenTopic?.('returns-exchange')} className="hover:text-white cursor-pointer transition-colors">Terms of Service</button>
            <button onClick={() => onOpenTopic?.('shipping-duties')} className="hover:text-white cursor-pointer transition-colors">Security Audit</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
