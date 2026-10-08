// Insights / Engineering Notes — article content for the blog section.
// Each article is rendered to a fully static, prerendered HTML page so that
// search-engine crawlers can read it without JavaScript.

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string };

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string; // ISO YYYY-MM-DD
  readMinutes: number;
  tags: string[];
  image?: string;
  imageAlt?: string;
  blocks: ArticleBlock[];
}

export const articles: Article[] = [
  {
    slug: 'boiler-design-manufacturing-asme-bpvc',
    title: 'Boiler Design and Manufacturing under ASME BPVC Standards',
    metaTitle: 'Boiler Design & Manufacturing under ASME BPVC Standards — M. S. Imran',
    metaDescription:
      'How ASME BPVC governs boiler design and manufacturing: Sections I, IV, VI, VII, II, VIII, IX and XIII, welding qualifications, NDT, the S and H stamps, and why certification matters for global projects.',
    excerpt:
      'The ASME Boiler and Pressure Vessel Code is the global benchmark for boiler construction. A practical walk through the sections that matter, from material selection to the S and H stamps.',
    date: '2026-10-09',
    readMinutes: 5,
    tags: ['ASME BPVC', 'Boilers', 'Pressure Vessels'],
    image: '/card-boiler.webp',
    imageAlt: 'Industrial boiler and fuel handling plant with steel piping',
    blocks: [
      {
        type: 'p',
        text: 'Boilers are critical components in power generation, industrial processing and heating applications — and their design and manufacturing must ensure safety, reliability and efficiency above all. The ASME Boiler and Pressure Vessel Code (BPVC) is the globally recognized standard governing the construction, inspection and certification of boilers and pressure vessels. Updated every two years, the BPVC provides comprehensive rules that safeguard against failures and accidents, and compliance with it is increasingly expected of any serious industrial project in Bangladesh and abroad.',
      },
      { type: 'h2', text: 'Key ASME BPVC sections for boilers' },
      {
        type: 'ul',
        items: [
          'Section I — Rules for Construction of Power Boilers: design, materials, fabrication, inspection and testing of high-pressure steam boilers used in power plants.',
          'Section IV — Rules for Construction of Heating Boilers: low-pressure heating boilers for residential and commercial use.',
          'Section VI — Recommended Rules for Care and Operation of Heating Boilers: guidelines for safe operation and maintenance.',
          'Section VII — Recommended Guidelines for Care of Power Boilers: operational safety and inspection practices for power boilers.',
        ],
      },
      { type: 'h2', text: 'Design principles' },
      {
        type: 'p',
        text: 'Material selection. Boiler steels must comply with ASME Section II material specifications, with tensile strength, creep resistance and corrosion resistance as the decisive properties for long service life.',
      },
      {
        type: 'p',
        text: 'Stress analysis. Section VIII together with Section II Part D provide the stress tables and design formulas that underpin pressure-part sizing, and finite element analysis is now routinely used to validate complex geometries.',
      },
      {
        type: 'p',
        text: 'Safety factors. Designs incorporate margins for pressure, temperature and fatigue loading, while overpressure protection is governed by Section XIII.',
      },
      {
        type: 'p',
        text: 'Welding and fabrication. Section IX specifies welding qualifications and procedures, and heat treatment with non-destructive testing (NDT) confirms the integrity of every critical joint.',
      },
      { type: 'h2', text: 'Manufacturing practices' },
      {
        type: 'ul',
        items: [
          'Fabrication: cutting, rolling and welding of boiler shells and tubes must follow ASME-approved procedures.',
          'Inspection: Authorized Inspectors verify compliance through hydrostatic tests, radiographic examinations and dimensional checks.',
          'Certification: manufacturers must hold the ASME “S” Stamp for power boilers or the “H” Stamp for heating boilers.',
          'Documentation: data reports and material certificates are mandatory for traceability.',
        ],
      },
      {
        type: 'quote',
        text: 'In boiler manufacturing, documentation is not paperwork — it is the proof that the certificate on the nameplate is true.',
      },
      { type: 'h2', text: 'Why BPVC compliance matters globally' },
      {
        type: 'ul',
        items: [
          'Safety assurance: BPVC compliance reduces the risk of catastrophic failures.',
          'Market access: ASME certification is frequently a precondition for international projects and export supply.',
          'Sustainability: modern BPVC editions incorporate efficiency improvements and support integration with renewable energy systems.',
        ],
      },
      {
        type: 'p',
        text: 'Boiler design and manufacturing under ASME BPVC standards is not just about compliance — it is about ensuring long-term safety, operational reliability and global acceptance. For industries in Bangladesh and beyond, adopting BPVC positions projects at par with international best practice. As Key Expert on the national Boiler Code development project with GIZ, this is exactly the standard we are working to embed in national regulation.',
      },
    ],
  },
  {
    slug: 'remote-monitoring-system-rms-maintenance',
    title: 'Keeping Smart Grids Connected: A Practical Guide to RMS Maintenance',
    metaTitle: 'Keeping Smart Grids Connected — Remote Monitoring System (RMS) Maintenance — M. S. Imran',
    metaDescription:
      'Why remote monitoring system maintenance matters for smart grids: hardware inspections, power supply health, firmware and cybersecurity patching, sensor calibration, loop testing and long-term reliability practices.',
    excerpt:
      'An RMS is only as good as its uptime. What proactive maintenance of remote monitoring systems looks like — from cabinet seals to firmware patches to sensor calibration.',
    date: '2026-10-09',
    readMinutes: 6,
    tags: ['Smart Grid', 'Remote Monitoring', 'Maintenance'],
    image: '/insight-rms-monitoring.webp',
    imageAlt: 'Digital pressure transmitters with local displays and three-valve manifolds on a metering run',
    blocks: [
      {
        type: 'p',
        text: 'In today’s rapidly evolving energy landscape, the efficiency and reliability of power distribution networks depend heavily on advanced monitoring technology. At the heart of this digital transformation is the Remote Monitoring System (RMS). RMS units act as the eyes and ears of utility operators, providing real-time data on asset health, grid performance and potential anomalies.',
      },
      {
        type: 'p',
        text: 'However, even the most sophisticated monitoring infrastructure requires proactive care. Without a solid maintenance strategy, RMS units can experience data drift, communication dropouts and hardware degradation — ultimately leaving operators blind when they need visibility the most. Here is why RMS maintenance matters, the pillars of a robust program, and the practices that keep a monitoring network resilient.',
      },
      { type: 'h2', text: 'Why RMS maintenance matters' },
      {
        type: 'p',
        text: 'An RMS is only as good as its uptime. When a unit fails or transmits inaccurate data, the consequences cascade through the entire operational chain:',
      },
      {
        type: 'ul',
        items: [
          'Delayed fault detection: inaccurate telemetry or offline remote terminals delay the identification of outages or equipment overheating.',
          'Compromised data integrity: faulty sensors or uncalibrated inputs trigger false alarms or miss critical warnings, wasting field crew resources.',
          'Shorter asset lifespan: neglected hardware exposed to harsh outdoor environments fails prematurely, leading to costly replacements.',
        ],
      },
      {
        type: 'p',
        text: 'Regular maintenance shifts operations from a reactive break-fix model to a proactive, reliability-centred approach.',
      },
      { type: 'h2', text: 'Pillar 1 — Hardware inspections and environmental hardening' },
      {
        type: 'p',
        text: 'RMS units are frequently deployed in harsh outdoor substations, remote poles or industrial enclosures where they face extreme temperatures, humidity and vibration:',
      },
      {
        type: 'ul',
        items: [
          'Physical checks: inspect cabinet seals, air filters and cooling fans to prevent dust ingress and overheating.',
          'Power supply health: regularly test backup batteries, UPS units and solar chargers — battery degradation is a leading cause of unexpected RMS failure during grid outages.',
          'Wiring and connections: check for loose terminal blocks, corrosion and water ingress caused by weather exposure.',
        ],
      },
      { type: 'h2', text: 'Pillar 2 — Firmware and software updates' },
      {
        type: 'p',
        text: 'Cybersecurity threats and software obsolescence pose real risks to remote monitoring nodes:',
      },
      {
        type: 'ul',
        items: [
          'Security patching: keep firmware and operating systems updated to protect against vulnerabilities and unauthorized access.',
          'Configuration management: maintain strict version control of device configurations so field replacements can be reconfigured rapidly.',
          'Data synchronization: verify time synchronization via NTP or GPS across all nodes to ensure accurate Sequence of Events (SOE) logging.',
        ],
      },
      { type: 'h2', text: 'Pillar 3 — Sensor calibration and loop testing' },
      {
        type: 'p',
        text: 'Data accuracy is non-negotiable when making critical switching or load-balancing decisions:',
      },
      {
        type: 'ul',
        items: [
          'Analog input calibration: periodically compare RMS telemetry readings — voltage, current, temperature — against calibrated reference instruments.',
          'Communication link verification: test primary and secondary communication paths, whether cellular, fibre optic or radio, for low latency and high packet delivery ratios.',
        ],
      },
      { type: 'h2', text: 'Best practices for long-term reliability' },
      {
        type: 'ul',
        items: [
          'Implement automated health polling: heartbeat signals and polling checks from the central SCADA or master station should alert engineers immediately when an RMS goes offline.',
          'Establish a seasonal checklist: tailor maintenance to climate shifts — preparing batteries for cold weather, ensuring adequate cooling ahead of peak summer loads.',
          'Empower field technicians: equip crews with standardized diagnostic tools and clear documentation to troubleshoot communication faults on-site quickly.',
        ],
      },
      {
        type: 'quote',
        text: 'A remote monitoring system is the backbone of modern, intelligent infrastructure — but only if someone is maintaining the backbone.',
      },
      {
        type: 'p',
        text: 'By investing in a structured, proactive maintenance routine, utilities protect their networks against unexpected downtime, secure data integrity and keep uninterrupted visibility over critical assets. If your team is reassessing its monitoring maintenance strategy — across power, gas or industrial networks — our engineers at NSP and PT Sun Moon Ecosystem are glad to review it with you.',
      },
    ],
  },
  {
    slug: 'asme-b31-12-hydrogen-pipeline-design',
    title: 'ASME B31.12: Hydrogen Pipeline Design Essentials',
    metaTitle: 'ASME B31.12 Hydrogen Pipeline Design Essentials — M. S. Imran',
    metaDescription:
      'Practical essentials of ASME B31.12 hydrogen piping design: material selection, embrittlement control, conservative design factors, welding, testing and purging — from a GIZ boiler-code Key Expert.',
    excerpt:
      'Hydrogen is not natural gas. Its tiny molecule, embrittlement behaviour and wide flammability range demand a more conservative code — here is what ASME B31.12 changes in practice.',
    date: '2026-10-09',
    readMinutes: 5,
    tags: ['ASME B31.12', 'Hydrogen', 'Piping Design'],
    image: '/breath-bg.webp',
    imageAlt: 'Hydrogen pipeline infrastructure and pressure vessels at dusk',
    blocks: [
      {
        type: 'p',
        text: 'Hydrogen is moving from pilot projects to national energy strategy — and every engineer who touches a hydrogen line quickly learns the same lesson: hydrogen is not natural gas. Its molecule is the smallest in nature, it embrittles carbon steel, ignites with almost no energy and burns in a far wider concentration range than methane. Design rules written for gas distribution simply do not carry over. That is the purpose of ASME B31.12, the Hydrogen Piping and Pipelines code.',
      },
      {
        type: 'p',
        text: 'At Nobo Shakti Prokushal we have been integrating B31.12 requirements into national boiler and pressure-equipment regulation under the GIZ Bangladesh Boiler Code Development Project. These are the essentials we apply on every hydrogen design review.',
      },
      { type: 'h2', text: '1. Material selection is the first line of defence' },
      {
        type: 'p',
        text: 'Hydrogen embrittlement — the loss of ductility and fracture toughness as atomic hydrogen penetrates the steel lattice — governs material choice. In practice this means:',
      },
      {
        type: 'ul',
        items: [
          'Limiting carbon-steel strength: high-yield, high-hardness steels are more susceptible, so B31.12-qualified applications favour controlled strength grades with caps on hardness and tensile properties.',
          'Preferring killed, fine-grain steels with clean melting practice; sour-service-qualified material is a good baseline even for sweet hydrogen duty.',
          'Treating welding consumables and procedure qualification as part of material selection — the weld zone is usually the most embrittlement-sensitive part of the system.',
        ],
      },
      { type: 'h2', text: '2. Design factors are deliberately conservative' },
      {
        type: 'p',
        text: 'Compared with ASME B31.8 for gas transmission, B31.12 applies more conservative design factors and wall-thickness rules for hydrogen service. Where a natural-gas line might use a 0.72 design factor, hydrogen pipelines are designed closer to 0.5. The extra wall thickness buys tolerance for the defect growth and fracture behaviour that hydrogen accelerates. Do not be tempted to "value-engineer" this margin away — it is the code\u2019s acknowledgment of hydrogen\u2019s unique risk profile.',
      },
      { type: 'h2', text: '3. Leak-tightness is a design feature, not an afterthought' },
      {
        type: 'ul',
        items: [
          'Hydrogen leaks through paths that hold gas and even water tight — flange selection, gasket material and bolting torque all need hydrogen-specific attention.',
          'Threaded joints are effectively excluded from hydrogen duty; welded or qualified mechanical joints with documented sealing performance are the norm.',
          'Valves and fittings must be rated and, where applicable, fire-tested for hydrogen service — a natural-gas rating is not sufficient evidence.',
        ],
      },
      { type: 'h2', text: '4. Welding, NDE and testing' },
      {
        type: 'p',
        text: 'Welding procedure qualification for hydrogen service demands tight control of heat input and interpass temperature, with nondestructive examination — radiography or ultrasonic testing — covering a higher proportion of welds than conventional process piping. After construction, the system is strength-tested and leak-tested, and commissioning follows a disciplined purge sequence: nitrogen displacement before any hydrogen admission, and verification of oxygen content before energising.',
      },
      {
        type: 'quote',
        text: 'In hydrogen service, the code margin is not conservatism for its own sake — it is the difference between a pipeline that leaks gradually and one that fails suddenly.',
      },
      { type: 'h2', text: 'The bottom line' },
      {
        type: 'p',
        text: 'B31.12 rewards engineers who treat hydrogen as a new design problem rather than a new fluid in an old system. If your organisation is planning hydrogen storage, distribution or process piping in Bangladesh or Indonesia, a design review against B31.12 before procurement is far cheaper than remediation after the first inspection cycle.',
      },
    ],
  },
  {
    slug: 'hospital-mep-audit-checklist-2026',
    title: 'Hospital MEP Audit Checklist for 2026',
    metaTitle: 'Hospital MEP Audit Checklist for 2026 — M. S. Imran',
    metaDescription:
      'A practical 2026 checklist for hospital MEP audits: OT/ICU HVAC, medical gas pipelines, electrical resilience, fire safety and DGHS licensing documentation — from 20+ facility audit experience.',
    excerpt:
      'OT pressure cascades, oxygen manifold alarms, generator autonomy — what we actually check when we walk into a hospital, distilled into one working checklist.',
    date: '2026-10-09',
    readMinutes: 6,
    tags: ['Healthcare', 'MEP Audit', 'NFPA-99', 'DGHS'],
    image: '/project-manifold.webp',
    imageAlt: 'Oxygen cylinder manifold room with automatic changeover panel',
    blocks: [
      {
        type: 'p',
        text: 'After auditing and equipping more than twenty health facilities in Bangladesh — upazila health complexes, SCANU units and private hospitals — we have learned that hospital MEP failures are rarely exotic. They are ordinary systems, neglected in ordinary ways. This is the working checklist our teams use at the start of every healthcare MEP engagement in 2026. It aligns with NFPA-99 and ISO 7396-1 principles and supports DGHS licensing documentation in Bangladesh.',
      },
      { type: 'h2', text: 'OT / ICU HVAC — the pressure cascade' },
      {
        type: 'ul',
        items: [
          'Verify positive pressure in operating theatres relative to adjacent areas, and negative pressure where isolation is intended — with the door closed and, critically, with it open.',
          'Confirm air change rates (typically 20+ ACH for OTs) against design values, and check filters for differential pressure gauges that are actually connected and reading.',
          'Measure temperature and humidity at working level, not just at the AHU — stratification near theatre lights is a common finding.',
          'Test auto-changeover of supply and exhaust fans, and confirm alarms reach a staffed location, not a locked plant room.',
        ],
      },
      { type: 'h2', text: 'Medical gas pipeline systems' },
      {
        type: 'ul',
        items: [
          'Walk the oxygen manifold: cylinder bank layout, changeover panel function, reserve bank readiness and — most often missed — whether the line pressure alarm actually sounds anywhere.',
          'Check zone valve boxes for access, labeling and correct "open" position after any maintenance.',
          'Spot-test outlets and inlets for correct gas-specific indexing; a swapped probe is a patient-safety event waiting to happen.',
          'Review the last cross-connection test and pressure-drop test records; if there are none, schedule verification testing before licensing review.',
        ],
      },
      { type: 'h2', text: 'Electrical resilience' },
      {
        type: 'ul',
        items: [
          'Load-test the generator under real building load, not just no-load start — and record fuel autonomy at that load.',
          'Trace the essential supply board: which circuits truly switch over? OT, ICU, blood bank and emergency lighting must be on it.',
          'Check UPS battery age and last discharge test; batteries older than three to four years deserve capacity testing.',
        ],
      },
      { type: 'h2', text: 'Fire safety and life safety' },
      {
        type: 'ul',
        items: [
          'Hydrant and hose-reel pressure test at the hydraulically most remote point.',
          'Detection and alarm: walk-test call points and detectors on a sample basis; confirm the panel shows the correct zone text.',
          'Evacuation: corridors clear, exit doors opening in the direction of escape, assembly points known to staff on shift.',
        ],
      },
      {
        type: 'quote',
        text: 'A hospital can pass a licensing inspection and still fail a patient at 2 a.m. The audit exists for the 2 a.m. case.',
      },
      { type: 'h2', text: 'Documentation — where audits are won or lost' },
      {
        type: 'p',
        text: 'Every finding above should land in a register with severity, owner and due date. For DGHS licensing in Bangladesh, assemble the dossier before it is asked for: test certificates, calibration records, training logs, and as-built drawings. Facilities that keep this dossier current clear licensing cycles in days instead of months.',
      },
      {
        type: 'p',
        text: 'A structured MEP audit typically takes one to three days depending on bed count, and the output is a prioritized rectification roadmap — not a binder of blame. If your facility has not had an independent MEP review in the last 24 months, 2026 is the year to schedule one.',
      },
    ],
  },
  {
    slug: 'hfo-fuel-handling-fundamentals',
    title: 'HFO Power Systems: Fuel Handling Fundamentals',
    metaTitle: 'HFO Power & Thermal Systems — Fuel Handling Fundamentals — M. S. Imran',
    metaDescription:
      'Heavy fuel oil handling essentials for HFO power and thermal plants: storage heating, settling and purifying, injection viscosity control, and the maintenance discipline that keeps plants online.',
    excerpt:
      'Heavy fuel oil only behaves when it is kept hot, clean and at the right viscosity. The fundamentals of HFO storage, treatment and injection control that decide plant availability.',
    date: '2026-10-09',
    readMinutes: 5,
    tags: ['HFO', 'Thermal Systems', 'Power Plants'],
    image: '/insight-hfo-system.webp',
    imageAlt: 'Cutaway diagram of an HFO thermal processing system showing the fuel oil heater, tube bundle, expansion tank and pumps',
    blocks: [
      {
        type: 'p',
        text: 'Heavy fuel oil — the residual fraction after refineries extract the lighter products — remains the backbone of power and process heat for industries and off-grid plants across Bangladesh and Indonesia. It is cheap, energy-dense and widely available. It is also unforgiving: handled poorly, HFO costs more in downtime and component wear than it ever saved at the tank farm. After two decades of electromechanical work around boilers, engines and thermal processing lines, these are the fundamentals we insist on in every HFO system review.',
      },
      { type: 'h2', text: 'Respect the viscosity curve' },
      {
        type: 'p',
        text: 'HFO is a solid at room temperature. Everything in fuel handling is about the viscosity-temperature relationship: storage tanks are heated so the oil can be pumped, separators are heated so water and solids can be thrown out, and the oil is heated once more before injection so it atomizes correctly in the burner or engine. Miss any one of these setpoints and the symptom appears somewhere else — blocked filters, worn injector nozzles, incomplete combustion, exhaust smoke. Typical practice holds storage and transfer oil hot enough to pump freely, while injection viscosity is controlled to the engine maker\u2019s band, commonly around 10–18 cSt depending on the burner or injector design.',
      },
      { type: 'h2', text: 'Purification is a process, not a machine' },
      {
        type: 'ul',
        items: [
          'Settling tanks give gravity time: water and heavy solids drop out before the oil ever reaches the centrifuge.',
          'Purifiers and clarifiers must be sized, heated and maintained as a train — a single overloaded separator quietly passes contamination straight to the injectors.',
          'Monitor sludge space and clean on evidence (differential pressure, sludge volume), not on the calendar alone.',
        ],
      },
      { type: 'h2', text: 'Heat tracing and insulation are part of the fuel system' },
      {
        type: 'p',
        text: 'Every unheated branch line is a future blocked line. Trace heating on transfer and injection pipework, properly insulated, keeps viscosity in band from tank to burner. Trace faults are among the most common causes of "unexplained" trips in HFO plants — audit them seasonally, because a line that flowed in April can stall in January.',
      },
      {
        type: 'quote',
        text: 'In HFO plants, fuel quality is not what arrived in the tanker — it is what survives the treatment train. Design and maintenance decide the difference.',
      },
      { type: 'h2', text: 'Safety and housekeeping' },
      {
        type: 'ul',
        items: [
          'Hot-oil lines, flanges and valves need guarding and drip containment; HFO burns are severe because the oil clings at high temperature.',
          'Tank venting, foam or fire protection, and bund integrity are licensing items in most jurisdictions — treat them as operating items too.',
          'Keep the chemistry simple: test water content and density on delivery, and reject off-spec fuel before it enters your settling tanks.',
        ],
      },
      { type: 'h2', text: 'The bottom line' },
      {
        type: 'p',
        text: 'A well-run HFO system is quiet and uneventful: stable injection pressures, clean exhaust, separators working within their rated throughput. If your plant fights fuel-related trips, the answer is almost always in heating setpoints, purification throughput or trace heating — and all three are cheaper to fix than the damage they cause downstream.',
      },
    ],
  },
  {
    slug: 'nfpa-99-medical-gas-what-to-verify',
    title: 'NFPA-99 Medical Gas Pipelines: What Hospital Management Should Verify',
    metaTitle: 'NFPA-99 Medical Gas Pipeline Verification for Hospital Management — M. S. Imran',
    metaDescription:
      'What hospital management should personally verify about medical gas pipeline systems: source equipment, alarms, zone valves, labeling, verification testing and NFPA-99 documentation.',
    excerpt:
      'You do not need to be an engineer to ask the right questions about your hospital\u2019s medical gas system. Six verification points that expose the most common — and most dangerous — gaps.',
    date: '2026-10-09',
    readMinutes: 4,
    tags: ['Medical Gas', 'NFPA-99', 'Hospital Management'],
    image: '/medical-outlets.webp',
    imageAlt: 'Medical gas outlets and zone valve assembly in a healthcare facility',
    blocks: [
      {
        type: 'p',
        text: 'Hospital directors and facility managers are rarely medical gas specialists — but they are the ones who sign the licensing file and answer for patient safety. The good news: you do not need to be an engineer to verify the essentials. NFPA-99 (with ISO 7396-1 as the international counterpart) gives a clear framework, and a short walk through your facility with the right questions exposes most systemic problems. Here are the six checks we recommend every hospital leader personally performs or commissions.',
      },
      { type: 'h2', text: '1. Source equipment and reserves' },
      {
        type: 'p',
        text: 'Stand at the oxygen manifold or plant room and ask: what happens when the primary supply runs out in the middle of the night? There should be an automatic changeover to a secondary supply, a reserve bank sized for the critical load, and pressure gauges that are readable and obviously working. If the answer depends on someone noticing a gauge, the system is not automatic — it is hopeful.',
      },
      { type: 'h2', text: '2. Alarms that reach a human' },
      {
        type: 'p',
        text: 'NFPA-99 requires master and area alarms for line pressure — high and low — at source and on each zone. The single most common audit finding in Bangladeshi facilities is not missing alarms; it is alarms wired to a panel in a locked plant room or an unmanned engineering office. Trace one alarm from sensor to audible signal to a staffed desk, and press the test button yourself.',
      },
      { type: 'h2', text: '3. Zone valves, access and labeling' },
      {
        type: 'p',
        text: 'Zone valves allow sections of the pipeline to be isolated for maintenance without shutting down the whole hospital. Verify three things: the valves are accessible (not behind storage), correctly labeled by zone and gas, and — after any maintenance — demonstrably reopened. A zone valve left closed after filter replacement has caused more clinical emergencies than most equipment failures.',
      },
      { type: 'h2', text: '4. Gas-specific connections' },
      {
        type: 'p',
        text: 'Every outlet and inlet must accept only the correct probe for its gas — the DISS and gas-specific indexing standards exist precisely because cross-connections are lethal. Ask for the most recent cross-connection test report. If the report does not exist or is more than a few years old, this is your highest-priority finding.',
      },
      { type: 'h2', text: '5. Independent verification testing' },
      {
        type: 'p',
        text: 'Pipeline verification — pressure testing, cross-connection testing, outlet performance and alarm function — should be performed by a party independent of the installer, and documented. This mirrors the NFPA-99 verification model. The paperwork matters: it is what licensing authorities ask for first, and what protects the institution after an incident.',
      },
      { type: 'h2', text: '6. People, not just pipes' },
      {
        type: 'ul',
        items: [
          'Is there a named, trained person responsible for the medical gas system — and a deputy?',
          'Are maintenance staff trained on brazing and purge procedure requirements for medical gas work?',
          'Is there a change log for any pipeline modification, however small?',
        ],
      },
      {
        type: 'quote',
        text: 'A medical gas system is one of the few hospital systems that touches every patient, every day, invisibly. Verification is how you make the invisible accountable.',
      },
      {
        type: 'p',
        text: 'These six checks take an afternoon and reveal the condition of the system behind the walls. For facilities preparing for DGHS licensing in Bangladesh — or JCI-style accreditation anywhere — they are also the fastest route from "we think it works" to "we can prove it works."',
      },
    ],
  },
];

export const articleSlugs: string[] = articles.map((a) => a.slug);

export const getArticle = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);
