"use client";

import { useEffect, useMemo, useState } from "react";
import { useReportWebVitals } from "next/web-vitals";

type VitalName = "LCP" | "INP" | "CLS";
type VitalsState = Partial<Record<VitalName, number>>;

type WebVitalsBadgeProps = {
  className?: string;
};

export function WebVitalsBadge({ className }: WebVitalsBadgeProps) {
  const [vitals, setVitals] = useState<VitalsState>({ CLS: 0 });
  const [interactionMs, setInteractionMs] = useState<number | null>(null);

  useReportWebVitals((metric) => {
    const name = metric.name as VitalName;
    if (name !== "LCP" && name !== "INP" && name !== "CLS") {
      return;
    }

    setVitals((prev) => {
      if (prev[name] === metric.value) {
        return prev;
      }
      return { ...prev, [name]: metric.value };
    });
  });

  useEffect(() => {
    // INP is only reported after interaction. Capture a lightweight fallback interaction latency.
    const onInteract = () => {
      const start = performance.now();
      requestAnimationFrame(() => {
        const sample = Math.max(0, Math.round(performance.now() - start));
        setInteractionMs((prev) => (prev === null ? sample : Math.min(prev, sample)));
      });
    };

    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, []);

  const inpValue = typeof vitals.INP === "number" ? vitals.INP : interactionMs;

  const perfScore = useMemo(() => {
    const scoreParts: number[] = [];

    if (typeof vitals.LCP === "number") {
      if (vitals.LCP <= 2500) scoreParts.push(100);
      else if (vitals.LCP <= 4000) scoreParts.push(75);
      else scoreParts.push(40);
    }

    if (typeof inpValue === "number") {
      if (inpValue <= 200) scoreParts.push(100);
      else if (inpValue <= 500) scoreParts.push(75);
      else scoreParts.push(40);
    }

    if (typeof vitals.CLS === "number") {
      if (vitals.CLS <= 0.1) scoreParts.push(100);
      else if (vitals.CLS <= 0.25) scoreParts.push(75);
      else scoreParts.push(40);
    }

    if (!scoreParts.length) {
      return "--";
    }

    return String(Math.round(scoreParts.reduce((a, b) => a + b, 0) / scoreParts.length));
  }, [vitals.LCP, vitals.CLS, inpValue]);

  const labels = useMemo(() => {
    return {
      LCP: typeof vitals.LCP === "number" ? `${(vitals.LCP / 1000).toFixed(1)}s` : "--",
      INP: typeof inpValue === "number" ? `${Math.round(inpValue)}ms` : "--",
      CLS: typeof vitals.CLS === "number" ? vitals.CLS.toFixed(2) : "--",
    };
  }, [vitals.LCP, vitals.CLS, inpValue]);

  return (
    <div
      className={[
        "items-center gap-1 rounded-full border border-border bg-surface/90 px-2 py-1 text-[10px] font-semibold",
        className ?? "",
      ].join(" ")}
      aria-label="Web vitals snapshot"
    >
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
        Perf {perfScore}
      </span>
      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300">
        LCP {labels.LCP}
      </span>
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
        INP {labels.INP}
      </span>
      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300">
        CLS {labels.CLS}
      </span>
    </div>
  );
}
