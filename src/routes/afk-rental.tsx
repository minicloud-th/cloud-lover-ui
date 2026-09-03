import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, MonitorPlay, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { Countdown } from "@/components/countdown";
import { Button } from "@/components/ui/button";
import { thb } from "@/lib/shop";
import { rentalPlans } from "@/lib/content";

export const Route = createFileRoute("/afk-rental")({
  head: () => ({
    meta: [
      { title: "บริการเช่า AFK รายชั่วโมง — MiniCloud AFK" },
      {
        name: "description",
        content:
          "เช่าเครื่องรัน AFK สำหรับเกม Roblox เริ่มต้น 39 บาท ดูแลตลอดรอบ รายงานผลทุกวัน ไม่ต้องเปิดคอมเอง",
      },
      { property: "og:title", content: "บริการเช่า AFK รายชั่วโมง — MiniCloud AFK" },
      { property: "og:description", content: "ให้เรารัน AFK แทนคุณ ตลอด 24 ชั่วโมง" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RentalPage,
});

const steps = [
  { icon: MonitorPlay, title: "เลือกแพ็กเกจ", desc: "เลือกจำนวนชั่วโมงที่ต้องการรัน AFK" },
  { icon: ShieldCheck, title: "ส่งข้อมูลบัญชี", desc: "แนะนำใช้บัญชีสำรอง เปลี่ยนรหัสหลังจบรอบ" },
  { icon: Clock, title: "เริ่มรันภายใน 10 นาที", desc: "ทีมงานเปิดเครื่องและติดตามตลอดรอบ" },
  { icon: Sparkles, title: "รับสรุปผล", desc: "รายงานของที่ได้รับเมื่อจบรอบผ่าน Discord" },
];

function RentalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs backdrop-blur">
              <Sparkles className="size-3.5 text-primary" /> บริการใหม่ · เช่า AFK
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              ให้เรา <span className="text-gradient">รัน AFK</span> แทนคุณ
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
              ไม่ต้องเปิดคอมทิ้งไว้ ไม่ต้องกลัวไฟดับ ทีมงานเปิดเครื่องรันให้ตลอดรอบ
              พร้อมสรุปของที่ได้รับให้ทุกวัน
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                โปรโมชันวันนี้หมดใน
              </p>
              <Countdown />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {rentalPlans.map((plan, i) => (
              <Reveal
                key={plan.id}
                as="article"
                delay={i * 110}
                className={
                  plan.popular
                    ? "tilt-card relative rounded-3xl border border-primary/50 bg-card p-8 shadow-[var(--shadow-glow)] hover:-translate-y-1.5"
                    : "tilt-card relative rounded-3xl border border-border bg-card p-8 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
                }
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-8 rounded-full px-3 py-1 text-[11px] font-medium text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-primary)" }}
                  >
                    ยอดนิยม
                  </span>
                )}
                <p className="text-sm text-muted-foreground">{plan.name}</p>
                <p className="mt-2 text-3xl font-semibold">{thb(plan.price)}</p>
                <p className="mt-1 text-sm text-primary">{plan.hours}</p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "glow" : "ink"}
                  className="mt-8 w-full rounded-full"
                  onClick={() =>
                    toast.success("จองรอบเช่า AFK แล้ว", {
                      description: `${plan.name} · ${plan.hours} — แอดมินจะติดต่อกลับใน 10 นาที`,
                    })
                  }
                >
                  จองรอบนี้
                </Button>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight">ขั้นตอนการใช้บริการ</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 90}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="size-5" />
                </span>
                <p className="mt-4 font-medium">
                  {i + 1}. {s.title}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-4xl px-6">
          <div
            className="rounded-3xl p-10 text-center text-ink-foreground"
            style={{ backgroundImage: "var(--gradient-ink)" }}
          >
            <h2 className="text-2xl font-semibold">อยากได้แพ็กเกจแบบกำหนดเอง?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm opacity-80">
              รันหลายบัญชี หรือรันต่อเนื่องรายเดือน แจ้งความต้องการกับแอดมินได้เลย
            </p>
            <Button asChild variant="glow" className="mt-7 rounded-full">
              <Link to="/contact">คุยกับแอดมิน</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
