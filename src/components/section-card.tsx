import Link from "next/link";
import type { Section } from "@/lib/site-content";
import type { Locale } from "@/lib/i18n";

type SectionCardProps = {
  section: Section;
  locale: Locale;
};

export function SectionCard({ section, locale }: SectionCardProps) {
  return (
    <Link href={`/${locale}${section.path}`} className="block" aria-label={`Open ${section.title} page`}>
      <article id={section.id} className="section-card h-full p-6 transition hover:border-accent">
        <h2 className="text-2xl font-bold">{section.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{section.summary}</p>
        <ul className="mt-4 space-y-2 text-sm text-foreground">
          {section.points.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm font-semibold text-accent">Open section page</p>
      </article>
    </Link>
  );
}
