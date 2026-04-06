import { notFound } from "next/navigation";
import { IntroAnimation } from "@/components/intro-animation";
import { HomeStorytelling } from "@/components/portfolio/home-storytelling";
import { isSupportedLocale } from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <IntroAnimation>
      <HomeStorytelling />
    </IntroAnimation>
  );
}
