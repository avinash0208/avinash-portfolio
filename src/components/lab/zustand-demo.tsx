"use client";

import { useLabStore } from "@/store/lab-store";

const techniques = [
  "SSR + CSR boundary",
  "Accessibility-first UI",
  "Localization strategy",
  "Web push notifications",
];

export function ZustandDemo() {
  const selectedTechnique = useLabStore((state) => state.selectedTechnique);
  const setSelectedTechnique = useLabStore((state) => state.setSelectedTechnique);

  return (
    <section className="section-card p-5">
      <h3 className="text-lg font-semibold">Zustand Shared State</h3>
      <p className="mt-2 text-sm text-muted">
        CSR demo using a tiny global store for cross-widget state selection.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {techniques.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSelectedTechnique(item)}
            className={`rounded-full border px-3 py-1 text-xs ${
              item === selectedTechnique
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm">
        Selected focus: <span className="font-semibold">{selectedTechnique}</span>
      </p>
    </section>
  );
}
