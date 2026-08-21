# 00_INDEX — OUTFIT MASTER PROMPT ENGINEERING FRAMEWORK

> **Brand:** OutFIT | **Domain:** outfit.kesararamwithdigital.tech
> **Tech Stack:** Next.js 14 App Router · TypeScript strict · Tailwind + shadcn/ui · TanStack Query v5 · React Hook Form + Zod · @zxing/browser · react-to-print · Recharts
> **API Base:** `https://api.kesararamwithdigital.tech/api/v1`
> **Contract Source:** `OutfitShop_Master_Collection.json` (43 Sections × RBAC roles)

---

## FILES IN THIS FRAMEWORK (READ IN ORDER)

| # | File | Purpose | Size |
|---|---|---|---|
| 01 | [00_BRAND_IDENTITY.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/00_BRAND_IDENTITY.md) | Logo system, 3-palette RBAC colors, typography (brand-guidelines compliant) | Core |
| 02 | [01_ARCHITECTURE_FOLDER_TREE.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/01_ARCHITECTURE_FOLDER_TREE.md) | Complete folder gal structure, package.json, tsconfig, tailwind config, middleware | Critical |
| 03 | [02_RBAC_MATRIX_ENFORCEMENT.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/02_RBAC_MATRIX_ENFORCEMENT.md) | Role enum, PermissionBit union, 44 route × 5 role matrix, guards | Critical |
| 04 | [03_PROMPT_SKILLS_01-04.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/03_PROMPT_SKILLS_01-04.md) | SKILL 01 (component), 02 (RBAC page), 03 (API hook), 04 (form) | Prompts |
| 05 | [04_PROMPT_SKILLS_05-08.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/04_PROMPT_SKILLS_05-08.md) | SKILL 05 (DataTable), 06 (Admin MetricCard), 07 (POS terminal), 08 (Public Shop Neo-Brutalist) | Prompts |
| 06 | [05_API_INTEGRATION_PATTERNS.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/05_API_INTEGRATION_PATTERNS.md) | Axios client, error interceptor, example useProducts hook, env validator | Reference |
| 07 | [06_TESTING_CRITERIA.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/06_TESTING_CRITERIA.md) | Playwright E2E RBAC matrix, unit tests, visual grep audit | Tests |
| 08 | [07_EXECUTION_PHASES.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/07_EXECUTION_PHASES.md) | Phase 0-7 roadmap, step-by-step integration checklist | Execution |
| 09 | [08_MAINTENANCE_EXTENSION_PLAYBOOK.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/08_MAINTENANCE_EXTENSION_PLAYBOOK.md) | Add new roles, cross-framework ports, brand refresh, new endpoints, DoD gates, API index | Maintenance |
| 10 | [09_GITHUB_SHOP_MASTER_DESIGN_PLAN.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/09_GITHUB_SHOP_MASTER_DESIGN_PLAN.md) | GitHub Shop master design specifications & editorial architecture | Architecture |
| 11 | [10_MASTER_DESIGN_SYSTEM_RECORD.md](file:///Users/Apple16/Documents/trae_projects/UI-FROTN/prompt-framework/10_MASTER_DESIGN_SYSTEM_RECORD.md) | Two-tone OUT/FIT brand identity, 2px badge & 9px card scale, zero emojis, dual HTML entrypoints | Authoritative |

---

## HOW TO USE THIS FRAMEWORK

### Step 1: Build Phase 0 (Scaffold)
Open `07_EXECUTION_PHASES.md` → copy Phase 0 shell commands → run in `/Users/Apple16/Documents/trae_projects/UI-FROTN/`. Result: Next.js 14 + shadcn/ui + deps installed.

### Step 2: Feed Prompt Skills to Agent
When requesting a component, page, or hook from the coding agent:
```
"Build a ProductCard component using SKILL 01 from the framework with these params:
  - TARGET ROLE: PUBLIC
  - PALETTE: Public Neo-Brutalist
  - PROPS: product object, onAddToCart
Reference palettes in 00_BRAND_IDENTITY.md Module A (PUBLIC)."
```

### Step 3: Every RBAC-Gated Feature
Reference `02_RBAC_MATRIX_ENFORCEMENT.md` → apply 3-layer gating:
1. `middleware.ts` (Layer 1, server)
2. `<RequireRole>` wrapper (Layer 2, component tree root)
3. Button-level `hasPermission()` check (Layer 3, per-action)

### Step 4: Every API Integration
Reference `05_API_INTEGRATION_PATTERNS.md` → copy `useProducts.ts` pattern. Match Postman section number exactly.

### Step 5: Validate with Testing
Run Playwright matrix from `06_TESTING_CRITERIA.md` → gates from Appendix A of `08_MAINTENANCE_EXTENSION_PLAYBOOK.md` → 220 route×role assertions + 13 DoD gates.

---

## QUICK REFERENCE CHEAT SHEET

| Concept | Source File |
|---|---|
| Brand colors (Public/Staff/Admin) | 00_BRAND_IDENTITY.md §2 |
| OutFIT logo SVG specs | 00_BRAND_IDENTITY.md §1 |
| Font stack: Poppins/Lora | 00_BRAND_IDENTITY.md §3 |
| Folder gal structure | 01_ARCHITECTURE_FOLDER_TREE.md §0 |
| package.json manifest | 01_ARCHITECTURE_FOLDER_TREE.md §1.1 |
| Strict tsconfig | 01_ARCHITECTURE_FOLDER_TREE.md §1.2 |
| 3-palette Tailwind config | 01_ARCHITECTURE_FOLDER_TREE.md §1.3 |
| Middleware RBAC route guard | 01_ARCHITECTURE_FOLDER_TREE.md §1.4 |
| Role enum + rank | 02_RBAC_MATRIX_ENFORCEMENT.md §1 |
| PermissionBit 50+ permissions | 02_RBAC_MATRIX_ENFORCEMENT.md §1 |
| 44 route × 5 role access matrix | 02_RBAC_MATRIX_ENFORCEMENT.md §2 |
| Role→Permission truth mapping | 02_RBAC_MATRIX_ENFORCEMENT.md §3 |
| RequireRole.tsx component guard | 02_RBAC_MATRIX_ENFORCEMENT.md §4 |
| 8 Prompt Skill templates | 03 + 04_PROMPT_SKILLS_01-08.md |
| Axios + error interceptor | 05_API_INTEGRATION_PATTERNS.md §1 |
| Example useProducts hook | 05_API_INTEGRATION_PATTERNS.md §2 |
| Playwright E2E matrix | 06_TESTING_CRITERIA.md §1 |
| Visual grep audit (neo-brutalism) | 06_TESTING_CRITERIA.md §2 |
| Unit test RBAC button gating | 06_TESTING_CRITERIA.md §3 |
| 7 Phases execution roadmap | 07_EXECUTION_PHASES.md P0-P7 |
| Add new role playbook | 08_MAINTENANCE_EXTENSION_PLAYBOOK.md §1 |
| Cross-framework port guide | 08_MAINTENANCE_EXTENSION_PLAYBOOK.md §2 |
| Definition of Done (13 gates) | 08_MAINTENANCE_EXTENSION_PLAYBOOK.md Appendix A |
| API Contract Index 00-43 | 08_MAINTENANCE_EXTENSION_PLAYBOOK.md Appendix B |
