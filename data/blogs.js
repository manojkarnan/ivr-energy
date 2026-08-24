export const BLOG_CATEGORIES = [
  'All',
  'Subsidy & Policy',
  'Commercial & Industrial',
  'Rooftop Solar',
  'Technology & Innovation',
  'Cost & Savings'
]

export const BLOG_POSTS = [
  {
    id: 'pm-surya-ghar-subsidy-guide-tamilnadu-2025',
    slug: 'pm-surya-ghar-subsidy-guide-tamilnadu-2025',
    title: 'PM Surya Ghar Muft Bijli Yojana: Complete Subsidy & Application Guide (2025–2026)',
    excerpt: 'Detailed step-by-step roadmap to claim up to ₹78,000 government subsidy under PM Surya Ghar Yojana in Tamil Nadu with TANGEDCO net-metering.',
    category: 'Subsidy & Policy',
    readTime: '6 min read',
    publishedAt: '2026-02-18',
    formattedDate: 'Feb 18, 2026',
    author: {
      name: 'Er. K. Manoj Kumar',
      role: 'Chief Solar EPC Engineer',
      avatar: '/projects/svs-1mw/1.jpg'
    },
    coverImage: '/projects/svs-1mw/1.jpg',
    featured: true,
    tags: ['PM Surya Ghar', 'TANGEDCO', 'Solar Subsidy', 'Rooftop Solar', 'Tamil Nadu'],
    keyTakeaways: [
      'Central government subsidy covers up to ₹78,000 for residential rooftop solar systems up to 3 kW.',
      'Applications must be processed through the official National Portal for Rooftop Solar (pmsuryaghar.gov.in).',
      'Net-metering integration with TANGEDCO is required for zero-bill credit adjustments.',
      'IVR Energy provides complete end-to-end documentation, vendor coordination, and CEIG/TNEB commissioning support.'
    ],
    sections: [
      {
        heading: 'Understanding PM Surya Ghar: Muft Bijli Yojana',
        content: `The **PM Surya Ghar: Muft Bijli Yojana** was launched by the Government of India with a massive outlay of ₹75,000 crore to provide free electricity (up to 300 units per month) to 1 crore households across India. 

Under this scheme, residential homeowners, housing societies, and residential welfare associations (RWAs) can install grid-connected rooftop solar systems with direct financial subsidy disbursed directly into their bank accounts.`
      },
      {
        heading: 'Subsidy Structure Breakdown (2025–2026)',
        content: `The subsidy scheme is segmented based on the sanctioned capacity of the residential rooftop solar plant:`,
        table: {
          headers: ['System Capacity', 'Central Government Subsidy (CFA)', 'Estimated System Cost (Approx)', 'Net Cost to Customer'],
          rows: [
            ['1 kW Rooftop Solar', '₹30,000', '₹65,000 – ₹75,000', '₹35,000 – ₹45,000'],
            ['2 kW Rooftop Solar', '₹60,000', '₹1,25,000 – ₹1,40,000', '₹65,000 – ₹80,000'],
            ['3 kW to 10 kW Rooftop Solar', '₹78,000 (Capped)', '₹1,85,000 – ₹2,10,000 (for 3kW)', '₹1,07,000 – ₹1,32,000'],
            ['Group Housing / RWAs (up to 500kW)', '₹18,000 per kW', '₹55,000 – ₹62,000 / kW', 'Varies by total load']
          ]
        }
      },
      {
        heading: 'Step-by-Step Application Process for Tamil Nadu Residents',
        content: `1. **Registration on National Portal:** Visit [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in), select Tamil Nadu, choose **TANGEDCO** as your DISCOM, and enter your Consumer Service Number (as printed on your EB bill).
2. **Feasibility Approval & Vendor Selection:** Once TANGEDCO verifies transformer capacity, select **IVR Energy** as your certified EPC partner.
3. **Site Engineering & Installation:** Our engineering team conducts shadow analysis, installs Tier-1 Mono PERC/TOPCon modules, inverters, and lightning arrestors conforming to MNRE specifications.
4. **Net Meter Commissioning & Inspection:** TANGEDCO officials inspect the setup and replace the existing single/three-phase meter with a bi-directional net-meter.
5. **Subsidy Disbursal:** Upon uploading the commissioning report and cancelled cheque on the portal, the central subsidy is directly transferred to your bank account within 30 working days.`
      },
      {
        heading: 'Why Work with an Empaneled Turnkey EPC Like IVR Energy?',
        content: `While anyone can buy components off the shelf, subsidy clearance requires **strict adherence to BIS and MNRE quality guidelines**, including DCR (Domestic Content Requirement) certified modules and CE-marked grid-tied inverters. 

IVR Energy manages the entire liaison process with local TNEB section offices, ensuring seamless net-metering approvals without delays.`
      }
    ],
    faqs: [
      {
        q: 'Can I apply for PM Surya Ghar if I live in an apartment?',
        a: 'Yes, Group Housing Societies (GHS) and Resident Welfare Associations (RWAs) can install rooftop solar for common area lighting, lifts, and water pumps with subsidy support of ₹18,000 per kW up to 500 kW.'
      },
      {
        q: 'How much roof area is needed for a 3 kW solar plant?',
        a: 'A high-efficiency 3 kW solar plant using modern Mono PERC/TOPCon panels requires approximately 200 to 250 sq. ft. of shadow-free rooftop space.'
      },
      {
        q: 'Will my solar system work during power cuts?',
        a: 'Standard on-grid solar systems shut down automatically during grid failures for linesman safety (anti-islanding protection). If backup power is required, IVR Energy can configure a hybrid solar system with battery storage.'
      }
    ]
  },
  {
    id: 'commercial-industrial-solar-roi-tamilnadu',
    slug: 'commercial-industrial-solar-roi-tamilnadu',
    title: 'Commercial & Industrial Solar ROI: How Factories Slash EB Tariffs by 80%',
    excerpt: 'A comprehensive financial analysis of 100 kW to 1 MW captive solar installations for manufacturing units, cold storages, and educational institutions in Tamil Nadu.',
    category: 'Commercial & Industrial',
    readTime: '8 min read',
    publishedAt: '2026-02-10',
    formattedDate: 'Feb 10, 2026',
    author: {
      name: 'IVR Energy Advisory',
      role: 'Industrial Solar EPC Division',
      avatar: '/projects/tpi-1mw/1.jpeg'
    },
    coverImage: '/projects/tpi-1mw/2.jpeg',
    featured: false,
    tags: ['Industrial Solar', 'TANGEDCO HT Tariff', 'Accelerated Depreciation', '1 MW Solar', 'Factory Rooftop'],
    keyTakeaways: [
      'Commercial & Industrial units paying ₹8.50 to ₹12.00 per unit can generate solar power at ₹2.20 to ₹2.60 per unit.',
      'Typical payback period for a 100 kW – 1 MW industrial solar installation is 2.5 to 3.5 years.',
      '40% Accelerated Depreciation (AD) under Section 32 of the Income Tax Act provides massive first-year tax savings.',
      'Zero production interruption with synchronized solar-diesel (DG-PV) fuel saver controllers.'
    ],
    sections: [
      {
        heading: 'The Rising Cost of Industrial Power in Tamil Nadu',
        content: `With TANGEDCO revising HT (High Tension) and LT Commercial tariffs, businesses in Tamil Nadu are experiencing rising monthly operational expenditures. From textile mills in Tirupur and Coimbatore to automotive component factories in Sriperumbudur and Avadi, electricity represents **25% to 40% of total operating expenses**.

Installing an on-site captive rooftop or ground-mounted solar plant allows business owners to hedge against future tariff hikes for the next 25 years.`
      },
      {
        heading: 'Financial Modeling: 500 kW Industrial Rooftop Solar Case Study',
        content: `Let us examine real-world performance metrics from a 500 kW captive industrial solar plant engineered by IVR Energy:`,
        table: {
          headers: ['Metric / Parameter', 'Value / Estimate'],
          rows: [
            ['Total Installed Capacity', '500 kWp'],
            ['Daily Generation (Average)', '2,000 – 2,200 kWh (Units)'],
            ['Annual Generation', 'approx. 7,50,000 Units'],
            ['Current Grid Tariff (HT Commercial)', '₹9.50 per Unit'],
            ['Annual Grid Electricity Savings', '₹71,25,000 per Year'],
            ['Total Project Investment (Turnkey EPC)', 'approx. ₹2.10 – ₹2.30 Crores'],
            ['Simple Payback Period', '3.1 Years'],
            ['25-Year Internal Rate of Return (IRR)', '34.8%']
          ]
        }
      },
      {
        heading: 'Tax Incentives: Accelerated Depreciation (AD)',
        content: `Companies investing in solar energy assets are entitled to claim **40% Accelerated Depreciation (AD)** under Section 32 of the Indian Income Tax Act in the very first year. For a profitable enterprise in the 25% or 30% corporate tax bracket, this reduces the effective capital outlay by nearly 10% to 12% immediately.`
      },
      {
        heading: 'Zero Power Curtailment: DG-PV Hybrid Synchronization',
        content: `Modern industrial setups cannot afford voltage fluctuations. IVR Energy integrates intelligent DG-PV synchronization controllers that dynamically regulate solar inverter output when running on diesel generators, ensuring zero reverse power flow into the genset while cutting diesel fuel consumption by up to 60%.`
      }
    ],
    faqs: [
      {
        q: 'Can we install solar on metal sheet / PEB shed roofs?',
        a: 'Yes, IVR Energy uses non-penetrative aluminum rail-less clamps and SS304 fasteners designed specifically for trapezoidal and standing seam industrial metal roofs, preserving roof warranty and eliminating water leakage risks.'
      },
      {
        q: 'What is the required CEIG approval process for systems above 10 kW?',
        a: 'In Tamil Nadu, solar plants exceeding 10 kW require drawings and safety clearances from the Chief Electrical Inspectorate to Government (CEIG). IVR Energy handles all statutory drawings, earthing calculations, and CEIG inspection liaison.'
      }
    ]
  },
  {
    id: 'topcon-vs-mono-perc-solar-panels-comparison',
    slug: 'topcon-vs-mono-perc-solar-panels-comparison',
    title: 'TOPCon vs Mono PERC vs Bifacial Solar Panels: Which Is Best for Your Roof?',
    excerpt: 'Comparing efficiency ratings, temperature coefficients, degradation curves, and lifecycle generation between N-Type TOPCon and Mono PERC solar modules in high-heat Indian climates.',
    category: 'Technology & Innovation',
    readTime: '5 min read',
    publishedAt: '2026-01-28',
    formattedDate: 'Jan 28, 2026',
    author: {
      name: 'IVR Technical Research',
      role: 'Engineering & Technology Lab',
      avatar: '/projects/ti-100kw/1.jpg'
    },
    coverImage: '/projects/ti-100kw/1.jpg',
    featured: false,
    tags: ['TOPCon', 'Mono PERC', 'Bifacial Solar', 'Solar Module Technology', 'Efficiency'],
    keyTakeaways: [
      'N-Type TOPCon modules deliver 22% to 23.5% module efficiency compared to 20.5% – 21.5% for P-Type Mono PERC.',
      'TOPCon has a superior temperature coefficient (-0.30%/°C), producing significantly more electricity in hot climates like Tamil Nadu.',
      'Bifacial solar modules generate 10% to 25% extra energy from the rear side when installed on reflective surfaces.',
      '30-year linear performance warranties are standard with N-Type technology versus 25 years for conventional panels.'
    ],
    sections: [
      {
        heading: 'The Solar Module Evolution: From P-Type to N-Type',
        content: `The solar photovoltaic industry has undergone a technological transition. While Mono PERC (Passivated Emitter and Rear Cell) has been the industry workhorse for the past decade, **N-Type TOPCon (Tunnel Oxide Passivated Contact)** has emerged as the premier choice for utility, industrial, and high-end residential rooftop projects.`
      },
      {
        heading: 'Technical Comparison: TOPCon vs Mono PERC vs Bifacial',
        content: `Understanding the engineering differences helps property owners maximize generation per square foot:`,
        table: {
          headers: ['Feature / Metric', 'P-Type Mono PERC', 'N-Type TOPCon', 'Bifacial Glass-Glass TOPCon'],
          rows: [
            ['Cell Substrate Type', 'P-Type (Boron Doped)', 'N-Type (Phosphorus Doped)', 'N-Type (Dual Glass)'],
            ['Module Efficiency', '20.5% – 21.4%', '22.0% – 23.2%', '22.5% – 24.0% (+ Rear Gain)'],
            ['Temperature Coefficient', '-0.35% per °C', '-0.30% per °C', '-0.29% per °C'],
            ['First Year Degradation', '2.0%', '< 1.0%', '< 1.0%'],
            ['Annual Degradation (Yr 2-25)', '0.55% / year', '0.40% / year', '0.35% / year'],
            ['Rear Side Generation Gain', 'None (Monofacial)', '5% – 8% (if clear backing)', '10% – 25% (Albedo dependent)'],
            ['Performance Warranty', '25 Years', '30 Years', '30 Years']
          ]
        }
      },
      {
        heading: 'Why Temperature Coefficient Matters in Southern India',
        content: `Solar panel lab ratings (STC) are measured at 25°C. However, on a sunny afternoon in Chennai, Coimbatore, or Madurai, rooftop panel temperatures regularly surpass 60°C. 

Because TOPCon has a lower temperature power loss coefficient (-0.30%/°C vs -0.35%/°C), it loses less output in high heat, yielding **3% to 5% higher annual kWh generation** under actual tropical operating conditions.`
      }
    ],
    faqs: [
      {
        q: 'Is TOPCon significantly more expensive than Mono PERC?',
        a: 'Due to massive global manufacturing scale, the price difference between TOPCon and Mono PERC is now under 4% to 7%, while producing 6% to 10% more lifetime energy, making TOPCon the highest-ROI option.'
      }
    ]
  },
  {
    id: 'tangedco-solar-net-metering-approval-process',
    slug: 'tangedco-solar-net-metering-approval-process',
    title: 'TANGEDCO Solar Net Metering: Step-by-Step Approval & Bi-Directional Meter Setup',
    excerpt: 'Everything you need to know about TANGEDCO HT/LT solar connectivity, safety inspections (CEIG/TNEB), online registration portal, and bi-directional meter commissioning.',
    category: 'Subsidy & Policy',
    readTime: '7 min read',
    publishedAt: '2026-01-15',
    formattedDate: 'Jan 15, 2026',
    author: {
      name: 'IVR Grid Compliance Team',
      role: 'Regulatory & Utility Liaison',
      avatar: '/projects/thyrocare-82kw/1.jpeg'
    },
    coverImage: '/projects/thyrocare-82kw/1.jpeg',
    featured: false,
    tags: ['TANGEDCO', 'Net Metering', 'Bi-directional Meter', 'TNEB', 'Solar Grid Interconnection'],
    keyTakeaways: [
      'Net metering allows solar owners to export surplus daytime power to the TANGEDCO grid and consume it at night.',
      'The approved solar capacity cannot exceed 100% of the customer sanctioned demand/load.',
      'Bi-directional smart meters record both Import (units taken from grid) and Export (units pushed to grid).',
      'IVR Energy prepares single-line diagrams (SLD), earthing certification, and manages CEIG/TNEB submissions.'
    ],
    sections: [
      {
        heading: 'What is Net Metering and How Does It Work in Tamil Nadu?',
        content: `Under TANGEDCO’s Solar Net Metering framework, your solar system is interconnected with the local electricity distribution grid. 

During the daytime, your rooftop solar plant powers your appliances first. Any excess energy is automatically pushed into the grid through a specialized **bi-directional meter (Net Meter)**. At night, you draw power from the grid as normal. Your bi-monthly electricity bill reflects only the **Net Units consumed** (Import minus Export).`
      },
      {
        heading: 'Key Eligibility Criteria for TANGEDCO Net Metering',
        content: `1. **Sanctioned Load Match:** The proposed solar DC capacity must be within the sanctioned service connection load.
2. **Distribution Transformer (DT) Capacity:** Total rooftop solar connected to a local distribution transformer should not exceed 75% to 80% of the transformer rating.
3. **Approved Inverter Protection:** The grid-tie inverter must include automatic anti-islanding, over/under-voltage protection, and fault trip mechanisms conforming to CEA (Central Electricity Authority) Technical Standards.`
      },
      {
        heading: 'Required Documents for TANGEDCO Solar Connection',
        content: `To avoid delays, property owners should keep the following records ready:
- Recent copy of TANGEDCO electricity bill (with paid receipt)
- Property Tax receipt / Ownership deed
- Applicant identity proof (Aadhaar / PAN card / GST certificate)
- Single Line Diagram (SLD) and technical data sheets prepared by certified EPC contractor (IVR Energy)`
      }
    ],
    faqs: [
      {
        q: 'What happens if I export more solar power than I consume?',
        a: 'Surplus exported units are carried forward across subsequent billing cycles within the settlement period (usually ending March 31st each financial year). Under TNERC guidelines, any unused surplus at year-end may be settled at the approved generic tariff.'
      }
    ]
  },
  {
    id: 'solar-battery-energy-storage-bess-guide',
    slug: 'solar-battery-energy-storage-bess-guide',
    title: 'Commercial Battery Energy Storage Systems (BESS): Maximizing Solar Self-Consumption',
    excerpt: 'Why modern industrial facilities are combining rooftop solar with Lithium Iron Phosphate (LiFePO4) battery storage for peak-shaving and zero diesel generator reliance.',
    category: 'Technology & Innovation',
    readTime: '6 min read',
    publishedAt: '2026-01-04',
    formattedDate: 'Jan 04, 2026',
    author: {
      name: 'IVR Energy Engineering',
      role: 'Storage & Microgrid Solutions',
      avatar: '/projects/muthukumaran-330kw/1.jpg'
    },
    coverImage: '/projects/muthukumaran-330kw/1.jpg',
    featured: false,
    tags: ['BESS', 'Energy Storage', 'LiFePO4 Batteries', 'Hybrid Solar', 'Peak Shaving'],
    keyTakeaways: [
      'Battery Storage captures surplus daytime solar for utilization during peak evening tariff hours (Time of Day / ToD pricing).',
      'Provides seamless, zero-switchover backup for sensitive medical, computing, and precision manufacturing equipment.',
      'Replaces expensive diesel generator fuel costing ₹28 to ₹35 per unit with stored solar at ₹6 to ₹8 per cycle.',
      'LiFePO4 battery chemistry offers 6,000+ deep discharge cycles and 10 to 15 years operating life.'
    ],
    sections: [
      {
        heading: 'The Shift Towards Commercial Solar + Storage Microgrids',
        content: `As commercial electricity pricing introduces steep **Time-of-Day (ToD) peak surcharges** (up to 20% extra between 6:00 PM and 10:00 PM), businesses are increasingly coupling on-grid solar plants with dedicated **Battery Energy Storage Systems (BESS)**.

Rather than selling daytime surplus to the grid at low feed-in tariffs, factories store clean solar power and discharge it during high-tariff evening hours to dramatically cut utility costs.`
      },
      {
        heading: 'Key Benefits of BESS for Industrial Campuses',
        content: `1. **Peak Shaving & Demand Charge Reduction:** Avoid exceeding maximum sanctioned kVA demand during sudden factory load spikes.
2. **Genset Diesel Displacement:** Minimize costly diesel generator runtime during scheduled or unscheduled grid brownouts.
3. **Power Quality & Harmonic Filtering:** Modern hybrid bi-directional inverters regulate voltage sags and eliminate harmonic distortion.`
      }
    ],
    faqs: [
      {
        q: 'How safe are LiFePO4 batteries in hot industrial environments?',
        a: 'Lithium Iron Phosphate (LiFePO4) is the safest lithium battery chemistry available. It has exceptional thermal stability, does not suffer from thermal runaway, and operates reliably in ambient temperatures up to 55°C when integrated with IVR Energy’s liquid or HVAC thermal management.'
      }
    ]
  },
  {
    id: 'rooftop-solar-maintenance-cleaning-tips',
    slug: 'rooftop-solar-maintenance-cleaning-tips',
    title: 'Rooftop Solar Maintenance: Cleaning Cycles, Degradation Prevention & Inverter Health',
    excerpt: 'Best practices to prevent soiling losses, identify micro-cracks, perform thermal imaging inspections, and maintain peak kWh/kWp solar plant yields throughout the year.',
    category: 'Rooftop Solar',
    readTime: '5 min read',
    publishedAt: '2025-12-20',
    formattedDate: 'Dec 20, 2025',
    author: {
      name: 'O&M Operations Team',
      role: 'Operations & Maintenance',
      avatar: '/projects/nutech-50kw/1.jpeg'
    },
    coverImage: '/projects/nutech-50kw/1.jpeg',
    featured: false,
    tags: ['Solar Maintenance', 'Panel Cleaning', 'Soiling Loss', 'Inverter Health', 'O&M'],
    keyTakeaways: [
      'Dust and industrial particulate accumulation (soiling) can reduce solar power generation by 15% to 30%.',
      'Clean panels early morning or late evening to prevent thermal shock and micro-cracks on glass surfaces.',
      'Annual thermographic infrared imaging reveals hot spots, failing bypass diodes, and shading cell defects.',
      'IVR Energy provides comprehensive Annual Maintenance Contracts (AMC) with guaranteed plant uptime.'
    ],
    sections: [
      {
        heading: 'Why Regular Solar Cleaning is Essential in Urban & Industrial Zones',
        content: `Solar panels work by converting photon irradiance into electrical current. In industrial belts and urban centers, airborne dust, vehicular emissions, bird droppings, and industrial soot settle onto the tempered front glass.

Without regular cleaning, this dust layer blocks sunlight, causing **soiling losses between 1% to 2% per week without rainfall**.`
      },
      {
        heading: 'Recommended Solar Maintenance Checklist',
        content: `1. **Cleaning Frequency:** Clean panels once every 12 to 15 days using soft demineralized (RO) water and non-abrasive microfiber brushes.
2. **Avoid Harsh Chemicals:** Never use abrasive detergents, acids, or high-pressure power washers that can strip the anti-reflective coating (ARC) from the solar glass.
3. **Electrical Checks:** Check DC array voltages, string fuse continuity, inverter cooling fans, and earthing pit resistance (< 5 Ohms).`
      }
    ],
    faqs: [
      {
        q: 'Why should we avoid cleaning panels in the hot afternoon sun?',
        a: 'During peak midday sun, panel glass can reach 60°C. Applying cold water causes sudden thermal shock, which can shatter tempered glass or cause internal solar cell micro-cracks.'
      }
    ]
  }
]

export function getBlogPostBySlug(slug) {
  if (!slug) return null
  const clean = decodeURIComponent(slug).toLowerCase().trim()
  return BLOG_POSTS.find(p => p.slug === clean || p.id === clean)
}
