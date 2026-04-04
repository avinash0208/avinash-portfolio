import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { blogPosts } from "@/lib/blog";
import { getMessages, isSupportedLocale, type Locale } from "@/lib/i18n";

type LocaleBlogProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedBlogIndexPage({ params }: LocaleBlogProps) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const t = getMessages(locale as Locale);

  return (
    <div className="container-shell py-10">
      <SiteNav locale={locale as Locale} currentPath="/blog" />
      <header className="section-card p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{t.blog.badge}</p>
        <h1 className="mt-3 text-3xl font-bold">{t.blog.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t.blog.body}</p>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-accent">
          {t.blog.back}
        </Link>
      </header>

      <section className="mt-8 grid gap-5">
        {blogPosts.map((post) => (
          <article key={post.slug} className="section-card p-5">
            <p className="text-xs text-muted">{post.date}</p>
            <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-muted">{post.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-accent"
            >
              {t.blog.readPost}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
