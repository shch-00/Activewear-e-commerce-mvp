import Link from "next/link";
import type { StoreProduct } from "@/lib/store-api";

type Props = Readonly<{
  product: StoreProduct;
}>;

function getPrice(product: StoreProduct): string | null {
  const variant = product.variants?.[0];
  if (!variant) return null;
  const amount =
    variant.calculated_price?.calculated_amount ??
    variant.prices?.[0]?.amount;
  if (amount == null) return null;
  return `${(Number(amount) / 100).toFixed(0)} ₽`;
}

function getImageUrl(product: StoreProduct): string | null {
  return product.thumbnail ?? product.images?.[0]?.url ?? null;
}

export function ProductCard({ product }: Props) {
  const price = getPrice(product);
  const imageUrl = getImageUrl(product);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            Нет фото
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary">
          {product.title}
        </h3>
        {price != null && (
          <p className="mt-1 text-sm font-medium text-primary">{price}</p>
        )}
      </div>
    </Link>
  );
}
