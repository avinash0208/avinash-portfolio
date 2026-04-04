"use client";

import { useQuery } from "@tanstack/react-query";

type QuoteResponse = {
  content: string;
  author: string;
};

async function fetchQuote(): Promise<QuoteResponse> {
  const response = await fetch("https://api.quotable.io/random", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  const data = (await response.json()) as QuoteResponse;
  return data;
}

export function CsrQueryShowcase() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["random-quote"],
    queryFn: fetchQuote,
  });

  return (
    <section className="section-card p-5">
      <h3 className="text-lg font-semibold">CSR Showcase</h3>
      <p className="mt-2 text-sm text-muted">
        Client-side data fetching with TanStack Query, cache, and refresh control.
      </p>

      <div className="mt-4 min-h-20 rounded border border-border bg-surface p-3 text-sm">
        {isLoading ? "Loading quote..." : null}
        {isError ? "Unable to fetch quote right now." : null}
        {data ? (
          <>
            <p>&ldquo;{data.content}&rdquo;</p>
            <p className="mt-2 text-xs text-muted">- {data.author}</p>
          </>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => refetch()}
        className="mt-3 rounded border border-border px-3 py-1.5 text-xs font-semibold"
        disabled={isFetching}
      >
        {isFetching ? "Refreshing..." : "Refresh Quote"}
      </button>
    </section>
  );
}
