import { useParams, Link } from 'react-router';
import { ArrowLeft, Mail, MessageCircle, Clock } from 'lucide-react';
import { getArticle } from '../insights/articles';
import type { ArticleBlock } from '../insights/articles';
import { WHATSAPP_NUMBER } from '../i18n/inquiry';
import { useContent } from '../i18n/LanguageContext';

const Block = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-display text-2xl md:text-3xl text-kaleo-earth mt-12 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case 'ul':
      return (
        <ul className="mt-4 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="font-body text-base text-kaleo-earth/80 leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-kaleo-terracotta">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className="my-10 border-l-4 border-kaleo-terracotta pl-6 md:pl-8">
          <p className="font-display text-xl md:text-2xl text-kaleo-earth italic leading-relaxed">
            “{block.text}”
          </p>
        </blockquote>
      );
    case 'img':
      return (
        <figure className="my-10">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full rounded-2xl border border-kaleo-earth/10 shadow-sm"
          />
          {block.caption && (
            <figcaption className="font-body text-xs text-kaleo-earth/50 mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return (
        <p className="font-body text-base md:text-lg text-kaleo-earth/80 leading-relaxed mt-5">
          {block.text}
        </p>
      );
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useContent();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-kaleo-sand flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-3xl text-kaleo-earth">Article not found</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 font-body text-sm uppercase tracking-wider text-kaleo-terracotta hover:text-kaleo-earth transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I read your article "${article.title}" on mostafasimran.com and would like to discuss it.`
  )}`;

  return (
    <div className="min-h-screen bg-kaleo-sand">
      {/* Top bar */}
      <header className="border-b border-kaleo-earth/10 bg-kaleo-sand/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60 hover:text-kaleo-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <span className="font-display text-base md:text-lg text-kaleo-earth">M. S. Imran</span>
          <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta">
            Insights
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        {/* Article header */}
        <div className="pt-14 md:pt-20">
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-[11px] uppercase tracking-[0.15em] bg-kaleo-terracotta/10 text-kaleo-terracotta rounded-full px-3.5 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-kaleo-earth leading-tight mt-6">
            {article.title}
          </h1>
          <div className="mt-6 flex items-center gap-5 font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/50">
            <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {article.readMinutes} min read
            </span>
          </div>
        </div>

        {article.image && (
          <figure className="mt-10">
            <img
              src={article.image}
              alt={article.imageAlt ?? article.title}
              className="w-full aspect-[2/1] object-cover rounded-3xl"
            />
          </figure>
        )}

        {/* Body */}
        <article>
          {article.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        {/* Author box */}
        <div className="mt-16 pt-8 border-t border-kaleo-earth/10">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">About the author</p>
          <h2 className="font-display text-2xl text-kaleo-earth mt-3">Mostafa Shawkat Imran</h2>
          <p className="font-body text-sm text-kaleo-earth/65 leading-relaxed mt-3">
            Mechanical Engineer (RUET) and MBA (AUST) — Fellow of IEB, member of ASME, NFPA and IEOM.
            CEO of Nobo Shakti Prokushal (NSP), Dhaka and Managing Director of PT Sun Moon Ecosystem, Jakarta.
            Two decades of practice across boilers, pressure vessels, hydrogen piping, medical gas systems and
            healthcare MEP validation.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-kaleo-cream border border-kaleo-earth/10 rounded-3xl p-8 md:p-10">
          <h3 className="font-display text-2xl text-kaleo-earth">Discuss your project</h3>
          <p className="font-body text-sm text-kaleo-earth/65 leading-relaxed mt-3">
            {lang === 'bn'
              ? 'এই বিষয়ে পরামর্শ বা অডিট প্রয়োজন? সরাসরি যোগাযোগ করুন।'
              : lang === 'id'
                ? 'Butuh konsultasi atau audit terkait topik ini? Hubungi kami langsung.'
                : 'Need consultancy or an audit on this topic? Reach out directly.'}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:info@mostafasimran.com?subject=${encodeURIComponent(`Inquiry: ${article.title}`)}`}
              className="inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-cream bg-kaleo-terracotta rounded-full px-8 py-3.5 hover:bg-kaleo-earth transition-all"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-earth border border-kaleo-earth/25 rounded-full px-8 py-3.5 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta transition-all"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        <p className="mt-12 text-center font-body text-xs text-kaleo-earth/40">
          © 2026 Mostafa Shawkat Imran · Nobo Shakti Prokushal (NSP) · PT Sun Moon Ecosystem
        </p>
      </main>
    </div>
  );
};

export default ArticlePage;
