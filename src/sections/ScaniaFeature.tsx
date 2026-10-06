import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ScaniaFeature = () => {
  const { content: { scania: scaniaConfig } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!header || !imageContainer || !image || !text) return;

    gsap.set(header.children, { opacity: 0, y: 30 });
    gsap.set(text.children, { opacity: 0, y: 30 });

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
        trigger: text,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(text.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
      })
    );

    // Reveal the image with a clip-path wipe
    gsap.set(imageContainer, { clipPath: 'inset(8% 8% 8% 8% round 24px)' });
    triggers.push(
      ScrollTrigger.create({
        trigger: imageContainer,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(imageContainer, {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 1.2,
            ease: 'power3.inOut',
          });
        },
      })
    );

    // Internal parallax on the image
    triggers.push(
      ScrollTrigger.create({
        trigger: imageContainer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const yPercent = (self.progress - 0.5) * 14;
          gsap.set(image, { yPercent });
        },
      })
    );

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (!scaniaConfig.sectionTitle && !scaniaConfig.lead) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-cream"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {scaniaConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {scaniaConfig.sectionTitle}
          </h2>
        </div>

        {/* Feature Image */}
        <div ref={imageContainerRef} className="relative overflow-hidden">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-3xl">
            <img
              ref={imageRef}
              src={scaniaConfig.image}
              alt={scaniaConfig.imageAlt}
              className="w-full h-[115%] object-cover"
              style={{
                willChange: 'transform',
                transform: 'scale(1.05)',
              }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-14 md:mt-20">
          <div ref={textRef} className="lg:col-span-5">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
              {scaniaConfig.subtitle}
            </span>
            <p className="font-display text-2xl md:text-3xl text-kaleo-earth leading-snug mt-4">
              {scaniaConfig.lead}
            </p>
            <p className="font-body text-sm md:text-base text-kaleo-earth/60 leading-relaxed mt-6">
              {scaniaConfig.description}
            </p>
            <div className="w-16 h-px bg-kaleo-terracotta/30 mt-8" />
          </div>

          {/* Highlights */}
          {scaniaConfig.highlights.length > 0 && (
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {scaniaConfig.highlights.map((item, index) => (
                  <li
                    key={index}
                    className="border-t-2 border-kaleo-terracotta/30 pt-6"
                  >
                    <Sparkles className="w-4 h-4 text-kaleo-terracotta mb-4" />
                    <p className="font-display text-xl text-kaleo-earth leading-snug">
                      {item.title}
                    </p>
                    <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-3">
                      {item.detail}
                    </p>
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

export default ScaniaFeature;
