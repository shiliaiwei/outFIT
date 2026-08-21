'use client';

import React, { useState } from 'react';
import { ShopProduct, CurrencyCode } from '@/types';
import { CatalogService } from '@/services/catalogService';
import { ShoppingBag, Eye, Check, Plus } from 'lucide-react';

interface ProductCardProps {
  product: ShopProduct;
  currency: CurrencyCode;
  cartQty?: number;
  onAddToCart: (product: ShopProduct, size: string) => void;
  onQuickView: (product: ShopProduct) => void;
}

export function ProductCard({
  product,
  currency,
  cartQty = 0,
  onAddToCart,
  onQuickView
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [justAdded, setJustAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(product.imageUrl);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="liquid-glass-card group flex flex-col justify-between overflow-hidden bg-white/95 border border-[#5A6678]/15 rounded-[2px] p-3 transition-all duration-200">
      
      {/* 1. Image Showcase Container */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-[4/5] bg-[#F1EFEA] rounded-[2px] overflow-hidden cursor-pointer mb-3"
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80')}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Stock status tag if critically low */}
        {product.stock <= 5 && (
          <div className="absolute top-2 left-2 z-10">
            <span className="badge-2px px-2 py-0.5 bg-[#C84428] text-white text-[9px] font-bold uppercase tracking-wider rounded-[2px]">
              Only {product.stock} left
            </span>
          </div>
        )}

        {/* Quick View Overlay Liquid Glass Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="btn-liquid btn-liquid-glass absolute bottom-2 right-2 p-2 rounded-[2px] opacity-0 group-hover:opacity-100 shadow-xs"
          title="Quick View"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Metadata & Product Details */}
      <div className="flex flex-col gap-2">
        
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#8E9AA8]">
          <span className="font-bold text-[#5A6678] uppercase truncate">{product.brand}</span>
          <span className="truncate">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => onQuickView(product)}
          className="text-xs sm:text-sm font-display font-bold text-[#1E2631] line-clamp-1 hover:text-[#C84428] cursor-pointer transition-colors"
        >
          {product.name}
        </h3>

        {/* Material & Fabric Spec */}
        <p className="text-[10px] text-[#5A6678] font-mono truncate">
          {product.material}
        </p>

        {/* Size Selection Chips (Strict 2px radius & Liquid Glass) */}
        <div className="flex items-center gap-1 my-1">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(s);
              }}
              className={`btn-liquid w-6 h-6 rounded-[2px] text-[10px] font-mono font-bold transition-all flex items-center justify-center ${
                selectedSize === s
                  ? 'btn-liquid-active'
                  : 'btn-liquid-glass text-[#5A6678]'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-[10px] font-mono text-[#8E9AA8] ml-auto">
            {product.sku}
          </span>
        </div>

        {/* Price & Real Dynamic Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#5A6678]/15 mt-1">
          <div className="flex flex-col">
            <span className="text-sm font-display font-black text-[#1E2631]">
              {CatalogService.formatPrice(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] font-mono text-[#8E9AA8] line-through -mt-0.5">
                {CatalogService.formatPrice(product.originalPrice, currency)}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`btn-liquid px-3 py-1.5 rounded-[2px] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              product.stock <= 0
                ? 'bg-slate-200 text-slate-400 border-transparent cursor-not-allowed'
                : justAdded
                ? 'btn-liquid-terracotta bg-emerald-700 hover:bg-emerald-800'
                : cartQty > 0
                ? 'btn-liquid-terracotta'
                : 'btn-liquid-charcoal'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>Added</span>
              </>
            ) : product.stock <= 0 ? (
              <span>Sold Out</span>
            ) : cartQty > 0 ? (
              <>
                <ShoppingBag className="w-3 h-3 text-white" />
                <span>In Bag ({cartQty})</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </article>
  );
}
