import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { getPost } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "ไม่พบบทความ — MiniCloud AFK" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} — MiniCloud AFK` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: `${loaderData.title} — MiniCloud AFK` },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> กลับไปหน้าบทความ
        </Link>

        <span className="mt-8 inline-block rounded-full bg-accent px-3 py-1 text-[11px] text-accent-foreground">
          {post.tag}
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">
          {post.date} · อ่าน {post.readMinutes} นาที
        </p>

        <div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
