import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ShieldCheck, Zap } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { getProduct, thb } from "@/lib/shop";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "ไอเทม";
    const desc = loaderData?.description ?? "ไอเทม Roblox ส่งอัตโนมัติจาก MiniCloud AFK";
    return {
      meta: [
        { title: `${name} — MiniCloud AFK` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — MiniCloud AFK` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> กลับไปที่ร้านค้า
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="animate-fade-up overflow-hidden rounded-3xl border border-border bg-secondary">
            <img
              src={p.image}
              alt={p.name}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div
            className="animate-fade-up"
            style={{ "--fade-delay": "120ms" } as React.CSSProperties}
          >
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-ink-foreground">
              {p.category}
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">{p.name}</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

            <p className="mt-7 text-4xl font-semibold text-primary">{thb(p.price)}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              คงเหลือ {p.stock} ชิ้น · ขายแล้ว {p.sold} ชิ้น
            </p>

            <ul className="mt-7 space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="xl" variant="glow">
                ซื้อเลย
              </Button>
              <Button asChild size="xl" variant="outline" className="rounded-full">
                <Link to="/contact">สอบถามแอดมิน</Link>
              </Button>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <Zap className="size-4 text-primary" />
                <p className="text-xs text-muted-foreground">ส่งอัตโนมัติทันที</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <ShieldCheck className="size-4 text-primary" />
                <p className="text-xs text-muted-foreground">รับประกันทุกออเดอร์</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
