import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type Msg = { from: "bot" | "me"; text: string };

const script: { match: string[]; reply: string }[] = [
  { match: ["ราคา", "เท่าไหร่", "กี่บาท"], reply: "ไอเทมเริ่มต้นที่ 99 บาท และเช่า AFK เริ่ม 39 บาท/6 ชม. ดูทั้งหมดได้ที่หน้าร้านค้าเลยครับ" },
  { match: ["afk", "เช่า"], reply: "บริการเช่า AFK มี 3 แพ็กเกจ: 6 ชั่วโมง, 24 ชั่วโมง และรายสัปดาห์ เลือกดูได้ที่หน้า “เช่า AFK” ครับ" },
  { match: ["ส่ง", "นานไหม", "กี่นาที"], reply: "ระบบส่งอัตโนมัติ ปกติได้รับภายใน 1-5 นาทีหลังชำระเงินครับ" },
  { match: ["โค้ด", "ส่วนลด", "coupon"], reply: "ลองใช้โค้ด MINI10 ลด 10% ในหน้าตะกร้าได้เลยครับ" },
  { match: ["ปลอดภัย", "โกง"], reply: "ทุกออเดอร์มีการรับประกัน หากไม่ได้รับของ คืนเงินเต็มจำนวนภายใน 24 ชม. ครับ" },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "สวัสดีครับ! ผมคือผู้ช่วย MiniCloud มีอะไรให้ช่วยไหมครับ?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [msgs, open]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    setText("");
    setMsgs((m) => [...m, { from: "me", text: q }]);
    const lower = q.toLowerCase();
    const found = script.find((s) => s.match.some((k) => lower.includes(k)));
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          text:
            found?.reply ??
            "ขอบคุณครับ! เดี๋ยวแอดมินตัวจริงจะตอบกลับใน Discord ภายใน 5 นาที หรือพิมพ์คำว่า “ราคา”, “เช่า AFK”, “ส่วนลด” เพื่อดูข้อมูลด่วนได้ครับ",
        },
      ]);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-fade-up flex h-96 w-[min(20rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
          <div
            className="flex items-center justify-between px-4 py-3 text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <div>
              <p className="text-sm font-semibold">แชทกับ MiniCloud</p>
              <p className="text-[11px] opacity-80">ตอบกลับอัตโนมัติ · ออนไลน์</p>
            </div>
            <button aria-label="ปิดแชท" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "me"
                    ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "mr-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm"
                }
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              aria-label="ข้อความ"
              className="h-9 flex-1 rounded-full border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            />
            <Button type="submit" size="icon" className="size-9 rounded-full" aria-label="ส่ง">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <Button
        size="icon"
        variant="glow"
        className="size-13 rounded-full shadow-[var(--shadow-glow)]"
        aria-label="เปิดแชทช่วยเหลือ"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X /> : <MessageCircle />}
      </Button>
    </div>
  );
}
