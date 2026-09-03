const dots = [
  { left: "6%", top: "18%", size: 220, delay: "0s", dur: "13s" },
  { left: "78%", top: "12%", size: 260, delay: "1.4s", dur: "16s" },
  { left: "42%", top: "62%", size: 180, delay: "2.6s", dur: "11s" },
  { left: "22%", top: "74%", size: 140, delay: "0.8s", dur: "14s" },
  { left: "88%", top: "58%", size: 200, delay: "3.2s", dur: "18s" },
];

export function CloudParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-3xl animate-float"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.dur,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 20%, transparent), transparent 70%)"
                : "radial-gradient(circle, color-mix(in oklab, var(--color-primary-glow) 22%, transparent), transparent 70%)",
          }}
        />
      ))}
    </div>
  );
}
