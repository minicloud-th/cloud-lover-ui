import { Link } from "@tanstack/react-router";
import { Cloud, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "หน้าหลัก" },
  { to: "/store", label: "ร้านค้า" },
  { to: "/contact", label: "ติดต่อเรา" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
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

        <ul className="hidden items-center gap-9 text-sm md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-muted-foreground transition-colors hover:text-foreground [&.active]:font-medium [&.active]:text-foreground"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="rounded-full">
            เข้าสู่ระบบ
          </Button>
          <Button variant="glow" size="sm" className="rounded-full">
            สมัครสมาชิก
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          aria-label="เปิดเมนู"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-5 pt-3 md:hidden">
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
            ร้านค้าไอเทม Roblox ระบบส่งอัตโนมัติ จ่ายเสร็จรับของทันที
            แอดมินพร้อมดูแลตลอด 24 ชั่วโมง
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">เมนู</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {links.map((l) => (
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
            <li>วิธีสั่งซื้อ</li>
            <li>นโยบายการคืนเงิน</li>
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
