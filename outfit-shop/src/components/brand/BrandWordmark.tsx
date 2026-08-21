'use client';

import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  invert?: boolean;
}

export function BrandWordmark({ className = '', size = 'md', invert = false }: BrandWordmarkProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`brand-wordmark-twotone font-display ${sizeClasses[size]} ${className}`}>
      <span className={`font-black ${invert ? 'text-white' : 'text-[#1E2631]'}`}>
        OUT
      </span>
      <span className="font-bold text-[#C84428] ml-[1px]">
        FIT
      </span>
    </div>
  );
}
