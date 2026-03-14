import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchStoreProduct } from "@/lib/store-api";
import { AddToCartButton } from "@/components/catalog/add-to-cart-button";
import type { StoreProduct } from "@/lib/store-api";

type Props = Readonly<{ params: Promise<{ handle: string }> }>;

function getPrice(product: StoreProduct): string | null {
  const variant = product.variants?.[0];
  if (!variant) return null;
  const amount =
    variant.calculated_price?.calculated_amount ?? variant.prices?.[0]?.amount;
  if (amount == null) return null;
  return `${(Number(amount) / 100).toFixed(0)} ₽`;
}

function getImageUrl(product: StoreProduct): string | null {
  return product.thumbnail ?? product.images?.[0]?.url ?? null;
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const data = await fetchStoreProduct(handle);
  if (!data) return { title: "Товар не найден" };
  return { title: `${data.product.title} — Activewear Store` };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const data = await fetchStoreProduct(handle);

  if (!data) notFound();

  const { product } = data;
  const price = getPrice(product);
  const imageUrl = getImageUrl(product);
  const variant = product.variants?.[0];

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link
        href="/products"
        className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
      >
        ← Каталог
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Нет фото
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
          {price != null && (
            <p className="mt-2 text-xl font-medium text-primary">{price}</p>
          )}
          {product.description && (
            <p className="mt-4 text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          )}
          {variant && (
            <div className="mt-6">
              <AddToCartButton
                variantId={variant.id}
                title={product.title}
                price={Number(variant.calculated_price?.calculated_amount ?? variant.prices?.[0]?.amount ?? 0) / 100}
                image={imageUrl ?? undefined}
                productId={product.id}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
