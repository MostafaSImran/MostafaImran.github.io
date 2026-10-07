import { MessageCircle } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import { openInquiry } from '../i18n/inquiry';
import type { Language } from '../i18n/types';

const label: Record<Language, string> = {
  en: 'Send Inquiry',
  bn: 'অনুসন্ধান পাঠান',
  id: 'Kirim Permintaan',
};

/** Opens the structured inquiry modal for the given segment. */
const SendInquiryButton = ({
  segment,
  variant = 'solid',
  className = '',
}: {
  segment: string;
  variant?: 'solid' | 'outline';
  className?: string;
}) => {
  const { lang } = useContent();
  const base =
    'inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider rounded-full px-8 py-4 transition-all';
  const style =
    variant === 'solid'
      ? 'text-kaleo-cream bg-kaleo-terracotta hover:bg-kaleo-earth'
      : 'text-kaleo-earth border border-kaleo-earth/25 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta';
  return (
    <button onClick={() => openInquiry(segment)} className={`${base} ${style} ${className}`}>
      <MessageCircle className="w-4 h-4" />
      {label[lang]}
    </button>
  );
};

export default SendInquiryButton;
