import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./cart-store";

describe("useCartStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.persist.clearStorage();
    useCartStore.setState({ items: [] });
  });

  it("adds a new line item", () => {
    useCartStore.getState().addItem({
      id: "p1",
      variantId: "v1",
      title: "Футболка",
      price: 10,
    });
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      variantId: "v1",
      title: "Футболка",
      quantity: 1,
      price: 10,
    });
  });

  it("increments quantity for the same variant", () => {
    const add = useCartStore.getState().addItem;
    add({ id: "p1", variantId: "v1", title: "Футболка", price: 10 });
    add({ id: "p1", variantId: "v1", title: "Футболка", price: 10, quantity: 2 });
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it("removeItem removes variant", () => {
    useCartStore.getState().addItem({
      id: "p1",
      variantId: "v1",
      title: "Футболка",
      price: 10,
    });
    useCartStore.getState().removeItem("v1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updateQuantity changes quantity", () => {
    useCartStore.getState().addItem({
      id: "p1",
      variantId: "v1",
      title: "Футболка",
      price: 10,
    });
    useCartStore.getState().updateQuantity("v1", 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("clearCart empties items", () => {
    useCartStore.getState().addItem({
      id: "p1",
      variantId: "v1",
      title: "Футболка",
      price: 10,
    });
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
