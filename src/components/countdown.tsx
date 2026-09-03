import { useEffect, useState } from "react";

function nextMidnight() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}

export function Countdown({ className }: { className?: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, nextMidnight() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = [
    { label: "ชั่วโมง", value: left === null ? null : Math.floor(left / 3_600_000) },
    { label: "นาที", value: left === null ? null : Math.floor(left / 60_000) % 60 },
    { label: "วินาที", value: left === null ? null : Math.floor(left / 1000) % 60 },
  ];

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {parts.map((p) => (
          <div
            key={p.label}
            className="min-w-16 rounded-xl border border-border bg-card/70 px-3 py-2 text-center backdrop-blur"
          >
            <p className="font-mono text-xl font-semibold tabular-nums text-primary">
              {p.value === null ? "--" : String(p.value).padStart(2, "0")}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {p.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
