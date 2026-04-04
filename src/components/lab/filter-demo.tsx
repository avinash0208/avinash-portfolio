"use client";

import { useMemo, useState } from "react";

const techniques = [
  "Optimistic UI",
  "Virtualized Lists",
  "Suspense Boundaries",
  "Offline Cache Sync",
  "Streaming SSR",
  "Incremental Static Regeneration",
];

export function FilterDemo() {
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) {
      return techniques;
    }

    return techniques.filter((item) => item.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <section className="section-card p-5">
      <h3 className="text-lg font-semibold">Interactive Filter</h3>
      <p className="mt-2 text-sm text-muted">
        CSR demo for controlled input state and derived list rendering.
      </p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search techniques"
        className="mt-4 w-full rounded border border-border bg-background px-3 py-2 text-sm"
      />
      <ul className="mt-4 space-y-2 text-sm">
        {result.map((item) => (
          <li key={item} className="rounded border border-border px-3 py-2">
            {item}
          </li>
        ))}
        {result.length === 0 ? (
          <li className="rounded border border-border px-3 py-2 text-muted">
            No matches found.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
