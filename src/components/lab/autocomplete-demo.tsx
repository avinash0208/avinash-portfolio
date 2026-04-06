"use client";

import { useMemo, useState } from "react";

const autocompleteOptions = [
  "React",
  "Redux",
  "Remix",
  "Next.js",
  "Node.js",
  "NestJS",
  "TypeScript",
  "Tailwind CSS",
  "TanStack Query",
  "Testing Library",
];

export function AutocompleteDemo() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return autocompleteOptions.slice(0, 8);
    }
    return autocompleteOptions
      .filter((option) => option.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }, [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setHighlightedIndex(-1);
    setIsOpen(true);

    if (value.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  };

  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="font-semibold bg-amber-100 dark:bg-amber-900">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleSelect = (item: string) => {
    setSelected(item);
    setQuery(item);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          handleSelect(filtered[highlightedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Advanced Typeahead</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        Search with keyboard navigation, debounced filtering, and match highlighting.
      </p>
      <div className="mt-3 relative">
        <input
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill... (↓↑ to navigate, Enter to select)"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />
        )}
      </div>

      {isOpen && (
        <ul className="mt-2 space-y-1 rounded-lg border border-border bg-surface shadow-lg overflow-hidden">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full rounded-none px-3 py-2 text-left text-xs sm:text-sm transition ${
                    highlightedIndex === index
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-background/70"
                  }`}
                >
                  {highlightMatch(item)}
                </button>
              </li>
            ))
          ) : query.trim() ? (
            <li className="px-3 py-3 text-center text-xs text-muted">No results for &quot;{query}&quot;</li>
          ) : (
            <li className="px-3 py-3 text-center text-xs text-muted">Start typing to search...</li>
          )}
        </ul>
      )}

      {selected && (
        <p className="mt-3 text-xs text-muted">
          ✓ Selected: <span className="font-semibold text-foreground">{selected}</span>
        </p>
      )}
    </article>
  );
}
