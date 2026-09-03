import { createFileRoute, Link } from "@tanstack/react-router";
import { Gamepad2, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { games } from "@/lib/shop";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "เกมทั้งหมดที่ให้บริการ — MiniCloud AFK" },
      {
        name: "description",
        content: "รวมเกม Roblox ที่ MiniCloud AFK ให้บริการไอเทมและเช่า AFK พร้อมกรองตามหมวดหมู่",
      },
      { property: "og:title", content: "เกมทั้งหมดที่ให้บริการ — MiniCloud AFK" },
      { property: "og:description", content: "เลือกเกมที่คุณเล่น แล้วดูไอเทมและบริการที่รองรับ" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  const [tag, setTag] = useState("ทั้งหมด");
  const tags = useMemo(() => ["ทั้งหมด", ...new Set(games.map((g) => g.tag))], []);
  const list = games.filter((g) => tag === "ทั้งหมด" || g.tag === tag);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">เกม</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          เกมทั้งหมดที่เราให้บริการ
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          รองรับทั้งการซื้อไอเทมและบริการเช่า AFK ในเกมยอดนิยม
        </p>

        <div className="mt-9 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={
                t === tag
                  ? "rounded-full bg-ink px-4 py-2 text-xs font-medium text-ink-foreground"
                  : "rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((g, i) => (
            <Reveal
              key={g.id}
              as="article"
              delay={i * 90}
              className="tilt-card group relative overflow-hidden rounded-2xl border border-border hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
            >
              <img
                src={g.image}
                alt={g.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
                <span className="rounded-full bg-background/20 px-2.5 py-1 text-[11px] backdrop-blur">
                  {g.tag}
                </span>
                <p className="mt-2.5 font-semibold">{g.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs opacity-80">
                  <Users className="size-3.5" /> {g.players} คนกำลังเล่น
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center rounded-3xl border border-border bg-card p-10 text-center">
          <Gamepad2 className="size-8 text-primary" />
          <p className="mt-4 text-lg font-medium">ไม่เจอเกมที่เล่นอยู่?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            แจ้งชื่อเกมกับแอดมิน เราเปิดรับเกมใหม่ทุกสัปดาห์
          </p>
          <Button asChild variant="glow" className="mt-6 rounded-full">
            <Link to="/contact">แจ้งเกมที่ต้องการ</Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
