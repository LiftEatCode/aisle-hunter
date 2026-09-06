import { clearanceDeals } from "@/lib/clearance/mock-deals";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  const averageDiscount = Math.round(clearanceDeals.reduce((total, deal) => total + deal.discountPercent, 0) / clearanceDeals.length);
  const nearbyStores = new Set(clearanceDeals.map((deal) => deal.store.id)).size;

  return (
    <main className="min-h-screen">
      <header className="border-b border-white/10 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-lime-400 font-black text-stone-950">AH</span>
            <div><p className="font-bold tracking-tight">Aisle Hunter</p><p className="text-xs text-stone-500">Local clearance intelligence</p></div>
          </div>
          <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-stone-200">Run collection</button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Deal feed</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Clearance worth the trip.</h1>
            <p className="mt-2 max-w-2xl text-stone-400">Store-specific markdowns from Home Depot and Lowe&apos;s, ranked by discount and confidence.</p>
          </div>
          <p className="text-sm text-stone-500">Mock data · Updated 12 minutes ago</p>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <Metric label="Active deals" value={String(clearanceDeals.length)} />
          <Metric label="Average discount" value={`${averageDiscount}%`} />
          <Metric label="Stores monitored" value={String(nearbyStores)} />
        </section>

        <section className="mb-6 flex flex-wrap gap-2" aria-label="Deal filters">
          {["All deals", "New today", "50%+ off", "Tools", "Outdoor"].map((filter, index) => (
            <button className={index === 0 ? "filter-active" : "filter"} key={filter}>{filter}</button>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-stone-900/60">
          <div className="hidden grid-cols-[1.7fr_1fr_.7fr_.7fr_.6fr] gap-4 border-b border-white/10 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500 md:grid">
            <span>Product</span><span>Store</span><span>Price</span><span>Discount</span><span>Confidence</span>
          </div>
          <div className="divide-y divide-white/10">
            {clearanceDeals.map((deal) => (
              <article className="grid gap-4 px-5 py-5 md:grid-cols-[1.7fr_1fr_.7fr_.7fr_.6fr] md:items-center md:px-6" key={deal.id}>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    {deal.isNew && <span className="rounded bg-lime-400 px-1.5 py-0.5 text-[10px] font-black uppercase text-stone-950">New</span>}
                    <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">{deal.product.brand}</span>
                  </div>
                  <h2 className="font-semibold text-stone-100">{deal.product.name}</h2>
                  <p className="mt-1 text-xs text-stone-500">SKU {deal.product.retailerSku}</p>
                </div>
                <div><p className="text-sm font-medium">{deal.store.retailer}</p><p className="text-xs text-stone-500">{deal.store.name}</p></div>
                <div><p className="font-bold text-lime-400">{money.format(deal.clearancePrice)}</p><p className="text-xs text-stone-500 line-through">{money.format(deal.regularPrice)}</p></div>
                <p className="text-lg font-bold">{deal.discountPercent}%</p>
                <span className={`confidence confidence-${deal.confidence}`}>{deal.confidence}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-stone-900/60 p-5"><p className="text-sm text-stone-500">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight">{value}</p></div>;
}
