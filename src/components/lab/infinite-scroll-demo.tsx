"use client";

import { useMemo, useState } from "react";

export function InfiniteScrollDemo() {
  const allItems = useMemo(
    () =>
      Array.from({ length: 150 }, (_, index) => ({
        id: index + 1,
        title: `Article #${index + 1}`,
        excerpt: `Insightful content snippet for item ${index + 1}. Click to read more...`,
        author: ["Avinash", "Priya", "Rohan", "Neha"][index % 4],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        readTime: `${Math.ceil(Math.random() * 8 + 2)} min read`,
      })),
    [],
  );

  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isNearEnd = target.scrollTop + target.clientHeight >= target.scrollHeight - 32;

    if (isNearEnd && !isLoading && visibleCount < allItems.length) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const shouldError = Math.random() < 0.05;
        if (shouldError) {
          setHasError(true);
          setTimeout(() => setHasError(false), 2000);
        } else {
          setVisibleCount((count) => Math.min(count + 6, allItems.length));
        }
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  };

  const itemsToShow = allItems.slice(0, visibleCount);

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Infinite Scroll Feed</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        Scroll to bottom to load more. Simulates network delays and occasional errors.
      </p>
      <div
        className="mt-3 max-h-64 overflow-y-auto space-y-2 rounded-lg border border-border bg-background/60 p-3"
        onScroll={handleScroll}
      >
        {itemsToShow.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border bg-surface px-3 py-2.5 transition hover:border-accent hover:bg-surface/80 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold truncate">{item.title}</p>
                <p className="mt-1 text-xs text-muted line-clamp-2">{item.excerpt}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] sm:text-xs text-muted">
              <span>By {item.author}</span>
              <span>•</span>
              <span>{item.date}</span>
              <span>•</span>
              <span>{item.readTime}</span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-center py-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
          </div>
        )}

        {hasError && (
          <div className="rounded-lg border border-red-300/50 bg-red-50 dark:bg-red-950 p-2 text-center text-xs text-red-600 dark:text-red-400">
            ⚠ Failed to load more. Retrying...
          </div>
        )}

        {visibleCount >= allItems.length && (
          <div className="py-3 text-center text-xs text-muted">
            ✓ You&apos;ve reached the end! {allItems.length} items loaded.
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-muted">
        Loaded {itemsToShow.length} of {allItems.length} items
      </p>
    </article>
  );
}
