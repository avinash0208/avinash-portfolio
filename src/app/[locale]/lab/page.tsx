import Link from "next/link";
import { notFound } from "next/navigation";
import { LabWorkbench } from "@/components/lab/lab-workbench";
import { SiteNav } from "@/components/site-nav";
import { getMessages, isSupportedLocale, type Locale } from "@/lib/i18n";
import { labConcepts } from "@/lib/lab-concepts";

type LocaleLabProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedLabPage({ params }: LocaleLabProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale as Locale);

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/lab" />
      <header className="section-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t.lab.badge}</p>
        <h1 className="mt-3 text-3xl font-bold">{t.lab.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t.lab.body}</p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-accent">
          {t.lab.back}
        </Link>
      </header>

      <LabWorkbench concepts={labConcepts} serverRenderedAt={new Date().toISOString()} />
    </div>
  );
}
