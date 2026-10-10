import { ArrowRight, Factory } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';

const L = (en: string, bn: string, id: string) => ({ en, bn, id });

const ui = {
  label: L('Our Engineering Company', 'আমাদের প্রকৌশল প্রতিষ্ঠান', 'Perusahaan Teknik Kami'),
  title: L('Products & Fabrication — Now at NSP', 'পণ্য ও ফেব্রিকেশন — এখন NSP-তে', 'Produk & Fabrikasi — Kini di NSP'),
  body: L(
    'Capsule homes, sound pods, bus bodies and solar systems are designed, fabricated and sold by NoboShakti Prokushal (NSP) — the engineering company founded and led by Mostafa Shawkat Imran. Visit the NSP website for product details, photo galleries and to send your inquiry.',
    'ক্যাপসুল হোম, সাউন্ড পড, বাস বডি এবং সোলার সিস্টেম মোস্তাফা শওকত ইমরান প্রতিষ্ঠিত ও পরিচালিত প্রকৌশল প্রতিষ্ঠান নবশক্তি প্রকৌশল (NSP)-র মাধ্যমে ডিজাইন, নির্মাণ ও বিক্রয় করা হয়। পণ্যের বিবরণ, ছবির গ্যালারি এবং অনুসন্ধান পাঠাতে NSP-র ওয়েবসাইট দেখুন।',
    'Kapsul home, sound pod, bodi bus, dan sistem tenaga surya dirancang, diproduksi, dan dijual oleh NoboShakti Prokushal (NSP) — perusahaan teknik yang didirikan dan dipimpin oleh Mostafa Shawkat Imran. Kunjungi situs NSP untuk detail produk, galeri foto, dan mengirim pertanyaan.'
  ),
  cta: L('Visit the NSP Website', 'NSP ওয়েবসাইট দেখুন', 'Kunjungi Situs NSP'),
  note: L('noboshaktiprokushal.com', 'noboshaktiprokushal.com', 'noboshaktiprokushal.com'),
};

const ProductsRedirect = () => {
  const { lang } = useContent();
  return (
    <section className="bg-kaleo-sand py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-kaleo-cream border border-kaleo-earth/10 rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-kaleo-earth text-kaleo-cream mb-5">
            <Factory size={22} strokeWidth={1.8} />
          </span>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">{ui.label[lang]}</p>
          <h2 className="font-display text-3xl md:text-4xl text-kaleo-earth mt-3 leading-tight">{ui.title[lang]}</h2>
          <p className="font-body text-base text-kaleo-earth/70 leading-relaxed mt-4 max-w-2xl mx-auto">{ui.body[lang]}</p>
          <a
            href="https://www.noboshaktiprokushal.com/products.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 font-body text-sm uppercase tracking-[0.12em] bg-kaleo-earth text-kaleo-cream rounded-full px-8 py-4 hover:bg-kaleo-terracotta transition-colors"
          >
            {ui.cta[lang]} <ArrowRight size={16} />
          </a>
          <p className="font-body text-xs text-kaleo-earth/40 mt-4">{ui.note[lang]}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductsRedirect;
