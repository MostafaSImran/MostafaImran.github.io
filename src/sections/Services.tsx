import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Phone, MessageCircle } from 'lucide-react';
import { type ServiceItem } from '../config';
import { useContent } from '../i18n/LanguageContext';
import { openInquiry } from '../i18n/inquiry';
import type { Language } from '../i18n/types';

const inquiryButtonLabel: Record<Language, string> = {
  en: 'Send Inquiry',
  bn: 'অনুসন্ধান পাঠান',
  id: 'Kirim Permintaan',
};

gsap.registerPlugin(ScrollTrigger);

const labels: Record<Language, { whatWeDo: string; compliance: string }> = {
  en: { whatWeDo: 'What We Do', compliance: 'Compliance Standards' },
  bn: { whatWeDo: 'আমরা যা করি', compliance: 'সম্মতি মানদণ্ড' },
  id: { whatWeDo: 'Apa yang Kami Kerjakan', compliance: 'Standar Kepatuhan' },
};

const badgeStyles: Record<ServiceItem['badgeStyle'], string> = {
  premium: 'bg-kaleo-terracotta text-kaleo-cream border-kaleo-terracotta',
  recurring: 'bg-transparent text-kaleo-terracotta border-kaleo-terracotta/60',
  project: 'bg-transparent text-kaleo-earth/60 border-kaleo-earth/25',
};

const ServiceCard = ({ service, index }: { service: ServiceItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { lang } = useContent();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: (index % 3) * 0.1,
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
      ref={cardRef}
      className="flex flex-col bg-kaleo-cream border border-kaleo-earth/10 rounded-3xl p-8 md:p-10 card-hover"
    >
      {/* Badge */}
      <span
        className={`self-start font-body text-[10px] uppercase tracking-[0.15em] border rounded-full px-4 py-1.5 ${badgeStyles[service.badgeStyle]}`}
      >
        {service.badge}
      </span>

      {/* Title & Description */}
      <h3 className="font-display text-2xl md:text-[1.7rem] text-kaleo-earth leading-snug mt-6">
        {service.title}
      </h3>
      <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-3">
        {service.description}
      </p>

      {/* What We Do */}
      <div className="mt-7">
        <h4 className="font-body text-[10px] uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-4">
          <ClipboardCheck className="w-3.5 h-3.5" />
          {labels[lang].whatWeDo}
        </h4>
        <ul className="space-y-3">
          {service.whatWeDo.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-kaleo-terracotta mt-2.5 flex-shrink-0" />
              <span className="font-body text-sm text-kaleo-earth/75 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compliance Standards */}
      <div className="mt-7">
        <h4 className="font-body text-[10px] uppercase tracking-[0.2em] text-kaleo-terracotta mb-4">
          {labels[lang].compliance}
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.compliance.map((std, i) => (
            <span
              key={i}
              className="font-body text-xs text-kaleo-earth/70 border border-kaleo-earth/15 rounded-full px-3.5 py-1.5"
            >
              {std}
            </span>
          ))}
        </div>
      </div>

      {/* CTAs — inquiry first (works on desktop), call second with number visible */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => openInquiry(service.id)}
          className="inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-cream bg-kaleo-terracotta border border-kaleo-terracotta rounded-full px-6 py-3.5 hover:bg-kaleo-earth hover:border-kaleo-earth transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          {inquiryButtonLabel[lang]}
        </button>
        <a
          href={service.ctaHref}
          className="inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-earth border border-kaleo-earth/25 rounded-full px-6 py-3.5 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta transition-all"
        >
          <Phone className="w-4 h-4" />
          {service.ctaText}
          <span className="normal-case tracking-normal text-kaleo-earth/50 group-hover:text-kaleo-cream/70">+880 1714 073604</span>
        </a>
      </div>
    </div>
  );
};

const Services = () => {
  const { content: { services: servicesConfig } } = useContent();
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

  if (!servicesConfig.sectionTitle && servicesConfig.services.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-sand"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {servicesConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {servicesConfig.sectionTitle}
          </h2>
          <p className="font-body text-sm md:text-base text-kaleo-earth/60 max-w-2xl mx-auto leading-relaxed mt-6">
            {servicesConfig.sectionIntro}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesConfig.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
