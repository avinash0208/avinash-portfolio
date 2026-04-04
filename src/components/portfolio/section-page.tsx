import { SiteNav } from "@/components/site-nav";
import type { Locale } from "@/lib/i18n";
import type { Section } from "@/lib/site-content";

type SectionPageProps = {
  locale: Locale;
  section: Section;
};

export function SectionPage({ locale, section }: SectionPageProps) {
  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale} currentPath={section.path} />

      <header className="section-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-3xl font-bold">{section.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
          {section.intro}
        </p>
      </header>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="section-card p-5">
          <h2 className="text-lg font-semibold">Key Highlights</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground">
            {section.points.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
        </aside>

        <div className="space-y-5">
          {section.detailSections.map((detailSection) => (
            <article key={detailSection.title} className="section-card p-5 sm:p-6">
              <h2 className="text-xl font-semibold">{detailSection.title}</h2>
              <div className="mt-3 space-y-4 text-sm leading-7 text-muted sm:text-base">
                {detailSection.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
