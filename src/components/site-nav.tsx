import { Link } from "@tanstack/react-router";
import { Cloud, Heart, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useShop } from "@/lib/store-state";

const links = [
  { to: "/", label: "หน้าหลัก" },
  { to: "/store", label: "ร้านค้า" },
  { to: "/games", label: "เกมทั้งหมด" },
  { to: "/afk-rental", label: "เช่า AFK" },
  { to: "/blog", label: "บทความ" },
  { to: "/faq", label: "คำถามพบบ่อย" },
  { to: "/about", label: "เกี่ยวกับเรา" },
  { to: "/contact", label: "ติดต่อเรา" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useShop();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span
            className="flex size-9 items-center justify-center rounded-xl text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <Cloud className="size-4.5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            MiniCloud <span className="text-primary">AFK</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-muted-foreground transition-colors hover:text-foreground [&.active]:font-medium [&.active]:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle className="rounded-full" />

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label="รายการที่ถูกใจ"
          >
            <Link to="/wishlist">
              <Heart className="size-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label="ตะกร้าสินค้า"
          >
            <Link to="/cart">
              <ShoppingCart className="size-4.5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="glow" size="sm" className="ml-1 hidden rounded-full lg:inline-flex">
            สมัครสมาชิก
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="เปิดเมนู"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:bg-muted [&.active]:text-foreground"
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1 rounded-full">
              เข้าสู่ระบบ
            </Button>
            <Button variant="glow" size="sm" className="flex-1 rounded-full">
              สมัครสมาชิก
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

const footerHelp = [
  { to: "/faq", label: "คำถามพบบ่อย" },
  { to: "/terms", label: "เงื่อนไขการใช้บริการ" },
  { to: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-9 items-center justify-center rounded-xl text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              <Cloud className="size-4.5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              MiniCloud <span className="text-primary">AFK</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            ร้านค้าไอเทม Roblox และบริการเช่า AFK ระบบส่งอัตโนมัติ จ่ายเสร็จรับของทันที
            แอดมินพร้อมดูแลตลอด 24 ชั่วโมง
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">เมนู</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {links.slice(0, 5).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">ช่วยเหลือ</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {footerHelp.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>support@minicloud.afk</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MiniCloud AFK — Roblox Shop</p>
          <p>แอดมินพร้อมบริการ 24 ชม.</p>
        </div>
      </div>
    </footer>
  );
}
