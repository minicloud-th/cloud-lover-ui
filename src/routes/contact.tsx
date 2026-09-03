import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Clock, ArrowRight } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "ติดต่อแอดมิน 24 ชม. — MiniCloud AFK" },
      {
        name: "description",
        content:
          "ติดต่อทีมงาน MiniCloud AFK ผ่านแชทหรืออีเมล แอดมินพร้อมดูแลและตอบกลับตลอด 24 ชั่วโมง",
      },
      { property: "og:title", content: "ติดต่อแอดมิน 24 ชม. — MiniCloud AFK" },
      {
        property: "og:description",
        content: "แอดมิน MiniCloud AFK พร้อมดูแลคุณตลอด 24 ชั่วโมง ตอบไวภายในไม่กี่นาที",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: MessageCircle, title: "แชทกับแอดมิน", detail: "ตอบกลับภายในไม่กี่นาที" },
  { icon: Mail, title: "อีเมล", detail: "support@minicloud.afk" },
  { icon: Clock, title: "เวลาทำการ", detail: "ทุกวัน ตลอด 24 ชั่วโมง" },
];

const faqs = [
  {
    q: "ได้รับไอเทมเร็วแค่ไหน?",
    a: "ระบบส่งอัตโนมัติทันทีหลังชำระเงินสำเร็จ ปกติไม่เกิน 1 นาที",
  },
  {
    q: "ชำระเงินด้วยช่องทางไหนได้บ้าง?",
    a: "รองรับพร้อมเพย์ ทรูมันนี่วอลเล็ท และการโอนผ่านธนาคาร",
  },
  {
    q: "ถ้าไอเทมมีปัญหาต้องทำอย่างไร?",
    a: "ทักแชทหาแอดมินพร้อมเลขคำสั่งซื้อ เราจะส่งใหม่หรือคืนเงินเต็มจำนวน",
  },
];

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">ติดต่อเรา</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          มีคำถาม? แอดมินอยู่ตรงนี้เสมอ
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          ทีมงานพร้อมช่วยเหลือทุกเรื่องเกี่ยวกับคำสั่งซื้อ การชำระเงิน และไอเทมของคุณ
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {channels.map((c, i) => (
            <div
              key={c.title}
              className="animate-fade-up rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
              style={{ "--fade-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-ink text-ink-foreground">
                <c.icon className="size-5" />
              </span>
              <p className="mt-5 font-medium">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">คำถามที่พบบ่อย</h2>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <div key={f.q} className="p-6">
                <p className="font-medium">{f.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-ink px-8 py-12 text-center text-ink-foreground">
          <h2 className="text-2xl font-semibold tracking-tight">พร้อมช่วยคุณตลอด 24 ชั่วโมง</h2>
          <p className="max-w-sm text-sm opacity-70">
            ทักหาเราได้ทุกเวลา ไม่ว่าจะดึกแค่ไหน ทีมงานก็ยังออนไลน์
          </p>
          <Button size="xl" variant="glow" className="mt-2">
            เริ่มแชทกับแอดมิน <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
