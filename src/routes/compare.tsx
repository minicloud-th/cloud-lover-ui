import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Scale, X } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { products, thb } from "@/lib/shop";
import { useShop } from "@/lib/store-state";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "เปรียบเทียบไอเทม — MiniCloud AFK" },
      { name: "description", content: "เทียบราคา สต็อก และคุณสมบัติของไอเทมได้สูงสุด 3 รายการพร้อมกัน" },
      { property: "og:title", content: "เปรียบเทียบไอเทม — MiniCloud AFK" },
      { property: "og:description", content: "เทียบไอเทมแบบเคียงข้างกันก่อนตัดสินใจซื้อ" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { compare, toggleCompare, addToCart } = useShop();
  const list = products.filter((p) => compare.includes(p.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">เปรียบเทียบ</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">เทียบไอเทมแบบเคียงข้าง</h1>
        <p className="mt-3 text-sm text-muted-foreground">เลือกได้สูงสุด 3 รายการจากหน้าร้านค้า</p>

        {list.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-border py-20 text-center">
            <Scale className="size-10 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">ยังไม่ได้เลือกไอเทมมาเปรียบเทียบ</p>
            <Button asChild variant="glow" className="mt-6 rounded-full">
              <Link to="/store">ไปเลือกไอเทม</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <article key={p.id} className="relative rounded-2xl border border-border bg-card p-5">
                <button
                  aria-label="นำออก"
                  onClick={() => toggleCompare(p.id)}
                  className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-muted"
                >
                  <X className="size-3.5" />
                </button>
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
                <h2 className="mt-4 font-medium">{p.name}</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">ราคา</dt>
                    <dd className="font-semibold text-primary">{thb(p.price)}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">หมวดหมู่</dt>
                    <dd>{p.category}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">คงเหลือ</dt>
                    <dd>{p.stock} ชิ้น</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">ขายแล้ว</dt>
                    <dd>{p.sold} ครั้ง</dd>
                  </div>
                </dl>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {h}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="ink"
                  size="sm"
                  className="mt-5 w-full rounded-full"
                  onClick={() => addToCart(p.id)}
                >
                  เพิ่มลงตะกร้า
                </Button>
              </article>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
