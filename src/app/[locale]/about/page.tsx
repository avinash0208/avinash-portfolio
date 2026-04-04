import { notFound } from "next/navigation";
import { SectionPage } from "@/components/portfolio/section-page";
import { isSupportedLocale, type Locale } from "@/lib/i18n";
import { getSectionById } from "@/lib/site-content";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const section = getSectionById("about");
  if (!section) {
    notFound();
  }

  return <SectionPage locale={locale as Locale} section={section} />;
}
