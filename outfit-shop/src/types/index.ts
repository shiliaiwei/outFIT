export type UserRole = 'cashier' | 'admin' | 'manager' | 'warehouse';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
  terminalId?: string;
  shiftStart: string;
}

export interface PosProduct {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  color: string;
  size: 'S' | 'M' | 'L' | 'XL' | string;
  image?: string;
}

export interface RegisterTelemetry {
  id: string;
  name: string;
  operator: string;
  shiftSales: number;
  transactionCount: number;
  status: 'online' | 'offline' | 'idle';
  lastActivity: string;
  drawerBalance: number;
}

export interface ShiftOverride {
  id: string;
  requestedBy: string;
  reason: string;
  discountPct: number;
  amountSaved: number;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface TransactionReceipt {
  receiptNo: string;
  items: any[];
  subtotal: number;
  tax: number;
  total: number;
  tenderType: 'CASH' | 'CARD' | 'ABA_KHQR' | 'BITCOIN_LN';
  cashierName: string;
  registerId: string;
  timestamp: string;
}

export interface StockMovement {
  id: string;
  sku: string;
  productName: string;
  type: 'INBOUND' | 'TRANSFER' | 'SALE' | 'ADJUSTMENT';
  qty: number;
  location: string;
  timestamp: string;
  handler: string;
}

export type CurrencyCode = 'USD' | 'KHR' | 'EUR';

export interface ApiImage {
  image_id: number;
  product_id: number;
  variant_id?: number | null;
  image_url: string;
  shot_type?: string;
  is_primary?: boolean;
}

export interface ApiVariant {
  variant_id: number;
  product_id: number;
  size_id?: number;
  color_id?: number;
  sku: string;
  barcode: string;
  cost_price?: number;
  sale_price: number;
  quantity: number;
  size?: {
    size_id: number;
    size_name: string;
    size_code?: string | null;
  };
  color?: {
    color_id: number;
    color_name: string;
    hex_code?: string | null;
  };
}

export interface ApiCategory {
  category_id: number;
  category_name: string;
  description?: string;
  department_type?: string;
  slug?: string | null;
}

export interface ApiProduct {
  product_id: number;
  category_id: number;
  product_name: string;
  brand: string;
  description: string;
  status: string;
  image_url?: string | null;
  product_type?: string;
  gender?: string | null;
  material_fabric?: string | null;
  season_collection?: string | null;
  featured_badge?: string | null;
  category?: ApiCategory;
  variants?: ApiVariant[];
  images?: ApiImage[];
  primary_image?: ApiImage | null;
}

export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  barcode: string;
  material: string;
  season: string;
  badge?: string;
  imageUrl: string;
  gallery: string[];
  sizes: string[];
  colors: { name: string; hex?: string }[];
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  qty: number;
  stock: number;
  productId?: string;
  barcode?: string;
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  imageUrl?: string;
  image?: string;
}
