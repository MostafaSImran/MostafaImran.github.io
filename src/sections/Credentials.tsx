import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck, Award, Users } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Credentials = () => {
  const { content: { credentials: credentialsConfig } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const lists = listsRef.current;
    if (!header || !lists) return;

    gsap.set(header.children, { opacity: 0, y: 30 });
    gsap.set(lists.children, { opacity: 0, y: 40 });

    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(header.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          });
        },
      })
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: lists,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(lists.children, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
      })
    );

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const hasContent =
    credentialsConfig.certifications.length > 0 ||
    credentialsConfig.affiliations.length > 0 ||
    credentialsConfig.awards.length > 0;

  if (!credentialsConfig.sectionTitle && !hasContent) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-cream"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {credentialsConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {credentialsConfig.sectionTitle}
          </h2>
        </div>

        <div ref={listsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Certifications */}
          {credentialsConfig.certifications.length > 0 && (
            <div className="lg:col-span-7">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                <BadgeCheck className="w-4 h-4" />
                {credentialsConfig.certificationsLabel}
              </h3>
              <ul className="divide-y divide-kaleo-earth/10">
                {credentialsConfig.certifications.map((cert, index) => (
                  <li key={index} className="py-4 flex items-baseline justify-between gap-6 group">
                    <div>
                      <p className="font-body text-sm md:text-base text-kaleo-earth leading-snug">
                        {cert.title}
                      </p>
                      {cert.detail && (
                        <p className="font-body text-xs text-kaleo-earth/50 mt-1">{cert.detail}</p>
                      )}
                    </div>
                    <span className="font-body text-xs text-kaleo-terracotta whitespace-nowrap">
                      {cert.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Affiliations & Awards */}
          <div className="lg:col-span-5 space-y-14">
            {credentialsConfig.affiliations.length > 0 && (
              <div>
                <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                  <Users className="w-4 h-4" />
                  {credentialsConfig.affiliationsLabel}
                </h3>
                <ul className="space-y-5">
                  {credentialsConfig.affiliations.map((item, index) => (
                    <li key={index} className="flex items-baseline gap-4">
                      <span className="font-display text-xl text-kaleo-terracotta w-16 flex-shrink-0">
                        {item.title}
                      </span>
                      <span className="font-body text-sm text-kaleo-earth/70 leading-snug">
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {credentialsConfig.awards.length > 0 && (
              <div>
                <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                  <Award className="w-4 h-4" />
                  {credentialsConfig.awardsLabel}
                </h3>
                <ul className="space-y-5">
                  {credentialsConfig.awards.map((item, index) => (
                    <li key={index}>
                      <p className="font-body text-sm md:text-base text-kaleo-earth">
                        {item.title}
                      </p>
                      <p className="font-body text-xs text-kaleo-earth/50 mt-1">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
