import { useEffect, useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import type { Language } from '../i18n/types';

const PHONE_DISPLAY = '+880 1714 073604';
const PHONE_TEL = 'tel:+8801714073604';
const WHATSAPP = 'https://wa.me/8801714073604';
const EMAIL = 'mailto:mostafa@noboshaktiprokushal.com';

const labels: Record<Language, { call: string; whatsapp: string; email: string }> = {
  en: { call: 'Call Now', whatsapp: 'WhatsApp', email: 'Email' },
  bn: { call: 'কল করুন', whatsapp: 'হোয়াটসঅ্যাপ', email: 'ইমেইল' },
  id: { call: 'Telepon', whatsapp: 'WhatsApp', email: 'Email' },
};

const FloatingActions = () => {
  const { lang } = useContent();
  const [hidden, setHidden] = useState(false);
  const t = labels[lang];

  // Hide the bar while the contact/footer area is on screen — the footer
  // already displays the same phone, email and addresses in full.
  useEffect(() => {
    const footer = document.getElementById('contact');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const buttons = [
    { key: 'call', href: PHONE_TEL, icon: Phone, label: t.call, aria: `Call ${PHONE_DISPLAY}` },
    { key: 'whatsapp', href: WHATSAPP, icon: MessageCircle, label: t.whatsapp, aria: 'Chat on WhatsApp' },
    { key: 'email', href: EMAIL, icon: Mail, label: t.email, aria: 'Send an email' },
  ];

  return (
    <>
      {/* Mobile: sticky bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
          hidden ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="grid grid-cols-3 bg-kaleo-charcoal/95 backdrop-blur border-t border-kaleo-cream/10">
          {buttons.map(({ key, href, icon: Icon, label }) => (
            <a
              key={key}
              href={href}
              target={key === 'whatsapp' ? '_blank' : undefined}
              rel={key === 'whatsapp' ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center gap-1 py-3 text-kaleo-cream/90 hover:text-kaleo-terracotta transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="font-body text-xs uppercase tracking-wider">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Desktop: fixed right rail — absolutely-positioned labels keep the
          icons in one straight column regardless of label length */}
      <div
        className={`hidden md:flex fixed right-6 bottom-8 z-50 flex-col items-end gap-3 transition-all duration-300 ${
          hidden ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100'
        }`}
      >
        {buttons.map(({ key, href, icon: Icon, label, aria }) => (
          <a
            key={key}
            href={href}
            aria-label={aria}
            target={key === 'whatsapp' ? '_blank' : undefined}
            rel={key === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className="group relative flex items-center"
          >
            <span className="absolute right-full mr-3 font-body text-xs text-kaleo-cream bg-kaleo-charcoal/90 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </span>
            <span className="w-12 h-12 rounded-full bg-kaleo-terracotta text-kaleo-cream flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5" />
            </span>
          </a>
        ))}
      </div>
    </>
  );
};

export default FloatingActions;
