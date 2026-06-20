import { Program, SuccessStory, TeamMember, FAQ, NewsItem, CalEvent, DonationTier } from './types';

export const programsData: Program[] = [
  {
    id: 'housing-asst',
    title: 'Affordable Housing Assistance',
    category: 'Housing Support',
    description: 'Direct support connecting low-income families and seniors to safe, subsidized, and affordable housing options.',
    details: [
      'HUD voucher & Section 8 application support',
      'Affordable housing directory matching',
      'Senior housing cooperative placements',
      'Down-payment support and renter advice seminars'
    ],
    icon: 'HomeIcon'
  },
  {
    id: 'homeless-prev',
    title: 'Homelessness Prevention & Landlord Mediation',
    category: 'Emergency Support',
    description: 'Rapid emergency rent financing and legal advocacy program designed to keep at-risk individuals sheltered in place.',
    details: [
      'Emergency rent aid applications',
      'Local tenant-landlord mediation services',
      'Eviction diversion legal clinics',
      'Utility assistance referrals'
    ],
    icon: 'ShieldAlertIcon'
  },
  {
    id: 'community-dev',
    title: 'Community Development & Neighborhood Rebuilding',
    category: 'Community Initiatives',
    description: 'Championing local rehabilitation efforts, green energy upgrades, and creating community spaces for all neighborhoods.',
    details: [
      'Sustainable building upgrades',
      'Community parks and civic centers development',
      'Urban green spaces & garden creation',
      'Local supplier integration partnerships'
    ],
    icon: 'UsersIcon'
  },
  {
    id: 'edu-well',
    title: 'Financial Literacy & Tenant Sovereignty Education',
    category: 'Educational Resources',
    description: 'Empowering community members with the skills, tools, and training to navigate credit, tenancy, and homeownership.',
    details: [
      'Budgeting & credit counseling workshops',
      'Comprehensive first-time homebuyer syllabus',
      'Fair Housing rights education',
      'Tenant lease agreement breakdown seminars'
    ],
    icon: 'BookOpenIcon'
  }
];

export const teamData: TeamMember[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Executive Director & Co-Founder',
    bio: 'Sarah has over 15 years of social service leadership, focusing strictly on urban planning and legislative housing advocacy in the community.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 't2',
    name: 'Marcus Rivera',
    role: 'Director of Programs & Housing Placement',
    bio: 'Marcus has worked intimately with HUD and local housing authorities to guide more than 1,200 families into permanent housing solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Lead Financial Counselor & Educator',
    bio: 'Elena conducts our tenant literacy workshops, holding multiple accreditations in low-income family advocacy and mortgage planning.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

export const successStoriesData: SuccessStory[] = [
  {
    id: 's1',
    name: 'The Thompson Family',
    location: 'Westside Community',
    impact: 'Transferred from Emergency Shelter to Stable Affordable Housing',
    quote: 'National Housing Community did more than guide our housing application; they provided us our dignity and our children a secure environment.',
    fullStory: 'After an abrupt eviction due to a building sale, the Thompsons spent four months in transient shelters. Through our Affordable Housing Assistance program, they matched into a premium HUD-supported 3-bedroom community block within six weeks. Today, the kids are back in local school and both parents have advanced in vocational careers.',
    imageUrl: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 's2',
    name: 'David Carter',
    location: 'Downtown District',
    impact: 'Homelessness Averted via Rental Assistance & Mediation',
    quote: 'I was one semana away from living in my car. The eviction warning was voided within days.',
    fullStory: 'David faced health hardships and a temporary employment hiatus, bringing him behind on rent. Our mediation team worked directly with his landlord, pairing the ledger reconciliation with our emergency relief funds. David was able to keep his home, recover his stability, and eventually transition into full-time administrative work.',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export const faqsData: FAQ[] = [
  {
    id: 'f1',
    question: 'How do I check if I qualify for your affordable housing match programs?',
    answer: 'Qualification depends on your household income relative to the Area Median Income (AMI), household size, and current residency status. Most HUD and state vouchers cater to households below 50% or 30% of AMI. You can utilize our Eligibility Request Form under the "Get Help" section to initiate a rapid diagnostic check.',
    category: 'Eligibility'
  },
  {
    id: 'f2',
    question: 'Does National Housing Community directly manage apartment complexes?',
    answer: 'No, we do not directly manage residential properties. We act as an expert navigational advisor, legal mediator, and placement agent. We collaborate with national housing authorities, municipal managers, and cooperative developers to identify vacancies and facilitate placements.',
    category: 'Services'
  },
  {
    id: 'f3',
    question: 'Are your services completely free for families seeking shelter?',
    answer: 'Absolutely. We are a registered non-profit organization. Every service, lease review, educational clinic, and placement assistance process we provide is 100% free of charge for clients.',
    category: 'Services'
  },
  {
    id: 'f4',
    question: 'How are donating funds utilized?',
    answer: 'Every dollar is carefully stewarded. 85% of donated funds go directly to local programs: 40% into the emergency rent support fund to avert evictions, 30% into affordable housing counseling and application vouchers, and 15% to finance local educational tenant clinics. Only 15% is spent on organizational administrative scaling.',
    category: 'Donations'
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'n1',
    title: 'Announcing Our Emergency Rent Support Extension for 2026',
    date: 'June 18, 2026',
    summary: 'Thanks to key regional donor initiatives, we are expanding our rent support capacity to reach an additional 300 families battling high-risk evictions this year.',
    content: 'We are thrilled to share that National Housing Community has secured a dedicated partnership grant to extend our landlord-tenant mediation and direct rent payment buffer. This funding allows our counselors to act immediately on behalf of rent-burdened tenants across the state, preventing unnecessary displacement and stabilizing local communities.',
    category: 'Announcement',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'n2',
    title: 'Tenant Rights Clinic Highlights Vital Housing Legislation',
    date: 'May 12, 2026',
    summary: 'Over 140 community residents joined our virtual fair legal clinic, learning how to recognize discriminatory practices and review complex rental agreements.',
    content: 'Our legal advocacy branch conducted a robust interactive seminar breaking down new territorial fair-housing updates. Residents learned about statutory lease terms, lawful deposit returns, and the local eviction defense resources available. We plan to host these events bi-monthy to ensure high tenant literacy across our neighborhoods.',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export const eventsData: CalEvent[] = [
  {
    id: 'e1',
    title: 'First-Time Homebuyer Masterclass',
    date: 'July 11, 2026',
    time: '10:00 AM - 1:00 PM',
    location: 'Community Hub & Live Stream',
    description: 'Learn step-by-step credit repair, mortgage selection, deposit grants, and legal closings from certified financial advisors.',
    category: 'Workshop'
  },
  {
    id: 'e2',
    title: 'Homelessness Prevention Summit & Forum',
    date: 'August 05, 2026',
    time: '2:00 PM - 5:30 PM',
    location: 'Downtown Civic Center Auditorium',
    description: 'Bringing together civic authorities, housing managers, legal teams, and community supporters to collaborate on homelessness prevention architectures.',
    category: 'Outreach'
  }
];

export const donationTiersData: DonationTier[] = [
  { amount: 25, label: 'Community Friend', impact: 'Provides emergency food and transit vouchers for an displaced family.' },
  { amount: 50, label: 'Tenant Supporter', impact: 'Funds a tenant rights training seat for a low-income renter.' },
  { amount: 150, label: 'Housing Advocate', impact: 'Covers professional landlord-tenant legal mediation sessions.' },
  { amount: 500, label: 'Homelessness Preventer', impact: 'Pays a critical rent gap allowance to fully halt an eviction of a vulnerable family.' },
  { amount: 1000, label: 'Community Builder', impact: 'Finances a full scholarship for community workforce development and local housing preparation training.' }
];

export const impactStats = [
  { label: 'Sheltered & Placed', value: '4,500+', desc: 'Families guide into secure safe affordable homes' },
  { label: 'Evictions Prevented', value: '1,850+', desc: 'Through mediation and emergency rent aids' },
  { label: 'Community Counseling', value: '8,200+', desc: 'Trained in financial and fair housing literacy' },
  { label: 'Donations Deployed', value: '88%', desc: 'Directly deployed into local community support programs' }
];
