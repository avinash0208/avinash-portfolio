"use client";

import { useMemo, useRef, useState } from "react";
import { SsrBoundaryDemo } from "@/components/lab/ssr-boundary-demo";
import { NestedCommentsDemo } from "@/components/lab/nested-comments-demo";
import { AutocompleteDemo } from "@/components/lab/autocomplete-demo";
import { InfiniteScrollDemo } from "@/components/lab/infinite-scroll-demo";
import { PaginationDemo } from "@/components/lab/pagination-demo";
import { ImageSliderDemo } from "@/components/lab/image-slider-demo";
import { LocalizationDemo } from "@/components/lab/localization-demo";
import { CsrQueryShowcase } from "@/components/lab/csr-query-showcase";
import { CounterDemo } from "@/components/lab/counter-demo";
import { FilterDemo } from "@/components/lab/filter-demo";
import { ZustandDemo } from "@/components/lab/zustand-demo";
import PushNotificationCard from "@/components/push-notification-card";
import type { LabConcept } from "@/lib/lab-concepts";

type LabWorkbenchProps = {
  concepts: LabConcept[];
  serverRenderedAt: string;
};

function ConceptDemo({ conceptId, serverRenderedAt }: { conceptId: LabConcept["id"]; serverRenderedAt: string }) {
  if (conceptId === "ssr-boundary") {
    return <SsrBoundaryDemo serverRenderedAt={serverRenderedAt} />;
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
  const contentStartRef = useRef<HTMLDivElement | null>(null);

  const selectedConcept = useMemo(
    () => concepts.find((concept) => concept.id === selectedId) ?? concepts[0],
    [concepts, selectedId],
  );

  const selectConcept = (conceptId: LabConcept["id"]) => {
    setSelectedId(conceptId);

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.requestAnimationFrame(() => {
        const node = contentStartRef.current;
        if (!node) {
          return;
        }

        const headerOffset = 96;
        const target = node.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: target, behavior: "smooth" });
      });
    }
  };

  if (!selectedConcept) {
    return null;
  }

  return (
    <section className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="section-card min-w-0 overflow-hidden p-3 sm:p-4 lg:p-5">
        <h2 className="text-sm sm:text-base font-semibold">LLD Concept Navigator</h2>
        <p className="mt-2 text-xs text-muted">
          Select a frontend concept to inspect implementation, architecture, and tradeoffs.
        </p>

        <div className="mt-3 w-full max-w-full min-w-0 flex gap-2 overflow-x-auto pb-1 lg:mt-4 lg:grid lg:grid-cols-1 lg:gap-2 lg:overflow-visible lg:pb-0">
          {concepts.map((concept) => {
            const isActive = concept.id === selectedConcept.id;

            return (
              <button
                key={concept.id}
                type="button"
                onClick={() => selectConcept(concept.id)}
                className={`shrink-0 rounded-xl border px-3 py-2 text-left transition lg:w-full lg:px-3 lg:py-3 ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background/70 hover:border-accent"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-85 lg:text-[11px] lg:tracking-[0.16em]">
                  {concept.category}
                </p>
                <p className="mt-1 text-xs font-semibold lg:text-sm">{concept.title}</p>
              </button>
            );
          })}
        </div>
      </aside>

      <div ref={contentStartRef} className="min-w-0 scroll-mt-24 space-y-3 sm:space-y-4 lg:space-y-5">
        <article className="section-card p-3 sm:p-4 lg:p-6">
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
