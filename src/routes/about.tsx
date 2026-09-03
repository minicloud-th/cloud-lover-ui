import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket, ShieldCheck, Users } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { team } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "เกี่ยวกับเรา — MiniCloud AFK" },
      {
        name: "description",
        content: "ทีมงาน วิสัยทัศน์ และมาตรฐานการให้บริการของร้านไอเทม Roblox MiniCloud AFK",
      },
      { property: "og:title", content: "เกี่ยวกับเรา — MiniCloud AFK" },
      { property: "og:description", content: "รู้จักทีมงานเบื้องหลัง MiniCloud AFK" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, title: "ปลอดภัยเป็นอันดับแรก", desc: "ทุกออเดอร์มีการรับประกัน คืนเงินเต็มจำนวนถ้าไม่ได้ของ" },
  { icon: Rocket, title: "ส่งไวที่สุด", desc: "ระบบอัตโนมัติทำงาน 24 ชั่วโมง เฉลี่ยส่งของภายใน 3 นาที" },
  { icon: Users, title: "ชุมชนคือหัวใจ", desc: "ผู้เล่นกว่า 12,000 คนเติบโตไปกับเราตั้งแต่ปี 2023" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">เกี่ยวกับเรา</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          ทีมเล็ก ๆ ที่อยากให้การซื้อไอเทม <span className="text-gradient">ง่ายและปลอดภัย</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
          MiniCloud AFK เริ่มจากกลุ่มเพื่อนที่เล่นเกมด้วยกันและเบื่อกับการโดนโกงในกลุ่มซื้อขาย
          เราจึงสร้างระบบส่งไอเทมอัตโนมัติที่ตรวจสอบได้ทุกขั้นตอน และต่อยอดมาเป็นบริการเช่า AFK
          สำหรับคนที่ไม่สะดวกเปิดเครื่องทิ้งไว้
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <v.icon className="size-5" />
              </span>
              <p className="mt-4 font-medium">{v.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
            </Reveal>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">ทีมงานของเรา</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90} className="rounded-2xl border border-border bg-card p-6">
              <span
                className="flex size-14 items-center justify-center rounded-2xl text-lg font-semibold text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                {m.initials}
              </span>
              <p className="mt-4 font-medium">{m.name}</p>
              <p className="text-xs text-primary">{m.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-card p-10 text-center">
          <p className="text-lg font-medium">พร้อมเริ่มกับเราแล้วหรือยัง?</p>
          <Button asChild variant="glow" className="mt-6 rounded-full">
            <Link to="/store">เลือกซื้อไอเทม</Link>
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
