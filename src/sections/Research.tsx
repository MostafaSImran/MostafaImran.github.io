import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, GraduationCap, Compass } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Research = () => {
  const { content: { research: researchConfig }, lang } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;
    if (!header || !body) return;

    gsap.set(header.children, { opacity: 0, y: 30 });
    gsap.set(body.children, { opacity: 0, y: 40 });

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
        trigger: body,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(body.children, {
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
    researchConfig.publicationTitle ||
    researchConfig.education.length > 0 ||
    researchConfig.interests.length > 0;

  if (!researchConfig.sectionTitle && !hasContent) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-sand"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {researchConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {researchConfig.sectionTitle}
          </h2>
        </div>

        <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Publication */}
          {researchConfig.publicationTitle && (
            <div className="lg:col-span-6">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                <BookOpen className="w-4 h-4" />
                {lang === 'bn' ? 'নির্বাচিত প্রকাশনা' : lang === 'id' ? 'Publikasi Terpilih' : 'Selected Publication'}
              </h3>
              <div className="border-l-2 border-kaleo-terracotta/40 pl-6 md:pl-8">
                <p className="font-display text-subheadline text-kaleo-earth leading-snug">
                  {researchConfig.publicationTitle}
                </p>
                <p className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta mt-4">
                  {researchConfig.publicationVenue}
                </p>
                {researchConfig.publicationDescription && (
                  <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-4">
                    {researchConfig.publicationDescription}
                  </p>
                )}
                <ul className="mt-6 space-y-3">
                  {researchConfig.publicationPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-kaleo-terracotta mt-2 flex-shrink-0" />
                      <span className="font-body text-sm text-kaleo-earth/70 leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Education */}
          {researchConfig.education.length > 0 && (
            <div className="lg:col-span-3">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                <GraduationCap className="w-4 h-4" />
                {researchConfig.educationLabel}
              </h3>
              <ul className="space-y-8">
                {researchConfig.education.map((edu, index) => (
                  <li key={index}>
                    <p className="font-display text-2xl text-kaleo-earth">
                      {edu.degree} <span className="italic text-kaleo-earth/70">{edu.field}</span>
                    </p>
                    <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-2">
                      {edu.school}
                    </p>
                    <p className="font-body text-xs text-kaleo-terracotta mt-1">{edu.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Research Interests */}
          {researchConfig.interests.length > 0 && (
            <div className="lg:col-span-3">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                <Compass className="w-4 h-4" />
                {researchConfig.interestsLabel}
              </h3>
              <ul className="space-y-5">
                {researchConfig.interests.map((interest, index) => (
                  <li
                    key={index}
                    className="font-body text-sm text-kaleo-earth/70 leading-relaxed border-b border-kaleo-earth/10 pb-5"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Research;
