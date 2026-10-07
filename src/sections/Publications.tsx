import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download } from 'lucide-react';
import { type PublicationItem } from '../config';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const typeColors: Record<string, string> = {
  'ieom-2024': 'bg-kaleo-terracotta text-kaleo-cream border-kaleo-terracotta',
  'iium-abstract': 'bg-transparent text-kaleo-terracotta border-kaleo-terracotta/60',
  default: 'bg-transparent text-kaleo-earth/60 border-kaleo-earth/25',
};

const PublicationRow = ({ pub, index }: { pub: PublicationItem; index: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    gsap.set(row, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: row,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 py-10 border-b border-kaleo-earth/10 last:border-b-0"
    >
      {/* Icon */}
      <div className="hidden md:flex w-14 h-14 rounded-full border border-kaleo-earth/15 items-center justify-center flex-shrink-0">
        <FileText className="w-5 h-5 text-kaleo-terracotta" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <span
          className={`inline-block font-body text-[10px] uppercase tracking-[0.15em] border rounded-full px-4 py-1.5 ${
            typeColors[pub.id] || typeColors.default
          }`}
        >
          {pub.type}
        </span>
        <h3 className="font-display text-xl md:text-2xl text-kaleo-earth leading-snug mt-4">
          {pub.title}
        </h3>
        <p className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mt-3">
          {pub.venue} · {pub.date}
        </p>
        <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-3 max-w-3xl">
          {pub.note}
        </p>
      </div>

      {/* Download */}
      <div className="flex flex-col items-stretch md:items-center gap-3 flex-shrink-0">
        <a
          href={pub.file}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 font-body text-xs uppercase tracking-wider text-kaleo-earth border border-kaleo-earth/25 rounded-full px-6 py-3.5 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta transition-all"
        >
          <Download className="w-4 h-4" />
          {pub.downloadLabel}
        </a>
        {pub.extraFile && pub.extraLabel && (
          <a
            href={pub.extraFile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-body text-xs uppercase tracking-wider text-kaleo-terracotta hover:opacity-70 transition-opacity"
          >
            <FileText className="w-4 h-4" />
            {pub.extraLabel}
          </a>
        )}
        <span className="font-body text-xs text-kaleo-earth/40 normal-case tracking-normal md:text-center">
          {pub.fileLabel}
        </span>
      </div>
    </div>
  );
};

const Publications = () => {
  const { content: { publications: publicationsConfig } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header.children, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(header.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  if (!publicationsConfig.sectionTitle && publicationsConfig.publications.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-cream"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {publicationsConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {publicationsConfig.sectionTitle}
          </h2>
          <p className="font-body text-sm md:text-base text-kaleo-earth/60 max-w-2xl mx-auto leading-relaxed mt-6">
            {publicationsConfig.sectionIntro}
          </p>
        </div>

        {/* Publications */}
        <div>
          {publicationsConfig.publications.map((pub, index) => (
            <PublicationRow key={pub.id} pub={pub} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
