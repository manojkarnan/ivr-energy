/**
 * IVR Energy Standardized FAQ Knowledge Base
 * Optimized for: Google SEO, Answer Engine Optimization (AEO), Google AI Overviews, 
 * ChatGPT, Gemini, Perplexity, Bing Copilot, and Voice Search.
 *
 * Minimum 5 comprehensive questions & direct answers per topic.
 */

export const FAQ_CATEGORIES = [
  'All',
  'Cost',
  'Subsidy',
  'Net Metering',
  'Installation',
  'Residential',
  'Commercial',
  'Solar Panels',
  'Performance',
  'Finance',
  'Maintenance',
]

export const DEFAULT_FAQS = [
  /* ─────────────────────────────────────────────────────────────
     1. COST & PRICING (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'cost-3kw-chennai',
    category: 'Cost',
    q: 'How much does a 3 kW solar system cost in Chennai?',
    directAnswer: 'A 3 kW on-grid rooftop solar system in Chennai typically costs between ₹1,80,000 and ₹2,20,000 before subsidy, depending on module technology (Mono PERC or TOPCon Bifacial) and inverter brand. After the ₹78,000 PM Surya Ghar central subsidy, your net effective investment is approximately ₹1,02,000 to ₹1,42,000.',
    details: `**Cost Breakdown (Estimated):**
• **Gross Turnkey Price:** ₹1,80,000 – ₹2,20,000 (includes Tier-1 modules, DCR cells, grid-tie inverter, elevated structure, AC/DC DB, bi-directional metering support & CEIG certification).
• **PM Surya Ghar Direct Subsidy:** ₹78,000 (credited directly to your bank account).
• **Net Out-of-Pocket Cost:** ₹1,02,000 – ₹1,42,000.
• **Typical Payback Period:** 3.2 to 4 years based on TANGEDCO domestic tariffs.

*Note: Final pricing depends on structural height requirements, rooftop cable run length, and whether premium bifacial glass-to-glass panels are selected.*`,
    lastUpdated: '2026',
  },
  {
    id: 'cost-5kw-chennai',
    category: 'Cost',
    q: 'How much does a 5 kW solar system cost in Chennai and Tamil Nadu?',
    directAnswer: 'A 5 kW on-grid solar system in Chennai costs between ₹2,90,000 and ₹3,50,000 before subsidy. Under the PM Surya Ghar scheme, the maximum residential central subsidy is capped at ₹78,000, bringing the net effective price to approximately ₹2,12,000 to ₹2,72,000 with complete TANGEDCO net metering approval.',
    details: `**5 kW Investment Overview:**
• **Gross Turnkey Cost:** ₹2,90,000 – ₹3,50,000.
• **Central Subsidy (Capped at 3 kW+):** ₹78,000.
• **Net Investment:** ₹2,12,000 – ₹2,72,000.
• **Daily Generation:** 20 to 22 units (kWh) per day.
• **Monthly EB Savings:** ₹4,500 – ₹6,500 per month (depending on tariff slab).
• **Ideal For:** Large 3BHK/4BHK villas running 2 to 3 air conditioners, water heaters, and EV chargers.`,
    lastUpdated: '2026',
  },
  {
    id: 'cost-10kw-commercial',
    category: 'Cost',
    q: 'How much does a 10 kW commercial solar system cost in Tamil Nadu?',
    directAnswer: 'A 10 kW commercial on-grid solar system in Tamil Nadu costs between ₹5,20,000 and ₹6,50,000 before taxes. While central residential subsidies do not apply to commercial meters, commercial enterprises can claim 40% Accelerated Depreciation (AD) and 18% GST input tax credit, recovering over 35% of system cost in tax savings within year one.',
    details: `**Commercial Financial Benefits:**
• **Turnkey 10 kW EPC Cost:** ₹5,20,000 – ₹6,50,000.
• **Tax Deduction Benefit:** 40% Accelerated Depreciation under Section 32 of Income Tax Act.
• **GST Input Credit:** 18% input credit eligible for registered businesses.
• **Monthly Power Generation:** 1,200 – 1,350 units (kWh).
• **Monthly Tariff Savings:** ₹10,000 – ₹14,000 under TANGEDCO Commercial LT Tariff (Tariff V).
• **ROI / Payback:** 2.8 to 3.5 years.`,
    lastUpdated: '2026',
  },
  {
    id: 'cost-battery-storage',
    category: 'Cost',
    q: 'How much extra does battery storage (Hybrid Solar) cost compared to On-Grid?',
    directAnswer: 'Adding lithium-ion battery storage (Hybrid solar) increases the total system cost by ₹1,20,000 to ₹2,00,000 for a 5 kWh to 10 kWh backup bank. A hybrid solar inverter plus lithium battery ensures uninterrupted electricity during power outages while still exporting surplus daytime generation to TANGEDCO through net metering.',
    details: `**Hybrid Solar Comparison:**
• **On-Grid System (No Battery):** Lowest cost, maximum ROI, shuts off during grid power cuts for lineworker safety.
• **Hybrid System (With Battery):** Provides 4–8 hours of seamless battery backup for lights, fans, refrigerators, and WiFi during grid blackouts.
• **Battery Life:** Modern Lithium Ferro Phosphate (LiFePO4) solar batteries last 10–12 years (4000+ cycles) compared to 3–5 years for lead-acid batteries.`,
    lastUpdated: '2026',
  },
  {
    id: 'cost-hidden-charges-breakdown',
    category: 'Cost',
    q: 'Are there any hidden costs in an IVR Energy turnkey rooftop solar installation?',
    directAnswer: 'No, IVR Energy quotations are 100% all-inclusive with zero hidden costs. Every turnkey proposal includes Tier-1 solar modules, on-grid string inverter, hot-dip galvanized mounting structures, AC/DC distribution boxes with surge arrestors, chemical earthing pits, bi-directional net meter liaison, TANGEDCO application fees, site transport, and installation labor.',
    details: `**What is Included in Turnkey EPC:**
• **Hardware & Modules:** BIS & MNRE approved Tier-1 DCR solar panels.
• **Electrical BOS:** Polycab / Siechem copper DC cables, MC4 connectors, IP65 AC/DC DB boxes.
• **Earthing & Lightning:** Dedicated 3-pit chemical earthing and Class-A lightning arrestor.
• **Utility Coordination:** End-to-end liaison with local TANGEDCO section offices for net meter sanction.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     2. PM SURYA GHAR SUBSIDY (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'subsidy-pm-surya-ghar-78000',
    category: 'Subsidy',
    q: 'Can I get ₹78,000 under PM Surya Ghar Muft Bijli Yojana?',
    directAnswer: 'Yes. Every individual residential homeowner with an active domestic TANGEDCO electricity connection is eligible for a direct bank transfer (DBT) subsidy of up to ₹78,000 for installing a rooftop solar system of 3 kW or higher. The subsidy is credited directly to your bank account within 30 to 45 days after net meter commissioning.',
    details: `**PM Surya Ghar Subsidy Slabs (Updated 2026):**
• **1 kW System:** ₹30,000 central subsidy.
• **2 kW System:** ₹60,000 central subsidy.
• **3 kW to 10 kW System:** ₹78,000 maximum central subsidy.
• **Group Housing Societies (GHS/RWA):** ₹18,000 per kW for common area lighting/pumps (up to 500 kW).

*Eligibility Criteria:* Single domestic consumer connection, rooftop ownership or roof rights, and installation through a registered DISCOM vendor like IVR Energy using DCR-compliant solar modules.`,
    lastUpdated: '2026',
  },
  {
    id: 'subsidy-documents-required',
    category: 'Subsidy',
    q: 'What documents are required to apply for the PM Surya Ghar solar subsidy?',
    directAnswer: 'To apply for the PM Surya Ghar subsidy in Tamil Nadu, you need: 1) Latest TANGEDCO electricity bill copy, 2) Aadhaar card of the electricity account holder, 3) Bank account passbook or cancelled cheque with matching name and IFSC code, and 4) Roof ownership proof or latest property tax receipt.',
    details: `**Step-by-Step Document Checklist:**
1. **Electricity Bill:** Recent paid TANGEDCO consumer receipt showing Service Number.
2. **Aadhaar Card:** Linked to the mobile number used on the National Solar Portal.
3. **Bank Details:** Cancelled cheque or front page of passbook for DBT subsidy transfer.
4. **Passport Photo:** Digital copy for portal registration.
5. **Site Geo-tagged Photo:** Captured by the IVR Energy engineering team during pre-commissioning.

*IVR Energy handles 100% of the National Portal registration, feasibility application, and DISCOM documentation on your behalf.*`,
    lastUpdated: '2026',
  },
  {
    id: 'subsidy-dcr-rules',
    category: 'Subsidy',
    q: 'What is DCR (Domestic Content Requirement) in PM Surya Ghar?',
    directAnswer: 'DCR (Domestic Content Requirement) mandates that both solar photovoltaic cells and solar modules must be manufactured inside India to qualify for the PM Surya Ghar central subsidy. Systems installed with imported non-DCR solar cells are ineligible for government subsidy disbursements.',
    details: `**Key DCR Facts:**
• **Government Compliance:** MNRE rules strictly require ALMM-listed (Approved List of Models and Manufacturers) DCR solar panels.
• **Quality Assurance:** DCR Tier-1 panels adhere to strict BIS and IEC standards with 25-year performance warranties.
• **IVR Energy Standard:** We exclusively deploy certified Tier-1 DCR bifacial and mono PERC modules for all residential subsidy projects.`,
    lastUpdated: '2026',
  },
  {
    id: 'subsidy-apartments-rwa',
    category: 'Subsidy',
    q: 'Can housing societies and apartments (RWA) get PM Surya Ghar subsidies in Chennai?',
    directAnswer: 'Yes. Resident Welfare Associations (RWAs) and Group Housing Societies (GHS) are eligible for a subsidy of ₹18,000 per kW up to a maximum capacity of 500 kW. This subsidy applies to solar systems installed for common facility meters powering lifts, water pumping motors, clubhouses, and corridor lighting.',
    details: `**Apartment Solar Highlights:**
• **Subsidy Rate:** ₹18,000 per kW (up to ₹90 Lakhs for 500 kW plants).
• **Common Bill Reduction:** Slash common maintenance fees by 70% to 90%.
• **EV Charging Hub:** Solar can be integrated directly with residential EV chargers for zero-emission EV charging.`,
    lastUpdated: '2026',
  },
  {
    id: 'subsidy-credit-timeline',
    category: 'Subsidy',
    q: 'How long does it take for the PM Surya Ghar ₹78,000 subsidy to reach my bank account?',
    directAnswer: 'The central subsidy amount is credited via Direct Benefit Transfer (DBT) into your bank account within 30 to 45 calendar days after TANGEDCO completes bidirectional net meter installation, site inspection, and commissioning certificate upload on the National Solar Portal.',
    details: `**Subsidy Disbursement Process:**
• **Stage 1:** Installation and meter commissioning completed by IVR Energy.
• **Stage 2:** Joint inspection and commissioning certificate generation by TANGEDCO AE.
• **Stage 3:** Submission of bank account details and geo-tagged site photographs on National Portal.
• **Stage 4:** Direct DBT release by Ministry of New and Renewable Energy (MNRE).`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     3. TANGEDCO NET METERING (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'net-metering-tangedco-process',
    category: 'Net Metering',
    q: 'How does TANGEDCO net metering work in Tamil Nadu?',
    directAnswer: 'TANGEDCO net metering replaces your existing meter with a bi-directional smart meter that records both electricity imported from the grid and surplus solar electricity exported to the grid. At the end of each billing cycle, you are billed only for the net difference (Import minus Export). Surplus units roll over as bill credits.',
    details: `**Net Metering Mechanism:**
• **Daytime Export:** When your rooftop generates more power than your home uses, surplus units flow into the TNEB grid.
• **Nighttime Import:** At night, your home pulls power from the grid as usual.
• **Bi-Monthly Settlement:** TANGEDCO calculates *Net Consumption = Total Imported kWh - Total Exported kWh*.
• **Banking / Roll-over:** If you generate more than you consume in a billing cycle, positive unit credits are banked and deducted from your subsequent electricity bills.`,
    lastUpdated: '2026',
  },
  {
    id: 'zero-eb-bill-solar',
    category: 'Net Metering',
    q: 'Can rooftop solar reduce my TANGEDCO EB bill to zero?',
    directAnswer: 'Yes. An accurately sized rooftop solar system can reduce your energy consumption charges to zero by generating 100% of your bimonthly units. However, your electricity bill will still carry a small non-negotiable statutory fixed charge (typically ₹50 to ₹150 per billing cycle) as mandated by TNERC for grid connection maintenance.',
    details: `**How Zero-Bill is Achieved:**
• **System Sizing:** If your bimonthly consumption is 800 units, a 3 kW to 4 kW system generating ~400 units/month (800 units/bimonthly) covers all unit charges.
• **Tariff Slabs:** Tamil Nadu domestic tariffs increase steeply above 400 and 500 units; solar eliminates these highest-cost slab rates first.
• **Fixed Charges:** Mandatory minimum DISCOM meter rent and fixed charges remain on the bill.`,
    lastUpdated: '2026',
  },
  {
    id: 'net-metering-approval-time',
    category: 'Net Metering',
    q: 'How long does TANGEDCO net metering approval take in Chennai?',
    directAnswer: 'TANGEDCO net metering approval and bi-directional meter installation generally take 15 to 30 working days from the date of online application submission on the National Solar Portal and DISCOM portal. IVR Energy liaises directly with local Assistant Engineers (AE) and executive engineers to expedite inspection and meter commissioning.',
    details: `**Milestone Timeline:**
• **Day 1–3:** Site feasibility study and portal application filing.
• **Day 5–10:** DISCOM technical feasibility clearance & load sanction.
• **Day 11–15:** Physical system installation and safety earthing completion.
• **Day 16–25:** Joint inspection by TANGEDCO field engineer & CEIG (if applicable).
• **Day 25–30:** Bi-directional net meter testing, installation, and final synchronization.`,
    lastUpdated: '2026',
  },
  {
    id: 'net-metering-vs-gross-metering',
    category: 'Net Metering',
    q: 'What is the difference between Net Metering and Gross Metering in Tamil Nadu?',
    directAnswer: 'Net Metering allows residential consumers to consume generated solar electricity on-site first and export only the surplus, offsetting high retail electricity tariff slabs on a 1:1 basis. In contrast, Gross Metering exports 100% of generated solar electricity directly to the utility at a fixed feed-in tariff without on-site self-consumption.',
    details: `**Comparison Overview:**
• **Net Metering (Residential):** Highest savings because every solar unit offsets ₹4.50 to ₹9.00 retail domestic tariff units.
• **Gross Metering / Net Feed-in (Commercial):** Suitable for large commercial and industrial consumers where utility rules restrict net-metering capacity.`,
    lastUpdated: '2026',
  },
  {
    id: 'surplus-banked-units-tangedco',
    category: 'Net Metering',
    q: 'What happens to excess banked solar units at the end of the year in Tamil Nadu?',
    directAnswer: 'Surplus solar electricity exported to TANGEDCO is banked as energy credits and automatically carried forward across bimonthly billing cycles to offset higher electricity use during summer months. At the end of the annual settlement cycle, any unutilized surplus units are compensated at the TNERC approved rate.',
    details: `**Energy Banking Rules:**
• **Bimonthly Carryover:** Energy credits roll over seamlessly from one billing cycle to the next.
• **Peak Summer Offset:** Units banked in breezy months are used to offset heavy air conditioning loads during April–June.
• **Financial Settlement:** Settled annually by TANGEDCO as per prevailing TNERC solar tariff orders.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     4. RESIDENTIAL SOLAR & SYSTEM SIZING (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'generation-3kw-chennai',
    category: 'Residential',
    q: 'How many units does a 3 kW solar system generate per day in Chennai?',
    directAnswer: 'A 3 kW solar system in Chennai generates an average of 12 to 14 units (kWh) of electricity per day, which totals 360 to 420 units per month and approximately 4,500 to 5,000 units per year. Chennai receives over 300 sunny days annually with high solar insolation of 5.2 to 5.8 kWh/m²/day.',
    details: `**Generation by Season in Chennai:**
• **Peak Months (Feb – June):** 13 to 15.5 units per day.
• **Monsoon Months (Oct – Dec):** 9 to 11.5 units per day (diffused solar radiation).
• **Annual Average:** ~4.3 to 4.7 peak sun hours daily.
• **Annual EB Bill Savings:** ₹25,000 to ₹38,000 depending on consumption slabs.`,
    lastUpdated: '2026',
  },
  {
    id: 'roof-area-3kw-solar',
    category: 'Residential',
    q: 'How much roof area is required for a 3 kW solar panel installation?',
    directAnswer: 'A 3 kW rooftop solar system requires approximately 200 to 240 square feet (18 to 22 square meters) of shadow-free terrace or roof space. Modern 550W+ high-efficiency mono PERC or TOPCon modules require only 6 panels to achieve 3.3 kW capacity, minimizing the footprint on your terrace.',
    details: `**Space Sizing Guide:**
• **Panel Dimensions:** Modern 550Wp modules measure ~2.27m x 1.13m (~27.5 sq ft per panel).
• **Number of Panels:** 6 panels (550W = 3.3 kWp).
• **Shadow Clearance:** Additional 20–30 sq ft buffer is provided to avoid shadows from water tanks, parapet walls, and stair rooms.
• **Elevated Structures:** If you want to use your terrace for walking or gardening, IVR Energy builds high-clearance (8–10 ft) pergola-style structures.`,
    lastUpdated: '2026',
  },
  {
    id: 'roof-area-5kw-solar',
    category: 'Residential',
    q: 'How much roof area is required for a 5 kW solar panel installation?',
    directAnswer: 'A 5 kW solar installation requires roughly 350 to 400 square feet (32 to 37 square meters) of unshaded rooftop area. Using 9 to 10 high-wattage 550W+ Tier-1 panels, IVR Energy configures the array in compact rows oriented true South at a 12° to 15° tilt angle for optimal Chennai irradiance.',
    details: `**5 kW Rooftop Requirements:**
• **Array Footprint:** ~300 sq ft for module surface + 80 sq ft for maintenance walkways.
• **Panel Count:** 9 panels @ 580W (5.22 kWp) or 10 panels @ 550W (5.5 kWp).
• **Structural Options:** Standard flat-roof flush mount, elevated super-structure, or pre-engineered shed mounting.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-worth-it-chennai',
    category: 'Residential',
    q: 'Is rooftop solar worth it in Chennai?',
    directAnswer: 'Yes, rooftop solar is exceptionally profitable in Chennai due to high solar irradiance (300+ sunny days/year), rising TANGEDCO power tariffs, and the ₹78,000 PM Surya Ghar central subsidy. Most residential installations achieve a 25% to 32% annual return on investment (ROI), fully recovering capital within 3.5 years.',
    details: `**25-Year Value Proposition:**
• **Capital Payback:** 3 to 4 years.
• **Free Clean Electricity:** 21+ years of virtually free power after payback.
• **Total 25-Year Savings:** ₹7,50,000 to ₹14,00,000+ for a typical 3 kW to 5 kW home.
• **Property Value:** Solar-equipped residences command higher rental yields and resale valuations across Chennai and Coimbatore.`,
    lastUpdated: '2026',
  },
  {
    id: 'add-battery-storage-later',
    category: 'Residential',
    q: 'Can I add battery storage (Hybrid Solar) to my existing on-grid solar system in the future?',
    directAnswer: 'Yes. If you install a hybrid-ready on-grid inverter or an AC-coupled battery management system, you can easily integrate lithium-ion (LiFePO4) battery storage at a later date. This provides complete power backup during load shedding while continuing to export surplus power to TANGEDCO via net metering.',
    details: `**Future Upgrade Path:**
• **AC-Coupled Battery Storage:** Retrofit battery banks to any existing on-grid solar inverter without altering existing wiring.
• **Lithium LiFePO4 Chemistry:** 6,000+ lifecycle charges with 10-year design lifespan and rapid charging.
• **Automatic Changeover:** Millisecond switchover during power outages ensures zero interruption to computers, lights, and appliances.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     5. INSTALLATION & ENGINEERING (6 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'installation-time-solar',
    category: 'Installation',
    q: 'How long does solar installation take from start to finish?',
    directAnswer: 'The physical rooftop installation of a residential 3 kW to 10 kW solar system takes only 1 to 3 days. The complete end-to-end process—including engineering site survey, DISCOM documentation, TANGEDCO net meter commissioning, and subsidy application—takes between 20 and 35 calendar days.',
    details: `**Phase-by-Phase Timeline:**
• **Day 1:** Free on-site shadow analysis & roof structural inspection.
• **Day 2–4:** Detailed design drawing & National Portal application submission.
• **Day 10–15:** Material delivery to site (hot-dip galvanized structure, panels, inverters).
• **Day 16–18:** Rooftop structural fabrication, module clamping, inverter wiring & earthing.
• **Day 20–30:** TANGEDCO net meter testing, installation, and formal grid sync.`,
    lastUpdated: '2026',
  },
  {
    id: 'elevated-structure-terrace',
    category: 'Installation',
    q: 'Can I install solar panels on an elevated structure to keep using my terrace?',
    directAnswer: 'Yes. IVR Energy specializes in custom elevated superstructures (8 to 10 feet clearance) using heavy-duty hot-dip galvanized (GI) or pre-galvanized structural steel. This creates a shaded pergola canopy over your roof, keeping 100% of your terrace usable for recreation, gardening, or walking.',
    details: `**Benefits of High-Clearance Structures:**
• **Full Terrace Usability:** Walk, dry clothes, host gatherings, or set up rooftop gardens freely underneath.
• **Thermal Insulation:** The solar canopy shades your roof slab, lowering top-floor indoor room temperatures by 3°C to 5°C during hot Chennai summers.
• **Wind Load Tested:** Engineered to withstand coastal Chennai wind speeds of up to 170 km/h (cyclone resistant).`,
    lastUpdated: '2026',
  },
  {
    id: 'roof-damage-waterproofing',
    category: 'Installation',
    q: 'Will solar panel installation damage my roof or cause water leakage?',
    directAnswer: 'No. When installed by certified EPC professionals like IVR Energy, solar mounting structures will not cause roof leaks or structural damage. We use pre-cast concrete ballast blocks for drill-free installations, or chemical anchor fasteners sealed with industrial UV-resistant waterproofing elastomeric compounds.',
    details: `**Waterproofing Safety Measures:**
• **Ballast Mounting (Zero Piercing):** Heavy pre-cast concrete footings rest securely on the terrace without penetrating the waterproof slab.
• **Chemical Anchoring:** For elevated high-mast structures, anchor bolts are treated with multi-layer chemical epoxy grouting and bitumen waterproofing coatings.
• **Weight Distribution:** A 3 kW system exerts only 12–15 kg/m² of static load, well below residential concrete slab design thresholds (250+ kg/m²).`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-cyclone-wind-resilience-chennai',
    category: 'Installation',
    q: 'Can rooftop solar panels withstand heavy cyclones and strong coastal winds in Chennai?',
    directAnswer: 'Yes. IVR Energy designs and installs high-tensile, hot-dip galvanized steel mounting structures (80µm zinc coating) certified to withstand severe coastal cyclone winds of up to 160 to 180 km/h. Systems are secured using heavy-duty chemical anchor bolts and marine-grade SS304/SS316 fasteners tested against Vardah and Michaung level storms in Chennai.',
    details: `**Structural Engineering Standards:**
• **Wind Load Testing:** Structural analysis calibrated for IS 875 Part-3 wind zones.
• **Corrosion Protection:** 80-micron hot-dip galvanizing protects against high coastal humidity and saline air.
• **Waterproof Roof Anchoring:** Specialized non-invasive ballast mounting or triple-sealed chemical fasteners prevent rooftop water leakage.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-earthing-lightning-protection',
    category: 'Installation',
    q: 'How does solar earthing and lightning protection protect my home and appliances?',
    directAnswer: 'Every IVR Energy rooftop solar plant is protected by a dedicated 3-point chemical pipe earthing system (separate pits for Solar DC Array, Inverter AC side, and Lightning Arrestor) paired with Type-II AC/DC Surge Protection Devices (SPDs). This comprehensive setup safely dissipates transient electrical surges and lightning strikes into the ground, safeguarding your home wiring and sensitive appliances.',
    details: `**Protection Infrastructure:**
• **3 Independent Earthing Pits:** Maintains low impedance (< 5 Ohms) for maximum safety.
• **Early Streamer Emission (ESE) Lightning Arrestor:** Wide protective radius over the entire building roof.
• **Surge Protection Devices (SPDs):** Dual-layer protection against grid voltage spikes and switching transients.`,
    lastUpdated: '2026',
  },
  {
    id: 'why-choose-ivr-energy',
    category: 'Installation',
    q: 'Why should I choose IVR Energy for rooftop solar EPC in Chennai & Tamil Nadu?',
    directAnswer: 'IVR Energy is a premier Tamil Nadu Solar EPC contractor with 12+ years of engineering experience, 15+ MW installed, 180+ happy clients, and 250+ delivered projects. We provide 100% turnkey execution—from high-clearance structural engineering and Tier-1 DCR modules to guaranteed PM Surya Ghar subsidy clearance and 5-year workmanship warranties.',
    details: `**The IVR Energy Advantage:**
• **12+ Years Field Expertise:** Dedicated in-house team of certified solar electrical and structural engineers.
• **Tier-1 Hardware Exclusively:** TOPCon Bifacial glass-to-glass modules, smart WiFi inverters, and hot-dip galvanized mounting structures.
• **End-to-End Government Approvals:** Complete handling of TANGEDCO Net Metering, CEIG safety inspections, and National Portal subsidies.
• **Proactive After-Sales Care:** Fast response service centers in Chennai and Hosur.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     6. SOLAR PANELS & TECHNOLOGY (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'best-panel-chennai-weather',
    category: 'Solar Panels',
    q: 'Which solar panel is best for Chennai weather and coastal conditions?',
    directAnswer: 'N-Type TOPCon Bifacial glass-to-glass solar panels are the best choice for Chennai weather. They feature a low temperature coefficient (-0.30%/°C) which ensures high energy output during extreme summer heat, while dual-glass encapsulation provides superior protection against coastal humidity, salinity, and potential induced degradation (PID).',
    details: `**Why TOPCon Bifacial Excels in Chennai:**
• **High Heat Tolerance:** Unlike older Polycrystalline panels that lose efficiency above 35°C, N-Type TOPCon panels maintain peak generation in 42°C+ summer peaks.
• **Rear-Side Generation:** Generates up to 10% to 25% extra energy from reflected sunlight bouncing off your white terrace floor.
• **Corrosion Resistance:** Framed dual-glass construction prevents corrosion from humid salt-laden sea air in coastal areas like ECR, OMR, and Ennore.`,
    lastUpdated: '2026',
  },
  {
    id: 'panel-lifespan-warranty',
    category: 'Solar Panels',
    q: 'How long do solar panels last, and what warranties are provided?',
    directAnswer: 'Tier-1 solar panels have a design lifespan of 30 to 35 years. They come with two comprehensive warranties: a 10 to 12-year product manufacturing warranty covering defects, and a 25 to 30-year linear power output performance warranty guaranteeing at least 80% to 87.4% generation efficiency at year 25.',
    details: `**Warranty Standards Provided by IVR Energy:**
• **Solar Modules:** 12-year product warranty + 25 to 30-year linear generation guarantee.
• **Solar Inverter:** 5 to 10-year manufacturer replacement warranty (extendable to 15 years).
• **Mounting Structure:** 10-year anti-corrosion structural warranty.
• **IVR Energy Workmanship:** Comprehensive 5-year free maintenance and service guarantee.`,
    lastUpdated: '2026',
  },
  {
    id: 'monocrystalline-vs-polycrystalline',
    category: 'Solar Panels',
    q: 'What is the difference between Mono PERC and TOPCon solar panels?',
    directAnswer: 'N-Type TOPCon is the latest generation of solar cell technology, offering higher module efficiency (22.5%+ vs 21.0% for Mono PERC), zero Light-Induced Degradation (LID), superior low-light generation on cloudy days, and slower annual degradation (0.4% per year vs 0.55% for Mono PERC).',
    details: `**Technology Comparison:**
• **Efficiency:** TOPCon (22.0% – 23.0%) vs Mono PERC (20.5% – 21.5%).
• **Temperature Coefficient:** TOPCon (-0.30%/°C) loses significantly less power under intense sunlight than Mono PERC (-0.35%/°C).
• **Bifaciality Factor:** TOPCon captures 80% rear-side power vs 70% for Mono PERC bifacial.`,
    lastUpdated: '2026',
  },
  {
    id: 'bifacial-dual-glass-benefits',
    category: 'Solar Panels',
    q: 'What are the main advantages of Bifacial Dual-Glass solar panels?',
    directAnswer: 'Bifacial dual-glass panels capture sunlight from both the front and rear surfaces, producing up to 10% to 25% extra electricity from light reflected off white terrace floors. The dual-glass design eliminates polymer backsheet degradation, provides superior fire resistance, and prevents moisture and PID degradation in coastal environments.',
    details: `**Key Advantages:**
• **Extra Yield:** 10% to 25% bifacial gain with elevated mounting.
• **Durability:** Dual tempered glass encapsulates solar cells with zero risk of micro-cracks.
• **Zero Backsheet Yellowing:** Glass is impervious to UV damage, extending operational lifespan beyond 30 years.`,
    lastUpdated: '2026',
  },
  {
    id: 'shadow-analysis-drone-mapping',
    category: 'Solar Panels',
    q: 'How does IVR Energy evaluate rooftop shadow and optimize panel placement?',
    directAnswer: 'IVR Energy uses advanced 3D sun-path simulation software and site mapping to trace shadow patterns across all 365 days of the year. Panels are positioned outside shadow zones caused by water tanks or trees, and string inverters with multiple independent MPPT trackers are configured to ensure maximum generation output.',
    details: `**Optimization Protocol:**
• **3D Solar Simulation:** Helioscope and PVsyst shadow path modeling.
• **Multi-MPPT Inverters:** Independent string tracking so partial shade on one string does not affect other panels.
• **Optimized Tilt & Azimuth:** True South orientation with a 12° to 15° tilt angle optimized for Tamil Nadu latitude.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     7. PERFORMANCE, GENERATION & POWER CUTS (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'power-cut-solar-behavior',
    category: 'Performance',
    q: 'What happens to solar panels during a power cut or grid outage?',
    directAnswer: 'On standard on-grid solar systems, inverters automatically shut down within milliseconds during a power cut for anti-islanding safety (protecting TANGEDCO lineworkers repairing the grid). If you require continuous electricity during power outages, IVR Energy installs Hybrid Solar systems with lithium battery backup.',
    details: `**System Types & Power Outage Behavior:**
1. **On-Grid System:** Shuts down during power cuts to comply with IEEE 1547 and CEA safety regulations. Resumes generation automatically when grid power returns.
2. **Hybrid System with Battery:** Automatically switches to off-grid battery mode in under 10 milliseconds, powering lights, fans, computers, TVs, and refrigerators without interruption.
3. **Micro-Inverter / Solar-DG Sync:** For commercial facilities, solar can synchronize with existing diesel generators (DG) to cut fuel consumption by up to 70%.`,
    lastUpdated: '2026',
  },
  {
    id: 'cloudy-rainy-generation',
    category: 'Performance',
    q: 'Do solar panels generate electricity on cloudy, rainy, or overcast days?',
    directAnswer: 'Yes. Solar panels generate electricity on cloudy and rainy days by capturing diffused sunlight and ultraviolet spectrum radiation. While output drops to 15% to 35% of peak capacity during heavy rain, modern N-Type panels still produce meaningful units to offset household consumption.',
    details: `**Monsoon Generation Facts:**
• **Diffused Light Capture:** Photovoltaic cells do not require direct heat; they convert light photons into electricity.
• **Natural Cleaning:** Heavy rainfall cleans dust and pollution buildup from module surfaces, boosting panel efficiency immediately once clear skies return.
• **Net Metering Balancing:** Surplus solar units banked during bright summer months offset the minor dip in monsoon generation.`,
    lastUpdated: '2026',
  },
  {
    id: 'nighttime-electricity-solar',
    category: 'Performance',
    q: 'How do I get electricity at night after installing solar panels?',
    directAnswer: 'At night, your home seamlessly draws power from the regular TANGEDCO grid as before. Because your daytime surplus solar generation was exported into the grid through net metering, you use up your banked energy credits at night, effectively paying zero or near-zero for nighttime power consumption.',
    details: `**Two Nighttime Energy Options:**
• **On-Grid Net Metering:** No batteries required. Grid acts as your infinite virtual storage bank.
• **Off-Grid / Hybrid Battery:** Energy stored in on-site lithium batteries powers your home at night, giving total independence from the utility grid.`,
    lastUpdated: '2026',
  },
  {
    id: 'extreme-heat-generation-impact',
    category: 'Performance',
    q: 'How does extreme summer heat affect solar panel generation in Chennai?',
    directAnswer: 'While high sunlight intensity maximizes solar production, high ambient heat slightly reduces silicon solar cell voltage. IVR Energy installs N-Type TOPCon panels with an industry-leading low temperature coefficient (-0.30%/°C), resulting in up to 4% higher summer generation compared to conventional solar panels in 40°C+ Chennai weather.',
    details: `**Thermal Management:**
• **Low Temperature Coefficient:** Minimal loss of efficiency during hot summer afternoons.
• **Ventilated Elevated Mounting:** 8–10 ft elevated mounting allows natural breeze convection underneath panels, keeping them cooler and generating more power.`,
    lastUpdated: '2026',
  },
  {
    id: 'annual-solar-degradation-rate',
    category: 'Performance',
    q: 'What is the annual degradation rate of Tier-1 solar panels?',
    directAnswer: 'Tier-1 N-Type TOPCon solar panels experience only ~1.0% degradation in the first year (with zero Light-Induced Degradation) and less than 0.40% linear degradation per year for the next 29 years. This guarantees that your solar system will still deliver over 87.4% of its original rated generation at Year 25.',
    details: `**30-Year Performance Guarantee:**
• **Year 1:** ≥ 99.0% power output.
• **Year 10:** ≥ 95.4% power output.
• **Year 25:** ≥ 89.4% power output.
• **Year 30:** ≥ 87.4% power output.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     8. COMMERCIAL & INDUSTRIAL SOLAR (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'commercial-solar-benefits',
    category: 'Commercial',
    q: 'What are the main financial benefits of rooftop solar for commercial and industrial businesses in Tamil Nadu?',
    directAnswer: 'Commercial and industrial (C&I) businesses benefit from: 1) Reducing high commercial electricity tariffs (₹8 to ₹12/unit) to an amortized solar cost of ₹2.20/unit, 2) 40% Accelerated Depreciation tax deduction in year one, 3) 18% GST input credit, and 4) Fulfilling corporate ESG and green supply chain mandates.',
    details: `**C&I Solar Financial Metrics:**
• **Levelized Cost of Energy (LCOE):** ₹2.20 – ₹2.50 per kWh over 25 years.
• **Internal Rate of Return (IRR):** 28% to 36% per annum.
• **Payback Period:** Typically 2.5 to 3.5 years.
• **Open Access / Captive MW Solar:** Available for energy-intensive manufacturing units consuming 1 MW or higher.`,
    lastUpdated: '2026',
  },
  {
    id: 'accelerated-depreciation-solar',
    category: 'Commercial',
    q: 'How does the 40% Accelerated Depreciation tax benefit work for solar installations?',
    directAnswer: 'Under Section 32 of the Indian Income Tax Act, commercial businesses and corporations can claim 40% Accelerated Depreciation (AD) on the total capital cost of a commercial solar power plant in the first year of commissioning, significantly lowering taxable corporate profits and saving up to 30% in corporate tax.',
    details: `**Example Tax Calculation:**
• **Commercial 50 kW System Cost:** ₹25,00,000.
• **40% Depreciation Value:** ₹10,00,000 deducted from taxable company profits.
• **Tax Saved (at 25% Corporate Tax Slab + Surcharge):** ~₹2,50,000+ in direct tax savings in Year 1 alone.`,
    lastUpdated: '2026',
  },
  {
    id: 'commercial-open-access-tamil-nadu',
    category: 'Commercial',
    q: 'Can commercial establishments and factories install Open Access solar in Tamil Nadu?',
    directAnswer: 'Yes. Commercial and industrial facilities with a contracted load demand of 100 kW or higher can procure green solar power through Green Energy Open Access in Tamil Nadu. This allows businesses without adequate rooftop space to source cheap, reliable solar power from off-site solar farms.',
    details: `**Open Access Benefits:**
• **Saves 30% to 50% on Tariff:** Procure power at ₹4.50 to ₹5.50/unit vs ₹8.50 to ₹12.00/unit commercial grid tariff.
• **Long-Term PPAs:** Lock in fixed electricity rates for 15 to 25 years against escalating DISCOM tariffs.
• **Zero On-Site Space Needed:** Solar is generated at utility-scale farms and wheeled through the TANGEDCO grid.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-dg-synchronization',
    category: 'Commercial',
    q: 'Can rooftop solar synchronize with Diesel Generators (DG) in commercial facilities?',
    directAnswer: 'Yes. IVR Energy integrates smart Solar-DG synchronization controllers that dynamically modulate solar inverter power to match active plant loads alongside running diesel generators. This prevents reverse power flow into the generator while reducing diesel fuel consumption by up to 60% to 75%.',
    details: `**Solar-DG Sync Features:**
• **Fuel Savings:** Cuts costly diesel consumption (₹25–₹30/kWh) down to clean solar power.
• **Zero Generator Tripping:** Reverse power protection ensures generator safety under rapid load changes.
• **Automatic Grid Switchover:** Seamlessly manages transitions between grid, solar, and generator power.`,
    lastUpdated: '2026',
  },
  {
    id: 'commercial-opex-resco-model',
    category: 'Commercial',
    q: 'Are zero-investment OPEX / RESCO models available for commercial solar projects?',
    directAnswer: 'Yes. For qualified commercial and industrial clients consuming 50 kW or more, IVR Energy provides OPEX/RESCO (Power Purchase Agreement - PPA) models. Under OPEX, the solar power plant is funded, installed, and maintained with zero upfront capital expenditure, and you only pay for the clean solar electricity consumed at a 20% to 40% discount to grid tariffs.',
    details: `**OPEX Model Highlights:**
• **Zero Upfront Capex:** No capital investment required from your company.
• **Immediate Savings:** Pay a discounted per-unit rate from day one of commissioning.
• **Turnkey O&M Included:** Comprehensive operations and maintenance managed by the investor for the full PPA term.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     9. FINANCING, LOANS & ROI (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'solar-loan-emi-options',
    category: 'Finance',
    q: 'Are low-interest bank loans available for PM Surya Ghar rooftop solar in Tamil Nadu?',
    directAnswer: 'Yes. Under the PM Surya Ghar scheme, leading public and private banks—including SBI, Canara Bank, Union Bank, PNB, and HDFC—provide collateral-free rooftop solar loans up to ₹2,00,000 at a low concessional interest rate of approximately 7% per annum for up to 7 to 10 years.',
    details: `**Solar Loan Scheme Highlights:**
• **Loan Amount:** Up to ₹2,00,000 for residential systems up to 3 kW.
• **Concessional Interest Rate:** ~7.00% to 7.15% p.a.
• **Collateral:** Zero collateral or security required.
• **EMI vs EB Savings:** The monthly EMI (approx ₹1,200 – ₹1,800) is typically lower than your previous monthly TANGEDCO electricity bill, making the system cash-flow positive from month one.`,
    lastUpdated: '2026',
  },
  {
    id: 'payback-period-solar',
    category: 'Finance',
    q: 'What is the average payback period for a residential rooftop solar system in Chennai?',
    directAnswer: 'The average payback period for a residential rooftop solar system in Chennai is 3.2 to 4.0 years with the PM Surya Ghar subsidy. After the payback period, the solar power plant generates 100% free green electricity for the remaining 21 to 26 years of its operating life.',
    details: `**Sample 3 kW Financial Model:**
• **Turnkey Investment:** ₹1,90,000.
• **PM Surya Ghar Subsidy:** -₹78,000.
• **Net Outflow:** ₹1,12,000.
• **Annual Electricity Bill Savings:** ~₹32,000 per year.
• **Payback Period:** ₹1,12,000 ÷ ₹32,000 = **3.5 Years**.
• **25-Year Net Profit:** Over ₹7,00,000.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-emi-vs-eb-bill',
    category: 'Finance',
    q: 'How does solar loan EMI compare to my current monthly TANGEDCO electricity bill?',
    directAnswer: 'For a 3 kW solar system with a net cost of approximately ₹1,12,000 after subsidy, the monthly bank EMI is around ₹1,400 to ₹1,700 for 7 years. Because the system eliminates a ₹3,000 to ₹4,000 bimonthly electricity bill, your total monthly utility expense decreases immediately from month one.',
    details: `**Cash-Flow Example:**
• **Pre-Solar Monthly EB Expense:** ₹2,500/month.
• **Post-Solar Solar Loan EMI:** ₹1,450/month.
• **New Post-Solar EB Bill:** ~₹100/month (fixed statutory meter charges).
• **Net Monthly In-Pocket Savings:** ₹950/month while paying off the asset.`,
    lastUpdated: '2026',
  },
  {
    id: 'property-value-solar-installation',
    category: 'Finance',
    q: 'Does installing rooftop solar increase my residential or commercial property value?',
    directAnswer: 'Yes. Properties equipped with commissioned rooftop solar systems and active TANGEDCO net metering command higher rental yields and up to 3% to 5% higher property valuations in Chennai. Prospective homebuyers and commercial tenants value buildings with near-zero ongoing electricity bills and green energy infrastructure.',
    details: `**Real Estate Benefits:**
• **Higher Rental Yield:** Tenants prefer homes where air conditioning and water heaters operate with zero EB bill shock.
• **Green Building Certification:** Qualifies buildings for IGBC and GRIHA green rating certifications.
• **Future-Ready Asset:** Built-in infrastructure ready for EV charging and backup power.`,
    lastUpdated: '2026',
  },
  {
    id: 'gst-input-tax-credit-solar',
    category: 'Finance',
    q: 'Can businesses claim 18% GST Input Tax Credit on solar equipment purchases?',
    directAnswer: 'Yes. Any GST-registered enterprise or commercial entity investing in an on-grid or captive solar power plant can claim 100% of the 18% GST charged on solar modules, inverters, and turnkey EPC services as an Input Tax Credit (ITC), immediately reducing tax cash outflows.',
    details: `**GST Benefit Calculation:**
• **System Invoiced Value:** ₹10,00,000 + 18% GST (₹1,80,000).
• **GST Input Credit Claimed:** Full ₹1,80,000 offset against company output GST liabilities.
• **Effective Capex:** Only ₹10,00,000.`,
    lastUpdated: '2026',
  },

  /* ─────────────────────────────────────────────────────────────
     10. MAINTENANCE & OPERATIONS (5 Questions)
     ───────────────────────────────────────────────────────────── */
  {
    id: 'solar-panel-cleaning-frequency',
    category: 'Maintenance',
    q: 'How often should rooftop solar panels be cleaned in Chennai?',
    directAnswer: 'Rooftop solar panels in Chennai should be cleaned once every 15 to 30 days using plain water and a soft microfibre mop or squeegee. Regular cleaning removes airborne dust, soot, and bird droppings, restoring 5% to 15% of generation efficiency lost due to soiling.',
    details: `**Best Cleaning Practices:**
• **Timing:** Clean panels in the early morning (before 8:00 AM) or late evening to prevent thermal shock to hot solar glass.
• **Water Type:** Use clean, low-TDS tap water. Never use abrasive chemical detergents, harsh acids, or metal brushes.
• **Automated Sprinklers:** IVR Energy offers optional automated pressurized water sprinkler systems for effortless hands-free cleaning.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-inverter-maintenance',
    category: 'Maintenance',
    q: 'What maintenance is required for solar inverters and electrical components?',
    directAnswer: 'Solar inverters require minimal maintenance beyond keeping ventilation heat sinks dust-free and verifying AC/DC surge protection devices (SPDs) every 6 to 12 months. All modern inverters installed by IVR Energy include built-in WiFi telemetry with automated smartphone alerts for faults or performance drops.',
    details: `**Annual Maintenance Checklist:**
• **DC String Voltage Check:** Measure open-circuit voltage (Voc) and operating current (Isc).
• **Earthing Pit Resistance:** Verify earth resistance is strictly below 5 Ohms.
• **Thermal Scanning:** Infrared thermography to identify any loose electrical connections or micro-hotspots.
• **IVR Energy O&M Contracts:** We provide comprehensive annual maintenance contracts (AMC) for worry-free operation.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-damage-warranty',
    category: 'Maintenance',
    q: 'What happens if a solar panel gets damaged or cracked?',
    directAnswer: 'If a solar panel suffers physical damage from external impact, it can be quickly isolated and replaced individually without disrupting the rest of the solar array. For manufacturing defects or premature performance degradation, Tier-1 panels include a 25 to 30-year linear performance warranty, and IVR Energy provides complete liaison support for warranty claims and replacements.',
    details: `**Warranty & Replacement Process:**
• **Individual Module Replacement:** Bypass diodes allow individual module swaps without dismantling the structure.
• **25-30 Year Performance Guarantee:** Ensures maximum generation threshold is maintained.
• **Prompt Local Service:** In-house technicians in Chennai ensure rapid replacement and zero downtime.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-panel-monitoring-app',
    category: 'Maintenance',
    q: 'How do I monitor my daily solar power generation on my mobile phone?',
    directAnswer: 'Every IVR Energy rooftop solar system is equipped with an integrated smart cloud WiFi or 4G data logger. Through a user-friendly mobile app (available for Android & iOS), you can view live real-time generation, daily and monthly unit production (kWh), monetary electricity savings, and instant system health alerts from anywhere.',
    details: `**Mobile App Features:**
• **Live Power Graph:** Track peak generation hours throughout the day.
• **Historical Reports:** Compare bimonthly generation against your TANGEDCO EB consumption.
• **Fault Detection:** Immediate push notifications in case of grid trips or inverter faults.`,
    lastUpdated: '2026',
  },
  {
    id: 'solar-amc-preventive-maintenance',
    category: 'Maintenance',
    q: 'Do rooftop solar power plants require an Annual Maintenance Contract (AMC)?',
    directAnswer: 'While rooftop solar power plants have zero moving parts and require little daily intervention beyond basic washing, an Annual Maintenance Contract (AMC) is recommended to ensure peak generation efficiency. IVR Energy offers preventive AMC plans covering bi-annual electrical inspections, earthing pit resistance tests, structural bolt re-torqueing, and infrared thermal imaging.',
    details: `**IVR Energy AMC Scope:**
• **Deep Panel Cleaning & Desoiling:** Specialized low-pressure cleaning.
• **Health Audits:** Earth pit resistance checks (< 5 Ohms), string voltage measurements, and inverter diagnostics.
• **Priority Support:** Guaranteed on-site technician visit within 24 to 48 hours.`,
    lastUpdated: '2026',
  },
]

/**
 * Backward compatible mapped list with combined Question & Answer
 */
export const COMBINED_FAQS = DEFAULT_FAQS.map(faq => ({
  q: faq.q,
  a: `${faq.directAnswer}\n\n${faq.details}`,
  category: faq.category,
  id: faq.id,
  directAnswer: faq.directAnswer,
  details: faq.details,
  lastUpdated: faq.lastUpdated,
}))
