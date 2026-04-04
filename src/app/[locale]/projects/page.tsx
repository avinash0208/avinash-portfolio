import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { isSupportedLocale, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects-data";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/projects" />

      <header className="section-card p-4 sm:p-6 md:p-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Projects</h1>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-muted">
          Selected projects across production systems and hands-on build work.
          Each card links to live products, demos, or source repositories for
          direct verification.
        </p>
      </header>

      <section className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.name} className="section-card p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold">{project.name}</h2>
            </div>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-muted">{project.summary}</p>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag) => (
                <span key={`${project.name}-${tag}`} className="rounded-full border border-border px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold text-muted whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {project.links.map((link) => (
                <a
                  key={`${project.name}-${link.label}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-2 sm:px-3 py-1 text-xs font-semibold transition hover:border-accent hover:text-accent whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {project.note ? <p className="mt-3 rounded-lg border border-border bg-background/60 px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs text-muted">{project.note}</p> : null}
          </article>
        ))}
      </section>
    </div>
  );
}
