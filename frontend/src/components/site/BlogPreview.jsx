import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "@/lib/content";
import { T } from "@/lib/i18n";
import { Eyebrow, MaskLine, Reveal } from "./Reveal";

export const PostCard = ({ p, i }) => (
  <Reveal delay={i * 0.08} className="h-full">
    <Link to={`/blog/${p.slug}`} data-testid={`blog-card-${p.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#111316] p-7 transition-[border-color,background-color] duration-500 hover:border-[#FFC400]/60 hover:bg-[#15181c]">
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-[#FFC400]/12 px-3 py-1 font-semibold text-[#FFC400]"><T>{p.category}</T></span>
        <span className="font-mono text-[#AEB0B6]"><T>{p.read}</T></span>
      </div>
      <h3 className="mt-8 text-xl font-bold leading-snug md:text-2xl"><T>{p.title}</T></h3>
      <p className="mt-3 text-sm text-[#c2c4c9] leading-relaxed"><T>{p.excerpt}</T></p>
      <div className="mt-auto flex items-center justify-between pt-8 text-sm">
        <span className="font-mono text-[#AEB0B6]"><T>{p.date}</T></span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-[background-color,color,transform] duration-500 group-hover:rotate-45 group-hover:bg-[#FFC400] group-hover:text-[#070809]">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  </Reveal>
);

export const BlogPreview = () => (
  <section id="blog" data-testid="blog-section" className="px-5 py-24 md:px-10 md:py-32">
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow><T>Blog</T></Eyebrow>
          <h2 className="font-display mt-6 uppercase leading-[0.95] text-4xl sm:text-5xl">
            <MaskLine><T>Insights para</T></MaskLine>
            <MaskLine delay={0.1} className="text-[#FFC400]"><T>vender mais.</T></MaskLine>
          </h2>
        </div>
        <Link to="/blog" data-testid="blog-see-all" className="text-sm font-semibold text-[#FFC400] underline-offset-8 hover:underline"><T>Ver todos os artigos →</T></Link>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {POSTS.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}
      </div>
    </div>
  </section>
);
