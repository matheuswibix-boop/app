import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { POSTS } from "@/lib/content";
import { T, useLanguage } from "@/lib/i18n";
import { blogTranslations } from "@/lib/blogTranslations";
import { PostCard } from "@/components/site/BlogPreview";
import { Eyebrow, MaskLine, Reveal } from "@/components/site/Reveal";
import { scrollTop } from "@/lib/scroll";

export function BlogList() {
  const {lang} = useLanguage();
  useEffect(() => { scrollTop(); document.title = "Blog | INSALES"; }, [lang]);
  return (
    <main data-testid="blog-list-page" className="px-5 pb-24 pt-36 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow><T>Blog INSALES</T></Eyebrow>
        <h1 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
          <MaskLine><T>Conteúdo para</T></MaskLine>
          <MaskLine delay={0.1} className="text-[#FFC400]"><T>quem vende.</T></MaskLine>
        </h1>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {POSTS.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </main>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const {t,lang} = useLanguage();
  const post = POSTS.find((p) => p.slug === slug);
  useEffect(() => { scrollTop(); if (post) document.title = `${t(post.title)} | INSALES`; }, [slug, post, lang, t]);

  if (!post) {
    return (
      <main className="px-5 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl uppercase"><T>Artigo não encontrado</T></h1>
        <Link to="/blog" className="mt-6 inline-block text-[#FFC400]"><T>Voltar ao blog</T></Link>
      </main>
    );
  }
  const others = POSTS.filter((p) => p.slug !== slug);
  const localizedBody = blogTranslations[post.slug]?.[lang] || post.body;
  return (
    <main data-testid="blog-post-page" className="px-5 pb-24 pt-36 md:px-10">
      <article className="mx-auto max-w-3xl">
        <Link to="/blog" data-testid="blog-back-link" className="inline-flex items-center gap-2 text-sm text-[#AEB0B6] hover:text-[#FFC400]"><ArrowLeft className="h-4 w-4" /> <T>Blog</T></Link>
        <div className="mt-8 flex items-center gap-3 text-xs">
          <span className="rounded-full bg-[#FFC400]/12 px-3 py-1 font-semibold text-[#FFC400]"><T>{post.category}</T></span>
          <span className="font-mono text-[#AEB0B6]">{t(post.date)} · {t(post.read)}</span>
        </div>
        <h1 data-testid="blog-post-title" className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl"><T>{post.title}</T></h1>
        <p className="mt-6 text-lg text-[#d5d7db] leading-relaxed"><T>{post.excerpt}</T></p>
        <Reveal className="prose-insales mt-12 border-t border-white/10 pt-10">
          {localizedBody.map((b, i) => (b.startsWith("## ") ? <h2 key={i}><T>{b.slice(3)}</T></h2> : <p key={i}><T>{b}</T></p>))}
        </Reveal>
        <Link to="/consultoria-estrategica" data-testid="blog-post-cta" className="mt-12 flex items-center justify-between gap-6 rounded-3xl bg-[#25D366] p-8 text-[#070809] transition-transform hover:-translate-y-1">
          <span className="font-display text-xl uppercase md:text-2xl"><T>Quer aplicar isso no seu negócio?</T></span>
          <span className="shrink-0 rounded-full bg-[#070809] px-5 py-3 text-sm font-bold text-[#25D366]"><T>Conhecer consultoria</T></span>
        </Link>
      </article>
      <div className="mx-auto mt-24 max-w-[1400px]">
        <p className="font-mono mb-6 text-xs uppercase tracking-[0.28em] text-[#AEB0B6]"><T>Continue lendo</T></p>
        <div className="grid gap-4 md:grid-cols-2">{others.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}</div>
      </div>
    </main>
  );
}
