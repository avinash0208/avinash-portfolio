"use client";

import { useMemo, useState } from "react";

export function PaginationDemo() {
  const items = useMemo(
    () => Array.from({ length: 30 }, (_, index) => ({ id: index + 1, label: `Result ${index + 1}` })),
    [],
  );
  const pageSize = 6;
  const totalPages = Math.ceil(items.length / pageSize);
  const [page, setPage] = useState(1);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page]);

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Pagination Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">Dummy paginated dataset with deterministic page windows.</p>
      <ul className="mt-3 space-y-2">
        {pageItems.map((item) => (
          <li key={item.id} className="rounded-md border border-border bg-background/70 px-2 py-2 text-xs sm:text-sm">
            {item.label}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPage((value) => Math.max(1, value - 1))}
          disabled={page === 1}
          className="rounded-md border border-border px-2 py-1 text-xs disabled:opacity-50"
        >
          Prev
        </button>
        <p className="text-xs text-muted">Page {page} / {totalPages}</p>
        <button
          type="button"
          onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          disabled={page === totalPages}
          className="rounded-md border border-border px-2 py-1 text-xs disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </article>
  );
}
