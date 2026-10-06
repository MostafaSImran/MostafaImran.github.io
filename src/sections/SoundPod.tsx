import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, Phone, Check } from 'lucide-react';
import { type SoundPodModel } from '../config';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ModelCard = ({ model, index }: { model: SoundPodModel; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
          delay: index * 0.12,
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
      className="flex flex-col bg-kaleo-cream border border-kaleo-earth/10 rounded-3xl overflow-hidden card-hover"
    >
      {/* Main Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-kaleo-charcoal/5">
        {model.images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${model.name} — view ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      {model.images.length > 1 && (
        <div className="flex gap-2 px-6 pt-4">
          {model.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                i === active
                  ? 'border-kaleo-terracotta'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Show image ${i + 1} of ${model.name}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-kaleo-terracotta">
          {model.tagline}
        </span>
        <h3 className="font-display text-2xl text-kaleo-earth leading-snug mt-2">
          {model.name}
        </h3>
        <p className="font-body text-sm text-kaleo-earth/60 leading-relaxed mt-3">
          {model.description}
        </p>
        <ul className="mt-5 space-y-2.5 flex-1">
          {model.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-3.5 h-3.5 text-kaleo-terracotta mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-kaleo-earth/70 leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SoundPod = () => {
  const { content: { soundpod: soundpodConfig } } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const video = videoRef.current;
    if (!header) return;

    gsap.set(header.children, { opacity: 0, y: 30 });
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
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
      })
    );

    if (video) {
      gsap.set(video, { clipPath: 'inset(6% 6% 6% 6% round 24px)' });
      triggers.push(
        ScrollTrigger.create({
          trigger: video,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(video, {
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
              duration: 1.1,
              ease: 'power3.inOut',
            });
          },
        })
      );
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  if (!soundpodConfig.sectionTitle && soundpodConfig.models.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-sand"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta flex items-center justify-center gap-2">
            <Volume2 className="w-4 h-4" />
            {soundpodConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {soundpodConfig.sectionTitle}
          </h2>
          <p className="font-body text-sm md:text-base text-kaleo-earth/60 max-w-2xl mx-auto leading-relaxed mt-6">
            {soundpodConfig.sectionIntro}
          </p>
        </div>

        {/* Video */}
        <div ref={videoRef} className="relative overflow-hidden mb-16 md:mb-20">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-kaleo-charcoal">
            <video
              src={soundpodConfig.video}
              poster={soundpodConfig.videoPoster}
              controls
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-body text-xs text-kaleo-earth/40 mt-4 text-center">
            {soundpodConfig.videoTitle}
          </p>
        </div>

        {/* Models */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {soundpodConfig.models.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href={soundpodConfig.ctaHref}
            className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-cream bg-kaleo-terracotta rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            {soundpodConfig.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SoundPod;
