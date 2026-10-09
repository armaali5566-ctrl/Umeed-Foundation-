import { Campaign, SponsorshipTier } from '@/types/donation';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'heartbeats',
    title: 'Little Heartbeats',
    hindiTitle: 'नन्हे दिल, नई धड़कनें',
    tagline: 'Life-saving pediatric healthcare & cardiac care for children',
    category: 'Healthcare',
    accentColor: '#E2583E',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    description:
      'Thousands of underprivileged children born with Congenital Heart Defects (CHD) and chronic ailments cannot afford critical surgical intervention. Little Heartbeats steps in with emergency pediatric care and surgeries.',
    fullStory:
      'Every minute without medical intervention can turn a treatable condition into a tragedy. Through partner hospitals and dedicated pediatric surgeons, Umeed Foundation covers pre-operative assessments, surgeries, medication, and holistic post-op care.',
    stats: [
      { label: 'Surgeries Funded', value: '4,200+' },
      { label: 'Screening Camps', value: '185+' },
      { label: 'Success Rate', value: '98.4%' },
    ],
    suggestedPresets: [
      {
        amount: 3000,
        label: 'Essential Care',
        impactNote: 'Covers essential diagnostic tests, antibiotics & specialized infant nutrition.',
      },
      {
        amount: 5000,
        label: 'Cardiac Screening',
        impactNote: 'Funds pediatric 2D Echo screening, specialist consultations & diagnostics.',
        isPopular: true,
      },
      {
        amount: 10000,
        label: 'ICU Recovery',
        impactNote: 'Supports 48 hours of post-surgical ICU monitoring & sterile recovery kits.',
      },
      {
        amount: 20000,
        label: 'Critical Surgery Fund',
        impactNote: 'Subsidizes life-saving corrective pediatric surgery for high-risk cases.',
      },
    ],
  },
  {
    id: 'shikshalaya',
    title: 'Shikshalaya',
    hindiTitle: 'शिक्षालय — हर बच्चे का अधिकार',
    tagline: 'Transforming futures through holistic schooling and mentorship',
    category: 'Education',
    accentColor: '#1B4332',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    description:
      'Providing underserved children with formal school enrollment, uniforms, textbooks, digital literacy, and nutritious midday meals to permanently break the generational cycle of poverty.',
    fullStory:
      'Education is the single most powerful equalizer. Shikshalaya establishes child-friendly community learning centers where students bridge academic learning gaps, learn foundational STEM concepts, and receive compassionate mentorship.',
    stats: [
      { label: 'Children Enrolled', value: '18,500+' },
      { label: 'Learning Centers', value: '42' },
      { label: 'Grade Transition', value: '94%' },
    ],
    sponsorshipTiers: [
      {
        frequency: 'monthly',
        label: 'Monthly',
        amountPerChild: 1200,
        periodText: 'per month',
        badge: 'Flexible Support',
      },
      {
        frequency: 'quarterly',
        label: 'Quarterly',
        amountPerChild: 3600,
        periodText: 'every 3 months',
        badge: 'Term Support',
      },
      {
        frequency: 'half-yearly',
        label: 'Half-Yearly',
        amountPerChild: 7200,
        periodText: 'every 6 months',
        badge: 'Semester Support',
      },
      {
        frequency: 'annually',
        label: 'Annually',
        amountPerChild: 14400,
        periodText: 'for full academic year',
        badge: 'Highest Impact',
      },
    ],
  },
  {
    id: 'chuppi-todo',
    title: 'Chuppi Todo',
    hindiTitle: 'चुप्पी तोड़ो — गरिमा और स्वास्थ्य',
    tagline: 'Breaking taboos: Menstrual hygiene, dignity kits & health education',
    category: 'Women Dignity',
    accentColor: '#D95338',
    image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1200&q=80',
    description:
      'Empowering adolescent girls in rural and peri-urban schools with reusable eco-friendly sanitary kits, clean water sanitation workshops, and safe spaces to end menstrual absenteeism.',
    fullStory:
      'Over 23 million girls in India drop out of school annually when they reach puberty due to lack of sanitation products and pervasive social stigma. Chuppi Todo delivers dignity kits, builds hygienic wash facilities, and trains female peer leaders.',
    stats: [
      { label: 'Dignity Kits Distributed', value: '65,000+' },
      { label: 'Awareness Workshops', value: '520+' },
      { label: 'Reduced Absenteeism', value: '82%' },
    ],
    kitOptions: [
      {
        units: 1,
        amount: 500,
        label: '1 Dignity Kit',
        impactDescription: 'Provides 1 adolescent girl with a 6-month reusable hygiene supply & handbook.',
      },
      {
        units: 3,
        amount: 1500,
        label: '3 Dignity Kits',
        impactDescription: 'Supports 3 schoolgirls and enables attendance at an interactive awareness workshop.',
      },
      {
        units: 5,
        amount: 2500,
        label: '5 Dignity Kits',
        impactDescription: 'Protects an entire study circle with personal dignity packs and mentorship support.',
      },
      {
        units: 10,
        amount: 5000,
        label: '10 Kits + School Unit',
        impactDescription: 'Funds 10 complete kits plus emergency hygiene dispensers in a rural school.',
      },
    ],
  },
];

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const IMPACT_METRICS = [
  {
    value: '18,500+',
    label: 'Children Educated',
    sublabel: 'Across 42 active community centers',
    icon: 'GraduationCap',
  },
  {
    value: '4,200+',
    label: 'Pediatric Surgeries',
    sublabel: 'Supported through partner hospital network',
    icon: 'HeartPulse',
  },
  {
    value: '65,000+',
    label: 'Dignity Kits Delivered',
    sublabel: 'Protecting health and girl child school attendance',
    icon: 'ShieldCheck',
  },
  {
    value: '₹2.4 Cr+',
    label: 'Direct Program Outlay',
    sublabel: 'Audited and verified transparent allocation',
    icon: 'Sparkles',
  },
];

export const FUND_ALLOCATION = [
  {
    category: 'Direct Program Relief & Interventions',
    percentage: 86,
    color: '#1B4332',
    description: 'Medical surgeries, schooling materials, kits & teacher honorariums.',
  },
  {
    category: 'Field Operations & Community Mobilization',
    percentage: 9,
    color: '#E2583E',
    description: 'Local volunteer transport, logistics, verification & health screenings.',
  },
  {
    category: 'Administrative, Governance & Compliance',
    percentage: 5,
    color: '#8A9A86',
    description: 'Statutory audits, technology infrastructure & transparency reporting.',
  },
];

export const BENEFICIARY_STORIES = [
  {
    name: 'Aarav (Age 5)',
    campaign: 'Little Heartbeats',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    quote: 'When Aarav collapsed at school, doctors identified a ventricular septal defect. Today, he runs and laughs freely after successful surgery funded through Umeed donors.',
    outcome: 'Successful cardiac repair; now attending primary kindergarten.',
  },
  {
    name: 'Priya (Age 12)',
    campaign: 'Shikshalaya',
    location: 'Agra, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    quote: 'My father worked as a daily wage laborer and I was told to leave school. Shikshalaya gave me uniforms, books, and an after-school tutor who believed in me.',
    outcome: 'Ranked top 5% in her district science scholarship examination.',
  },
  {
    name: 'Meena & Village Youth Group',
    campaign: 'Chuppi Todo',
    location: 'Alwar, Rajasthan',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    quote: 'Girls in our village used to miss a week of school every single month in silence. The dignity workshops transformed shame into collective strength and confidence.',
    outcome: 'Village girls school attendance increased from 68% to 94%.',
  },
];

export const FAQS = [
  {
    question: 'How is my donation utilized and where does the money go?',
    answer:
      'We operate with strict financial transparency: 86% of all donations go straight to direct program aid (surgeries, learning materials, sanitary kits), 9% to field execution, and 5% to administrative governance. Financial statements and audited reports are published annually.',
  },
  {
    question: 'Will I receive a formal tax exemption certificate?',
    answer:
      'In a verified production deployment, Indian donors receive 80G tax exemption certificates within 24-48 hours via email. In this demonstration environment, sample tax documentation and receipts are generated instantly for preview.',
  },
  {
    question: 'Can I choose to sponsor a specific child or campaign?',
    answer:
      'Yes! Through Shikshalaya, you can choose to sponsor one or multiple children on a monthly, quarterly, or annual basis. You receive quarterly academic progress updates and handwritten progress notes.',
  },
  {
    question: 'What payment modes are supported?',
    answer:
      'For online donations, we support UPI (Google Pay, PhonePe, Paytm), Netbanking, Credit/Debit Cards, and International Cards via our secure payment gateway integration point. Offline bank transfers (NEFT/RTGS/IMPS) are also supported.',
  },
  {
    question: 'Is it safe to donate on this platform?',
    answer:
      'All transactions are processed through 256-bit SSL encryption. We do not store any sensitive card or banking credentials on our servers. In this demonstration mode, test simulated transactions are executed with zero financial risk.',
  },
];

export const OFFLINE_BANK_DETAILS = {
  bankName: 'State Bank of India (SBI)',
  accountName: 'Umeed Foundation Trust (DEMO)',
  accountNumber: '4092 1100 8923 114',
  ifscCode: 'SBIN0001234',
  branch: 'Parliament Street, New Delhi - 110001',
  accountType: 'Current Account (Charitable Trust)',
  upiId: 'umeedfoundation.demo@sbi',
  demoNotice: 'DEMO BANK DETAILS FOR PREVIEW & AUDIT ONLY. DO NOT SEND REAL FUNDS.',
};
