import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../i18n/LanguageContext';
import type { Language } from '../i18n/types';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: Record<Language, string>;
}

const stats: Stat[] = [
  {
    value: 40,
    suffix: '+',
    label: { en: 'Hospitals served', bn: 'সেবাপ্রাপ্ত হাসপাতাল', id: 'Rumah sakit dilayani' },
  },
  {
    value: 20,
    suffix: '+',
    label: { en: 'Factories supported', bn: 'কারখানায় সহায়তা', id: 'Pabrik didukung' },
  },
  {
    value: 10,
    suffix: '+',
    label: {
      en: 'Telecom sites maintained',
      bn: 'টেলিকম সাইট রক্ষণাবেক্ষণ',
      id: 'Situs telecom dipelihara',
    },
  },
  {
    value: 20,
    suffix: '+',
    label: {
      en: 'Years of engineering',
      bn: 'বছরের প্রকৌশল অভিজ্ঞতা',
      id: 'Tahun pengalaman rekayasa',
    },
  },
];

const ProofStrip = () => {
  const { lang } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    numberRefs.current.forEach((el, i) => {
      if (!el) return;
      const target = stats[i].value;
      const counter = { v: 0 };
      gsap.set(el, { opacity: 0 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, duration: 0.4 });
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
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
      className="relative w-full bg-kaleo-charcoal text-kaleo-cream overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl md:text-5xl text-kaleo-cream">
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                <span className="text-kaleo-terracotta">{stat.suffix}</span>
              </p>
              <p className="font-body text-xs md:text-sm uppercase tracking-[0.15em] text-kaleo-cream/60 mt-3">
                {stat.label[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
