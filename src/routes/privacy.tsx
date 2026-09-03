import { createFileRoute } from "@tanstack/react-router";

import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "นโยบายความเป็นส่วนตัว — MiniCloud AFK" },
      {
        name: "description",
        content: "เราเก็บและใช้ข้อมูลของคุณอย่างไร รวมถึงการใช้คุกกี้และสิทธิ์ของเจ้าของข้อมูล",
      },
      { property: "og:title", content: "นโยบายความเป็นส่วนตัว — MiniCloud AFK" },
      { property: "og:description", content: "การเก็บและใช้ข้อมูลของ MiniCloud AFK" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "ข้อมูลที่เราเก็บ",
    body: "ชื่อผู้ใช้ในเกม ช่องทางติดต่อ (Discord/Line) และรายละเอียดคำสั่งซื้อ เราไม่เก็บข้อมูลบัตรเครดิตใด ๆ บนระบบของเรา",
  },
  {
    title: "การใช้ข้อมูล",
    body: "ใช้เพื่อดำเนินการคำสั่งซื้อ ติดต่อกลับเรื่องออเดอร์ และปรับปรุงคุณภาพบริการเท่านั้น เราไม่ขายข้อมูลให้บุคคลที่สาม",
  },
  {
    title: "คุกกี้",
    body: "เว็บไซต์ใช้คุกกี้และ localStorage เพื่อจดจำตะกร้าสินค้า รายการที่ถูกใจ และการตั้งค่าธีมของคุณ คุณสามารถล้างข้อมูลได้จากเบราว์เซอร์ทุกเมื่อ",
  },
  {
    title: "สิทธิ์ของคุณ",
    body: "คุณสามารถขอดู แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้ โดยติดต่อ support@minicloud.afk เราจะดำเนินการภายใน 7 วันทำการ",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight">นโยบายความเป็นส่วนตัว</h1>
        <p className="mt-3 text-sm text-muted-foreground">อัปเดตล่าสุด: 1 กันยายน 2026</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-medium">{s.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
