import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostComponent } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const postModule = await getPostComponent(slug);

  if (!postModule || !postModule.default) {
    notFound();
  }

  const MDXContent = postModule.default;

  return (
    <article className="container-shell py-10">
      <header className="section-card p-6 sm:p-8">
        <p className="text-xs text-muted">{post.date}</p>
        <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">{post.summary}</p>
      </header>

      <section className="prose prose-slate dark:prose-invert mt-8 max-w-none rounded-2xl border border-border bg-surface p-6">
        <MDXContent />
      </section>
    </article>
  );
}
