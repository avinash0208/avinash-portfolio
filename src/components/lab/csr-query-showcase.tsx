"use client";

import { useQuery } from "@tanstack/react-query";

type QuoteResponse = {
  content: string;
  author: string;
};

const mockQuotes: QuoteResponse[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    content: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    content: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    content: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    content: "You learn more from failure than from success.",
    author: "Unknown",
  },
  {
    content: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi",
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
];

async function fetchQuote(): Promise<QuoteResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // 10% chance of error to demonstrate error handling
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch quote - connection timeout");
  }

  // Return random quote from mock data
  const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
  return randomQuote;
}

export function CsrQueryShowcase() {
  const { data, isLoading, isError, refetch, isFetching, error } = useQuery({
    queryKey: ["random-quote"],
    queryFn: fetchQuote,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return (
    <section className="section-card p-5">
      <h3 className="text-lg font-semibold">Client Data Caching</h3>
      <p className="mt-2 text-sm text-muted">
        Client-side data fetching with TanStack Query, automatic retries, cache, and refresh.
      </p>

      <div className="mt-4 min-h-24 rounded border border-border bg-surface p-4 text-sm">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />
            <span className="text-muted">Loading quote...</span>
          </div>
        ) : isError ? (
          <div className="text-red-600 dark:text-red-400">
            <p className="font-semibold">⚠ Unable to fetch quote</p>
            <p className="mt-1 text-xs text-red-500 dark:text-red-300">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <p className="mt-2 text-xs text-muted">Try refreshing in a moment...</p>
          </div>
        ) : data ? (
          <div>
            <p className="text-base leading-relaxed">&ldquo;{data.content}&rdquo;</p>
            <p className="mt-3 text-xs text-muted">— {data.author}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-accent disabled:opacity-50"
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : "Get New Quote"}
        </button>
        <p className="flex items-center text-xs text-muted">
          {data && <span>✓ Cached (refresh to fetch new)</span>}
        </p>
      </div>
    </section>
  );
}
