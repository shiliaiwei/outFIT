# MODULE 05 — API INTEGRATION PATTERNS (TanStack Query v5)

## §1 src/lib/api-client.ts — Axios Singleton + Interceptors

```typescript
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { z } from "zod";
import { AppError, AppErrorCode } from "./errors";

export const API_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE) ||
  "https://api.kesararamwithdigital.tech/api/v1";

// ── Standard API Envelope (matches Postman: { success, data, message, meta }) ──
export function ApiEnvelope<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    data:    dataSchema,
    message: z.string().optional(),
    meta:    z
      .object({
        page:     z.number(),
        per_page: z.number(),
        total:    z.number(),
      })
      .partial()
      .optional(),
  });
}

export type ApiEnvelopeType<T> = z.infer<ReturnType<typeof ApiEnvelope<z.ZodType<T>>>>;

// ── Cookie token getter (mirrors middleware.ts) ──
export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/outfit_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]!) : null;
}

// ── Axios singleton ──
export const api = axios.create({
  baseURL:    API_BASE,
  timeout:    15_000,
  headers:    { "Accept": "application/json", "X-App": "OutfitShop/1.0" },
});

// ── REQUEST Interceptor: attach Bearer ──
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

// ── RESPONSE Interceptor: normalize errors into typed AppError ──
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status     = error.response?.status ?? 0;
    const rawData: any = error.response?.data;
    let code:       AppErrorCode = "UNKNOWN";
    let message                   = error.message;
    let fieldErrors: Record<string, string[]> | undefined;

    switch (status) {
      case 401:
        code    = "UNAUTHENTICATED";
        message = "Session expired — please sign in again.";
        if (typeof window !== "undefined") {
          // Hard logout — wipe the cookie then go to /login
          document.cookie = "outfit_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
          window.location.replace(`/login?returnUrl=${returnUrl}`);
        }
        break;
      case 403:
        code    = "FORBIDDEN";
        message = "Your role does not grant access to this feature. Contact an admin.";
        break;
      case 404:
        code    = "NOT_FOUND";
        message = rawData?.message || "Resource not found.";
        break;
      case 422:
        code        = "VALIDATION";
        message     = rawData?.message || "Please correct the highlighted fields.";
        fieldErrors = rawData?.errors as Record<string, string[]> | undefined;
        break;
      case 429:
        code    = "RATELIMITED";
        message = `Too many requests — retry after ${String(error.response?.headers["retry-after"] || "30s")}.`;
        break;
      case 0:
        code    = "NETWORK";
        message = "No internet connection. Your changes will sync when you're back online.";
        break;
      default:
        if (status >= 500) {
          code    = "SERVER";
          message = "Server error — our team has been alerted. Please retry in a moment.";
        }
    }
    return Promise.reject(new AppError(code, message, { status, fieldErrors, cause: error }));
  }
);
```

---

## §2 lib/errors.ts — AppError Class

```typescript
export type AppErrorCode =
  | "UNKNOWN"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "RATELIMITED"
  | "NETWORK"
  | "SERVER";

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly status?: number;
  public readonly fieldErrors?: Record<string, string[]>;

  constructor(code: AppErrorCode, message: string, meta?: {
    status?: number;
    fieldErrors?: Record<string, string[]>;
    cause?: unknown;
  }) {
    super(message);
    this.name        = "AppError";
    this.code        = code;
    this.status      = meta?.status;
    this.fieldErrors = meta?.fieldErrors;
    if (meta?.cause) (this as any).cause = meta.cause;
  }
}
```

---

## §3 lib/query-client.ts — TanStack Query v5 Defaults

```typescript
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:          60_000,       // 1 min default; overridden per hook
        gcTime:             5 * 60_000,   // 5 min default
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
        refetchOnReconnect: true,
        retry(failureCount, error: any) {
          const code = (error as AppError)?.code;
          if (["FORBIDDEN","UNAUTHENTICATED","VALIDATION","NOT_FOUND"].includes(String(code))) return false;
          return failureCount < 2;  // 1 auto-retry for transient errors
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}
```

---

## §4 EXAMPLE: useProducts.ts (SKILL 03 output — Postman Section 03 + 22)

```typescript
// src/hooks/api/useProducts.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { z } from "zod";
import { api, ApiEnvelope } from "@/lib/api-client";
import { Product, ProductStatus } from "@/types/product.types";
import { toast } from "sonner";
import { hasPermission, requireRoleOrThrow } from "@/lib/rbac-matrix";
import { Role } from "@/types/rbac.types";

// ────────── ZOD SCHEMAS ─────────────────────────────────────
export const ProductListParams = z.object({
  page:        z.coerce.number().int().min(1).default(1),
  per_page:    z.coerce.number().int().min(5).max(100).default(15),
  search:      z.string().max(80).optional(),
  category_id: z.coerce.number().int().optional(),
  brand_id:    z.coerce.number().int().optional(),
  status:      z.nativeEnum(ProductStatus).optional(),
});
export type ProductListParamsT = z.infer<typeof ProductListParams>;

const ProductSchema = z.custom<Product>(); // or explicit shape

const ProductListResp = ApiEnvelope(z.array(ProductSchema));
const ProductResp     = ApiEnvelope(ProductSchema);

export const ProductUpsertSchema = z.object({
  name:         z.string().min(2).max(120),
  sku:          z.string().regex(/^SKU-[A-Z]{3}-\d{4}$/),
  price:        z.coerce.number().positive(),
  category_id:  z.coerce.number().int().positive(),
  brand_id:     z.coerce.number().int().positive(),
  status:       z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),
  description:  z.string().max(2000).optional(),
});
export type ProductUpsertT = z.infer<typeof ProductUpsertSchema>;

// ────────── QUERY KEY FACTORY ──────────────────────────────
export const productKeys = {
  all:     ["products"] as const,
  lists:   () => [...productKeys.all, "list"] as const,
  list:    (f: ProductListParamsT) => [...productKeys.lists(), f] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail:  (id: number | string) => [...productKeys.details(), id] as const,
};

// ────────── HOOKS (Section 03: STAFF+ read) ────────────────
export function useProducts(
  filters: ProductListParamsT,
  opts?: Omit<UseQueryOptions<any, any, any>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn:  async () => {
      const { data } = await api.get("/products", { params: filters });
      return ProductListResp.parse(data);
    },
    staleTime: 5 * 60_000,  // 5 min for catalog
    gcTime:    10 * 60_000,
    ...(opts as any),
  });
}

export function useProduct(id: number | string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn:  async () => {
      const { data } = await api.get(`/products/${id}`);
      return ProductResp.parse(data);
    },
  });
}

// ────────── MUTATIONS (Section 22: MANAGER+ crud) ───────────
export function useCreateProduct(role: Role | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ProductUpsertT) => {
      requireRoleOrThrow(role, Role.MANAGER); // L3 — double guard before network call
      if (!hasPermission(role, "product:crud")) throw new Error("FORBIDDEN");
      const { data } = await api.post("/products", payload);
      return data;
    },
    onMutate: async (newProduct) => {
      await qc.cancelQueries({ queryKey: productKeys.lists() });
      const snapshot = qc.getQueryData(productKeys.lists());
      // optimistic: prepend to list with dummy id
      return { snapshot };
    },
    onError: (_err, _p, ctx) => {
      qc.setQueryData(productKeys.lists(), ctx?.snapshot);
      toast.error("Failed to create product");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success("Product created");
    },
  });
}

export function useDeleteProduct(role: Role | null) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number | string) => {
      requireRoleOrThrow(role, Role.MANAGER);
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success("Product archived");
    },
    onError: () => toast.error("Delete failed"),
  });
}
```

---

## §5 lib/env.ts — Zod-Validated Environment

```typescript
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE:   z.string().url().default("https://api.kesararamwithdigital.tech/api/v1"),
  NEXT_PUBLIC_APP_DOMAIN: z.string().default("outfit.kesararamwithdigital.tech"),
  NODE_ENV:               z.enum(["development","test","production"]).default("development"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE:   process.env.NEXT_PUBLIC_API_BASE,
  NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
  NODE_ENV:               process.env.NODE_ENV,
});
```

---

## §6 STANDARD FETCHING PATTERN IN PAGE (App Router)

```tsx
// src/app/(admin)/catalog/products/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/query-client";
import { productKeys, useProducts, ProductListParams } from "@/hooks/api/useProducts";
import ProductsClient from "./_components/ProductsClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const queryClient: QueryClient = makeQueryClient();

  const params = ProductListParams.parse({
    page:     searchParams.page     ?? 1,
    per_page: searchParams.per_page ?? 15,
    search:   searchParams.q,
  });

  // Server-side prefetch — eliminates first-frame loading
  await queryClient.prefetchQuery({
    queryKey: productKeys.list(params),
    queryFn:  async () => {
      // Reuse api client logic on server (or server-fetch)
      const { api } = await import("@/lib/api-client");
      const { data } = await api.get("/products", { params });
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsClient initialParams={params} />
    </HydrationBoundary>
  );
}
```
