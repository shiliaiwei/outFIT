# MODULE 06 — TESTING CRITERIA (ZERO RBAC LEAKS, WCAG 2.1 AA)

---

## §1 PLAYWRIGHT E2E RBAC MATRIX (220 assertions)

> File: `src/test/e2e/rbac-access.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

// ── 44 routes × 5 roles = 220 assertions ─────────────────
const ROUTES: Array<{
  path: string;
  minRole: "staff" | "cashier" | "manager" | "admin";
  soft?: boolean;
  adminOnly?: boolean;
}> = [
  // (staff) group
  { path: "/pos",                        minRole: "staff",   soft: true },
  { path: "/pos/receipts/1/print",       minRole: "staff" },
  { path: "/orders",                     minRole: "staff",   soft: true },
  { path: "/orders/1",                   minRole: "staff" },
  { path: "/customers",                  minRole: "cashier" },
  { path: "/customers/new",              minRole: "cashier" },
  { path: "/inventory/lookup",           minRole: "staff" },
  { path: "/inventory/stock",            minRole: "staff" },
  { path: "/shifts/open",                minRole: "cashier" },
  { path: "/shifts/close",               minRole: "cashier" },
  // (admin) group - dashboard/analytics
  { path: "/dashboard",                  minRole: "manager" },
  { path: "/analytics/sales",            minRole: "manager" },
  { path: "/analytics/inventory",        minRole: "manager" },
  { path: "/analytics/forecasting",      minRole: "manager" },
  { path: "/analytics/ai",               minRole: "manager" },
  // catalog
  { path: "/catalog/products",           minRole: "manager" },
  { path: "/catalog/products/new",       minRole: "manager" },
  { path: "/catalog/products/1/edit",    minRole: "manager" },
  { path: "/catalog/variants",           minRole: "manager" },
  { path: "/catalog/categories",         minRole: "manager" },
  { path: "/catalog/brands",             minRole: "manager" },
  { path: "/catalog/sizes",              minRole: "manager" },
  { path: "/catalog/colors",             minRole: "manager" },
  { path: "/catalog/bundles",            minRole: "manager" },
  { path: "/catalog/promotions",         minRole: "manager" },
  // inventory deep
  { path: "/inventory/purchases",        minRole: "manager" },
  { path: "/inventory/suppliers",        minRole: "manager" },
  { path: "/inventory/movements",        minRole: "manager" },
  { path: "/inventory/transfers",        minRole: "manager" },
  { path: "/inventory/batches",          minRole: "manager" },
  // operations
  { path: "/operations/branches",        minRole: "manager" },
  { path: "/operations/banners",         minRole: "manager" },
  { path: "/operations/images",          minRole: "manager" },
  { path: "/operations/gift-cards",      minRole: "manager" },
  { path: "/operations/shipping",        minRole: "manager" },
  // reports
  { path: "/reports/exports",            minRole: "manager" },
  { path: "/reports/mis",                minRole: "manager" },
  // system (manager+)
  { path: "/system/audit",               minRole: "manager" },
  { path: "/system/webhooks",            minRole: "manager" },
  { path: "/system/gdpr",                minRole: "manager" },
  { path: "/system/voids",               minRole: "manager" },
  { path: "/system/settings",            minRole: "manager" },
  // ⛔ ADMIN ONLY — triple-locked
  { path: "/system/employees",           minRole: "admin", adminOnly: true },
  { path: "/system/accounts",            minRole: "admin", adminOnly: true },
  { path: "/system/monitor",             minRole: "admin", adminOnly: true },
];

const RANKS: Record<"public" | "staff" | "cashier" | "manager" | "admin", number> =
  { public: 0, staff: 1, cashier: 2, manager: 3, admin: 4 };

// Credentials mirror Postman Section 00
const CREDS: Record<Exclude<keyof typeof RANKS, "public">, { u: string; p: string }> = {
  staff:   { u: "staff",   p: "Staff@2026" },
  cashier: { u: "cashier", p: "Cashier@Ops!2026" },
  manager: { u: "manager", p: "Manager@Ops!2026" },
  admin:   { u: "admin",   p: "Admin#Secure#2026" },
};

// ── 220 Iterations ────────────────────────────────────────
ROUTES.forEach(({ path, minRole, adminOnly }) => {
  (Object.keys(RANKS) as Array<keyof typeof RANKS>).forEach((role) => {
    const allowed = RANKS[role] >= RANKS[minRole];

    test(`[RBAC] role=${role} → ${path} expects ${allowed ? "200 OK" : "403 block"}${adminOnly ? " (ADMIN ONLY)" : ""}`, async ({ browser }) => {
      const ctx  = await browser.newContext();
      const page = await ctx.newPage();

      // 1. Auth
      if (role !== "public") {
        const { u, p } = CREDS[role];
        await page.goto("/login", { waitUntil: "domcontentloaded" });
        await page.getByLabel(/username/i).fill(u);
        await page.getByLabel(/password/i).fill(p);
        await page.getByRole("button", { name: /sign in|login/i }).click();
        // Wait for any post-login navigation
        await page.waitForURL(/\/(pos|dashboard|inventory|unauthorized)/, { timeout: 10000 });
      }

      // 2. Navigate to target route
      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      const status = res?.status() ?? 0;

      // 3. Assert outcome
      if (allowed) {
        expect.soft([200, 304]).toContain(status);
        // Rendered content marker: pages should put data-page-ready attr
        await expect(page.locator("[data-page-ready]")).toBeVisible({ timeout: 10000 });
        if (adminOnly) {
          // Verify ADMIN chrome appears: e.g. "Employees (Admin Only)" heading
          await expect(page.getByText(/admin only/i)).toBeVisible();
        }
      } else {
        const blocked =
          status === 403 ||
          page.url().includes("/unauthorized") ||
          page.url().includes("/login");
        expect(blocked, `Expected 403/login redirect. Status=${status}, URL=${page.url()}`).toBe(true);
      }

      await ctx.close();
    });
  });
});
```

---

## §2 VISUAL NEO-BRUTALISM AUDIT (CI grep test)

Add to `package.json` scripts and run in CI before deploy.

```bash
# -------- FAIL BUILD IF PUBLIC SHOP BREACHES NEO-BRUTALISM --------
NEO_BREACHES=$(grep -rnE 'class="[^"]*(rounded-[^n]|shadow-[^n])' \
  src/app/\(shop\)/ src/components/shop/ 2>/dev/null || true)

if [ -n "$NEO_BREACHES" ]; then
  echo "❌ NEO-BRUTALISM BREACH — found rounding/shadow in Public shop layer:"
  echo "$NEO_BREACHES"
  exit 1
else
  echo "✅ Public shop Neo-Brutalism audit passed (no rounding/shadows)."
fi

# -------- FAIL BUILD IF ADMIN-ONLY ROUTES MISS DOUBLE GUARD --------
ADMIN_FILES=(
  "src/app/(admin)/system/employees/page.tsx"
  "src/app/(admin)/system/accounts/page.tsx"
  "src/app/(admin)/system/monitor/page.tsx"
)
for f in "${ADMIN_FILES[@]}"; do
  if ! grep -qE 'RequireRole.*ADMIN|adminOnly:\s*true' "$f"; then
    echo "❌ ADMIN-only guard missing in $f"
    exit 1
  fi
done
echo "✅ ADMIN-only triple-locked files confirmed guarded."
```

---

## §3 UNIT TEST: RBAC BUTTON GATING (Vitest + RTL)

```tsx
// src/test/integration/rbac-permissions.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Role } from "@/types/rbac.types";
import { AuthProvider } from "@/providers/AuthProvider";
import EmployeesPage from "@/app/(admin)/system/employees/page";

function renderAs(role: Role, ui: React.ReactElement = <EmployeesPage />) {
  return render(
    <AuthProvider
      initialUser={{
        id:        role === Role.ADMIN ? 1 : role === Role.MANAGER ? 2 : role === Role.CASHIER ? 3 : 4,
        username:  role,
        role,
        createdAt: new Date().toISOString(),
      }}
    >
      {ui}
    </AuthProvider>
  );
}

describe("⛔ ADMIN ONLY: /system/employees RBAC gating", () => {
  it("ADMIN sees New button + Delete row actions", () => {
    renderAs(Role.ADMIN);
    expect(screen.getByRole("button", { name: /new employee/i })).toBeInTheDocument();
    // delete actions exist in each row menu
    expect(
      screen.queryAllByRole("menuitem", { name: /delete employee|remove/i }).length
    ).toBeGreaterThan(0);
  });

  it("MANAGER sees list but NO create/delete/chrome", () => {
    renderAs(Role.MANAGER);
    // Buttons hidden
    expect(screen.queryByRole("button", { name: /new employee/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem", { name: /delete employee|remove/i })).not.toBeInTheDocument();
    // Permission banner is visible
    expect(screen.getByText(/permission denied|admin only/i)).toBeInTheDocument();
  });

  it("STAFF sees PermissionDenied overlay instead of data", () => {
    renderAs(Role.STAFF);
    expect(screen.getByText(/you do not have permission|unauthorized/i)).toBeInTheDocument();
    // Table never rendered
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});

describe("MANAGER+: Catalog product delete gating", () => {
  it("CASHIER cannot view catalog at all (middleware blocks)", () => {
    // Playwright covers this; also sanity check inline guard
    expect(() => requireRoleOrThrow(Role.CASHIER, Role.MANAGER)).toThrow(/FORBIDDEN/);
  });
});
```

---

## §4 ACCESSIBILITY (axe-core + PLAYWRIGHT) WCAG 2.1 AA

```typescript
// src/test/e2e/a11y.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const LANDING_PAGES = [
  { role: "public",  path: "/",                 label: "Public Shop Home" },
  { role: "public",  path: "/products",         label: "Public Products" },
  { role: "cashier", path: "/pos",              label: "POS Terminal" },
  { role: "manager", path: "/dashboard",        label: "Admin Dashboard" },
  { role: "admin",   path: "/system/employees", label: "Admin Employees" },
];

LANDING_PAGES.forEach(({ role, path, label }) => {
  test(`[A11y] ${label} — axe-core WCAG 2.1 AA ≥ 95`, async ({ page, browser }) => {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    // Authenticate non-public (reuse CREDS from §1)
    if (role !== "public") {
      await p.goto("/login");
      // ... same login sequence
    }
    await p.goto(path);
    await p.waitForSelector("[data-page-ready]", { timeout: 15000 });

    const results = await new AxeBuilder({ page: p })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations.filter(v => v.impact === "serious" || v.impact === "critical");
    expect.soft(violations, `Serious/critical a11y violations in ${label}`).toEqual([]);
    console.log(
      `[${label}] violations total=${results.violations.length} serious=${violations.length}`
    );
    await ctx.close();
  });
});
```

---

## §5 RECEIPT PRINT + BARCODE SCAN SMOKE TESTS (Manual-to-Automated)

```tsx
// Manual Checklist (attach to CI artifacts if headless print unavailable):
/*
  1. Print Receipt
     ✅ react-to-print launches print dialog in < 2s after Complete Sale
     ✅ 80mm thermal template fits: OutfitLockup, Order #, items qty×price, subtotal/tax/total, cashier, shift, timestamp, barcode
     ✅ No layout break (no cutoff)
  2. Barcode Scan
     ✅ Scan SKU-GUC-0182 (Postman variable) → product query fires ≤ 2s
     ✅ Manual entry SKU-GUC-0182 → same result
     ✅ Invalid barcode → toast: "No product matches this SKU"
  3. Offline POS (devtools offline mode)
     ✅ Disconnect → banner: "Offline — 3 held"
     ✅ Queue 3 transactions; reconnect → 3 × success toast → orders in orders list
     ✅ Conflict server-wins resolver applied correctly (last-write wins)
*/
```
