export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Activewear Store
      </h1>
      <p className="text-muted-foreground text-center max-w-md">
        Каркас MVP интернет-магазина одежды для активного отдыха. Next.js, shadcn/ui, Zustand, Medusa.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/products"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Каталог
        </a>
        <a
          href="/cart"
          className="rounded-md border border-border px-4 py-2 hover:bg-accent"
        >
          Корзина
        </a>
      </div>
    </main>
  );
}
