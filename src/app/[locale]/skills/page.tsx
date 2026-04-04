import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { isSupportedLocale, type Locale } from "@/lib/i18n";
import { skillCategories } from "@/lib/skills-data";

type SkillsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SkillsPage({ params }: SkillsPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/skills" />

      <header className="section-card p-4 sm:p-6 md:p-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Skills</h1>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-muted">
          A categorized view of my frontend and product engineering skill set.
          This section is designed for quick scan by recruiters and deep review
          by engineering interviewers.
        </p>
      </header>

      <section className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        {skillCategories.map((category) => (
          <article key={category.title} className="section-card overflow-hidden p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">{category.title}</h2>
                <p className="mt-1 text-xs sm:text-sm text-muted">{category.subtitle}</p>
              </div>
              <span
                className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 rounded-full"
                style={{ backgroundColor: category.tone }}
                aria-hidden
              />
            </div>

            <div className="mt-3 sm:mt-4 md:mt-5 grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {category.skills.map((skill) => {
                const logoUrl = `https://img.shields.io/badge/${encodeURIComponent(
                  skill.name,
                )}-${encodeURIComponent(category.tone.replace("#", ""))}?style=for-the-badge&logo=${encodeURIComponent(
                  skill.logo || "" ,
                )}&logoColor=white&labelColor=111827`;

                return (
                  <div
                    key={skill.name}
                    className="rounded-lg sm:rounded-xl border border-border bg-background/60 p-1.5 sm:p-2 md:p-3 transition hover:border-accent"
                  >
                    {/* External SVG badge logos are intentional here for broad tech logo coverage. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt={`${skill.name} logo badge`}
                      className="h-5 sm:h-6 md:h-7 w-auto max-w-full"
                      loading="lazy"
                    />
                    <p className="mt-1 sm:mt-2 text-[9px] sm:text-xs font-medium text-foreground/90">{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>
      
      <Link href={`/${locale}`} className="mt-6 sm:mt-8 inline-block rounded-full border border-border px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition hover:border-accent">
        ← Back
      </Link>
    </div>
  );
}
