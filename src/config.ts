// Navigation Bar
export interface NavItem {
  label: string;
  target: string; // section id
}

export interface NavConfig {
  brand: string;
  items: NavItem[];
}

export const navConfig: NavConfig = {
  brand: "Mostafa Shawkat Imran",
  items: [
    { label: "About", target: "about" },
    { label: "Services", target: "services" },
    { label: "Projects", target: "projects" },
    { label: "Products", target: "products" },
    { label: "Research", target: "research" },
    { label: "Publications", target: "publications" },
    { label: "Insights", target: "insights" },
    { label: "Contact", target: "contact" },
  ],
};

// Site-wide configuration
export interface SiteConfig {
  language: string;
  siteName: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteName: "Mostafa Shawkat Imran — Senior Mechanical Engineer",
  siteDescription:
    "Founder & Principal Consultant of NSP — engineering audits and consultancy for hospitals, factories and infrastructure projects in Bangladesh & Indonesia. ASME-trained engineer with accredited CEUs/PDHs; boiler design, pressure vessels, hydrogen piping, medical gas systems and sustainable energy.",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  role: string;
  subline: string;
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.webp",
  backgroundAlt: "Industrial power plant with boiler vessels and steel piping at golden hour",
  title: "Mostafa Shawkat Imran",
  role: "Mechanical Engineer · CEO, Nobo Shakti Prokushal (NSP) · Managing Director, PT Sun Moon Ecosystem",
  subline:
    "Engineering audits and consultancy for hospitals, factories and infrastructure projects in Bangladesh & Indonesia.",
};

// Narrative Text Section
export interface NarrativeTextConfig {
  line1: string;
  line2: string;
  line3: string;
}

export const narrativeTextConfig: NarrativeTextConfig = {
  line1: "20+ years in mechanical engineering.",
  line2: "Founder of Nobo Shakti Prokushal (NSP).",
  line3: "Cross-border engineering consultancy in Bangladesh & Indonesia.",
};

// Card Stack Section — Fields of practice
export interface CardStackItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rotation: number;
}

export interface CardStackConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: CardStackItem[];
}

export const cardStackConfig: CardStackConfig = {
  sectionTitle: "Fields of Practice",
  sectionSubtitle: "Where engineering meets impact",
  cards: [
    {
      id: 1,
      image: "/card-boiler.webp",
      title: "Boiler Design & Pressure Vessels",
      description:
        "Key Expert for Bangladesh's national Boiler Code development with GIZ — drafting design, construction and operational standards, and integrating ASME BPVC and B31.12 hydrogen piping into the national regulatory framework.",
      rotation: -2,
    },
    {
      id: 2,
      image: "/card-medical.webp",
      title: "Medical Gas & Healthcare Infrastructure",
      description:
        "Designed NFPA-99 compliant medical gas pipeline systems with USAID — pressure vessels, vacuum tanks, fire hydrants and nurse call systems for hospitals nationwide, including healthcare infrastructure delivery for Save the Children.",
      rotation: 1.5,
    },
    {
      id: 3,
      image: "/card-energy.webp",
      title: "Sustainable Energy & Green Engineering",
      description:
        "Directed renewable energy projects including biogas–diesel hybrid systems and waste-to-energy solutions — pioneering bi-fuel engine development and LEED-aligned green building practice.",
      rotation: -1,
    },
  ],
};

// Breath Section — Research vision
export interface BreathSectionConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const breathSectionConfig: BreathSectionConfig = {
  backgroundImage: "/breath-bg.webp",
  backgroundAlt: "Hydrogen pipeline infrastructure and pressure vessels at dusk",
  title: "Consulting Across Borders",
  subtitle: "Dhaka · Jakarta · Worldwide",
  description:
    "One team, two offices — NSP in Dhaka and PT Sun Moon Ecosystem in Jakarta — serving hospitals, textile factories, telecom operators and resort developers across Bangladesh, Indonesia and beyond.",
};

// ZigZag Grid Section — Experience
export interface ZigZagGridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface ZigZagGridConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: ZigZagGridItem[];
}

export const zigZagGridConfig: ZigZagGridConfig = {
  sectionLabel: "Professional Experience",
  sectionTitle: "A Career Built on Standards & Delivery",
  items: [
    {
      id: "giz",
      title: "Boiler Code Development for Bangladesh",
      subtitle: "Key Expert 1 · GIZ Project 7000015619 · Qtex Solutions · 2026–Present",
      description:
        "Serving as Key Expert for boiler design and operation on the Bangladesh Boiler Code Development Project — drafting and reviewing national standards, preparing operational guidelines, safety protocols and maintenance schedules, and presenting technical frameworks to stakeholders at workshops with GIZ, CIOB and RSC.",
      image: "/grid-automation.webp",
      imageAlt: "Engineer reviewing instrumentation and control panels",
      reverse: false,
    },
    {
      id: "nsp",
      title: "Founder, CEO & Principal Consultant",
      subtitle: "Nobo Shakti Prokushal (NSP) · 2007–Present",
      description:
        "Founded and lead a consultancy specializing in electromechanical systems, fire protection, HVAC and medical gas solutions — from NFPA-99 compliant hospital pipelines to advanced pressure vessels, vacuum tanks and renewable energy systems.",
      image: "/grid-consultancy.webp",
      imageAlt: "Consultant presenting technical drawings to stakeholders",
      reverse: true,
    },
    {
      id: "projects",
      title: "Signature Projects",
      subtitle: "Healthcare · Transport · Energy",
      description:
        "Led healthcare infrastructure engineering for Save the Children (2022–2023); developed biogas–diesel hybrid systems for the BCSIR Bi-Fuel Conversion Project (2006–2007); and delivered medical gas, fire protection and nurse call systems for hospitals nationwide — alongside a landmark transport design: Bangladesh's first luxury bus body for Scania, showcased below.",
      image: "/card-energy.webp",
      imageAlt: "Single-dome biogas digester at an industrial poultry farm in golden light",
      reverse: false,
    },
  ],
};

// Experience Detail Section — Expanded professional experience by category
export interface ExperienceRole {
  role: string;
  org: string;
  period: string;
  project?: string;
  points: string[];
}

export interface ExperienceCategory {
  id: string;
  label: string;
  roles: ExperienceRole[];
  standards: string[];
}

export interface ExperienceDetailConfig {
  sectionLabel: string;
  sectionTitle: string;
  intro: string;
  categories: ExperienceCategory[];
}

export const experienceDetailConfig: ExperienceDetailConfig = {
  sectionLabel: "Track Record in Detail",
  sectionTitle: "Experience by Sector",
  intro:
    "Two decades of engineering practice distilled into one principle: systems that protect life must be designed to international standards, delivered with accountability, and handed over with trained people. From oxygen manifold systems across 20 upazila health complexes to national boiler code development, my work bridges code compliance and field execution — building infrastructure that hospitals, factories and communities can rely on.",
  categories: [
    {
      id: "healthcare",
      label: "Healthcare Infrastructure",
      standards: ["HTM-2022", "NFPA-99", "ISO 7396-1"],
      roles: [
        {
          role: "Consultant, Critical Care Service",
          org: "Save the Children",
          period: "July 2022 – March 2023",
          project: "Oxygen Manifold System Establishment at 20 Upazila Health Complexes",
          points: [
            "Led design and installation of Central Medical Gas Pipeline Systems ensuring compliance with HTM-2022 and NFPA-99 standards",
            "Supervised manifold room renovation, preventive maintenance and troubleshooting",
            "Developed and implemented Quality Assurance and Safety Compliance Plans",
            "Coordinated with MOHFW, DGHS, HED, PWD, NEMEMW and Save the Children for project execution",
            "Conducted on-site training for hospital staff on oxygen system operation and safety",
          ],
        },
        {
          role: "Founder & Principal Consultant",
          org: "Nobo Shakti Prokushal (NSP)",
          period: "2007 – Present",
          project: "Hospital Engineering Projects",
          points: [
            "Designed and commissioned Medical Gas Pipeline Systems and Fire Protection Systems for Shaheed Monsur Ali Medical College, CD Path, Selima Medical College, Khidma and Abeda Memorial hospitals",
            "Conceptual design for Nexus Cardiac Care & Research Institute, Mymensingh",
          ],
        },
      ],
    },
    {
      id: "renewable",
      label: "Renewable Energy & Sustainability",
      standards: ["Biogas", "Solar", "Bi-Fuel"],
      roles: [
        {
          role: "Founder & Principal Consultant",
          org: "Nobo Shakti Prokushal (NSP)",
          period: "2007 – Present",
          project: "Renewable Energy Projects",
          points: [
            "Research and integration of solar, hydroponic and organic fertilizer systems for rooftop gardening",
            "Developed biogas purification and bi-fuel (methane–diesel) conversion systems for poultry waste utilization",
            "Supervised solar home system installations (100 packages, 30 W each) across Kurigram District",
            "Collaborated with BCSIR on bi-fuel irrigation engine development",
          ],
        },
      ],
    },
    {
      id: "industrial",
      label: "Industrial & Commercial Engineering",
      standards: ["ASME BPVC", "HVAC", "Fire Protection"],
      roles: [
        {
          role: "Founder & Principal Consultant",
          org: "Nobo Shakti Prokushal (NSP)",
          period: "2007 – Present",
          project: "Industrial & Commercial Projects",
          points: [
            "Designed and installed sound attenuation systems for telecom and commercial facilities including BTCL",
            "Delivered hot and chilled water systems for industrial clients including MASCO Dyeing and TM Textile",
            "Engineered medical gas and mechanical systems for automotive and commercial clients including Shohagh Motors",
          ],
        },
      ],
    },
    {
      id: "leadership",
      label: "Leadership & Training",
      standards: ["Capacity Building", "QA / Safety"],
      roles: [
        {
          role: "Consultant, Critical Care Service",
          org: "Save the Children",
          period: "July 2022 – March 2023",
          project: "Capacity Building & Stakeholder Coordination",
          points: [
            "Conducted on-site training for hospital staff on oxygen system operation and safety",
            "Coordinated multi-agency execution across MOHFW, DGHS, HED, PWD, NEMEMW and Save the Children",
            "Developed Quality Assurance and Safety Compliance Plans adopted across all 20 facilities",
          ],
        },
        {
          role: "Key Expert 1",
          org: "GIZ · Bangladesh Boiler Code Development Project",
          period: "2026 – Present",
          points: [
            "Drafting and reviewing national boiler standards and presenting technical frameworks to GIZ, CIOB and RSC stakeholders",
          ],
        },
      ],
    },
  ],
};

// Credentials Section — Certifications, affiliations & awards
export interface CertificationItem {
  title: string;
  detail: string;
  year: string;
}

export interface AffiliationItem {
  title: string;
  detail: string;
}

export interface AwardItem {
  title: string;
  detail: string;
}

export interface CredentialsConfig {
  sectionLabel: string;
  sectionTitle: string;
  certificationsLabel: string;
  certifications: CertificationItem[];
  affiliationsLabel: string;
  affiliations: AffiliationItem[];
  awardsLabel: string;
  awards: AwardItem[];
}

export const credentialsConfig: CredentialsConfig = {
  sectionLabel: "Credentials",
  sectionTitle: "Certified. Affiliated. Recognized.",
  certificationsLabel: "Professional Development & Certifications",
  certifications: [
    { title: "Advanced ASME B31.12 Hydrogen Piping & Pipelines", detail: "4.00 CEUs / 40 PDHs", year: "2026" },
    { title: "Introduction to ASME B31.12 Hydrogen Piping & Pipelines", detail: "2.00 CEUs / 20 PDHs", year: "2026" },
    { title: "ASME Boiler & Pressure Vessel Certification Process", detail: "3.0 PDHs", year: "2026" },
    { title: "ASME BPV Code, Section V: Nondestructive Examination Overview", detail: "3.0 PDHs", year: "2026" },
    { title: "NFPA 13: Standard for the Installation of Sprinkler Systems", detail: "Self-Guided Online Series · NFPA", year: "2019" },
    { title: "NFPA 72: National Fire Alarm and Signaling Code", detail: "Self-Guided Online Series · NFPA", year: "2019" },
    { title: "LEED NC-2009 — Sustainable Development & Green Building", detail: "Workshop", year: "2016" },
    { title: "IEB CPD Training", detail: "57 Hours", year: "2015" },
    { title: "Fire Fighting, Rescue & Evacuation Training", detail: "20 Hours", year: "2013" },
    { title: "Programmable Logic Controller (PLC) & Instruments", detail: "BCIC Institute · Grade A", year: "2007" },
    { title: "Nellcor Puritan Bennett Ventilator Training", detail: "Singapore", year: "2007" },
    { title: "Spoken Chinese Language Course", detail: "University of Dhaka", year: "2007" },
    { title: "Leadership & Motivation Workshop", detail: "Bdjobs.com", year: "2006" },
    { title: "Industrial Training Program", detail: "Eastern Cables Ltd., Chittagong", year: "2002" },
    { title: "AutoCAD Training on Engineering Design", detail: "Advance Technology Ltd., Dhaka", year: "1999" },
  ],
  affiliationsLabel: "Professional Affiliations",
  affiliations: [
    { title: "FIEB", detail: "Fellow Member, Institution of Engineers, Bangladesh" },
    { title: "ASME", detail: "American Society of Mechanical Engineers" },
    { title: "NFPA", detail: "National Fire Protection Association" },
    { title: "IEOM", detail: "Industrial Engineering & Operations Management" },
    { title: "PMI", detail: "PMI Bangladesh Chapter" },
  ],
  awardsLabel: "Awards & Recognition",
  awards: [
    { title: "Engineering Excellence Award", detail: "Innovative medical gas system development" },
    { title: "Sustainable Energy Leadership", detail: "Contributions to bi-fuel engine development" },
  ],
};

// Research & Education Section
export interface ResearchConfig {
  sectionLabel: string;
  sectionTitle: string;
  publicationTitle: string;
  publicationVenue: string;
  publicationDescription: string;
  publicationPoints: string[];
  educationLabel: string;
  education: { degree: string; field: string; school: string; year: string }[];
  interestsLabel: string;
  interests: string[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "Research & Education",
  sectionTitle: "Scholarship in Service of Industry",
  publicationTitle: "Bio-Friendly FRP Manufacturing: Jute-Based Composites and Bio-Resins for Sustainable Infrastructure in SMEs",
  publicationVenue: "Paper presented at ICCHES 2025 · IIUM, 26–27 August 2025",
  publicationDescription:
    "Co-authored with Abdullah Sayem (Bangladesh University of Textiles) — an end-to-end methodology for low-carbon jute-based FRP composites for SME manufacturing.",
  publicationPoints: [
    "IoT process monitoring with AI quality prediction — flexural strength predicted from live sensor data (R² = 0.91)",
    "45 MPa flexural strength (ASTM D790) with ~40% lower embodied carbon than petroleum-derived FRP",
  ],
  educationLabel: "Academic Background",
  education: [
    {
      degree: "MBA",
      field: "Marketing",
      school: "Ahsanullah University of Science and Technology, Bangladesh",
      year: "2013",
    },
    {
      degree: "B.Sc.",
      field: "Mechanical Engineering",
      school: "Rajshahi University of Engineering & Technology (RUET), Bangladesh",
      year: "2003",
    },
  ],
  interestsLabel: "Future Research Interests",
  interests: [
    "Engineering Management for Digital Transformation in Industry",
    "AI & IoT for Scalable Industrial Automation",
    "Sustainable Infrastructure & SME Cottage Industry Expansion",
  ],
};

// Scania Feature Section — Signature design achievement
export interface ScaniaConfig {
  sectionLabel: string;
  sectionTitle: string;
  image: string;
  imageAlt: string;
  subtitle: string;
  lead: string;
  description: string;
  highlights: { title: string; detail: string }[];
}

export const scaniaConfig: ScaniaConfig = {
  sectionLabel: "Signature Design Achievement · 2010–2011",
  sectionTitle: "Bangladesh's First Luxury Bus Body",
  image: "/scania-bus.webp",
  imageAlt: "Luxury coach bus with sculpted aerodynamic bodywork in golden-hour light",
  subtitle: "Scania Bus Body Design & Implementation",
  lead: "Led the design and implementation of Bangladesh's first luxury bus body structure — a ground-up engineering achievement on the Scania platform that redefined passenger transport standards in the country.",
  description:
    "As design and implementation lead, I took the project from concept to completion: translating the luxury coach vision into a complete body structure — from structural framing and chassis integration to passenger ergonomics, safety and finishing — delivered to a standard no Bangladeshi operator had seen before.",
  highlights: [
    {
      title: "A National First",
      detail:
        "The first luxury bus body structure engineered in Bangladesh — setting a new benchmark for the domestic coachbuilding industry.",
    },
    {
      title: "End-to-End Leadership",
      detail:
        "Owned both design and implementation: structural design, chassis–body integration, and on-site execution through to delivery.",
    },
    {
      title: "Passenger-Centred Engineering",
      detail:
        "Combined ride comfort, safety and premium finishing in a single structure — engineering elegance without compromising durability.",
    },
  ],
};

// Services Section — Client offerings
export interface ServiceItem {
  id: string;
  badge: string;
  badgeStyle: "premium" | "recurring" | "project";
  title: string;
  description: string;
  whatWeDo: string[];
  compliance: string[];
  result: string;
  ctaText: string;
  ctaHref: string;
}

export interface ServicesConfig {
  sectionLabel: string;
  sectionTitle: string;
  sectionIntro: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  sectionLabel: "Services",
  sectionTitle: "Engineering Services for Industry & Healthcare",
  sectionIntro:
    "From one-time validation audits to long-term maintenance partnerships — every engagement is delivered to international code compliance, backed by two decades of field experience.",
  services: [
    {
      id: "healthcare-validation",
      badge: "Premium Product",
      badgeStyle: "premium",
      title: "Healthcare MEP Validation",
      description:
        "Comprehensive validation and auditing for hospitals and healthcare facilities — protecting patient safety and licensing readiness.",
      whatWeDo: [
        "OT/ICU HVAC validation — airflow, pressure cascades and filtration performance",
        "Medical gas pipeline audit — oxygen, nitrous oxide, medical air and vacuum systems",
        "Fire safety audit and documentation support for DGHS licensing",
      ],
      compliance: ["NFPA-99", "ISO 7396-1", "DGHS Bangladesh"],
      result: "Oxygen manifold & medical gas connectivity across 20+ health facilities with Save the Children, 2023",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
    {
      id: "industrial-amc",
      badge: "Recurring Product",
      badgeStyle: "recurring",
      title: "Industrial MEP AMC & Energy Audit",
      description:
        "Long-term maintenance partnerships and energy optimization for textile and manufacturing plants.",
      whatWeDo: [
        "Annual maintenance contracts for boiler, chiller, compressor, generator and fire pump",
        "Energy audits with a prioritized savings roadmap for utilities and HVAC",
        "Energy-saving programs aligned to Higg FEM and LEED reporting",
      ],
      compliance: ["ASME BPVC", "Higg FEM", "LEED", "ISO 50001"],
      result: "AMC and energy-saving programs for textile plants, aligned to Higg FEM / LEED reporting",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
    {
      id: "telecom-maintenance",
      badge: "Recurring Product",
      badgeStyle: "recurring",
      title: "Telecom Infrastructure Maintenance",
      description:
        "Reliability-focused maintenance for telecom shelters and passive infrastructure, keeping networks on-air.",
      whatWeDo: [
        "Shelter HVAC maintenance for stable equipment environments",
        "DC power system inspection, battery health checks and rectifier servicing",
        "Preventive generator maintenance and emergency call-out support",
      ],
      compliance: ["Operator SLA Standards", "ISO 9001"],
      result: "Shelter HVAC, DC power and generator maintenance across operator networks in Bangladesh",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
    {
      id: "pressure-vessel",
      badge: "Project-Based",
      badgeStyle: "project",
      title: "Pressure Vessel & Boiler Code Consulting",
      description:
        "Design, review and regulatory support for pressure equipment — from plant-level projects to national code development.",
      whatWeDo: [
        "Pressure vessel and vacuum tank design with certification support",
        "Hydrogen piping design and review for new-energy applications",
        "Boiler code, safety protocols and operational guideline development",
      ],
      compliance: ["ASME BPVC", "ASME B31.12", "ASME B31.3"],
      result: "National Boiler Code drafting with GIZ — integrating ASME BPVC and B31.12 hydrogen piping",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
    {
      id: "fire-protection",
      badge: "Project-Based",
      badgeStyle: "project",
      title: "Fire Protection & Life Safety Design",
      description:
        "Fire protection engineering for hospitals, factories and commercial facilities — from hydrants to full life safety strategy.",
      whatWeDo: [
        "Fire hydrant, sprinkler and detection system design",
        "Fire safety audits, evacuation planning and rescue training programs",
        "Nurse call and life safety system integration for hospitals",
      ],
      compliance: ["NFPA 13/14", "NFPA 101", "BNBC"],
      result: "Fire safety audits and evacuation planning supporting hospital DGHS licensing",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
    {
      id: "green-energy",
      badge: "Project-Based",
      badgeStyle: "project",
      title: "Renewable Energy & Green Building Consulting",
      description:
        "Sustainable energy and green building guidance drawn from hands-on biogas, bi-fuel and waste-to-energy project delivery.",
      whatWeDo: [
        "Biogas and bi-fuel (biogas–diesel hybrid) system design",
        "Waste-to-energy feasibility studies and project development",
        "Green building design review and LEED documentation support",
      ],
      compliance: ["LEED", "ISO 14001", "Green Building Codes"],
      result: "Single-dome industrial biogas plant with biogas–diesel hybrid generation, 2022",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
    {
      id: "hfo-thermal",
      badge: "Project-Based",
      badgeStyle: "project",
      title: "HFO Systems & Thermal Processing",
      description:
        "Heavy fuel oil (HFO) power and thermal systems — from fuel storage and handling to heat utilisation — plus thermal processing lines for manufacturing plants.",
      whatWeDo: [
        "HFO boiler and engine-based power systems — fuel storage, heating, preheating and combustion",
        "Thermal oil heaters, dryers and waste-heat-recovery systems for process plants",
        "Electromechanical integration, commissioning support and performance audits",
      ],
      compliance: ["ASME BPVC", "ISO 50001", "OEM Standards"],
      result: "HFO-fired thermal system design, integration and commissioning support for industrial plants",
      ctaText: "Call for Audit",
      ctaHref: "tel:+8801714073604",
    },
  ],
};

// Product Showcase — EcoNest capsule home
export interface ProductConfig {
  sectionLabel: string;
  sectionTitle: string;
  image: string;
  imageAlt: string;
  subtitle: string;
  lead: string;
  description: string;
  highlights: { title: string; detail: string }[];
  ctaText: string;
  ctaFile: string;
  ctaFileLabel: string;
}

export const productConfig: ProductConfig = {
  sectionLabel: "Product Innovation · Green Resort Sustainable Energy Park",
  sectionTitle: "EcoNest 3010 — Capsule Home",
  image: "/econest-capsule.webp",
  imageAlt: "Prefab capsule home with panoramic glazing in a green eco-resort at golden hour",
  subtitle: "Prefab Smart Capsule Home · 30' × 10' × 9'",
  lead: "A turnkey smart capsule residence engineered for eco-resorts and sustainable energy parks — factory-built, transportable, and ready to live in from day one.",
  description:
    "The EcoNest 3010 pairs a hot-dip galvanized steel frame with an aviation-grade aluminum shell and panoramic low-E glazing, fully fitted with smart home systems, heated stone-crystal flooring and a fresh-air climate system — a complete product of precision engineering and sustainable design thinking.",
  highlights: [
    {
      title: "Engineered Shell",
      detail:
        "Hot-dip galvanized steel frame (3–4 mm) with 2 mm fluorocarbon-coated aviation aluminum panels and 100 mm+ cyclopentane insulation.",
    },
    {
      title: "Panoramic Comfort",
      detail:
        "Double low-E tempered glass, heated stone-crystal flooring, and a fresh-air system with integrated climate control.",
    },
    {
      title: "Smart by Default",
      detail:
        "One-touch master power, voice control, electric curtains and a motorized projection system — a resort-ready smart home.",
    },
  ],
  ctaText: "Download Catalogue",
  ctaFile: "/papers/econest-3010-capsule-home-catalogue.pdf",
  ctaFileLabel: "PDF · full specifications",
};

// Sound Pod Section — Acoustic pod product family
export interface SoundPodModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  images: string[];
}

export interface SoundPodConfig {
  sectionLabel: string;
  sectionTitle: string;
  sectionIntro: string;
  video: string;
  videoPoster: string;
  videoTitle: string;
  models: SoundPodModel[];
  ctaText: string;
  ctaHref: string;
}

export const soundpodConfig: SoundPodConfig = {
  sectionLabel: "Product Innovation · Acoustic Solutions",
  sectionTitle: "Sound Pod — Acoustic Meeting Pods",
  sectionIntro:
    "Self-contained acoustic pods designed for focused work and private conversations in open offices, co-working spaces and public venues — engineered for quick installation and everyday comfort.",
  video: "/soundpod/soundpod-ad.mp4",
  videoPoster: "/soundpod/double-1.webp",
  videoTitle: "Sound Pod in motion",
  models: [
    {
      id: "single",
      name: "Sound Pod · Single Space",
      tagline: "One-person focus booth",
      description:
        "A compact single-user pod for calls, focused work or quiet breaks — a room within a room that drops into any open floor plan.",
      features: [
        "Acoustic absorptive wall panels with laminated safety glass front",
        "Integrated ceiling ventilation unit for continuous fresh air",
        "Built-in work shelf, ready for laptop and video calls",
        "Soft rounded frame — plug-and-play placement, no construction needed",
      ],
      images: ["/soundpod/single-1.webp", "/soundpod/single-2.webp"],
    },
    {
      id: "double",
      name: "Acoustic Sound Pod · Double Space",
      tagline: "Two-person meeting pod",
      description:
        "A two-person acoustic pod for private meetings, interviews and one-to-one sessions — available in a range of panel finishes to match any interior.",
      features: [
        "Larger twin-seat interior for meetings and collaboration",
        "Laminated glass front with acoustic absorptive side panels",
        "Ceiling-mounted ventilation and services module",
        "Multiple finish options — sage, terracotta, violet and more",
      ],
      images: [
        "/soundpod/double-1.webp",
        "/soundpod/double-2.webp",
        "/soundpod/double-3.webp",
        "/soundpod/double-4.webp",
      ],
    },
  ],
  ctaText: "Request a Quote",
  ctaHref: "tel:+8801714073604",
};

// Publications & Reports Section — Downloadable documents
export interface PublicationItem {
  id: string;
  type: string;
  title: string;
  venue: string;
  date: string;
  note: string;
  downloadLabel: string;
  file: string;
  fileLabel: string;
  extraLabel?: string;
  extraFile?: string;
}

export interface PublicationsConfig {
  sectionLabel: string;
  sectionTitle: string;
  sectionIntro: string;
  publications: PublicationItem[];
}

export const publicationsConfig: PublicationsConfig = {
  sectionLabel: "Publications & Reports",
  sectionTitle: "Papers You Can Read",
  sectionIntro:
    "Conference papers, accepted abstracts and field project reports — available for download.",
  publications: [
    {
      id: "ieom-2024",
      type: "Conference Paper",
      title: "Scalable Collaborative Innovation in Bangladesh's Industrial and Healthcare Sectors: Addressing Access and Skills Challenges for Sustainable Growth",
      venue: "IEOM 7th Bangladesh Conference on Industrial Engineering & Operations Management",
      date: "December 2024",
      note: "Official proceedings paper published by IEOM Society International with DOI 10.46254/BA07.20240066 — a scalable, technology-driven collaborative model connecting engineers, manufacturers and industrialists to bridge healthcare access and skills gaps.",
      downloadLabel: "Download Paper",
      file: "/papers/ieom-2024-scalable-collaborative-innovation-bangladesh.pdf",
      fileLabel: "PDF · 11 pages",
      extraLabel: "View DOI",
      extraFile: "https://doi.org/10.46254/BA07.20240066",
    },
    {
      id: "iium-abstract",
      type: "Conference Paper",
      title: "Bio-Friendly FRP Manufacturing: Jute-Based Composites and Bio-Resins as Eco-Friendly Materials for Sustainable Infrastructure in SMEs",
      venue: "ICCHES 2025, International Islamic University Malaysia (IIUM)",
      date: "Presented · 26–27 August 2025",
      note: "Co-authored with Abdullah Sayem (BUTEX) — jute fiber bio-composites with IoT process monitoring and AI quality prediction, cutting embodied carbon by ~40%.",
      downloadLabel: "Download Abstract",
      file: "/papers/iium-abstract-jute-biofrp.pdf",
      fileLabel: "PDF · 1 page",
      extraLabel: "View Certificate",
      extraFile: "/papers/icches-2025-presentation-certificate.pdf",
    },
    {
      id: "areca-working-paper",
      type: "Working Paper",
      title: "Techno-Economic Evaluation and Value-Chain Optimization of Areca Leaf (Areca catechu) Thermoformed Tableware Manufacturing",
      venue: "Independent technical paper",
      date: "2025",
      note: "Solo-authored — thermoforming die design and process economics for compostable tableware; Bangladesh positioned as the lowest-cost producer, with laser-engraving value-add lifting unit margins by 34–100%.",
      downloadLabel: "Download Paper",
      file: "/papers/working-paper-areca-leaf-tableware.pdf",
      fileLabel: "PDF · 3 pages",
    },
    {
      id: "sci-report",
      type: "Project Completion Report",
      title: "Oxygen Manifold System Establishment in 20 Selected Upazila Health Complexes and Medical Gas Connectivity in 4 Selected SCANU",
      venue: "USAID's MAMONI MNCSP — Save the Children",
      date: "April 2023",
      note: "Consultant, Critical Care Service — design manuals, construction supervision and commissioning of oxygen manifold and medical gas systems across 20 upazila health complexes.",
      downloadLabel: "Download Report",
      file: "/papers/sci-oxygen-manifold-completion-report-2023.pdf",
      fileLabel: "PDF · 47 pages",
    },
  ],
};

// Footer Section
export interface FooterContactItem {
  type: "email" | "phone";
  label: string;
  value: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  description: string;
  ctaText: string;
  contact: FooterContactItem[];
  locationLabel: string;
  address: string[];
  addresses?: { label: string; lines: string[] }[];
  socialLabel: string;
  socials: FooterSocialItem[];
  logoText: string;
  copyright: string;
  links: { label: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  heading: "Let's build what's next.",
  description:
    "Open to consultancy engagements and research collaboration in engineering management, industrial automation and sustainable infrastructure.",
  ctaText: "",
  contact: [
    {
      type: "email",
      label: "info@mostafasimran.com",
      value: "info@mostafasimran.com",
      href: "mailto:info@mostafasimran.com",
    },
    {
      type: "phone",
      label: "+880 1714 073604",
      value: "+8801714073604",
      href: "tel:+8801714073604",
    },
    {
      type: "phone",
      label: "+62 852 8130 5024",
      value: "+6285281305024",
      href: "tel:+6285281305024",
    },
  ],
  locationLabel: "Based in",
  address: [],
  addresses: [
    {
      label: "Bangladesh Office · NSP · UTC+6",
      lines: ["73/H Green Road", "Dhaka-1205, Bangladesh", "Sun–Thu · 9:00–18:00 (UTC+6)"],
    },
    {
      label: "Indonesia Office · PT Sun Moon Ecosystem · UTC+7",
      lines: [
        "RUKO Citra 7, Jalan Peta Barat",
        "Block A03 No. 10, RT.007/RW.011, Kalideres",
        "Kota Adm. Jakarta Barat, DKI Jakarta, Indonesia",
        "Mon–Fri · 9:00–18:00 (UTC+7)",
      ],
    },
  ],
  socialLabel: "Connect",
  socials: [],
  logoText: "SUN MOON ECOSYSTEM",
  copyright: "© 2026 Mostafa Shawkat Imran. All rights reserved.",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mostafa-shawkat-imran-244039b5" },
    { label: "Email", href: "mailto:info@mostafasimran.com" },
  ],
};
