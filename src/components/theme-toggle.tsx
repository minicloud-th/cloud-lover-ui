import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("minicloud.theme");
    const isDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("minicloud.theme", next ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label={dark ? "สลับเป็นโหมดสว่าง" : "สลับเป็นโหมดมืด"}
      onClick={toggle}
    >
      {mounted && dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
    </Button>
  );
}
