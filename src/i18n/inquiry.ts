// Structured inquiry form definitions — one per service/product segment.
// Submissions are sent to the owner's inbox via FormSubmit (free, no account)
// with an automatic "thank you" reply to the visitor (FormSubmit _autoresponse).
// A WhatsApp hand-off remains available as an alternative channel.
import type { Language } from './types';

export const WHATSAPP_NUMBER = '8801714073604';
export const CONTACT_EMAIL = 'info@mostafasimran.com';
export const FORM_ENDPOINT = `https://formsubmit.co/${CONTACT_EMAIL}`;

export type InquiryFieldType = 'text' | 'number' | 'date' | 'textarea' | 'select';

export interface InquiryOption {
  /** value is language-independent; label is per-language */
  value: string;
  label: Record<Language, string>;
}

export interface InquiryField {
  key: string;
  type: InquiryFieldType;
  label: Record<Language, string>;
  options?: InquiryOption[];
  required?: boolean;
}

export interface InquirySegment {
  title: Record<Language, string>;
  fields: InquiryField[];
}

const L = (en: string, bn: string, id: string): Record<Language, string> => ({ en, bn, id });

export const inquiryUi = {
  title: L('Project Inquiry', 'প্রকল্প অনুসন্ধান', 'Permintaan Proyek'),
  intro: L(
    'Fill in what you know — the more detail, the faster our quote. Sending delivers the inquiry to our inbox and emails you an instant confirmation.',
    'যা জানেন তা লিখুন — যত বিস্তারিত, তত দ্রুত আমাদের প্রস্তাব। পাঠালে অনুসন্ধানটি আমাদের ইনবক্সে যাবে এবং আপনাকে তাৎক্ষণিক নিশ্চিতকরণ ইমেইল পৌঁছাবে।',
    'Isi sesuai yang Anda ketahui — semakin detail, semakin cepat penawaran kami. Mengirim akan menyampaikan permintaan ke kotak masuk kami dan mengirimi Anda email konfirmasi seketika.'
  ),
  name: L('Your Name', 'আপনার নাম', 'Nama Anda'),
  email: L('Email', 'ইমেইল', 'Email'),
  company: L('Company / Organization', 'প্রতিষ্ঠানের নাম', 'Perusahaan / Organisasi'),
  phone: L('Phone', 'ফোন', 'Telepon'),
  submit: L('Send Inquiry', 'অনুসন্ধান পাঠান', 'Kirim Permintaan'),
  submitEmail: L('Send via WhatsApp', 'হোয়াটসঅ্যাপে পাঠান', 'Kirim via WhatsApp'),
  emailChoice: L('Prefer WhatsApp? Send the same details through WhatsApp instead.', 'হোয়াটসঅ্যাপ পছন্দ? একই তথ্য হোয়াটসঅ্যাপেও পাঠাতে পারেন।', 'Lebih suka WhatsApp? Kirim detail yang sama melalui WhatsApp.'),
  cancel: L('Cancel', 'বাতিল', 'Batal'),
  requiredHint: L('Fields marked * are required.', '* চিহ্নিত ঘরগুলো আবশ্যক।', 'Kolom bertanda * wajib diisi.'),
  messageIntro: L('New website inquiry', 'ওয়েবসাইট থেকে নতুন অনুসন্ধান', 'Permintaan baru dari situs web'),
  /** Automatic reply sent to the visitor by the form backend (FormSubmit _autoresponse). */
  autoresponse: L(
    'Thank you for contacting Mostafa Shawkat Imran — Nobo Shakti Prokushal (NSP), Dhaka & PT Sun Moon Ecosystem, Jakarta. Your inquiry has been received, and we will get back to you within 1–2 business days.',
    'মোস্তফা শওকত ইমরানের সাথে যোগাযোগ করার জন্য ধন্যবাদ — নব শক্তি প্রকৌশল (NSP), ঢাকা ও পিটি সান মুন ইকোসিস্টেম, জাকার্তা। আপনার অনুসন্ধান পেয়েছি; আমরা ১–২ কর্মদিবসের মধ্যে উত্তর দেব।',
    'Terima kasih telah menghubungi Mostafa Shawkat Imran — Nobo Shakti Prokushal (NSP), Dhaka & PT Sun Moon Ecosystem, Jakarta. Permintaan Anda telah kami terima dan akan kami balas dalam 1–2 hari kerja.'
  ),
  /** Toast shown when the visitor returns from the form backend after sending. */
  sentToast: L(
    'Thank you! Your inquiry has been sent — a confirmation email is on its way to you.',
    'ধন্যবাদ! আপনার অনুসন্ধান পাঠানো হয়েছে — নিশ্চিতকরণ ইমেইল আপনার কাছে পৌঁছে যাচ্ছে।',
    'Terima kasih! Permintaan Anda telah terkirim — email konfirmasi sedang menuju kotak masuk Anda.'
  ),
};

const segments: Record<string, InquirySegment> = {
  econest: {
    title: L('EcoNest 3010 — Site & Home Requirements', 'EcoNest 3010 — সাইট ও বাসস্থানের প্রয়োজনীয়তা', 'EcoNest 3010 — Persyaratan Lokasi & Hunian'),
    fields: [
      { key: 'site_location', type: 'text', label: L('Site address / location', 'সাইটের ঠিকানা / অবস্থান', 'Alamat / lokasi lahan'), required: true },
      {
        key: 'home_type', type: 'select', label: L('Type of home required', 'কী ধরনের বাসস্থান প্রয়োজন', 'Jenis hunian yang dibutuhkan'),
        options: [
          { value: 'single-family', label: L('Single-family', 'একক পরিবার', 'Keluarga tunggal') },
          { value: 'duplex', label: L('Duplex', 'ডুপ্লেক্স', 'Dupleks') },
          { value: 'resort-unit', label: L('Resort unit(s)', 'রিসোর্ট ইউনিট', 'Unit resor') },
        ],
      },
      { key: 'floor_area', type: 'number', label: L('Expected floor area (sq ft)', 'প্রত্যাশিত আয়তন (বর্গফুট)', 'Perkiraan luas (sq ft)') },
      { key: 'certifications', type: 'text', label: L('Green certifications desired (e.g. LEED)', 'প্রত্যাশিত সবুজ সনদপত্র (যেমন LEED)', 'Sertifikasi hijau yang diinginkan (mis. LEED)') },
    ],
  },

  soundpod: {
    title: L('Sound Pod — Installation Environment', 'সাউন্ড পড — ইনস্টলেশন পরিবেশ', 'Sound Pod — Lingkungan Pemasangan'),
    fields: [
      {
        key: 'site_type', type: 'select', label: L('Installation site type', 'ইনস্টলেশন সাইটের ধরন', 'Jenis lokasi pemasangan'), required: true,
        options: [
          { value: 'home', label: L('Home', 'বাসা', 'Rumah') },
          { value: 'office', label: L('Office', 'অফিস', 'Kantor') },
          { value: 'industry', label: L('Industry / plant', 'শিল্প কারখানা', 'Industri / pabrik') },
          { value: 'powerplant', label: L('Powerplant / Substation', 'বিদ্যুৎকেন্দ্র / সাবস্টেশন', 'Pembangkit / Gardu') },
          { value: 'food-processing', label: L('Food processing plant', 'খাদ্য প্রক্রিয়াকরণ কারখানা', 'Pabrik pengolahan pangan') },
        ],
      },
      { key: 'noise_level', type: 'number', label: L('Current noise level (dB, if known)', 'বর্তমান শব্দমাত্রা (dB, জানা থাকলে)', 'Tingkat kebisingan saat ini (dB, jika diketahui)') },
      { key: 'performance', type: 'number', label: L('Required noise reduction (dB)', 'প্রয়োজনীয় শব্দ হ্রাস (dB)', 'Target peredaman kebisingan (dB)') },
      { key: 'dimensions', type: 'text', label: L('Space dimensions (L×W×H)', 'স্থানের মাপ (দৈ×প্র×উ)', 'Dimensi ruang (P×L×T)') },
      { key: 'budget', type: 'text', label: L('Budget range', 'বাজেটের পরিসর', 'Kisaran anggaran') },
    ],
  },

  'bus-body': {
    title: L('Bus Body Structure — Design & Development', 'বাস বডি কাঠামো — ডিজাইন ও উন্নয়ন', 'Bodi Bus — Desain & Pengembangan'),
    fields: [
      {
        key: 'use_type', type: 'select', label: L('Intended use', 'কী উদ্দেশ্যে', 'Tujuan penggunaan'), required: true,
        options: [
          { value: 'public-transport', label: L('Public transport', 'গণপরিবহন', 'Transportasi umum') },
          { value: 'school', label: L('School bus', 'স্কুল বাস', 'Bus sekolah') },
          { value: 'luxury-coach', label: L('Luxury coach', 'লাক্সারি কোচ', 'Bus pariwisata mewah') },
          { value: 'staff', label: L('Staff / industrial transport', 'কর্মচারী / শিল্প পরিবহন', 'Transportasi karyawan / industri') },
        ],
      },
      { key: 'capacity', type: 'number', label: L('Passenger capacity', 'যাত্রী ধারণক্ষমতা', 'Kapasitas penumpang') },
      { key: 'material', type: 'text', label: L('Preferred material (steel / aluminium / composite)', 'পছন্দের উপাদান (স্টিল / অ্যালুমিনিয়াম / কম্পোজিট)', 'Material pilihan (baja / aluminium / komposit)') },
      { key: 'compliance', type: 'text', label: L('Compliance requirements (transport authority)', 'সম্মতি প্রয়োজনীয়তা (পরিবহন কর্তৃপক্ষ)', 'Persyaratan kepatuhan (otoritas transportasi)') },
    ],
  },

  'healthcare-validation': {
    title: L('Healthcare MEP Validation', 'স্বাস্থ্যসেবা MEP যাচাইকরণ', 'Validasi MEP Layanan Kesehatan'),
    fields: [
      { key: 'hospital_name', type: 'text', label: L('Hospital / facility name', 'হাসপাতাল / প্রতিষ্ঠানের নাম', 'Nama rumah sakit / fasilitas'), required: true },
      { key: 'ot_icu_details', type: 'textarea', label: L('OT / ICU details (rooms, area)', 'OT / ICU বিবরণ (কক্ষ, আয়তন)', 'Detail OT / ICU (ruangan, luas)') },
      { key: 'gas_system', type: 'text', label: L('Medical gas system type (O₂ / N₂O / air / vacuum)', 'মেডিকেল গ্যাস সিস্টেমের ধরন', 'Jenis sistem gas medis') },
      { key: 'licensing_stage', type: 'text', label: L('DGHS licensing stage', 'DGHS লাইসেন্সিং পর্যায়', 'Tahap perizinan DGHS') },
      { key: 'audit_requirements', type: 'textarea', label: L('Audit / validation requirements', 'অডিট / যাচাইকরণের প্রয়োজনীয়তা', 'Kebutuhan audit / validasi') },
    ],
  },

  'industrial-amc': {
    title: L('Industrial MEP AMC & Energy Audit', 'শিল্প MEP AMC ও শক্তি অডিট', 'AMC MEP Industri & Audit Energi'),
    fields: [
      { key: 'plant_type', type: 'text', label: L('Plant type (textile / manufacturing / other)', 'কারখানার ধরন (টেক্সটাইল / উৎপাদন / অন্যান্য)', 'Jenis pabrik (tekstil / manufaktur / lainnya)'), required: true },
      { key: 'equipment_list', type: 'textarea', label: L('Equipment list (boiler / chiller / compressor / generator / fire pump)', 'যন্ত্রপাতির তালিকা', 'Daftar peralatan') },
      { key: 'audit_scope', type: 'text', label: L('Audit scope', 'অডিটের পরিধি', 'Cakupan audit') },
      { key: 'energy_goals', type: 'text', label: L('Energy-saving goals (Higg FEM / LEED / other)', 'শক্তি সাশ্রয়ের লক্ষ্য', 'Target penghematan energi') },
    ],
  },

  'telecom-maintenance': {
    title: L('Telecom Infrastructure Maintenance', 'টেলিকম অবকাঠামো রক্ষণাবেক্ষণ', 'Pemeliharaan Infrastruktur Telekomunikasi'),
    fields: [
      { key: 'shelter_location', type: 'text', label: L('Shelter / site location', 'শেল্টার / সাইটের অবস্থান', 'Lokasi shelter / site'), required: true },
      { key: 'hvac_type', type: 'text', label: L('HVAC system type', 'HVAC সিস্টেমের ধরন', 'Jenis sistem HVAC') },
      { key: 'dc_power', type: 'text', label: L('DC power setup (rectifier / battery bank)', 'DC পাওয়ার সেটআপ', 'Konfigurasi daya DC') },
      { key: 'generator', type: 'text', label: L('Generator details', 'জেনারেটরের বিবরণ', 'Detail genset') },
      { key: 'maintenance_frequency', type: 'text', label: L('Maintenance frequency desired', 'প্রত্যাশিত রক্ষণাবেক্ষণের ধরন', 'Frekuensi pemeliharaan yang diinginkan') },
    ],
  },

  'pressure-vessel': {
    title: L('Pressure Vessel & Boiler Code Consulting', 'প্রেশার ভেসেল ও বয়লার কোড পরামর্শ', 'Konsultasi Pressure Vessel & Kode Boiler'),
    fields: [
      { key: 'plant_location', type: 'text', label: L('Plant location', 'কারখানার অবস্থান', 'Lokasi pabrik'), required: true },
      { key: 'equipment_type', type: 'text', label: L('Equipment type', 'যন্ত্রপাতির ধরন', 'Jenis peralatan') },
      { key: 'certification', type: 'text', label: L('Certification needs', 'সনদপত্রের প্রয়োজনীয়তা', 'Kebutuhan sertifikasi') },
      { key: 'authority', type: 'text', label: L('Regulatory authority', 'নিয়ন্ত্রক কর্তৃপক্ষ', 'Otoritas regulasi') },
      { key: 'timeline', type: 'date', label: L('Project timeline', 'প্রকল্পের সময়সীমা', 'Jadwal proyek') },
    ],
  },

  'fire-protection': {
    title: L('Fire Protection & Life Safety Design', 'ফায়ার প্রোটেকশন ও লাইফ সেফটি ডিজাইন', 'Desain Proteksi Kebakaran & Keselamatan Jiwa'),
    fields: [
      { key: 'facility_type', type: 'text', label: L('Facility type', 'প্রতিষ্ঠানের ধরন', 'Jenis fasilitas'), required: true },
      {
        key: 'system_type', type: 'select', label: L('Fire system required', 'প্রয়োজনীয় ফায়ার সিস্টেম', 'Sistem kebakaran yang dibutuhkan'),
        options: [
          { value: 'hydrant', label: L('Hydrant', 'হাইড্রেন্ট', 'Hidran') },
          { value: 'sprinkler', label: L('Sprinkler', 'স্প্রিংকলার', 'Sprinkler') },
          { value: 'detection', label: L('Detection & alarm', 'ডিটেকশন ও অ্যালার্ম', 'Deteksi & alarm') },
          { value: 'full', label: L('Full life safety strategy', 'সম্পূর্ণ লাইফ সেফটি কৌশল', 'Strategi keselamatan jiwa penuh') },
        ],
      },
      { key: 'audit_scope', type: 'text', label: L('Audit scope', 'অডিটের পরিধি', 'Cakupan audit') },
      { key: 'hospital_integration', type: 'text', label: L('Hospital integration needs (nurse call etc.)', 'হাসপাতাল ইন্টিগ্রেশন প্রয়োজন', 'Kebutuhan integrasi rumah sakit') },
    ],
  },

  'green-energy': {
    title: L('Renewable Energy & Green Building Consulting', 'নবায়নযোগ্য জ্বালানি ও সবুজ ভবন পরামর্শ', 'Konsultasi Energi Terbarukan & Bangunan Hijau'),
    fields: [
      {
        key: 'project_type', type: 'select', label: L('Project type', 'প্রকল্পের ধরন', 'Jenis proyek'), required: true,
        options: [
          { value: 'biogas', label: L('Biogas', 'বায়োগ্যাস', 'Biogas') },
          { value: 'bi-fuel', label: L('Bi-fuel hybrid', 'বাই-ফুয়েল হাইব্রিড', 'Hibrida bi-fuel') },
          { value: 'waste-to-energy', label: L('Waste-to-energy', 'বর্জ্য-থেকে-শক্তি', 'Energi dari limbah') },
          { value: 'green-building', label: L('Green building / LEED', 'সবুজ ভবন / LEED', 'Bangunan hijau / LEED') },
        ],
      },
      { key: 'site_feasibility', type: 'textarea', label: L('Site feasibility details (feedstock, area, access)', 'সাইটের সম্ভাব্যতার বিবরণ', 'Detail kelayakan lokasi') },
      { key: 'leed_docs', type: 'text', label: L('LEED documentation needs', 'LEED ডকুমেন্টেশন প্রয়োজন', 'Kebutuhan dokumentasi LEED') },
      { key: 'energy_targets', type: 'text', label: L('Energy targets', 'শক্তির লক্ষ্যমাত্রা', 'Target energi') },
    ],
  },
};

export default segments;

/** Dispatch a global event any component can listen to, to open the inquiry modal. */
export const openInquiry = (segmentId: string) => {
  window.dispatchEvent(new CustomEvent('open-inquiry', { detail: segmentId }));
};
