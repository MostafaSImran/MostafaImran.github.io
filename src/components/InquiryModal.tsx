import { useEffect, useState } from 'react';
import { X, MessageCircle, Mail } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import segments, { inquiryUi, WHATSAPP_NUMBER, CONTACT_EMAIL } from '../i18n/inquiry';
import type { InquiryField, InquirySegment } from '../i18n/inquiry';

const inputClass =
  'w-full font-body text-sm text-kaleo-earth bg-kaleo-sand/60 border border-kaleo-earth/20 rounded-xl px-4 py-3 outline-none focus:border-kaleo-terracotta transition-colors';

const Field = ({
  field,
  value,
  onChange,
  label,
}: {
  field: InquiryField;
  value: string;
  onChange: (v: string) => void;
  label: string;
}) => {
  const { lang } = useContent();
  const requiredMark = field.required ? ' *' : '';

  if (field.type === 'textarea') {
    return (
      <label className="block">
        <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">
          {label}
          {requiredMark}
        </span>
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} mt-1.5 resize-y`}
        />
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="block">
        <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">
          {label}
          {requiredMark}
        </span>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} mt-1.5`}>
          <option value="">—</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.label[lang]}>
              {opt.label[lang]}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">
        {label}
        {requiredMark}
      </span>
      <input
        type={field.type === 'number' ? 'number' : field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} mt-1.5`}
      />
    </label>
  );
};

const InquiryModal = () => {
  const { lang } = useContent();
  const [segmentId, setSegmentId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      setSegmentId((e as CustomEvent<string>).detail);
      setValues({});
      setSent(false);
    };
    window.addEventListener('open-inquiry', handler);
    return () => window.removeEventListener('open-inquiry', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = segmentId ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [segmentId]);

  if (!segmentId) return null;

  const segment: InquirySegment | undefined = segments[segmentId];
  if (!segment) return null;

  const setValue = (key: string) => (v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const missingRequired = segment.fields.some((f) => f.required && !values[f.key]?.trim());

  const composeLines = (): string[] => {
    const lines: string[] = [`*${inquiryUi.messageIntro[lang]}*`, `*${segment.title[lang]}*`, ''];
    segment.fields.forEach((f) => {
      const v = values[f.key]?.trim();
      if (v) lines.push(`${f.label[lang]}: ${v}`);
    });
    if (values.name?.trim()) lines.push(`${inquiryUi.name[lang]}: ${values.name.trim()}`);
    if (values.company?.trim()) lines.push(`${inquiryUi.company[lang]}: ${values.company.trim()}`);
    if (values.phone?.trim()) lines.push(`${inquiryUi.phone[lang]}: ${values.phone.trim()}`);
    return lines;
  };

  const submit = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(composeLines().join('\n'))}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSent(true);
  };

  const submitEmail = () => {
    const body = composeLines()
      .map((l) => l.replace(/\*/g, ''))
      .join('\n');
    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(segment.title[lang])}&body=${encodeURIComponent(body)}`,
      '_self'
    );
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-kaleo-charcoal/70 backdrop-blur-sm p-0 md:p-6"
      onClick={() => setSegmentId(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full md:max-w-lg bg-kaleo-cream rounded-t-3xl md:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl text-kaleo-earth leading-snug">{segment.title[lang]}</h3>
              <p className="font-body text-xs text-kaleo-earth/50 mt-2 leading-relaxed">{inquiryUi.intro[lang]}</p>
            </div>
            <button
              onClick={() => setSegmentId(null)}
              aria-label={inquiryUi.cancel[lang]}
              className="w-9 h-9 flex-shrink-0 rounded-full border border-kaleo-earth/15 flex items-center justify-center text-kaleo-earth/60 hover:text-kaleo-terracotta hover:border-kaleo-terracotta transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Fields */}
          <div className="mt-6 space-y-4">
            {segment.fields.map((f) => (
              <Field key={f.key} field={f} value={values[f.key] ?? ''} onChange={setValue(f.key)} label={f.label[lang]} />
            ))}
          </div>

          {/* Contact */}
          <div className="mt-6 pt-5 border-t border-kaleo-earth/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">
                {inquiryUi.name[lang]} *
              </span>
              <input
                type="text"
                value={values.name ?? ''}
                onChange={(e) => setValue('name')(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
            </label>
            <label className="block">
              <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">{inquiryUi.company[lang]}</span>
              <input
                type="text"
                value={values.company ?? ''}
                onChange={(e) => setValue('company')(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
            </label>
            <label className="block">
              <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">{inquiryUi.phone[lang]}</span>
              <input
                type="text"
                value={values.phone ?? ''}
                onChange={(e) => setValue('phone')(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={submit}
              disabled={missingRequired || !values.name?.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-cream bg-kaleo-terracotta rounded-full px-8 py-3.5 hover:bg-kaleo-earth transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4" />
              {inquiryUi.submit[lang]}
            </button>
            <button
              onClick={submitEmail}
              disabled={missingRequired || !values.name?.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-earth border border-kaleo-earth/25 rounded-full px-8 py-3.5 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Mail className="w-4 h-4" />
              {inquiryUi.submitEmail[lang]}
            </button>
            <p className="font-body text-[11px] text-kaleo-earth/40">{inquiryUi.requiredHint[lang]}</p>
          </div>

          <p className="mt-4 font-body text-[11px] text-kaleo-earth/45">{inquiryUi.emailChoice[lang]}</p>

          {sent && (
            <p className="mt-4 font-body text-xs text-kaleo-terracotta">
              ✓ WhatsApp opened with your inquiry — press send there to deliver it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
