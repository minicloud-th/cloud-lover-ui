import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { posts } from "@/lib/content";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "บทความและคู่มือเกม — MiniCloud AFK" },
      {
        name: "description",
        content: "คู่มือฟาร์ม AFK เทคนิคเทรดปลอดภัย และรีวิวไอเทมจากทีมงาน MiniCloud AFK",
      },
      { property: "og:title", content: "บทความและคู่มือเกม — MiniCloud AFK" },
      { property: "og:description", content: "อ่านคู่มือและเทคนิคเล่นเกมจากทีมงาน" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">บทความ</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">คู่มือและเทคนิคเกม</h1>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal
              key={p.slug}
              as="article"
              delay={i * 90}
              className="tilt-card rounded-2xl border border-border bg-card p-6 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="rounded-full bg-accent px-3 py-1 text-[11px] text-accent-foreground">
                {p.tag}
              </span>
              <h2 className="mt-4 text-lg font-medium">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" /> {p.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> อ่าน {p.readMinutes} นาที
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
