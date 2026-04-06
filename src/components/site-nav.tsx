import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { WebVitalsBadge } from "@/components/web-vitals-badge";
import { type Locale, getMessages } from "@/lib/i18n";

type SiteNavProps = {
  locale: Locale;
  currentPath: string;
  showLocaleTabs?: boolean;
};

export function SiteNav({
  locale,
  currentPath,
}: SiteNavProps) {
  const t = getMessages(locale);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/lab", label: t.nav.lab },
    { href: "/blog", label: t.nav.blog },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <header className="container-shell flex items-center justify-between border-b border-border/60 py-4 sm:py-5">
      <nav className="flex items-center gap-5 sm:gap-7 text-sm sm:text-[15px]">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "relative py-1 font-medium tracking-tight transition-colors",
                active ? "text-foreground" : "text-muted hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
              <span
                className={[
                  "absolute left-0 -bottom-1 h-px bg-foreground transition-all duration-200",
                  active ? "w-full opacity-100" : "w-0 opacity-0",
                ].join(" ")}
              />
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <WebVitalsBadge className="hidden lg:flex" />
        <ThemeToggle />
      </div>
    </header>
  );
}
