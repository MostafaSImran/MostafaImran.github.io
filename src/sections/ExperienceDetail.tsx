import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Stethoscope,
  Leaf,
  Factory,
  GraduationCap,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, LucideIcon> = {
  healthcare: Stethoscope,
  renewable: Leaf,
  industrial: Factory,
  leadership: GraduationCap,
};

const ExperienceDetail = () => {
  const {
    content: { experience: experienceConfig },
  } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(experienceConfig.categories[0]?.id ?? '');
  const panelRef = useRef<HTMLDivElement>(null);

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
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Fade the panel content in whenever the active tab changes
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.fromTo(
      panel,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeId]);

  if (
    !experienceConfig.sectionTitle &&
    experienceConfig.categories.length === 0
  ) {
    return null;
  }

  const activeCategory =
    experienceConfig.categories.find(cat => cat.id === activeId) ??
    experienceConfig.categories[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-kaleo-cream"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {experienceConfig.sectionLabel}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">
            {experienceConfig.sectionTitle}
          </h2>
          {experienceConfig.intro && (
            <p className="font-body text-sm md:text-base text-kaleo-earth/70 leading-relaxed max-w-3xl mx-auto mt-6">
              {experienceConfig.intro}
            </p>
          )}
        </div>

        {/* Tabs */}
        {experienceConfig.categories.length > 0 && (
          <>
            <div
              className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
              role="tablist"
              aria-label={experienceConfig.sectionTitle}
            >
              {experienceConfig.categories.map(cat => {
                const Icon = categoryIcons[cat.id] ?? CheckCircle2;
                const isActive = cat.id === activeCategory.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(cat.id)}
                    className={`flex items-center gap-2 font-body text-xs md:text-sm uppercase tracking-[0.12em] rounded-full px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 border ${
                      isActive
                        ? 'bg-kaleo-earth text-kaleo-cream border-kaleo-earth shadow-md'
                        : 'bg-transparent text-kaleo-earth/70 border-kaleo-earth/20 hover:border-kaleo-earth/50 hover:text-kaleo-earth'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Active Panel */}
            <div ref={panelRef} role="tabpanel" key={activeCategory.id}>
              {/* Standards chips */}
              {activeCategory.standards.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {activeCategory.standards.map(std => (
                    <span
                      key={std}
                      className="font-body text-[11px] uppercase tracking-[0.15em] text-kaleo-terracotta bg-kaleo-terracotta/10 rounded-full px-3 py-1"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              )}

              {/* Roles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
                {activeCategory.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
                    className="bg-kaleo-sand/60 rounded-3xl p-7 md:p-9 border border-kaleo-earth/10"
                  >
                    <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-terracotta">
                      {role.org} · {role.period}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl text-kaleo-earth mt-2">
                      {role.role}
                    </h3>
                    {role.project && (
                      <p className="font-body text-sm text-kaleo-earth/80 italic mt-2">
                        {role.project}
                      </p>
                    )}
                    <ul className="mt-5 space-y-3">
                      {role.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-kaleo-terracotta flex-shrink-0 mt-0.5" />
                          <span className="font-body text-sm text-kaleo-earth/75 leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ExperienceDetail;
