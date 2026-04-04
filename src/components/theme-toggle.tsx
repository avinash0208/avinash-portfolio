"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="rounded-full border border-border px-3 py-2 text-xs text-muted">
        Theme
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent"
      aria-label="Toggle dark mode"
    >
      {isDark ? "Light" : "Dark"} mode
    </button>
  );
}
