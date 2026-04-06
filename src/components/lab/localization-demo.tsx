"use client";

import { useMemo, useState } from "react";

const localizationOptions = [
  {
    id: "en-US",
    label: "English",
    region: "United States",
    currency: "USD",
    messages: {
      title: "Global Commerce Dashboard",
      description: "Localized UI strings and formatting for an international product experience.",
      revenue: "Revenue",
      renewals: "Renewals",
      nextSync: "Next sync",
      customers: "Customers reached",
    },
  },
  {
    id: "hi-IN",
    label: "Hindi",
    region: "India",
    currency: "INR",
    messages: {
      title: "वैश्विक कॉमर्स डैशबोर्ड",
      description: "अंतरराष्ट्रीय प्रोडक्ट अनुभव के लिए लोकलाइज़्ड UI स्ट्रिंग्स और फॉर्मेटिंग।",
      revenue: "राजस्व",
      renewals: "नवीनीकरण",
      nextSync: "अगला सिंक",
      customers: "कुल ग्राहक",
    },
  },
  {
    id: "fr-FR",
    label: "French",
    region: "France",
    currency: "EUR",
    messages: {
      title: "Tableau de bord commerce mondial",
      description: "Chaînes UI et formats localisés pour une expérience produit internationale.",
      revenue: "Revenu",
      renewals: "Renouvellements",
      nextSync: "Prochaine synchro",
      customers: "Clients atteints",
    },
  },
] as const;

export function LocalizationDemo() {
  const [selectedLocale, setSelectedLocale] = useState<(typeof localizationOptions)[number]["id"]>("en-US");

  const activeLocale = useMemo(
    () => localizationOptions.find((locale) => locale.id === selectedLocale) ?? localizationOptions[0],
    [selectedLocale],
  );

  const sampleDate = useMemo(() => new Date("2026-04-04T18:45:00Z"), []);

  const formattedRevenue = useMemo(
    () =>
      new Intl.NumberFormat(activeLocale.id, {
        style: "currency",
        currency: activeLocale.currency,
        maximumFractionDigits: 0,
      }).format(2845000),
    [activeLocale],
  );

  const formattedRenewals = useMemo(
    () =>
      new Intl.NumberFormat(activeLocale.id, {
        style: "currency",
        currency: activeLocale.currency,
        maximumFractionDigits: 0,
      }).format(482000),
    [activeLocale],
  );

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat(activeLocale.id, {
        dateStyle: "full",
        timeStyle: "short",
      }).format(sampleDate),
    [activeLocale, sampleDate],
  );

  const formattedCustomers = useMemo(
    () =>
      new Intl.NumberFormat(activeLocale.id, {
        maximumFractionDigits: 0,
      }).format(128540),
    [activeLocale],
  );

  return (
    <article className="section-card p-3 sm:p-4 lg:p-5">
      <h3 className="text-base sm:text-lg font-semibold">Localization Demo</h3>
      <p className="mt-2 text-xs sm:text-sm text-muted">
        Switch locale to see translated copy plus culturally correct date, time, currency, and number formatting.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {localizationOptions.map((localeOption) => {
          const isActive = localeOption.id === activeLocale.id;

          return (
            <button
              key={localeOption.id}
              type="button"
              onClick={() => setSelectedLocale(localeOption.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                isActive ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background/70 hover:border-accent"
              }`}
            >
              {localeOption.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background/70 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{activeLocale.region}</p>
        <h4 className="mt-2 text-base sm:text-lg font-semibold text-foreground">{activeLocale.messages.title}</h4>
        <p className="mt-1 text-xs sm:text-sm text-muted">{activeLocale.messages.description}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.revenue}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedRevenue}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.renewals}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedRenewals}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.nextSync}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedTime}</p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{activeLocale.messages.customers}</p>
            <p className="mt-1 text-sm sm:text-base font-semibold text-foreground">{formattedCustomers}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
