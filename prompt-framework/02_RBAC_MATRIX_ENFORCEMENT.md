# MODULE 02 — RBAC MATRIX & ENFORCEMENT

> Roles Hierarchy: ADMIN ≥ MANAGER ≥ CASHIER ≥ STAFF ≥ PUBLIC (numeric rank §1)

---

## §1 RBAC TYPES & 50+ PERMISSION BITS

### src/types/rbac.types.ts

```typescript
export enum Role {
  PUBLIC  = "public",
  STAFF   = "staff",
  CASHIER = "cashier",
  MANAGER = "manager",
  ADMIN   = "admin",
}

// Hierarchy rank — higher rank inherits all permissions from lower
export const ROLE_RANK: Record<Role, number> = {
  [Role.PUBLIC]:  0,
  [Role.STAFF]:   1,
  [Role.CASHIER]: 2,
  [Role.MANAGER]: 3,
  [Role.ADMIN]:   4,
};

// Fine-grained permission bits (each mapped to 1+ API Section in Postman)
export type PermissionBit =
  // ⬜ PUBLIC (Postman Sections 01-07 read, 08-09 cart/wishlist public)
  | "product:read"          // Section 03
  | "variant:read"          // Section 04
  | "catalog:read"          // Section 05 (categories, brands, sizes, colors)
  | "bundle:read"           // Section 06
  | "promotion:read"        // Section 06
  | "branch:read"           // Section 06
  | "inventory:read"        // Section 07
  | "banner:read"           // Section 07
  | "currency:read"         // Section 02
  | "system:health"         // Section 01
  // 🔸 STAFF (Sections 08-10 — public + use cart/pay)
  | "cart:use"              // Section 08
  | "wishlist:use"          // Section 09
  | "payment:process"       // Section 10
  | "pos:lookup"            // Inventory quick lookup access
  // 🟧 CASHIER (Sections 11-17)
  | "session:manage"        // Section 11
  | "customer:crud"         // Section 12
  | "shift:open-close"      // Section 13
  | "order:create-read"     // Section 14
  | "invoice:issue"         // Section 15
  | "giftcard:redeem"       // Section 15
  | "shipping:process"      // Section 16
  | "alerts:view"           // Section 17
  // 🟦 MANAGER (Sections 18-40)
  | "analytics:view"        // Section 18
  | "forecasting:view"      // Section 18
  | "catalog:crud"          // Sections 19-21 (categories, brands, sizes, colors)
  | "product:crud"          // Section 22
  | "variant:crud"          // Section 23
  | "bundle:crud"           // Section 24
  | "promotion:crud"        // Section 25
  | "supplier:crud"         // Section 26
  | "purchase:crud"         // Section 27
  | "stockmovement:view"    // Section 28
  | "stocktransfer:manage"  // Section 29 (5-stage lifecycle)
  | "batch:manage"          // Section 30 FIFO
  | "branch:crud"           // Section 31
  | "image:upload"          // Section 32 Cloudinary
  | "order:void"            // Section 33 Order Void
  | "audit:view"            // Section 34
  | "banner:crud"           // Section 35
  | "export:run"            // Section 36
  | "mis:view"              // Section 37 MIS Reports
  | "ai:use"                // Section 38 AI Intelligence
  | "gdpr:process"          // Section 39
  | "webhook:manage"        // Section 40
  // 🔴 ⛔ ADMIN ONLY (Sections 41-43)
  | "employee:crud"         // Section 41
  | "account:manage"        // Section 42
  | "system:monitor";       // Section 43
```

---

## §2 44 ROUTE × 5 ROLE ACCESS MATRIX

> **Legend:** ✅ = Allowed | ❌ = Blocked → /unauthorized | 🔒Soft = Component banner "upgrade role required" | 🔐 = Triple-locked ADMIN ONLY (middleware + component + API 403)

| Route Pattern | PUBLIC | STAFF | CASHIER | MANAGER | ADMIN |
|---|---|---|---|---|---|
| `/` Shop Home | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/products/*` Catalog | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/cart` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/wishlist` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/brands/*`, `/categories/*` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/login`, `/unauthorized` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/pos/*` POS Terminal | ❌ | 🔒Soft | ✅ | ✅ | ✅ |
| `/orders/*` Orders | ❌ | 🔒Soft | ✅ | ✅ | ✅ |
| `/customers/*` CRUD | ❌ | ❌ | ✅ | ✅ | ✅ |
| `/shifts/*` Open/Close | ❌ | ❌ | ✅ | ✅ | ✅ |
| `/inventory/lookup` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `/inventory/stock` | ❌ | ✅ | ✅ | ✅ | ✅ |
| `/dashboard` KPI Grid | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/analytics/sales` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/analytics/inventory` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/analytics/forecasting` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/analytics/ai` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/products/*` CRUD | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/variants` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/categories` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/brands` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/sizes`, `/catalog/colors` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/bundles` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/catalog/promotions` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/inventory/purchases` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/inventory/suppliers` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/inventory/movements` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/inventory/transfers` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/inventory/batches` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/operations/branches` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/operations/banners` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/operations/images` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/operations/gift-cards` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/operations/shipping` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/reports/exports` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/reports/mis` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/system/audit` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/system/webhooks` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/system/gdpr` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/system/voids` | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/system/settings` | ❌ | ❌ | ❌ | ✅ | ✅ |
| **⛔ ADMIN ONLY** `/system/employees` | ❌ | ❌ | ❌ | ❌ | 🔐 |
| **⛔ ADMIN ONLY** `/system/accounts` | ❌ | ❌ | ❌ | ❌ | 🔐 |
| **⛔ ADMIN ONLY** `/system/monitor` | ❌ | ❌ | ❌ | ❌ | 🔐 |

> **Total assertions:** 44 routes × 5 roles = **220 E2E tests required** (Module 06 §1)

---

## §3 src/lib/rbac-matrix.ts — ROLE→PERMISSION TRUTH SOURCE

```typescript
import { Role, PermissionBit, ROLE_RANK } from "@/types/rbac.types";

export const ROLE_PERMISSIONS: Record<Role, PermissionBit[]> = {
  public: [
    "product:read","variant:read","catalog:read","bundle:read","promotion:read",
    "branch:read","inventory:read","banner:read","currency:read","system:health",
    "cart:use","wishlist:use",
  ],
  staff: [
    "product:read","variant:read","catalog:read","bundle:read","promotion:read",
    "branch:read","inventory:read","banner:read","currency:read","system:health",
    "cart:use","wishlist:use","payment:process","pos:lookup",
  ],
  cashier: [
    "product:read","variant:read","catalog:read","bundle:read","promotion:read",
    "branch:read","inventory:read","banner:read","currency:read","system:health",
    "cart:use","wishlist:use","payment:process","pos:lookup",
    "session:manage","customer:crud","shift:open-close","order:create-read",
    "invoice:issue","giftcard:redeem","shipping:process","alerts:view",
  ],
  manager: [
    "product:read","variant:read","catalog:read","bundle:read","promotion:read",
    "branch:read","inventory:read","banner:read","currency:read","system:health",
    "cart:use","wishlist:use","payment:process","pos:lookup",
    "session:manage","customer:crud","shift:open-close","order:create-read",
    "invoice:issue","giftcard:redeem","shipping:process","alerts:view",
    "analytics:view","forecasting:view","catalog:crud","product:crud","variant:crud",
    "bundle:crud","promotion:crud","supplier:crud","purchase:crud",
    "stockmovement:view","stocktransfer:manage","batch:manage","branch:crud",
    "image:upload","order:void","audit:view","banner:crud","export:run",
    "mis:view","ai:use","gdpr:process","webhook:manage",
  ],
  admin: [
    "product:read","variant:read","catalog:read","bundle:read","promotion:read",
    "branch:read","inventory:read","banner:read","currency:read","system:health",
    "cart:use","wishlist:use","payment:process","pos:lookup",
    "session:manage","customer:crud","shift:open-close","order:create-read",
    "invoice:issue","giftcard:redeem","shipping:process","alerts:view",
    "analytics:view","forecasting:view","catalog:crud","product:crud","variant:crud",
    "bundle:crud","promotion:crud","supplier:crud","purchase:crud",
    "stockmovement:view","stocktransfer:manage","batch:manage","branch:crud",
    "image:upload","order:void","audit:view","banner:crud","export:run",
    "mis:view","ai:use","gdpr:process","webhook:manage",
    // ⛔ ADMIN ONLY bits
    "employee:crud","account:manage","system:monitor",
  ],
};

// ---------- composables ----------
export function hasRole(userRole: Role | null, required: Role): boolean {
  if (!userRole) return false;
  return (ROLE_RANK[userRole] ?? 0) >= ROLE_RANK[required];
}

export function isAtLeast(userRole: Role | null, rank: number): boolean {
  if (!userRole) return false;
  return (ROLE_RANK[userRole] ?? 0) >= rank;
}

export function hasPermission(userRole: Role | null, perm: PermissionBit): boolean {
  if (!userRole) return ROLE_PERMISSIONS.public.includes(perm);
  return (ROLE_PERMISSIONS[userRole] ?? []).includes(perm);
}

export function requireRoleOrThrow(userRole: Role | null, required: Role): void {
  if (!hasRole(userRole, required)) {
    const err = new Error(`FORBIDDEN: role ${String(userRole)} cannot access`);
    (err as any).code = "FORBIDDEN";
    throw err;
  }
}
```

---

## §4 components/layout/RequireRole.tsx — COMPONENT GUARD (Layer 2)

```tsx
import React from "react";
import { Role, ROLE_RANK } from "@/types/rbac.types";
import { useRbac } from "@/hooks/rbac/useRbac";
import { PermissionDenied } from "@/components/shared/PermissionDenied";

interface RequireRoleProps {
  allowed: Role[];              // List the LOWEST acceptable role; higher inherited
  children: React.ReactNode;
  fallback?: React.ReactNode;   // What to render instead if denied (def: PermissionDenied)
  redirect?: boolean;           // When true: redirect /unauthorized, don't render fallback
}

/**
 * Redundant component-level RBAC guard (Layer 2).
 * Even if middleware is bypassed (or route is client-only), this blocks rendering.
 */
export function RequireRole({ allowed, children, fallback, redirect = false }: RequireRoleProps) {
  const { role } = useRbac();
  const currentRank = ROLE_RANK[role] ?? -1;
  const minRank     = Math.min(...allowed.map(r => ROLE_RANK[r] ?? 99));
  const permitted   = currentRank >= minRank;

  if (permitted) return <>{children}</>;

  if (redirect && typeof window !== "undefined") {
    setTimeout(() => { window.location.replace("/unauthorized"); }, 0);
    return null;
  }
  return <>{fallback ?? <PermissionDenied compact />}</>;
}
```

---

## §5 THREE-LAYER RBAC ENFORCEMENT — REDUNDANCY RULE

| Layer | Mechanism | Where | Catches |
|---|---|---|---|
| **L1 — Server** | `middleware.ts` regex → redirect **before** React renders | `src/middleware.ts` | Direct URL access, unauthenticated deep links, API route callers |
| **L2 — Component** | `<RequireRole allowed=[...]>` wraps page root | Every `page.tsx` under (staff)/(admin) | Client-side nav bypass, component tree level denial |
| **L3 — Action/Button** | `hasPermission()` check before rendering each destructive/elevated button | All DataTable row actions, form submit buttons, menu items | Role leak in higher component, staff accidentally seeing "Delete Employee" DOM node |
| **L4 — API (Trust but verify!)** | Backend enforces same rules per Section headers of Postman | Server, outside our repo | **Ultimate authority** — UI is UX only |

> ✅ **ALL 4 layers must agree.** If MANAGER clicks "Delete Employee" button despite L3 hiding it, backend returns 403. The L1/L2/L3 gates exist to prevent UX confusion, not to be the security boundary.
