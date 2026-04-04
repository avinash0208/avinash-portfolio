"use client";

import { useMemo, useState } from "react";
import { CsrQueryShowcase } from "@/components/csr-query-showcase";
import { CounterDemo } from "@/components/lab/counter-demo";
import { FilterDemo } from "@/components/lab/filter-demo";
import { ZustandDemo } from "@/components/lab/zustand-demo";
import PushNotificationCard from "@/components/push-notification-card";
import type { LabConcept } from "@/lib/lab-concepts";

type LabWorkbenchProps = {
  concepts: LabConcept[];
  serverRenderedAt: string;
};

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

const localizationOptions = [
  {
    id: "en-US",
    label: "English",
    region: "United States",
    currency: "USD",
    messages: {
      title: "Global Commerce Dashboard",
      description: "Localized UI strings and formatting for an international product experience.",
      revenue: "Revenue",
      renewals: "Renewals",
      nextSync: "Next sync",
      customers: "Customers reached",
    },
  },
  {
    id: "hi-IN",
    label: "Hindi",
    region: "India",
    currency: "INR",
    messages: {
      title: "वैश्विक कॉमर्स डैशबोर्ड",
      description: "अंतरराष्ट्रीय प्रोडक्ट अनुभव के लिए लोकलाइज़्ड UI स्ट्रिंग्स और फॉर्मेटिंग।",
      revenue: "राजस्व",
      renewals: "नवीनीकरण",
      nextSync: "अगला सिंक",
      customers: "कुल ग्राहक",
    },
  },
  {
    id: "fr-FR",
    label: "French",
    region: "France",
    currency: "EUR",
    messages: {
      title: "Tableau de bord commerce mondial",
      description: "Chaînes UI et formats localisés pour une expérience produit internationale.",
      revenue: "Revenu",
      renewals: "Renouvellements",
      nextSync: "Prochaine synchro",
      customers: "Clients atteints",
    },
  },
] as const;

function SsrBoundaryPanel({ serverRenderedAt }: { serverRenderedAt: string }) {
  const clientRenderedAt = useMemo(() => new Date().toISOString(), []);

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">SSR Boundary Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        Server value is produced before hydration. Client value is produced after hydration.
      </p>
      <div className="mt-3 sm:mt-4 space-y-2 text-[11px] sm:text-xs font-mono">
        <p className="rounded border border-border bg-background/70 px-2 sm:px-3 py-1.5 sm:py-2 overflow-x-auto">
          Server rendered at: {serverRenderedAt}
        </p>
        <p className="rounded border border-border bg-background/70 px-2 sm:px-3 py-1.5 sm:py-2 overflow-x-auto">
          Client rendered at: {clientRenderedAt}
        </p>
      </div>
    </article>
  );
}

type CommentNode = {
  id: string;
  author: string;
  message: string;
  children?: CommentNode[];
};

const dummyComments: CommentNode[] = [
  {
    id: "c1",
    author: "Asha",
    message: "Great architecture breakdown. How would you cache comment trees?",
    children: [
      {
        id: "c1-1",
        author: "Ravi",
        message: "Normalize by id and hydrate visible branches only.",
        children: [
          {
            id: "c1-1-1",
            author: "Asha",
            message: "Makes sense. Lazy loading replies should help too.",
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    author: "Neha",
    message: "Thread indentation looks clean on mobile as well.",
  },
];

function NestedCommentsDemo() {
  const renderNode = (node: CommentNode, depth = 0) => (
    <li key={node.id} className="space-y-2">
      <article className="rounded-lg border border-border bg-background/70 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{node.author}</p>
        <p className="mt-1 text-xs sm:text-sm text-foreground/90">{node.message}</p>
      </article>
      {node.children?.length ? (
        <ul className="space-y-2 pl-3 sm:pl-4" style={{ marginLeft: `${Math.min(depth + 1, 3) * 4}px` }}>
          {node.children.map((child) => renderNode(child, depth + 1))}
        </ul>
      ) : null}
    </li>
  );

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Nested Comments Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">Dummy thread data rendered recursively.</p>
      <ul className="mt-3 space-y-2">{dummyComments.map((node) => renderNode(node))}</ul>
    </article>
  );
}

function AutocompleteDemo() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return autocompleteOptions.slice(0, 6);
    }
    return autocompleteOptions.filter((option) => option.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query]);

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Autocomplete Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">Suggestion list filtered from dummy skill data.</p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type to search skill..."
        className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      />
      <ul className="mt-2 space-y-1">
        {filtered.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="w-full rounded-md border border-border px-2 py-1.5 text-left text-xs sm:text-sm hover:border-accent"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      {selected ? <p className="mt-2 text-xs text-muted">Selected: {selected}</p> : null}
    </article>
  );
}

function InfiniteScrollDemo() {
  const allItems = useMemo(
    () => Array.from({ length: 36 }, (_, index) => ({ id: index + 1, title: `Feed Item #${index + 1}` })),
    [],
  );
  const [visibleCount, setVisibleCount] = useState(8);

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Infinite Scroll Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">Dummy API-style feed with append-on-scroll behavior.</p>
      <div
        className="mt-3 max-h-52 overflow-y-auto space-y-2 rounded-lg border border-border bg-background/60 p-2"
        onScroll={(event) => {
          const target = event.currentTarget;
          if (target.scrollTop + target.clientHeight >= target.scrollHeight - 16) {
            setVisibleCount((count) => Math.min(count + 4, allItems.length));
          }
        }}
      >
        {allItems.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="rounded-md border border-border bg-surface px-2 py-2 text-xs sm:text-sm">
            {item.title}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        Showing {Math.min(visibleCount, allItems.length)} of {allItems.length}
      </p>
    </article>
  );
}

function PaginationDemo() {
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

function ImageSliderDemo() {
  const slides = [
    { id: "s1", title: "Landing Hero", caption: "Dummy visual for carousel state handling.", tone: "bg-sky-100" },
    { id: "s2", title: "Feature Showcase", caption: "Next slide with different content block.", tone: "bg-emerald-100" },
    { id: "s3", title: "Checkout Flow", caption: "Simple slide transitions without external API.", tone: "bg-amber-100" },
  ];
  const [index, setIndex] = useState(0);
  const activeSlide = slides[index];

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Image Slider Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">Carousel powered by local dummy slide data.</p>
      <div className={`mt-3 rounded-xl border border-border p-4 ${activeSlide.tone}`}>
        <p className="text-sm font-semibold text-foreground">{activeSlide.title}</p>
        <p className="mt-1 text-xs sm:text-sm text-foreground/80">{activeSlide.caption}</p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIndex((value) => (value - 1 + slides.length) % slides.length)}
          className="rounded-md border border-border px-2 py-1 text-xs"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setIndex((value) => (value + 1) % slides.length)}
          className="rounded-md border border-border px-2 py-1 text-xs"
        >
          Next
        </button>
        <p className="ml-auto text-xs text-muted">{index + 1} / {slides.length}</p>
      </div>
    </article>
  );
}

function LocalizationDemo() {
  const [selectedLocale, setSelectedLocale] = useState<(typeof localizationOptions)[number]["id"]>("en-US");

  const activeLocale = useMemo(
    () => localizationOptions.find((locale) => locale.id === selectedLocale) ?? localizationOptions[0],
    [selectedLocale],
  );

  const sampleDate = useMemo(() => new Date("2026-04-04T18:45:00Z"), []);

  const formattedRevenue = useMemo(
    () => new Intl.NumberFormat(activeLocale.id, { style: "currency", currency: activeLocale.currency, maximumFractionDigits: 0 }).format(2845000),
    [activeLocale],
  );

  const formattedRenewals = useMemo(
    () => new Intl.NumberFormat(activeLocale.id, { style: "currency", currency: activeLocale.currency, maximumFractionDigits: 0 }).format(482000),
    [activeLocale],
  );

  const formattedTime = useMemo(
    () => new Intl.DateTimeFormat(activeLocale.id, { dateStyle: "full", timeStyle: "short" }).format(sampleDate),
    [activeLocale, sampleDate],
  );

  const formattedCustomers = useMemo(
    () => new Intl.NumberFormat(activeLocale.id, { maximumFractionDigits: 0 }).format(128540),
    [activeLocale],
  );

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Localization Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        Switch locale to see translated copy plus culturally correct date, time, currency, and number formatting.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {localizationOptions.map((localeOption) => {
          const isActive = localeOption.id === activeLocale.id;

          return (
            <button
              key={localeOption.id}
              type="button"
              onClick={() => setSelectedLocale(localeOption.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isActive ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background/70 hover:border-accent"
              }`}
            >
              {localeOption.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background/70 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{activeLocale.region}</p>
        <h4 className="mt-2 text-base sm:text-lg font-semibold text-foreground">{activeLocale.messages.title}</h4>
        <p className="mt-1 text-xs sm:text-sm text-muted">{activeLocale.messages.description}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.revenue}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedRevenue}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.renewals}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedRenewals}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.nextSync}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedTime}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.customers}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedCustomers}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ConceptDemo({ conceptId, serverRenderedAt }: { conceptId: LabConcept["id"]; serverRenderedAt: string }) {
  if (conceptId === "ssr-boundary") {
    return <SsrBoundaryPanel serverRenderedAt={serverRenderedAt} />;
  }

  if (conceptId === "csr-state") {
    return (
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        <CounterDemo />
        <FilterDemo />
      </div>
    );
  }

  if (conceptId === "client-cache") {
    return <CsrQueryShowcase />;
  }

  if (conceptId === "shared-state") {
    return <ZustandDemo />;
  }

  if (conceptId === "push-notifications") {
    return <PushNotificationCard />;
  }

  if (conceptId === "nested-comments") {
    return <NestedCommentsDemo />;
  }

  if (conceptId === "autocomplete") {
    return <AutocompleteDemo />;
  }

  if (conceptId === "infinite-scroll") {
    return <InfiniteScrollDemo />;
  }

  if (conceptId === "pagination") {
    return <PaginationDemo />;
  }

  if (conceptId === "image-slider") {
    return <ImageSliderDemo />;
  }

  if (conceptId === "localization") {
    return <LocalizationDemo />;
  }

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Architecture Notes</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        This concept is documentation-heavy. Use the LLD blocks for component,
        state, and tradeoff review during interviews.
      </p>
    </article>
  );
}

export function LabWorkbench({ concepts, serverRenderedAt }: LabWorkbenchProps) {
  const [selectedId, setSelectedId] = useState<LabConcept["id"]>(concepts[0]?.id ?? "ssr-boundary");

  const selectedConcept = useMemo(
    () => concepts.find((concept) => concept.id === selectedId) ?? concepts[0],
    [concepts, selectedId],
  );

  if (!selectedConcept) {
    return null;
  }

  return (
    <section className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="section-card p-3 sm:p-4 lg:p-5">
        <h2 className="text-sm sm:text-base font-semibold">LLD Concept Navigator</h2>
        <p className="mt-2 text-xs text-muted">
          Select a frontend concept to inspect implementation, architecture, and tradeoffs.
        </p>

        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
          {concepts.map((concept) => {
            const isActive = concept.id === selectedConcept.id;

            return (
              <button
                key={concept.id}
                type="button"
                onClick={() => setSelectedId(concept.id)}
                className={`w-full rounded-xl border px-2 sm:px-3 py-2 sm:py-3 text-left transition ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background/70 hover:border-accent"
                }`}
              >
                <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] opacity-85">
                  {concept.category}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-semibold">{concept.title}</p>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="space-y-3 sm:space-y-4 lg:space-y-5">
        <article className="section-card p-3 sm:p-4 lg:p-5 lg:p-6">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {selectedConcept.category}
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold">{selectedConcept.title}</h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-muted">{selectedConcept.shortDescription}</p>
          <p className="mt-2 sm:mt-3 rounded-xl border border-border bg-background/60 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
            <span className="font-semibold">Objective:</span> {selectedConcept.objective}
          </p>
        </article>

        <ConceptDemo conceptId={selectedConcept.id} serverRenderedAt={serverRenderedAt} />

        <section className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <article className="section-card p-3 sm:p-4 lg:p-5">
            <h3 className="text-sm sm:text-base font-semibold">Components</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">
              {selectedConcept.lld.components.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>

          <article className="section-card p-3 sm:p-4 lg:p-5">
            <h3 className="text-sm sm:text-base font-semibold">State Model</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">
              {selectedConcept.lld.stateModel.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>

          <article className="section-card p-3 sm:p-4 lg:p-5">
            <h3 className="text-sm sm:text-base font-semibold">Data Flow</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">
              {selectedConcept.lld.dataFlow.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>

          <article className="section-card p-3 sm:p-4 lg:p-5">
            <h3 className="text-sm sm:text-base font-semibold">Tradeoffs</h3>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">
              {selectedConcept.lld.tradeoffs.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </section>
  );
}
