import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import { languageMeta, type Language } from '../i18n/types';

const NAVBAR_OFFSET = -72;

const Navbar = () => {
  const { content: { nav: navConfig }, lang, setLang } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.65);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(target);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: NAVBAR_OFFSET, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkColor = scrolled ? 'text-kaleo-earth/70 hover:text-kaleo-earth' : 'text-kaleo-cream/80 hover:text-kaleo-cream';

  const languages = Object.entries(languageMeta) as [Language, (typeof languageMeta)[Language]][];

  const LanguageSwitcher = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-1 rounded-full border px-1 py-1 ${className}`}>
      {languages.map(([code, meta]) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={meta.label}
          className={`font-body text-[11px] uppercase tracking-[0.1em] rounded-full px-2.5 py-1 transition-colors duration-300 ${
            lang === code
              ? 'bg-kaleo-terracotta text-kaleo-cream'
              : scrolled
                ? 'text-kaleo-earth/50 hover:text-kaleo-earth'
                : 'text-kaleo-cream/50 hover:text-kaleo-cream'
          }`}
        >
          {meta.short}
        </button>
      ))}
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-kaleo-sand/90 backdrop-blur-md border-b border-kaleo-earth/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`font-display text-lg md:text-xl tracking-wide transition-colors duration-500 ${
            scrolled ? 'text-kaleo-earth' : 'text-kaleo-cream'
          }`}
        >
          Mostafa Shawkat Imran
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navConfig.items.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => handleClick(e, item.target)}
                className={`font-body text-xs uppercase tracking-[0.15em] transition-colors duration-500 ${linkColor}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className={`hidden md:block ${scrolled ? 'border-kaleo-earth/20' : 'border-kaleo-cream/20'}`}>
            <LanguageSwitcher className={scrolled ? 'border-kaleo-earth/20' : 'border-kaleo-cream/20'} />
          </div>
          <button
            className={`md:hidden transition-colors duration-500 ${scrolled ? 'text-kaleo-earth' : 'text-kaleo-cream'}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } ${scrolled ? 'bg-kaleo-sand/95' : 'bg-kaleo-charcoal/80'} backdrop-blur-md`}
      >
        <ul className="px-6 py-4 space-y-1">
          {navConfig.items.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => handleClick(e, item.target)}
                className={`block font-body text-sm uppercase tracking-[0.15em] py-2.5 transition-colors ${
                  scrolled ? 'text-kaleo-earth/70 hover:text-kaleo-earth' : 'text-kaleo-cream/80 hover:text-kaleo-cream'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <LanguageSwitcher className={scrolled ? 'border-kaleo-earth/20' : 'border-kaleo-cream/20'} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
