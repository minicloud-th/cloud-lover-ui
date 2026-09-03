import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden size-[420px] rounded-full opacity-60 blur-3xl transition-transform duration-200 ease-out md:block"
      style={{
        left: pos.x - 210,
        top: pos.y - 210,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 68%)",
      }}
    />
  );
}
