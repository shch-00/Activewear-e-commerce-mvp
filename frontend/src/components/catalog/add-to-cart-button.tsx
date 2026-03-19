"use client";

import { useCartStore } from "@/store/cart-store";

type Props = Readonly<{
  variantId: string;
  title: string;
  price: number;
  image?: string;
  productId: string;
}>;

export function AddToCartButton({ variantId, title, price, image, productId }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem({ id: productId, variantId, title, price, image })}
      className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
    >
      В корзину
    </button>
  );
}
