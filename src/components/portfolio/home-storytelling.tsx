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
            Condensed capability map with depth across frontend, platform, and accessibility engineering.
          </p>

          <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <article key={category.title} className="rounded-xl border border-border bg-background/70 p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-muted">{category.title}</p>
                {/* <p className="mt-1 text-xs sm:text-sm text-muted">{category.skills.length} tools and technologies</p> */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.skills.slice(0, 4).map((skill) => (
                    <span key={`${category.title}-${skill.name}`} className="rounded-full border border-border px-2 py-0.5 text-xs whitespace-nowrap">
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
          <p className="mt-2 text-xs sm:text-sm text-muted">Key outcomes from recent roles, optimized for quick recruiter scan.</p>

          <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {experienceTimeline.map((company) => (
              <article key={company.company} className="rounded-xl border border-border bg-background/60 p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold">{company.company}</h3>
                <p className="mt-1 text-[10px] sm:text-xs text-muted">{company.period}</p>
                <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                  {(company.roles[0]?.impactChips ?? []).slice(0, 3).map((chip) => (
                    <span key={`${company.company}-${chip}`} className="rounded-full border border-border px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap">
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
            {featuredProjects.map((project) => (
              <article key={project.name} className="rounded-xl border border-border bg-background/70 p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold">{project.name}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted">{project.summary}</p>
                <p className="mt-2 sm:mt-3 rounded-lg border border-border bg-surface px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-foreground">
                  {impactByProject[project.name]}
                </p>
                <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                  {project.links.slice(0, 2).map((link) => (
                    <a
                      key={`${project.name}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold hover:border-accent transition"
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
