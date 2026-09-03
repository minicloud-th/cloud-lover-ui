import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "คำถามที่พบบ่อย — MiniCloud AFK" },
      {
        name: "description",
        content: "รวมคำถามเรื่องการสั่งซื้อ การชำระเงิน บริการเช่า AFK และการแก้ปัญหาการใช้งาน",
      },
      { property: "og:title", content: "คำถามที่พบบ่อย — MiniCloud AFK" },
      { property: "og:description", content: "ค้นหาคำตอบได้ทันทีในหน้าเดียว" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [q, setQ] = useState("");
  const list = faqs.filter(
    (f) => f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase()),
  );
  const groups = [...new Set(list.map((f) => f.group))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">ช่วยเหลือ</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">คำถามที่พบบ่อย</h1>

        <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 focus-within:border-primary">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาคำถาม..."
            aria-label="ค้นหาคำถาม"
            className="h-6 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">ไม่พบคำถามที่ตรงกัน</p>
        )}

        {groups.map((g) => (
          <section key={g} className="mt-10">
            <h2 className="text-sm font-medium text-primary">{g}</h2>
            <Accordion type="single" collapsible className="mt-2">
              {list
                .filter((f) => f.group === g)
                .map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </section>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
