"use client";

import { useState } from "react";

export function ImageSliderDemo() {
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
