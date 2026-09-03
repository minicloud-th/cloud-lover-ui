import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, HeartOff } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { products, thb } from "@/lib/shop";
import { useShop } from "@/lib/store-state";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "รายการที่ถูกใจ — MiniCloud AFK" },
      { name: "description", content: "ไอเทมที่คุณกดถูกใจไว้ พร้อมเพิ่มลงตะกร้าได้ทันที" },
      { property: "og:title", content: "รายการที่ถูกใจ — MiniCloud AFK" },
      { property: "og:description", content: "เก็บไอเทมที่สนใจไว้ดูภายหลัง" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ready, wishlist, toggleWishlist, addToCart } = useShop();
  const list = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">ถูกใจ</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">รายการที่ถูกใจ</h1>

        {!ready ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-border py-20 text-center">
            <HeartOff className="size-10 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">ยังไม่มีไอเทมที่ถูกใจ</p>
            <Button asChild variant="glow" className="mt-6 rounded-full">
              <Link to="/store">ไปเลือกไอเทม</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal
                key={p.id}
                as="article"
                delay={i * 90}
                className="tilt-card overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <Link to="/product/$id" params={{ id: p.id }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Link>
                <div className="p-5">
                  <p className="font-medium">{p.name}</p>
                  <p className="mt-1 text-lg font-semibold text-primary">{thb(p.price)}</p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="ink"
                      size="sm"
                      className="flex-1 rounded-full"
                      onClick={() => addToCart(p.id)}
                    >
                      เพิ่มลงตะกร้า
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      aria-label="นำออกจากรายการที่ถูกใจ"
                      onClick={() => toggleWishlist(p.id)}
                    >
                      <Heart className="size-4 fill-current text-primary" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
