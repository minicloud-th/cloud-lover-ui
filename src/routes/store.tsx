import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { products, thb } from "@/lib/shop";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "ร้านค้าไอเทม Roblox — MiniCloud AFK" },
      {
        name: "description",
        content:
          "เลือกซื้อไอเทม Roblox ทั้งหมดของ MiniCloud AFK ระบบส่งสินค้าอัตโนมัติ ปลอดภัย พร้อมส่งตลอด 24 ชั่วโมง",
      },
      { property: "og:title", content: "ร้านค้าไอเทม Roblox — MiniCloud AFK" },
      {
        property: "og:description",
        content: "ไอเทม Roblox ส่งอัตโนมัติ ราคาชัดเจน คงเหลือเรียลไทม์",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Store,
});

const categories = ["ทั้งหมด", "อาวุธ", "สัตว์เลี้ยง", "สกุลเงิน"] as const;

function Store() {
  const [active, setActive] = useState<string>("ทั้งหมด");
  const [query, setQuery] = useState("");

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (active === "ทั้งหมด" || p.category === active) &&
          p.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [active, query],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">ร้านค้า</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">ไอเทมทั้งหมด</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          ทุกรายการส่งอัตโนมัติทันทีหลังชำระเงิน พร้อมรับประกันความปลอดภัย
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={
                  c === active
                    ? "rounded-full bg-ink px-4 py-2 text-xs font-medium text-ink-foreground"
                    : "rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex w-full items-center gap-2 rounded-full border border-border bg-card px-4 py-2 sm:w-72">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาไอเทม"
              aria-label="ค้นหาไอเทม"
              className="h-7 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">ไม่พบสินค้าที่ค้นหา</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <article
                key={p.id}
                className="animate-fade-up group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
                style={{ "--fade-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <Link to="/product/$id" params={{ id: p.id }} className="block">
                  <div className="relative overflow-hidden bg-secondary">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-ink-foreground">
                      {p.category}
                    </span>
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">คงเหลือ {p.stock} ชิ้น</p>
                    </div>
                    <p className="shrink-0 text-lg font-semibold text-primary">{thb(p.price)}</p>
                  </div>
                  <Button asChild variant="ink" size="sm" className="mt-5 w-full rounded-full">
                    <Link to="/product/$id" params={{ id: p.id }}>
                      ดูรายละเอียด
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
