import { useEffect, useRef, useState } from 'react';
import { X, MessageCircle, Mail } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import segments, { inquiryUi, WHATSAPP_NUMBER, FORM_ENDPOINT } from '../i18n/inquiry';
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
  const formRef = useRef<HTMLFormElement>(null);

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

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email?.trim() ?? '');

  const missingRequired = segment.fields.some((f) => f.required && !values[f.key]?.trim());

  const composeLines = (): string[] => {
    const lines: string[] = [`*${inquiryUi.messageIntro[lang]}*`, `*${segment.title[lang]}*`, ''];
    segment.fields.forEach((f) => {
      const v = values[f.key]?.trim();
      if (v) lines.push(`${f.label[lang]}: ${v}`);
    });
    if (values.name?.trim()) lines.push(`${inquiryUi.name[lang]}: ${values.name.trim()}`);
    if (values.email?.trim()) lines.push(`${inquiryUi.email[lang]}: ${values.email.trim()}`);
    if (values.company?.trim()) lines.push(`${inquiryUi.company[lang]}: ${values.company.trim()}`);
    if (values.phone?.trim()) lines.push(`${inquiryUi.phone[lang]}: ${values.phone.trim()}`);
    return lines;
  };

  // WhatsApp hand-off (secondary channel — opens WhatsApp with prefilled details)
  const submitWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(composeLines().join('\n'))}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSent(true);
  };

  // Primary channel: real form POST to FormSubmit (free backend). A native
  // (non-AJAX) POST is required for FormSubmit's _autoresponse auto-reply.
  const submitEmail = () => {
    setSent(true);
    // Wait a frame so the hidden inputs render with the latest values
    // before the native form submit navigates away.
    requestAnimationFrame(() => {
      formRef.current?.submit();
    });
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
          <div className="mt-6 pt-5 border-t border-kaleo-earth/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <span className="font-body text-xs uppercase tracking-[0.15em] text-kaleo-earth/60">
                {inquiryUi.email[lang]} *
              </span>
              <input
                type="email"
                value={values.email ?? ''}
                onChange={(e) => setValue('email')(e.target.value)}
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
              onClick={submitEmail}
              disabled={missingRequired || !values.name?.trim() || !emailValid}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-cream bg-kaleo-terracotta rounded-full px-8 py-3.5 hover:bg-kaleo-earth transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Mail className="w-4 h-4" />
              {inquiryUi.submit[lang]}
            </button>
            <button
              onClick={submitWhatsApp}
              disabled={missingRequired || !values.name?.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-earth border border-kaleo-earth/25 rounded-full px-8 py-3.5 hover:bg-kaleo-terracotta hover:text-kaleo-cream hover:border-kaleo-terracotta transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4" />
              {inquiryUi.submitEmail[lang]}
            </button>
            <p className="font-body text-[11px] text-kaleo-earth/40">{inquiryUi.requiredHint[lang]}</p>
          </div>

          <p className="mt-4 font-body text-[11px] text-kaleo-earth/45">{inquiryUi.emailChoice[lang]}</p>

          {/* Hidden native form — POSTs to FormSubmit (free backend).
              Native (non-AJAX) submit + reCAPTCHA are required for the
              _autoresponse auto-reply to the visitor. */}
          <form ref={formRef} action={FORM_ENDPOINT} method="POST" className="hidden" aria-hidden="true">
            <input type="hidden" name="_subject" value={`${segment.title.en} — mostafasimran.com inquiry`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://mostafasimran.com/?inquiry=sent" />
            <input type="hidden" name="_autoresponse" value={inquiryUi.autoresponse[lang]} />
            {segment.fields.map((f) =>
              values[f.key]?.trim() ? (
                <input key={f.key} type="hidden" name={f.key} value={values[f.key].trim()} />
              ) : null
            )}
            {values.name?.trim() && <input type="hidden" name="name" value={values.name.trim()} />}
            {values.email?.trim() && <input type="hidden" name="email" value={values.email.trim()} />}
            {values.company?.trim() && <input type="hidden" name="company" value={values.company.trim()} />}
            {values.phone?.trim() && <input type="hidden" name="phone" value={values.phone.trim()} />}
          </form>

          {sent && (
            <p className="mt-4 font-body text-xs text-kaleo-terracotta">
              ✓ {lang === 'bn'
                ? 'জমা দিচ্ছি… একটি নিরাপত্তা যাচাই (CAPTCHA) এর পর অনুসন্ধানটি ইমেইলে পৌঁছে যাবে এবং নিশ্চিতকরণ ইমেইল আপনার কাছে যাবে।'
                : lang === 'id'
                  ? 'Mengirim… setelah verifikasi keamanan (CAPTCHA), permintaan akan dikirim ke email kami dan email konfirmasi akan tiba untuk Anda.'
                  : 'Submitting… after a quick security check (CAPTCHA) your inquiry will be emailed to us and a confirmation email will be sent to you.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
