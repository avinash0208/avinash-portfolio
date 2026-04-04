import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/contact" />

      <header className="section-card p-4 sm:p-6 md:p-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Portfolio Section
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Contact</h1>
        <p className="mt-3 max-w-3xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-muted">
          Open to senior frontend opportunities, architecture discussions, and
          consulting conversations.
        </p>
      </header>

      <section className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-2">
        <article className="section-card p-3 sm:p-4 md:p-5 lg:p-6">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">Direct Contact</h2>
          <ul className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm leading-5 sm:leading-6 text-foreground">
            <li>
              <span className="font-semibold">Email:</span><br className="sm:hidden" /> <a href="mailto:avinashgupta0208@gmail.com" className="text-accent hover:underline">avinashgupta0208@gmail.com</a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span><br className="sm:hidden" /> <a href="tel:+919738357855" className="text-accent hover:underline">+91 9738357855</a>
            </li>
          </ul>
        </article>

        <article className="section-card p-3 sm:p-4 md:p-5 lg:p-6">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">Profiles</h2>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
            <a
              href="http://www.linkedin.com/in/ag0208"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/avinash0208"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
