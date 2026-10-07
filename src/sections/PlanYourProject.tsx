import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Home, Bus, MessageCircle, ArrowRight } from 'lucide-react';
import { useContent } from '../i18n/LanguageContext';
import { openInquiry } from '../i18n/inquiry';
import type { Language } from '../i18n/types';

gsap.registerPlugin(ScrollTrigger);

const L = (en: string, bn: string, id: string): Record<Language, string> => ({ en, bn, id });

const ui = {
  label: L('For Prospective Clients', 'সম্মানিত গ্রাহকদের জন্য', 'Untuk Calon Klien'),
  title: L('Plan Your Project', 'আপনার প্রকল্প পরিকল্পনা করুন', 'Rencanakan Proyek Anda'),
  intro: L(
    'A little preparation makes your inquiry faster to quote. Here is what to have ready for each product — then send it in one structured form.',
    'সামান্য প্রস্তুতি আপনার অনুসন্ধানের উত্তর দ্রুত পেতে সাহায্য করে। প্রতিটি পণ্যের জন্য কী প্রস্তুত রাখবেন তা নিচে দেওয়া হলো — তারপর একটি সুগঠিত ফরমে পাঠিয়ে দিন।',
    'Sedikit persiapan membuat penawaran lebih cepat. Berikut yang perlu disiapkan untuk setiap produk — lalu kirim melalui satu formulir terstruktur.'
  ),
  cta: L('Send Inquiry', 'অনুসন্ধান পাঠান', 'Kirim Permintaan'),
};

interface GuideCard {
  icon: typeof MapPin;
  segment: string;
  title: Record<Language, string>;
  points: Record<Language, string>[];
}

const cards: GuideCard[] = [
  {
    icon: Home,
    segment: 'econest',
    title: L('EcoNest 3010 — Site Requirements', 'EcoNest 3010 — সাইটের প্রয়োজনীয়তা', 'EcoNest 3010 — Persyaratan Lahan'),
    points: [
      L('Site location — address or GPS coordinates', 'সাইটের অবস্থান — ঠিকানা বা GPS স্থানাঙ্ক', 'Lokasi lahan — alamat atau koordinat GPS'),
      L('Land type — urban, rural, resort or industrial zone', 'জমির ধরন — শহর, গ্রাম, রিসোর্ট বা শিল্প এলাকা', 'Jenis lahan — perkotaan, pedesaan, resor atau zona industri'),
      L('Utility access — power, water and road connectivity', 'উপযোগিতা সংযোগ — বিদ্যুৎ, পানি ও সড়ক যোগাযোগ', 'Akses utilitas — listrik, air dan jalan'),
      L('Environment — soil condition, flood level, green certifications', 'পরিবেশ — মাটির অবস্থা, বন্যার মাত্রা, সবুজ সনদপত্র', 'Lingkungan — kondisi tanah, risiko banjir, sertifikasi hijau'),
    ],
  },
  {
    icon: MapPin,
    segment: 'soundpod',
    title: L('Sound Pod — Installation Environments', 'সাউন্ড পড — ইনস্টলেশন পরিবেশ', 'Sound Pod — Lingkungan Pemasangan'),
    points: [
      L('Where it works — home, office, plant, powerplant, substation, food processing', 'কোথায় ব্যবহারযোগ্য — বাসা, অফিস, কারখানা, বিদ্যুৎকেন্দ্র, সাবস্টেশন, খাদ্য প্রক্রিয়াকরণ', 'Penggunaan — rumah, kantor, pabrik, pembangkit, gardu, pengolahan pangan'),
      L('Current noise level in dB (if measured)', 'বর্তমান শব্দমাত্রা dB-তে (পরিমাপ থাকলে)', 'Tingkat kebisingan saat ini dalam dB (jika ada)'),
      L('Room dimensions and ventilation provision', 'কক্ষের মাপ ও বাতাস চলাচলের ব্যবস্থা', 'Dimensi ruang dan ventilasi'),
      L('Target noise reduction and budget range', 'লক্ষ্য শব্দ হ্রাস ও বাজেটের পরিসর', 'Target peredaman dan kisaran anggaran'),
    ],
  },
  {
    icon: Bus,
    segment: 'bus-body',
    title: L('Bus Body — Design & Development', 'বাস বডি — ডিজাইন ও উন্নয়ন', 'Bodi Bus — Desain & Pengembangan'),
    points: [
      L('Intended use — public transport, school, luxury coach, staff', 'কী উদ্দেশ্যে — গণপরিবহন, স্কুল, লাক্সারি কোচ, কর্মচারী', 'Tujuan — transportasi umum, sekolah, pariwisata mewah, karyawan'),
      L('Passenger capacity and preferred material', 'যাত্রী ধারণক্ষমতা ও পছন্দের উপাদান', 'Kapasitas penumpang dan material pilihan'),
      L('Structural standards and safety features', 'কাঠামোগত মান ও নিরাপত্তা বৈশিষ্ট্য', 'Standar struktural dan fitur keselamatan'),
      L('Compliance needs of your transport authority', 'আপনার পরিবহন কর্তৃপক্ষের সম্মতি প্রয়োজনীয়তা', 'Persyaratan kepatuhan otoritas transportasi Anda'),
    ],
  },
];

const PlanYourProject = () => {
  const { lang } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    gsap.set(grid.children, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(grid.children, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-28 bg-kaleo-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14 md:mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            {ui.label[lang]}
          </span>
          <h2 className="font-display text-headline text-kaleo-earth mt-4">{ui.title[lang]}</h2>
          <p className="font-body text-sm md:text-base text-kaleo-earth/60 max-w-2xl mx-auto leading-relaxed mt-6">
            {ui.intro[lang]}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map(({ icon: Icon, segment, title, points }) => (
            <div
              key={segment}
              className="flex flex-col bg-kaleo-sand border border-kaleo-earth/10 rounded-3xl p-8 card-hover"
            >
              <span className="w-11 h-11 rounded-full bg-kaleo-terracotta/10 text-kaleo-terracotta flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-display text-xl md:text-2xl text-kaleo-earth leading-snug mt-5">
                {title[lang]}
              </h3>
              <ul className="mt-5 space-y-3 flex-1">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-kaleo-terracotta mt-2.5 flex-shrink-0" />
                    <span className="font-body text-sm text-kaleo-earth/70 leading-relaxed">{p[lang]}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openInquiry(segment)}
                className="mt-7 inline-flex items-center justify-center gap-2 font-body text-sm uppercase tracking-wider text-kaleo-cream bg-kaleo-terracotta rounded-full px-6 py-3 hover:bg-kaleo-earth transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                {ui.cta[lang]}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanYourProject;
