"use client";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items } = useCartStore();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>
      {items.length === 0 ? (
        <p className="text-muted-foreground">Корзина пуста.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.variantId} className="flex justify-between border-b pb-2">
              <span>{item.title}</span>
              <span>
                {item.quantity} × {item.price} ₽
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
