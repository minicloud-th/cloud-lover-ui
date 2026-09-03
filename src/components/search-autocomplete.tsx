import { Link, useNavigate } from "@tanstack/react-router";
import { Search, TrendingUp } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { games, products, thb } from "@/lib/shop";

const suggestions = ["ดาบฟ้า", "สัตว์เลี้ยง", "เหรียญ", "เช่า AFK"];

export function SearchAutocomplete({
  className,
  placeholder = "ค้นหาไอเทม เกม หรือบริการ...",
}: {
  className?: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const blurTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return { items: [], gameHits: [] };
    return {
      items: products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      ),
      gameHits: games.filter((g) => g.name.toLowerCase().includes(q)),
    };
  }, [q]);

  const hasResults = matches.items.length > 0 || matches.gameHits.length > 0;

  return (
    <div
      className={`relative ${className ?? ""}`}
      onFocus={() => {
        clearTimeout(blurTimer.current);
        setOpen(true);
      }}
      onBlur={() => {
        blurTimer.current = setTimeout(() => setOpen(false), 120);
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          navigate({ to: "/store" });
        }}
        className="flex items-center gap-3 rounded-full border border-border bg-card/80 px-5 py-3 backdrop-blur transition-colors focus-within:border-primary"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="ค้นหา"
          className="h-6 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </form>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-border bg-popover p-2 text-left shadow-[var(--shadow-lift)]">
          {!q && (
            <div className="p-2">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                <TrendingUp className="size-3" /> คำค้นยอดนิยม
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <p className="p-4 text-center text-sm text-muted-foreground">ไม่พบผลลัพธ์</p>
          )}

          {matches.items.map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
            >
              <img src={p.image} alt={p.name} className="size-10 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <span className="text-sm font-semibold text-primary">{thb(p.price)}</span>
            </Link>
          ))}

          {matches.gameHits.map((g) => (
            <Link
              key={g.id}
              to="/games"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
            >
              <img src={g.image} alt={g.name} className="size-10 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{g.name}</p>
                <p className="text-xs text-muted-foreground">เกม · {g.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
