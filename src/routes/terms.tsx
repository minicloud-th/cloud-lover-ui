import { createFileRoute } from "@tanstack/react-router";

import { SiteNav, SiteFooter } from "@/components/site-nav";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "เงื่อนไขการใช้บริการ — MiniCloud AFK" },
      {
        name: "description",
        content: "ข้อตกลงการสั่งซื้อไอเทม การชำระเงิน การคืนเงิน และการใช้บริการเช่า AFK",
      },
      { property: "og:title", content: "เงื่อนไขการใช้บริการ — MiniCloud AFK" },
      { property: "og:description", content: "อ่านเงื่อนไขก่อนใช้บริการ" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. การสั่งซื้อและชำระเงิน",
    body: "คำสั่งซื้อจะสมบูรณ์เมื่อระบบตรวจสอบการชำระเงินสำเร็จ ราคาที่แสดงเป็นราคารวมแล้ว ผู้ใช้ต้องกรอกข้อมูลบัญชีเกมให้ถูกต้อง หากกรอกผิดพลาดแล้วส่งของไปยังบัญชีอื่น ทางร้านไม่สามารถเรียกคืนได้",
  },
  {
    title: "2. การส่งมอบสินค้า",
    body: "ไอเทมที่รองรับระบบอัตโนมัติจะถูกส่งภายใน 1-5 นาที รายการที่ต้องนัดส่ง แอดมินจะติดต่อกลับภายใน 15 นาทีในเวลาทำการ",
  },
  {
    title: "3. การคืนเงิน",
    body: "หากไม่ได้รับสินค้าภายใน 24 ชั่วโมงและตรวจสอบแล้วว่าเป็นความผิดพลาดของทางร้าน เรายินดีคืนเงินเต็มจำนวน สินค้าที่ส่งมอบเรียบร้อยแล้วไม่สามารถขอคืนเงินได้",
  },
  {
    title: "4. บริการเช่า AFK",
    body: "ผู้ใช้ควรใช้บัญชีสำรองและเปลี่ยนรหัสผ่านหลังจบรอบ ทางร้านไม่ทำธุรกรรมอื่นในบัญชีนอกเหนือจากที่ตกลง และไม่รับผิดชอบต่อการถูกระงับบัญชีจากนโยบายผู้ให้บริการเกม",
  },
  {
    title: "5. การใช้งานที่ไม่อนุญาต",
    body: "ห้ามใช้บริการเพื่อฉ้อโกง ฟอกเงิน หรือกระทำผิดกฎหมาย ทางร้านขอสงวนสิทธิ์ระงับการให้บริการทันทีโดยไม่คืนเงิน",
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="text-4xl font-semibold tracking-tight">เงื่อนไขการใช้บริการ</h1>
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
