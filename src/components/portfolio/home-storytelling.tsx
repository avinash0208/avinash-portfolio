"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "@/lib/projects-data";
import { experienceTimeline } from "@/lib/experience-data";
import { skillCategories } from "@/lib/skills-data";

type VitalName = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
type VitalsState = Partial<Record<VitalName, number>>;

const visibleSections = ["hero", "work", "skills", "experience", "contact"] as const;
type VisibleSection = (typeof visibleSections)[number];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.4, ease: "easeOut" },
} as const;

const impactByProject: Record<string, string> = {
  "PAYTM-INSURANCE": "+20% revenue uplift through UI optimization and A/B experimentation",
  "BRIGHTLY PLATFORM": "100% WCAG 2.1 AA coverage in core modules and scalable MFE delivery",
  "NETFLIX REPLICA": "Production-style architecture exercise with Firebase deployment and modern React patterns",
};

const nameplateText = "AVINASH GUPTA";

const nameplateContainer: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: [0, 1, 1],
    y: [16, 0, -4],
    scale: [1, 1, 0.97],
    transition: {
      duration: 1.25,
      times: [0, 0.65, 1],
      ease: "easeOut",
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const nameplateLetter: Variants = {
  hidden: { opacity: 0, y: 12, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

export function HomeStorytelling() {
  const [activeSection, setActiveSection] = useState<VisibleSection>("hero");
  const [progress, setProgress] = useState(0);
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vitals, setVitals] = useState<VitalsState>({});

  const featuredProjects = useMemo(
    () => projects.filter((project) => ["PAYTM-INSURANCE", "BRIGHTLY PLATFORM", "NETFLIX REPLICA"].includes(project.name)),
    [],
  );

  useReportWebVitals((metric) => {
    const name = metric.name as VitalName;
    if (!["LCP", "INP", "CLS", "FCP", "TTFB"].includes(name)) {
      return;
    }

    setVitals((previous) => ({
      ...previous,
      [name]: metric.value,
    }));
  });

  const perfScore = useMemo(() => {
    const thresholds: Record<VitalName, { good: number; needsImprove: number }> = {
      LCP: { good: 2500, needsImprove: 4000 },
      INP: { good: 200, needsImprove: 500 },
      CLS: { good: 0.1, needsImprove: 0.25 },
      FCP: { good: 1800, needsImprove: 3000 },
      TTFB: { good: 800, needsImprove: 1800 },
    };

    const values = (Object.entries(vitals) as Array<[VitalName, number]>).filter(([, value]) => Number.isFinite(value));
    if (!values.length) {
      return null;
    }

    const score = values.reduce((total, [name, value]) => {
      const { good, needsImprove } = thresholds[name];
      if (value <= good) {
        return total + 100;
      }
      if (value <= needsImprove) {
        return total + 75;
      }
      return total + 40;
    }, 0);

    return Math.round(score / values.length);
  }, [vitals]);

  const lcpLabel = vitals.LCP ? `${(vitals.LCP / 1000).toFixed(1)}s` : "...";
  const inpLabel = vitals.INP ? `${Math.round(vitals.INP)}ms` : "...";
  const clsLabel = typeof vitals.CLS === "number" ? vitals.CLS.toFixed(2) : "...";

  useEffect(() => {
    const onScroll = () => {
      const viewport = window.innerHeight;
      const full = document.documentElement.scrollHeight;
      const raw = (window.scrollY / Math.max(full - viewport, 1)) * 100;
      setProgress(Math.max(0, Math.min(100, raw)));

      if (window.scrollY + viewport >= full - 8) {
        setActiveSection("contact");
        return;
      }

      const marker = window.scrollY + 170;
      let current: VisibleSection = "hero";

      for (const id of visibleSections) {
        const node = document.getElementById(id);
        if (!node) {
          continue;
        }

        if (node.offsetTop <= marker) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="fixed left-0 top-0 z-[70] h-1 bg-accent" style={{ width: `${progress}%` }} />

      <header className="sticky top-0 z-[60] border-b border-border bg-background/85 backdrop-blur mt-1">
        <div className="container-shell flex flex-wrap items-center justify-between gap-2 py-3 sm:gap-4">
          {/* Mobile Menu Button - Left */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-2 text-xs font-semibold md:text-sm">
            {[
              { id: "work", label: "Work" },
              { id: "skills", label: "Tech Radar" },
              { id: "experience", label: "Experience" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id as VisibleSection)}
                className={`rounded-full border px-2 py-1 transition text-xs sm:px-3 sm:py-1.5 ${
                  activeSection === item.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Link href="/blog" className="rounded-full border border-border px-2 py-1 text-xs sm:px-3 sm:py-1.5">
              Writing
            </Link>
            <Link href="/lab" className="rounded-full border border-border px-2 py-1 text-xs sm:px-3 sm:py-1.5">
              Lab
            </Link>
          </nav>

            <div className="flex items-center gap-2">
                <div className="rounded-full border border-border bg-surface/80 px-2 py-1 sm:hidden">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
                    Perf {perfScore ?? "--"}
                </span>
                </div>

                <div className="hidden items-center gap-1 rounded-full border border-border bg-surface/80 px-2 py-1 sm:flex">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
                    Perf {perfScore ?? "--"}
                </span>
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-800 dark:bg-sky-500/15 dark:text-sky-300">
                    LCP {lcpLabel}
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                INP {inpLabel}
              </span>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-800 dark:bg-violet-500/15 dark:text-violet-300">
                CLS {clsLabel}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-background/95 px-4 py-3 space-y-2">
            {[
              { id: "work", label: "Work" },
              { id: "skills", label: "Tech Radar" },
              { id: "experience", label: "Experience" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setActiveSection(item.id as VisibleSection);
                  setMobileMenuOpen(false);
                }}
                className={`block rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  activeSection === item.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-full border border-border px-3 py-2 text-xs font-semibold hover:border-accent"
            >
              Writing
            </Link>
            <Link
              href="/lab"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-full border border-border px-3 py-2 text-xs font-semibold hover:border-accent"
            >
              Lab
            </Link>
          </nav>
        )}
      </header>
{/* 
      <div className="fixed right-3 top-16 z-[55] hidden md:block rounded-lg sm:rounded-xl border border-border bg-surface/95 px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-semibold shadow-sm">
        Lighthouse: 98 | A11y: 100
      </div> */}

      <main className="container-shell mt-6 space-y-6">
        <motion.section id="hero" className="section-card p-5 sm:p-7 md:p-10" {...reveal}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={nameplateContainer}
            className="relative inline-block overflow-hidden rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm sm:px-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Frontend Systems</p>
            <p className="mt-2 flex flex-wrap text-lg font-bold tracking-[0.16em] text-foreground sm:text-2xl">
              {nameplateText.split("").map((letter, index) => (
                <motion.span key={`${letter}-${index}`} variants={nameplateLetter}>
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </p>
            <motion.div
              aria-hidden
              className="mt-2 h-[2px] origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1], opacity: [0.5, 1, 0.6] }}
              transition={{ duration: 1.15, delay: 0.35, ease: "easeOut" }}
            />
          </motion.div>

          {/* <motion.p
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted"
            initial="hidden"
            animate="visible"
            variants={heroTextReveal}
            custom={0.95}
          >
            Senior Frontend Engineer
          </motion.p> */}
          <motion.h1
            className="gradient-title mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial="hidden"
            animate="visible"
            variants={heroTextReveal}
            custom={1.05}
          >
            Designing scalable, high-performance frontend systems
          </motion.h1>
          <motion.p
            className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-muted"
            initial="hidden"
            animate="visible"
            variants={heroTextReveal}
            custom={1.2}
          >
            Senior frontend engineer with 7+ years of experience building
            performant, accessible, and reliable web platforms at scale.
          </motion.p>
        </motion.section>

                <motion.section id="skills" className="rounded-2xl border border-border bg-background/70 p-5 sm:p-6 md:p-8" {...reveal}>
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
              <article key={category.title} className="rounded-xl border border-border bg-surface p-3 sm:p-4">
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

        </motion.section>

        <motion.section id="experience" className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8" {...reveal}>
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

        </motion.section>


        <motion.section id="work" className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8" {...reveal}>
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
        </motion.section>


        <motion.section id="contact" className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8" {...reveal}>
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
        </motion.section>
      </main>

      <div className="fixed bottom-4 right-4 z-[65] md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => setQuickNavOpen((prev) => !prev)}
          className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold shadow-sm hover:border-accent transition"
        >
          Quick Nav
        </button>

        {quickNavOpen ? (
          <div className="absolute bottom-12 right-0 w-40 sm:w-44 rounded-xl border border-border bg-surface p-2 shadow-lg">
            {[
              { id: "hero", label: "Top" },
              { id: "work", label: "Work" },
              { id: "skills", label: "Tech Radar" },
              { id: "experience", label: "Experience" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setQuickNavOpen(false)}
                className="block rounded-lg px-2 py-2 text-xs font-semibold text-foreground hover:bg-background transition"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/lab"
              onClick={() => setQuickNavOpen(false)}
              className="block rounded-lg px-2 py-2 text-xs font-semibold text-foreground hover:bg-background transition"
            >
              Lab
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
