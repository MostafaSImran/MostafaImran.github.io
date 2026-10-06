import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, CheckCircle2, Crosshair } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PhdPitch = () => {
  const { content: { phd: phdPitchConfig } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;
    const interests = interestsRef.current;
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

    if (interests) {
      gsap.set(interests.children, { opacity: 0, y: 20 });
      triggers.push(
        ScrollTrigger.create({
          trigger: interests,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(interests.children, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
            });
          },
        })
      );
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  const hasContent = phdPitchConfig.statement || phdPitchConfig.whyMe.length > 0;

  if (!phdPitchConfig.sectionTitle && !hasContent) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-charcoal text-kaleo-cream"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {phdPitchConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-cream mt-4">
            {phdPitchConfig.sectionTitle}
          </h2>
        </div>

        <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Statement of Purpose */}
          {phdPitchConfig.statement && (
            <div className="lg:col-span-6">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                <Quote className="w-4 h-4" />
                {phdPitchConfig.statementLabel}
              </h3>
              <div className="border-l-2 border-kaleo-terracotta/50 pl-6 md:pl-10">
                <p className="font-display text-subheadline md:text-2xl leading-relaxed text-kaleo-cream/90 italic">
                  “{phdPitchConfig.statement}”
                </p>
              </div>
            </div>
          )}

          {/* Why Me */}
          {phdPitchConfig.whyMe.length > 0 && (
            <div className="lg:col-span-6">
              <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center gap-2 mb-8">
                <CheckCircle2 className="w-4 h-4" />
                {phdPitchConfig.whyMeLabel}
              </h3>
              <ul className="space-y-8">
                {phdPitchConfig.whyMe.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="font-display text-2xl text-kaleo-terracotta leading-none mt-1 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-body text-base md:text-lg text-kaleo-cream leading-snug">
                        {item.title}
                      </p>
                      <p className="font-body text-sm text-kaleo-cream/50 leading-relaxed mt-2">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Research Focus */}
        {phdPitchConfig.interests.length > 0 && (
          <div className="mt-20 md:mt-28">
            <h3 className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center justify-center gap-2 mb-10">
              <Crosshair className="w-4 h-4" />
              {phdPitchConfig.interestsLabel}
            </h3>
            <div
              ref={interestsRef}
              className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            >
              {phdPitchConfig.interests.map((interest, index) => (
                <span
                  key={index}
                  className="font-body text-sm text-kaleo-cream/80 border border-kaleo-cream/20 rounded-full px-6 py-3 hover:border-kaleo-terracotta hover:bg-kaleo-terracotta/10 transition-all"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhdPitch;
