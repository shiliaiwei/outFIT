'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

interface BrandSelectDropdownProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
  prefixIcon?: React.ReactNode;
}

export function BrandSelectDropdown({
  options,
  value,
  onChange,
  className = '',
  prefixIcon
}: BrandSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      
      {/* Trigger Button (360° Liquid Glass) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn-liquid btn-liquid-glass px-3 py-1.5 rounded-[2px] flex items-center gap-2 text-xs font-mono font-bold text-[#1E2631] cursor-pointer hover:border-[#C84428] transition-all shadow-xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {prefixIcon || <ArrowUpDown className="w-3.5 h-3.5 text-[#C84428]" />}
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-[#8E9AA8] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#C84428]' : ''
          }`} 
        />
      </button>

      {/* Custom Liquid Glass Dropdown Menu (No OS Generic Popup) */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-52 bg-white/95 backdrop-blur-xl border border-[#5A6678]/20 rounded-[2px] shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-150 origin-top-right overflow-hidden liquid-glass">
          <div className="px-2.5 py-1.5 border-b border-[#5A6678]/10 text-[10px] font-mono uppercase tracking-widest text-[#8E9AA8]">
            Sort Catalog By
          </div>
          
          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-xs font-mono flex items-center justify-between cursor-pointer transition-colors text-left ${
                    isSelected 
                      ? 'bg-[#1E2631] text-white font-bold' 
                      : 'text-[#1E2631] hover:bg-[#F8F7F4] hover:text-[#C84428]'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#C84428]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
