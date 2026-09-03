import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Users,
  ShoppingBag,
  Package,
  CheckCircle2,
  ArrowRight,
  Megaphone,
  Zap,
  ShieldCheck,
  Headphones,
  Star,
  Gamepad2,
} from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { products, games, thb } from "@/lib/shop";
import heroBg from "@/assets/hero-cloud.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MiniCloud AFK — ร้านค้าไอเทม Roblox ส่งอัตโนมัติ 24 ชม." },
      {
        name: "description",
        content:
          "MiniCloud AFK ร้านค้าไอเทม Roblox ระบบส่งอัตโนมัติ จ่ายเสร็จรับของทันที ปลอดภัย แอดมินดูแลตลอด 24 ชั่วโมง",
      },
      { property: "og:title", content: "MiniCloud AFK — ร้านค้าไอเทม Roblox ส่งอัตโนมัติ" },
      {
        property: "og:description",
        content: "เลือกซื้อไอเทม Roblox ระบบอัตโนมัติ ส่งไวใน 1 นาที แอดมินพร้อมดูแล 24 ชม.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  { icon: Users, label: "ผู้ใช้งาน", value: "173", unit: "คน" },
  { icon: ShoppingBag, label: "สินค้า", value: "100", unit: "รายการ" },
  { icon: Package, label: "คลังสินค้า", value: "99", unit: "ชิ้น" },
  { icon: CheckCircle2, label: "ขายแล้ว", value: "665", unit: "ชิ้น" },
];

const features = [
  {
    icon: Zap,
    title: "ส่งอัตโนมัติใน 1 นาที",
    detail: "ระบบส่งไอเทมทันทีหลังชำระเงิน ไม่ต้องรอแอดมินยืนยัน",
  },
  {
    icon: ShieldCheck,
    title: "ปลอดภัย รับประกัน",
    detail: "ทุกออเดอร์มีการรับประกัน หากไอเทมมีปัญหาคืนเงินเต็มจำนวน",
  },
  {
    icon: Headphones,
    title: "แอดมินตลอด 24 ชม.",
    detail: "ทักแชทได้ทุกเวลา ทีมงานตอบกลับภายในไม่กี่นาที",
  },
];

const steps = [
  { n: "01", title: "เลือกไอเทม", detail: "เลือกสินค้าที่ต้องการจากหน้าร้านค้า" },
  { n: "02", title: "ชำระเงิน", detail: "จ่ายผ่านพร้อมเพย์หรือทรูมันนี่ได้ทันที" },
  { n: "03", title: "รับของเลย", detail: "ระบบส่งไอเทมเข้าบัญชีอัตโนมัติ" },
];

const reviews = [
  { name: "Nont", text: "สั่งตอนตีสาม ได้ของภายในนาทีเดียว บริการดีมาก", rating: 5 },
  { name: "Ploy", text: "ราคาถูกกว่าที่อื่น แอดมินตอบไว แนะนำเลยค่ะ", rating: 5 },
  { name: "Beam", text: "ใช้มา 4 ครั้งแล้ว ไม่มีปัญหาสักครั้ง ไว้ใจได้", rating: 5 },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <img
            src={heroBg}
            alt="เมฆสีขาวและแท่นสีดำเรืองแสงสีน้ำเงินของ MiniCloud AFK"
            width={1920}
            height={1088}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-6 pt-24 text-center">
            <span
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-medium backdrop-blur-md"
              style={{ "--fade-delay": "0ms" } as React.CSSProperties}
            >
              <span className="size-1.5 rounded-full bg-primary" />
              ระบบส่งของอัตโนมัติ · ออนไลน์ตลอด 24 ชม.
            </span>

            <h1
              className="animate-fade-up mt-7 text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
              style={{ "--fade-delay": "120ms" } as React.CSSProperties}
            >
              MiniCloud <span className="text-gradient">AFK</span>
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl text-sm text-muted-foreground sm:text-base"
              style={{ "--fade-delay": "260ms" } as React.CSSProperties}
            >
              ร้านค้าไอเทม Roblox ที่ส่งของให้คุณทันทีหลังชำระเงิน
              ไม่ต้องรอ ไม่ต้องทัก ไม่มีสะดุด
            </p>

            <form
              className="surface-card animate-fade-up mt-9 flex w-full max-w-2xl items-center gap-2 rounded-full px-4 py-2"
              style={{ "--fade-delay": "380ms" } as React.CSSProperties}
              onSubmit={(e) => e.preventDefault()}
            >
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="search"
                placeholder="ค้นหาสินค้าหรือหมวดหมู่"
                aria-label="ค้นหาสินค้า"
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm" variant="ink" className="rounded-full">
                ค้นหา
              </Button>
            </form>

            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ "--fade-delay": "500ms" } as React.CSSProperties}
            >
              <Button asChild size="xl" variant="glow" className="animate-glow">
                <Link to="/store">
                  เลือกซื้อสินค้า <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="rounded-full">
                <Link to="/contact">ติดต่อแอดมิน</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto -mt-14 max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="surface-card animate-fade-up flex items-center gap-4 p-5 transition-transform hover:-translate-y-1"
                style={{ "--fade-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-semibold">
                    {s.value}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">{s.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ANNOUNCEMENT */}
        <section className="mx-auto max-w-7xl px-6 pt-14">
          <div className="flex items-center gap-4 overflow-hidden rounded-2xl bg-ink px-5 py-4 text-ink-foreground">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary-glow">
              <Megaphone className="size-5" />
            </span>
            <p className="text-sm">
              ยินดีต้อนรับสู่ MiniCloud AFK — ไอเทม Roblox ส่งอัตโนมัติตลอด 24 ชั่วโมง
            </p>
          </div>
        </section>

        {/* GAMES */}
        <section className="mx-auto max-w-7xl px-6 pt-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                เกมที่รองรับ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                เกมยอดฮิตที่เราให้บริการ
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              เลือกไอเทมจากเกมที่คุณเล่นอยู่ ระบบรองรับการส่งอัตโนมัติทุกเกม
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {games.map((g, i) => (
              <Reveal key={g.id} delay={i * 100}>
                <article className="tilt-card group relative overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={g.image}
                      alt={`ภาพเกม ${g.name}`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                      {g.tag}
                    </span>
                    <div className="absolute inset-x-4 bottom-3 text-ink-foreground">
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[11px] opacity-80">
                        <Gamepad2 className="size-3" /> {g.players} คนกำลังเล่น
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              ทำไมต้องเรา
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              ซื้อไอเทมง่ายที่สุด เร็วที่สุด ปลอดภัยที่สุด
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 110}
                className="tilt-card group rounded-2xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-ink-foreground transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <f.icon className="size-5" />
                </span>
                <p className="mt-5 text-lg font-medium">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>


        {/* PRODUCTS */}
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  สินค้าแนะนำ
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  ไอเทมยอดนิยม
                </h2>
              </div>
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/store">
                  ดูทั้งหมด <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={i * 110}>
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="tilt-card group block overflow-hidden rounded-2xl border border-border bg-card hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="relative overflow-hidden bg-secondary">
                      <img
                        src={p.image}
                        alt={p.name}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-ink-foreground">
                        {p.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-5">
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          คงเหลือ {p.stock} ชิ้น · ขายแล้ว {p.sold}
                        </p>
                      </div>
                      <p className="shrink-0 text-lg font-semibold text-primary">{thb(p.price)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* STEPS */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">ขั้นตอน</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              สั่งซื้อใน 3 ขั้นตอน
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 110}
                className="tilt-card group relative rounded-2xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="text-5xl font-semibold text-primary/15 transition-colors group-hover:text-primary/35">
                  {s.n}
                </span>
                <p className="mt-3 text-lg font-medium">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
              </Reveal>
            ))}
          </div>
        </section>


        {/* REVIEWS */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <Reveal as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              ลูกค้าพูดถึงเรา
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal
                  key={r.name}
                  delay={i * 110}
                  className="tilt-card rounded-2xl border border-border bg-card p-7 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-xs text-muted-foreground">{r.name}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-ink-foreground">
            <div className="grid-lines absolute inset-0 opacity-30" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                พร้อมเริ่มเล่นแบบไม่ต้องรอแล้วหรือยัง
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm opacity-70">
                เลือกไอเทมที่ชอบ จ่ายเงิน แล้วรับของทันที ง่ายแค่นั้นจริง ๆ
              </p>
              <Button asChild size="xl" variant="glow" className="mt-8">
                <Link to="/store">
                  ไปที่ร้านค้า <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
