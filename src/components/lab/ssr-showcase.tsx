import { unstable_noStore as noStore } from "next/cache";

export function SsrShowcase() {
  noStore();

  const now = new Date().toISOString();

  return (
    <section className="section-card p-5">
      <h3 className="text-lg font-semibold">SSR Showcase</h3>
      <p className="mt-2 text-sm text-muted">
        This timestamp is generated on the server for each request.
      </p>
      <p className="mt-4 rounded border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground">
        {now}
      </p>
    </section>
  );
}
