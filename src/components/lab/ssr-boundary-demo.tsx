import { useMemo } from "react";

interface SsrBoundaryDemoProps {
  serverRenderedAt: string;
}

export function SsrBoundaryDemo({ serverRenderedAt }: SsrBoundaryDemoProps) {
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
