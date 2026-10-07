import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../i18n/LanguageContext';
import type { Language } from '../i18n/types';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  image: string;
  imageAlt: Record<Language, string>;
  year: string;
  title: Record<Language, string>;
  result: Record<Language, string>;
}

const projects: Project[] = [
  {
    image: '/scania-bus.webp',
    imageAlt: {
      en: 'Luxury Scania bus body designed and implemented in 2010–2011',
      bn: '২০১০–২০১১ সালে ডিজাইন ও বাস্তবায়িত স্ক্যানিয়া বিলাসবহন বাস বডি',
      id: 'Bodi bus Scania mewah yang dirancang dan diimplementasikan pada 2010–2011',
    },
    year: '2010–2011',
    title: {
      en: 'Scania Bus Body Development',
      bn: 'স্ক্যানিয়া বাস বডি ডেভেলপমেন্ট',
      id: 'Pengembangan Bodi Bus Scania',
    },
    result: {
      en: 'Design & implementation lead — Bangladesh\u2019s first luxury bus body.',
      bn: 'ডিজাইন ও বাস্তবায়ন নেতৃত্ব — বাংলাদেশের প্রথম বিলাসবহন বাস বডি।',
      id: 'Memimpin desain & implementasi — bodi bus mewah pertama di Bangladesh.',
    },
  },
  {
    image: '/card-energy.webp',
    imageAlt: {
      en: 'Single-dome industrial biogas plant for a poultry farm',
      bn: 'পোল্ট্রি খামারের জন্য সিঙ্গেল-ডোম শিল্প বায়োগ্যাস প্ল্যান্ট',
      id: 'PLTSa biogas industri kubah tunggal untuk peternakan unggas',
    },
    year: '2022',
    title: {
      en: 'Biogas Hybrid System',
      bn: 'বায়োগ্যাস হাইব্রিড সিস্টেম',
      id: 'Sistem Hibrida Biogas',
    },
    result: {
      en: 'Industrial single-dome biogas plant with biogas–diesel hybrid generation for a poultry farm.',
      bn: 'পোল্ট্রি খামারের জন্য বায়োগ্যাস–ডিজেল হাইব্রিড জেনারেশনসহ সিঙ্গেল-ডোম শিল্প বায়োগ্যাস প্ল্যান্ট।',
      id: 'PLTSa biogas industri kubah tunggal dengan pembangkitan hibrida biogas–diesel untuk peternakan unggas.',
    },
  },
  {
    image: '/card-medical.webp',
    imageAlt: {
      en: 'Hospital oxygen manifold and medical gas pipeline system',
      bn: 'হাসপাতালের অক্সিজেন ম্যানিফোল্ড ও মেডিকেল গ্যাস পাইপলাইন সিস্টেম',
      id: 'Sistem manifold oksigen dan perpipaan gas medis rumah sakit',
    },
    year: '2023',
    title: {
      en: 'Hospital Medical Gas Audit',
      bn: 'হাসপাতাল মেডিকেল গ্যাস অডিট',
      id: 'Audit Gas Medis Rumah Sakit',
    },
    result: {
      en: 'Oxygen manifold & medical gas connectivity across 20+ health facilities with Save the Children.',
      bn: 'সেভ দ্য চিলড্রেনের সাথে ২০+ স্বাস্থ্য প্রতিষ্ঠানে অক্সিজেন ম্যানিফোল্ড ও মেডিকেল গ্যাস সংযোগ।',
      id: 'Oxygen manifold & konektivitas gas medis di 20+ fasilitas kesehatan bersama Save the Children.',
    },
  },
];

const header: Record<Language, { label: string; title: string }> = {
  en: { label: 'Selected Projects', title: 'Work That Speaks in Results' },
  bn: { label: 'নির্বাচিত প্রকল্পসমূহ', title: 'ফলাফলে যা বলে' },
  id: { label: 'Proyek Terpilih', title: 'Karya yang Terbukti' },
};

const Projects = () => {
  const { lang } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, i) => {
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
            delay: i * 0.12,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-kaleo-sand"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {header[lang].label}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {header[lang].title}
          </h2>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group flex flex-col bg-kaleo-cream border border-kaleo-earth/10 rounded-3xl overflow-hidden card-hover"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.imageAlt[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 font-body text-[11px] uppercase tracking-[0.15em] bg-kaleo-charcoal/80 text-kaleo-cream rounded-full px-4 py-1.5">
                  {project.year}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-7 md:p-8">
                <h3 className="font-display text-xl md:text-2xl text-kaleo-earth leading-snug">
                  {project.title[lang]}
                </h3>
                <p className="font-body text-sm text-kaleo-earth/65 leading-relaxed mt-3">
                  {project.result[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
