import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { awardsByCompany } from "@/lib/awards-data";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type AccomplishmentsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AccomplishmentsPage({ params }: AccomplishmentsPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/accomplishments" />

      <header className="section-card p-4 sm:p-6 md:p-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Awards & Accomplishments</h1>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-muted">
          Highlights of formal recognition and impact milestones across Brightly,
          Paytm, and Perfios.
        </p>
      </header>

      <section className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {awardsByCompany.map((group) => (
          <article key={group.company} className="section-card space-y-2 sm:space-y-3 p-3 sm:p-4 md:p-5 lg:p-6" style={{ borderTopColor: group.accent, borderTopWidth: "3px" }}>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                {group.emoji} {group.company}
              </h2>
              <span
                className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full"
                style={{ backgroundColor: group.accent }}
                aria-hidden
              />
            </div>

            <ul className="space-y-2 sm:space-y-3">
              {group.awards.map((award) => (
                <li key={`${group.company}-${award.title}`} className="rounded-lg sm:rounded-xl border border-border bg-background/60 p-2 sm:p-3">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">🌟 {award.title}</p>
                  {award.description ? <p className="mt-1 text-[11px] sm:text-xs text-muted">{award.description}</p> : null}
                  {award.link ? (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 sm:mt-2 inline-block text-[11px] sm:text-xs font-semibold text-accent hover:underline"
                    >
                      View proof 🔗
                    </a>
                  ) : (
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-muted">Recorded ✅</p>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      
      <Link href={`/${locale}`} className="mt-6 sm:mt-8 inline-block rounded-full border border-border px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition hover:border-accent">
        ← Back
      </Link>
    </div>
  );
}
