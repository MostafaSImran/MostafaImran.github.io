import { ArrowRight, Clock } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import { articles } from '../insights/articles';

const header: Record<string, { label: string; title: string; intro: string }> = {
  en: {
    label: 'Insights',
    title: 'Engineering Notes & Field Insights',
    intro:
      'Short, practical writing on codes, audits and systems — drawn from two decades of projects in Bangladesh and Indonesia.',
  },
  bn: {
    label: 'অন্তর্দৃষ্টি',
    title: 'প্রকৌশল নোট ও ক্ষেত্রের অভিজ্ঞতা',
    intro:
      'কোড, অডিট ও সিস্টেম নিয়ে সংক্ষিপ্ত ব্যবহারিক লেখা — বাংলাদেশ ও ইন্দোনেশিয়ার দুই দশকের প্রকল্প অভিজ্ঞতা থেকে।',
  },
  id: {
    label: 'Wawasan',
    title: 'Catatan Teknik & Wawasan Lapangan',
    intro:
      'Tulisan praktis singkat tentang kode, audit dan sistem — dari dua dekade proyek di Bangladesh dan Indonesia.',
  },
};

const Insights = () => {
  const { lang } = useContent();
  const t = header[lang] ?? header.en;

  return (
    <section id="insights" className="relative w-full py-24 md:py-32 bg-kaleo-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {t.label}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">{t.title}</h2>
          <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-5 max-w-2xl mx-auto">
            {t.intro}
          </p>
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`/insights/${article.slug}/`}
              className="group flex flex-col bg-kaleo-sand border border-kaleo-earth/10 rounded-3xl overflow-hidden card-hover"
            >
              {article.image && (
                <div className="relative overflow-hidden aspect-[2/1]">
                  <img
                    src={article.image}
                    alt={article.imageAlt ?? article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-7 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[10px] uppercase tracking-[0.15em] bg-kaleo-terracotta/10 text-kaleo-terracotta rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1 font-body text-[11px] text-kaleo-earth/45">
                    <Clock className="w-3 h-3" /> {article.readMinutes} min
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-kaleo-earth leading-snug mt-4">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-kaleo-earth/65 leading-relaxed mt-3 flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-body text-xs text-kaleo-earth/45">
                    {new Date(article.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta">
                    Read
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
