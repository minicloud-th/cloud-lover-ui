import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { thb } from "@/lib/shop";
import { useShop } from "@/lib/store-state";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "ตะกร้าสินค้า — MiniCloud AFK" },
      {
        name: "description",
        content: "ตรวจสอบรายการไอเทมในตะกร้า ใช้โค้ดส่วนลด และดูสรุปราคาก่อนชำระเงิน",
      },
      { property: "og:title", content: "ตะกร้าสินค้า — MiniCloud AFK" },
      { property: "og:description", content: "สรุปรายการสั่งซื้อไอเทม Roblox ของคุณ" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { ready, lines, setQty, removeFromCart, clearCart, subtotal, discount, total, coupon, applyCoupon, clearCoupon } =
    useShop();
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">ตะกร้า</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">รายการสั่งซื้อ</h1>

        {!ready ? (
          <div className="mt-10 space-y-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-2xl" />
            ))}
          </div>
        ) : lines.length === 0 ? (
          <div className="mt-16 flex flex-col items-center rounded-3xl border border-dashed border-border py-20 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">ยังไม่มีสินค้าในตะกร้า</p>
            <Button asChild variant="glow" className="mt-6 rounded-full">
              <Link to="/store">เลือกซื้อไอเทม</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-4">
              {lines.map(({ product, qty }) => (
                <article
                  key={product.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to="/product/$id"
                          params={{ id: product.id }}
                          className="font-medium hover:text-primary"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="shrink-0 font-semibold text-primary">
                        {thb(product.price * qty)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border p-1">
                        <button
                          aria-label="ลดจำนวน"
                          onClick={() => setQty(product.id, qty - 1)}
                          className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-muted"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          aria-label="เพิ่มจำนวน"
                          onClick={() => setQty(product.id, qty + 1)}
                          className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-muted"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" /> ลบ
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                ล้างตะกร้าทั้งหมด
              </button>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <p className="font-medium">สรุปคำสั่งซื้อ</p>

              <div className="mt-5 flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="โค้ดส่วนลด"
                  aria-label="โค้ดส่วนลด"
                  className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                />
                <Button
                  size="sm"
                  variant="ink"
                  className="rounded-full"
                  onClick={() => {
                    if (applyCoupon(code)) setCode("");
                  }}
                >
                  ใช้
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">ลองใช้ MINI10 หรือ CLOUD20</p>

              {coupon && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-accent px-3 py-2 text-xs text-accent-foreground">
                  <span className="flex items-center gap-1.5">
                    <Tag className="size-3.5" /> {coupon}
                  </span>
                  <button onClick={clearCoupon} className="hover:underline">
                    ยกเลิก
                  </button>
                </div>
              )}

              <dl className="mt-6 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ยอดรวม</dt>
                  <dd>{thb(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ส่วนลด</dt>
                  <dd className="text-primary">-{thb(discount)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <dt>ยอดชำระ</dt>
                  <dd className="text-primary">{thb(total)}</dd>
                </div>
              </dl>

              <Button
                variant="glow"
                className="mt-6 w-full rounded-full"
                onClick={() => toast.success("บันทึกคำสั่งซื้อแล้ว", { description: "แอดมินจะติดต่อกลับเพื่อยืนยันการชำระเงิน" })}
              >
                ดำเนินการชำระเงิน
              </Button>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
