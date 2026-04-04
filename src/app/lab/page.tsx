import Link from "next/link";
import { CounterDemo } from "@/components/lab/counter-demo";
import { FilterDemo } from "@/components/lab/filter-demo";

const lldNotes = [
  {
    title: "Counter Demo LLD",
    points: [
      "Components: CounterDemo, ControlButtons, DerivedMetrics.",
      "State model: reducer with explicit transitions (increment/decrement/reset).",
      "Data flow: user action -> reducer -> render commit -> derived average.",
      "Tradeoff: local reducer keeps demo simple, global store unnecessary here.",
    ],
  },
  {
    title: "Filter Demo LLD",
    points: [
      "Components: FilterDemo with controlled input and filtered result list.",
      "State model: local query string with memoized derivation.",
      "Data flow: input event -> query update -> memoized filter -> list render.",
      "Tradeoff: in-memory filter is fast for small lists; server search needed at scale.",
    ],
  },
];

export default function LabPage() {
  return (
    <div className="container-shell py-10">
      <header className="section-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Frontend Lab
        </p>
        <h1 className="mt-3 text-3xl font-bold">CSR Interactive Demos + LLD</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          This lab showcases focused client-side interaction patterns with concise
          low-level design notes to explain architecture and state decisions.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-accent">
          Back to Home
        </Link>
      </header>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <CounterDemo />
        <FilterDemo />
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {lldNotes.map((note) => (
          <article key={note.title} className="section-card p-5">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {note.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
