import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { isSupportedLocale, type Locale } from "@/lib/i18n";
import { experienceTimeline } from "@/lib/experience-data";

type ExperiencePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/experience" />

      <header className="section-card p-4 sm:p-6 md:p-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Experience</h1>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-muted">
          Professional journey across product engineering, architecture, and
          frontend platform leadership. This timeline highlights role
          progression, delivery ownership, and measurable impact.
        </p>
      </header>

      <section className="relative mt-6 sm:mt-8 pl-5 sm:pl-7 md:pl-10">
        <div className="absolute bottom-0 left-1.5 top-0 w-0.5 rounded-full bg-gradient-to-b from-accent/30 via-border to-accent/30 sm:left-2.5 md:left-4" />

        <div className="space-y-8">
          {experienceTimeline.map((item) => (
            <article key={item.company} className="relative">
              <span
                className="absolute -left-[1px] sm:left-1.5 md:-left-[2px] top-7 sm:top-8 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 sm:border-4 border-background shadow-sm ring-2 ring-border"
                style={{ backgroundColor: item.accent }}
                aria-hidden
              />

              <div className="section-card ml-auto mr-0 sm:ml-8 w-[calc(100%-1.25rem)] sm:w-auto overflow-hidden">
                <div className="border-b border-border bg-background/60 px-3 py-3 sm:px-5 sm:py-4 md:px-6">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Image
                        src={item.companyLogo}
                        alt={`${item.company} logo`}
                        width={40}
                        height={40}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border border-border bg-surface object-contain p-0.5 sm:p-1"
                      />
                      <div>
                        <h2 className="text-base sm:text-xl font-semibold">
                          {item.company}
                        </h2>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted">
                          {item.location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-3 flex justify-start sm:justify-end">
                      <span
                        className="rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold whitespace-nowrap"
                        style={{
                          backgroundColor: `${item.accent}20`,
                          color: item.accent,
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 p-3 sm:p-5 md:p-6">
                  {item.roles.map((role, index) => (
                    <details
                      key={`${item.company}-${role.title}`}
                      className="group rounded-xl border border-border bg-background/70 p-3 sm:p-4"
                      open={index === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 sm:gap-3">
                        <h3 className="text-sm sm:text-base font-semibold text-foreground">
                          {role.title}
                        </h3>
                        <span className="text-[11px] sm:text-xs font-semibold text-muted group-open:hidden">
                          +
                        </span>
                        <span className="hidden text-[11px] sm:text-xs font-semibold text-muted group-open:inline">
                          −
                        </span>
                      </summary>

                      {role.impactChips?.length ? (
                        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                          {role.impactChips.map((chip) => (
                            <span
                              key={`${item.company}-${role.title}-${chip}`}
                              className="rounded-full border border-border px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold whitespace-nowrap"
                              style={{
                                backgroundColor: `${item.accent}14`,
                                color: item.accent,
                              }}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm leading-5 sm:leading-6 text-muted">
                        {role.achievements.map((achievement) => (
                          <li key={achievement}>- {achievement}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link
        href={`/${locale}`}
        className="mt-6 sm:mt-8 inline-block rounded-full border border-border px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition hover:border-accent"
      >
        ← Back
      </Link>
    </div>
  );
}
