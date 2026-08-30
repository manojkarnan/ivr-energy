/**
 * Standardized Company Statistics for IVR Energy
 *
 * Single Source of Truth for all marketing copy, SEO metadata, JSON-LD schemas,
 * animated hero counters, trust badges, workflow sections, and comparison tables.
 */

export const companyStats = {
  installedCapacity: '15+ MW',
  installedCapacityValue: 15,
  installedCapacitySuffix: '+ MW',
  installedCapacityLabel: 'MW Installed',

  clients: '180+',
  clientsValue: 180,
  clientsSuffix: '+',
  clientsLabel: 'Happy Clients',

  experience: '12+ Years',
  experienceValue: 12,
  experienceSuffix: '+',
  experienceLabel: 'Years Experience',

  projects: '250+',
  projectsValue: 250,
  projectsSuffix: '+',
  projectsLabel: 'Projects Delivered',

  // Formatted array for animated counter grids & cards
  statItems: [
    { value: 15, suffix: '+ MW', label: 'MW Installed' },
    { value: 180, suffix: '+', label: 'Happy Clients' },
    { value: 12, suffix: '+', label: 'Years Experience' },
    { value: 250, suffix: '+', label: 'Projects Delivered' },
  ],
}

export const companyNAP = {
  name: 'IVR Energy',
  legalName: 'IVR Energy (OPC) Private Limited',
  phone: '+91 90477 77936',
  phoneRaw: '919047777936',
  phoneTel: 'tel:+919047777936',
  secondaryPhone: '+91 90477 77935',
  secondaryPhoneRaw: '919047777935',
  secondaryPhoneTel: 'tel:+919047777935',
  primaryEmail: 'info@ivrenergy.com',
  secondaryEmail: 'ivrenergysolutions@gmail.com',
  gstNumber: '33BTTPR9122F1ZB',
  address: {
    line1: '3rd Floor, Door No. 1, Plot A',
    line2: 'Manasarovar Nagar',
    line3: 'Gerugambakkam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600122',
    country: 'India',
    countryCode: 'IN',
    streetAddress: '3rd Floor, Door No. 1, Plot A, Manasarovar Nagar, Gerugambakkam',
    fullFormatted: '3rd Floor, Door No. 1, Plot A, Manasarovar Nagar, Gerugambakkam, Chennai, Tamil Nadu 600122',
    multiline: '3rd Floor, Door No. 1, Plot A,\nManasarovar Nagar,\nGerugambakkam,\nChennai, Tamil Nadu 600122',
  },
}

export default companyStats
