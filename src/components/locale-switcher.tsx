import Link from "next/link";
import { type Locale, supportedLocales } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
  path: string;
};

export function LocaleSwitcher({ locale, path }: LocaleSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      {supportedLocales.map((target) => {
        const href = `/${target}${path}`;
        const active = target === locale;

        return (
          <Link
            key={target}
            href={href}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${
              active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted"
            }`}
          >
            {target}
          </Link>
        );
      })}
    </div>
  );
}
