import { fetchStoreProducts } from "@/lib/store-api";
import { ProductCard } from "@/components/catalog/product-card";

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof fetchStoreProducts>>["products"] = [];
  let error: string | null = null;

  try {
    const data = await fetchStoreProducts({ limit: 24 });
    products = data.products ?? [];
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Не удалось загрузить каталог";
    error = msg.includes("Publishable API key") || msg.includes("400")
      ? "Не задан Publishable API Key. Добавьте в frontend/.env переменную NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY (токен из команды cd backend && npm run get-publishable-key), затем перезапустите npm run dev."
      : msg;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Каталог</h1>

      {error && (
        <div className="rounded-md bg-destructive/10 text-destructive px-4 py-3 mb-6">
          <p className="font-medium">Ошибка загрузки</p>
          <p className="text-sm mt-1 whitespace-pre-line">{error}</p>
        </div>
      )}

      {!error && products.length === 0 && (
        <p className="text-muted-foreground">
          В каталоге пока нет товаров. Запустите сид в backend:{" "}
          <code className="bg-muted px-1 rounded">npm run seed</code>
        </p>
      )}

      {!error && products.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
