import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { WebVitalsBadge } from "@/components/web-vitals-badge";
import { projects } from "@/lib/projects-data";
import { experienceTimeline } from "@/lib/experience-data";
import { skillCategories } from "@/lib/skills-data";

const impactByProject: Record<string, string> = {
  "PAYTM-INSURANCE": "+20% revenue uplift through UI optimization and A/B experimentation",
  "BRIGHTLY PLATFORM": "100% WCAG 2.1 AA coverage in core modules and scalable MFE delivery",
  "NETFLIX REPLICA": "Production-style architecture exercise with Firebase deployment and modern React patterns",
};

// Card gradient and chip colors are co-indexed so each card's gradient matches its chips
const cardVariants = [
  "border-sky-300 bg-linear-to-br from-sky-100 via-white to-sky-50 dark:border-sky-400/30 dark:from-sky-500/12 dark:via-background/90 dark:to-background",
  "border-emerald-300 bg-linear-to-br from-emerald-100 via-white to-emerald-50 dark:border-emerald-400/30 dark:from-emerald-500/12 dark:via-background/90 dark:to-background",
  "border-amber-300 bg-linear-to-br from-amber-100 via-white to-amber-50 dark:border-amber-400/30 dark:from-amber-500/12 dark:via-background/90 dark:to-background",
  "border-rose-300 bg-linear-to-br from-rose-100 via-white to-rose-50 dark:border-rose-400/30 dark:from-rose-500/12 dark:via-background/90 dark:to-background",
];

const skillChipVariants = [
  "border-sky-300/90 bg-sky-100/90 text-foreground dark:border-sky-500/40 dark:bg-sky-500/20 dark:text-foreground",
  "border-emerald-300/90 bg-emerald-100/90 text-foreground dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-foreground",
  "border-amber-300/90 bg-amber-100/90 text-foreground dark:border-amber-500/40 dark:bg-amber-500/20 dark:text-foreground",
  "border-rose-300/90 bg-rose-100/90 text-foreground dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-foreground",
];

const skillCardVariants = cardVariants;
const experienceCardVariants = cardVariants;
const projectCardVariants = cardVariants;

export function HomeStorytelling() {
  const featuredProjects = projects.filter((project) =>
    ["PAYTM-INSURANCE", "BRIGHTLY PLATFORM", "NETFLIX REPLICA"].includes(project.name),
  );

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 border-b border-border/90 bg-(--header-bg) shadow-sm">
        <div className="container-shell flex items-center justify-between gap-2 py-2.5 sm:gap-4 sm:py-3.5">
          <div className="shrink-0">
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-muted sm:block">Frontend Systems</p>
            <p className="text-xs font-semibold tracking-[0.08em] text-foreground sm:mt-1 sm:text-sm sm:tracking-[0.12em] md:text-base">AVINASH GUPTA</p>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted sm:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#skills" className="transition-colors hover:text-foreground">Tech Radar</a>
            <a href="#experience" className="transition-colors hover:text-foreground">Experience</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
            <Link href="/blog" className="transition-colors hover:text-foreground">Writing</Link>
            <Link href="/lab" className="transition-colors hover:text-foreground">Lab</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <details className="relative sm:hidden">
              <summary
                className="flex h-9 w-9 list-none items-center justify-center rounded-full border border-border bg-surface text-base text-foreground transition hover:border-accent [&::-webkit-details-marker]:hidden"
                aria-label="Open navigation menu"
              >
                ☰
              </summary>

              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-surface p-2 shadow-lg">
                <div className="flex flex-col">
                  <a href="#work" className="rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-background">Work</a>
                  <a href="#skills" className="rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-background">Tech Radar</a>
                  <a href="#experience" className="rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-background">Experience</a>
                  <a href="#contact" className="rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-background">Contact</a>
                  <Link href="/blog" className="rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-background">Writing</Link>
                  <Link href="/lab" className="rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-background">Lab</Link>
                </div>
              </div>
            </details>

            <WebVitalsBadge className="hidden md:flex" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container-shell mt-6 space-y-6">
        <section id="hero" className="anchor-section section-card p-5 sm:p-7 md:p-10">
          {/* <div className="relative inline-block overflow-hidden rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Frontend Systems</p>
            <p className="mt-2 flex flex-wrap text-lg font-bold tracking-[0.16em] text-foreground sm:text-2xl">
              AVINASH GUPTA
            </p>
            <div aria-hidden className="mt-2 h-0.5 origin-left bg-accent" />
          </div> */}

          <h1 className="gradient-title mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Designing scalable, high-performance frontend systems
          </h1>
          <p className="mt-3 max-w-3xl text-xs leading-6 text-muted sm:mt-4 sm:text-sm sm:leading-7 md:text-base">
           Senior frontend engineer with 7+ years of experience building performant, accessible, and reliable web platforms at scale, leveraging AI-assisted development to accelerate delivery.
          </p>
        </section>

        <section id="skills" className="anchor-section deferred-section rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Skills and Tech Radar</h2>
            <Link href="/skills" className="text-xs sm:text-sm font-semibold text-accent whitespace-nowrap">
              Open full skills matrix
            </Link>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted">
            Specialized expertise spanning modern frontend frameworks, platform architecture, and accessible product systems at enterprise scale.
          </p>

          <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <article
                key={category.title}
                className={`group rounded-2xl border p-3 shadow-sm ring-1 ring-transparent transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/30 sm:p-4 ${skillCardVariants[categoryIndex % skillCardVariants.length]}`}
              >
                <p className="inline-flex rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/90 sm:text-xs">
                  {category.title}
                </p>
                {/* <p className="mt-1 text-xs sm:text-sm text-muted">{category.skills.length} tools and technologies</p> */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.skills.slice(0, 4).map((skill) => (
                    <span
                      key={`${category.title}-${skill.name}`}
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition group-hover:scale-[1.02] ${skillChipVariants[categoryIndex % skillChipVariants.length]}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </section>

        <section id="experience" className="anchor-section deferred-section rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Experience Highlights</h2>
            <Link href="/experience" className="text-xs sm:text-sm font-semibold text-accent whitespace-nowrap">
              View timeline and role details
            </Link>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted">
            Leadership experience across high-impact roles focused on technical excellence, team development, and measurable business outcomes.
          </p>

          <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {experienceTimeline.map((company, companyIndex) => (
              <article
                key={company.company}
                className={`group rounded-2xl border p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-4 ${experienceCardVariants[companyIndex % experienceCardVariants.length]}`}
              >
                <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">{company.company}</h3>
                <p className="mt-1 inline-flex rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-foreground/80 sm:text-xs">
                  {company.period}
                </p>
                <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                  {(company.roles[0]?.impactChips ?? []).slice(0, 3).map((chip) => (
                    <span
                      key={`${company.company}-${chip}`}
                      className={`rounded-full border px-2.5 py-1 text-[10px] sm:text-xs font-semibold whitespace-nowrap ${skillChipVariants[companyIndex % skillChipVariants.length]}`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

        </section>


        <section id="work" className="anchor-section deferred-section rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Selected Work</h2>
            <Link href="/projects" className="text-xs sm:text-sm font-semibold text-accent whitespace-nowrap">
              Full case-study index
            </Link>
          </div>

          <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, projectIndex) => (
              <article
                key={project.name}
                className={`group rounded-2xl border p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-4 ${projectCardVariants[projectIndex % projectCardVariants.length]}`}
              >
                <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">{project.name}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted">{project.summary}</p>
                <p className="mt-2 sm:mt-3 rounded-xl border border-accent/35 bg-accent/10 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-foreground">
                  {impactByProject[project.name]}
                </p>
                <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                  {project.links.slice(0, 2).map((link) => (
                    <a
                      key={`${project.name}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full border px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 ${skillChipVariants[projectIndex % skillChipVariants.length]}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>


        <section id="contact" className="anchor-section deferred-section rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold">Let&apos;s Build Something Meaningful</h2>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-muted">
            If you are hiring for senior frontend leadership or need architecture depth on a product platform,
            I am open to discuss.
          </p>
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-accent px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground text-center">
              Contact Me
            </Link>
            <a
              href="http://www.linkedin.com/in/ag0208"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-center hover:border-accent transition"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
