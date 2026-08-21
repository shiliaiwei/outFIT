'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShopProduct, CartItem, CurrencyCode } from '@/types';
import { CatalogService } from '@/services/catalogService';
import { ShopHeader } from '@/components/shop/ShopHeader';
import { HeroSection } from '@/components/shop/HeroSection';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductQuickViewModal } from '@/components/shop/ProductQuickViewModal';
import { ShoppingBagDrawer } from '@/components/shop/ShoppingBagDrawer';
import { CheckoutReceiptModal } from '@/components/shop/CheckoutReceiptModal';
import { AtelierCraftStory } from '@/components/shop/AtelierCraftStory';
import { ShopFooter } from '@/components/shop/ShopFooter';
import { AtelierGuideModal, AtelierGuideTopic } from '@/components/shop/AtelierGuideModal';
import { BrandSelectDropdown } from '@/components/shop/BrandSelectDropdown';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Check, 
  Layers, 
  PackageX,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function HomePage() {
  // 1. Live Catalog State
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // 2. Filter, Search & Sort State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSort, setActiveSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'stock' | 'name'>('featured');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // 3. Pagination State (52 items per page — No auto scroll refresh, strictly manual Load More button)
  const PAGE_SIZE = 52;
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // 4. Cart & Modals State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ShopProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeGuideTopic, setActiveGuideTopic] = useState<AtelierGuideTopic>(null);

  const catalogRef = useRef<HTMLDivElement>(null);

  // Reset pagination on filter or search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, selectedBrand, searchQuery, activeSort]);

  // Fetch live products on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setIsLoading(true);
      const items = await CatalogService.getLiveProducts();
      if (isMounted) {
        setProducts(items);
        setIsLoading(false);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique categories & brands from live products
  const categories = useMemo(() => {
    const raw = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];
    return raw.slice(0, 10);
  }, [products]);

  const brands = useMemo(() => {
    const raw = ['All', ...new Set(products.map((p) => p.brand).filter(Boolean))];
    return raw.slice(0, 8);
  }, [products]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by brand
    if (selectedBrand !== 'All') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (activeSort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        list.sort((a, b) => b.stock - a.stock);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Prioritize items with images and higher stock
        list.sort((a, b) => (b.imageUrl ? 1 : 0) - (a.imageUrl ? 1 : 0));
        break;
    }

    return list;
  }, [products, activeCategory, selectedBrand, searchQuery, activeSort]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleLoadMore = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProducts.length));
  };

  // Cart operations
  const handleAddToCart = (product: ShopProduct, size: string, qty: number = 1) => {
    setCartItems((prev) => {
      const cartItemId = `${product.id}-${size}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          sku: product.sku,
          name: product.name,
          brand: product.brand,
          price: product.price,
          qty,
          size,
          color: product.colors[0]?.name || 'Standard',
          imageUrl: product.imageUrl,
          stock: product.stock
        }
      ];
    });
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sortOptions = [
    { value: 'featured', label: 'Sort: Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'stock', label: 'Stock Quantity' },
    { value: 'name', label: 'Alphabetical' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F7F4] text-[#1E2631] font-sans selection:bg-[#C84428] selection:text-white relative">
      
      {/* 1. Global Public Header with Live Utilities */}
      <ShopHeader
        cartCount={cartItems.reduce((acc, i) => acc + i.qty, 0)}
        wishlistCount={0}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalProductsCount={products.length}
      />

      {/* 2. Hero Editorial Showcase with Dual-Split Parallax Blur */}
      <HeroSection
        totalCount={products.length}
        products={products}
        currency={currency}
        onExploreClick={scrollToCatalog}
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 3. Main Catalog Section */}
      <main ref={catalogRef} className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 flex-1">
        
        {/* Streamlined Minimalist Luxury Toolbar (Single Clean Row, Zero Clutter, Less Taps) */}
        <div className="liquid-glass bg-white/95 border border-[#5A6678]/15 rounded-[2px] p-2 sm:p-2.5 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Essential Curated Categories (Clean & Direct) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
            {categories.slice(0, 5).map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn-liquid px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold whitespace-nowrap cursor-pointer transition-all ${
                    isSelected
                      ? 'btn-liquid-active bg-[#1E2631] text-white'
                      : 'btn-liquid-glass text-[#5A6678] hover:text-[#1E2631]'
                  }`}
                >
                  {cat === 'Mens Ready-to-Wear Updated' ? 'Ready-to-Wear' : cat}
                </button>
              );
            })}
          </div>

          {/* Right: Curated Brand Selector + Count + Branded Liquid Glass Sort */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end text-xs font-mono">
            
            {/* Quick Brand Pills */}
            <div className="flex items-center gap-1">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`btn-liquid px-2.5 py-1 rounded-[2px] text-[11px] font-semibold cursor-pointer ${
                    selectedBrand === b
                      ? 'btn-liquid-terracotta'
                      : 'btn-liquid-glass text-[#8E9AA8] hover:text-[#1E2631]'
                  }`}
                >
                  {b === 'All' ? 'All Brands' : b}
                </button>
              ))}
            </div>

            {/* Creative Outside Sort Filter Switcher (1-Tap Instant Sort, No Hidden Dropdown) */}
            <div className="flex items-center gap-1 pl-2 border-l border-[#5A6678]/15 ml-auto md:ml-0">
              <span className="text-[#8E9AA8] text-[10px] font-bold uppercase tracking-wider hidden lg:inline mr-1">
                Sort:
              </span>
              
              <button
                type="button"
                onClick={() => setActiveSort('featured')}
                className={`btn-liquid px-2.5 py-1 rounded-[2px] text-[11px] font-semibold cursor-pointer transition-all ${
                  activeSort === 'featured'
                    ? 'btn-liquid-active bg-[#1E2631] text-white shadow-xs'
                    : 'btn-liquid-glass text-[#8E9AA8] hover:text-[#1E2631]'
                }`}
                title="Sort by Featured Atelier Pieces"
              >
                Featured
              </button>

              <button
                type="button"
                onClick={() => setActiveSort('price-asc')}
                className={`btn-liquid px-2.5 py-1 rounded-[2px] text-[11px] font-semibold cursor-pointer transition-all ${
                  activeSort === 'price-asc'
                    ? 'btn-liquid-active bg-[#1E2631] text-white shadow-xs'
                    : 'btn-liquid-glass text-[#8E9AA8] hover:text-[#1E2631]'
                }`}
                title="Sort Price: Low to High"
              >
                Price ↑
              </button>

              <button
                type="button"
                onClick={() => setActiveSort('price-desc')}
                className={`btn-liquid px-2.5 py-1 rounded-[2px] text-[11px] font-semibold cursor-pointer transition-all ${
                  activeSort === 'price-desc'
                    ? 'btn-liquid-active bg-[#1E2631] text-white shadow-xs'
                    : 'btn-liquid-glass text-[#8E9AA8] hover:text-[#1E2631]'
                }`}
                title="Sort Price: High to Low"
              >
                Price ↓
              </button>

              <button
                type="button"
                onClick={() => setActiveSort('stock')}
                className={`btn-liquid px-2.5 py-1 rounded-[2px] text-[11px] font-semibold cursor-pointer transition-all ${
                  activeSort === 'stock'
                    ? 'btn-liquid-active bg-[#1E2631] text-white shadow-xs'
                    : 'btn-liquid-glass text-[#8E9AA8] hover:text-[#1E2631]'
                }`}
                title="Sort by Available Stock"
              >
                Stock
              </button>
            </div>

            {/* Live Count */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#5A6678]/15 text-[#8E9AA8] text-[11px] whitespace-nowrap hidden xl:flex">
              <strong className="text-[#1E2631]">{displayedProducts.length}</strong>/{filteredProducts.length}
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/70 border border-[#5A6678]/10 rounded-[2px] p-3 aspect-[4/6] animate-pulse flex flex-col justify-between"
              >
                <div className="w-full aspect-[4/5] bg-slate-200 rounded-[2px]" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center liquid-glass bg-white/90 rounded-[2px] border border-[#5A6678]/15 flex flex-col items-center">
            <PackageX className="w-10 h-10 text-[#8E9AA8] mb-3" />
            <h3 className="text-base font-display font-bold text-[#1E2631]">
              No Pieces Match Your Filter
            </h3>
            <p className="text-xs text-[#5A6678] mt-1 mb-4">
              Try adjusting your category or search parameters
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedBrand('All');
                setSearchQuery('');
              }}
              className="btn-liquid btn-liquid-charcoal px-5 py-2.5 text-xs font-mono font-bold uppercase rounded-[2px] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((p) => {
                const totalInCart = cartItems
                  .filter((item) => item.productId === p.id)
                  .reduce((acc, item) => acc + item.qty, 0);

                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    currency={currency}
                    cartQty={totalInCart}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                  />
                );
              })}
            </div>

            {/* Pagination Progress & Elevated Liquid Glass Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 mb-6 flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1.5 w-full max-w-xs text-center">
                  <span className="text-[11px] font-mono text-[#5A6678]">
                    Showing <strong className="text-[#1E2631]">{displayedProducts.length}</strong> of{' '}
                    <strong className="text-[#1E2631]">{filteredProducts.length}</strong> Pieces
                  </span>
                  <div className="w-full bg-slate-200 h-1.5 rounded-[2px] overflow-hidden">
                    <div
                      className="h-full bg-[#1E2631] transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((displayedProducts.length / filteredProducts.length) * 100)
                        )}%`
                      }}
                    />
                  </div>
                </div>

                {displayedProducts.length < filteredProducts.length ? (
                  <button
                    onClick={handleLoadMore}
                    className="btn-liquid btn-liquid-terracotta px-8 py-3.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider shadow-md flex items-center gap-2 group cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-white group-hover:rotate-180 transition-all duration-500" />
                    <span>Load More Pieces ({filteredProducts.length - displayedProducts.length} Remaining)</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-mono text-[#8E9AA8] py-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>All {filteredProducts.length} Atelier Pieces Loaded</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </main>

      {/* 4. Atelier Craft & Standards Editorial */}
      <AtelierCraftStory />

      {/* 5. Minimal Editorial Footer with Interactive Topics */}
      <ShopFooter onOpenTopic={(t) => setActiveGuideTopic(t)} />

      {/* 6. Modals & Slide-overs */}
      <ProductQuickViewModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, size, qty) => handleAddToCart(p, size, qty)}
      />

      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutReceiptModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onSuccessOrder={handleOrderSuccess}
      />

      <AtelierGuideModal
        topic={activeGuideTopic}
        onClose={() => setActiveGuideTopic(null)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

    </div>
  );
}
