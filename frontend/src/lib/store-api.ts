/**
 * Клиент для Medusa Store API.
 * Используется абсолютный URL backend, чтобы fetch работал и при SSR (в Node относительный URL ломается).
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:9000";
const STORE_API = `${BACKEND_URL}/store`;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";

function storeHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = PUBLISHABLE_KEY;
  }
  return headers;
}

export type StoreProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  thumbnail?: string | null;
  images?: { url: string }[];
  variants?: Array<{
    id: string;
    title: string;
    sku?: string | null;
    calculated_price?: { calculated_amount: number };
    prices?: Array<{ amount: number; currency_code: string }>;
  }>;
};

export type StoreProductsResponse = {
  products: StoreProduct[];
  count: number;
  offset: number;
  limit: number;
};

export async function fetchStoreProducts(params?: {
  limit?: number;
  offset?: number;
}): Promise<StoreProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit != null) searchParams.set("limit", String(params.limit));
  if (params?.offset != null) searchParams.set("offset", String(params.offset));
  const query = searchParams.toString();
  const url = query ? `${STORE_API}/products?${query}` : `${STORE_API}/products`;
  const res = await fetch(url, {
    headers: storeHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Store API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function fetchStoreProduct(handle: string): Promise<{ product: StoreProduct } | null> {
  const params = new URLSearchParams({ handle });
  params.set("fields", "*variants,*images");
  const res = await fetch(`${STORE_API}/products?${params}`, {
    headers: storeHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const product = data.products?.[0] ?? null;
  return product ? { product } : null;
}
