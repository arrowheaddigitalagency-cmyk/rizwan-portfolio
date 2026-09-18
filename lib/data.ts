export const BRAND = {
  name: 'Mohammed Rizwan',
  wordmark: 'RIZWAN',
  film: 'A Life in Motion',
  headlineTop: 'A LIFE IN',
  headlineBottom: 'MOTION',
  title: 'CEO & Founder of YalaRide',
  email: 'riz_wizard@yahoo.com',
  phone: '+1 (407) 590-6100',
  yala: 'https://yalaride.com/',
  footerNote:
    'Pakistani-American entrepreneur. More than three decades in the United States. Building businesses that solve real problems — culminating in YalaRide.',
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about', ariaLabel: 'About' },
  { label: 'Journey', href: '#journey', ariaLabel: 'Journey' },
  { label: 'Experience', href: '#work', ariaLabel: 'Business experience' },
  { label: 'YalaRide', href: '#yalaride', ariaLabel: 'YalaRide' },
  { label: 'Leadership', href: '#leadership', ariaLabel: 'Leadership' },
  { label: 'Contact', href: '#contact', ariaLabel: 'Contact' },
] as const;

export const HERO = {
  image: '/portrait.png',
  statementStrong: 'Building businesses. Solving real problems.',
  statementMuted: 'Creating global impact through mobility.',
} as const;

export const ABOUT = {
  label: '(ABOUT)',
  statementStrong: 'From Pakistan to Qatar to the United States — ',
  statementMuted:
    'decades of hands-on work across automotive services, rentals, dealerships and tourism, culminating in YalaRide.',
} as const;

export const JOURNEY = [
  {
    index: '01',
    place: 'Pakistan',
    title: 'Early foundations',
    body: 'Born and educated in Pakistan, Mohammed Rizwan began his working life by taking on different small jobs and responsibilities. These early experiences developed his resilience, practical thinking and respect for hard work.',
  },
  {
    index: '02',
    place: 'Qatar',
    title: 'Professional experience abroad',
    body: 'An employment opportunity took him to Qatar, marking his first major international move. The experience strengthened his independence and introduced him to working across cultures and changing environments.',
  },
  {
    index: '03',
    place: 'United States',
    title: 'A new chapter',
    body: 'Mohammed Rizwan later moved to the United States, where he has now lived for more than three decades. Starting again in a new country required patience, adaptability and the courage to pursue unfamiliar opportunities.',
  },
] as const;

export interface Project {
  index: string;
  title: string;
  blurb: string;
  image: string;
  href?: string;
  tag: string;
}

export const PROJECTS: readonly Project[] = [
  {
    index: '01',
    title: 'Cars Compound',
    blurb:
      'The major entrepreneurial turning point. A foundation in vehicle repair, customer care and building trust in a competitive local market.',
    image: '/brands/compound-project.jpg',
    href: 'https://carscompound.com/',
    tag: 'Auto body · Marietta',
  },
  {
    index: '02',
    title: 'Priceless Car Rental',
    blurb:
      'From vehicle services into fleet operations — pricing, bookings, customer expectations and the everyday challenges rental operators face.',
    image: '/brands/priceless-project.png',
    href: 'https://pricelesscarrental.com/',
    tag: 'Car rental',
  },
  {
    index: '03',
    title: 'VIP Kars',
    blurb:
      'Vehicle sales, auctions, inventory and purchasing decisions — another essential layer of the automotive ecosystem.',
    image: '/brands/vip-project.png',
    href: 'https://www.vipkars.com/',
    tag: 'Dealership',
  },
  {
    index: '04',
    title: 'Automotive Operations',
    blurb:
      'End-to-end exposure across repair services, vehicle auctions, parts and junkyard operations.',
    image: '/brands/automotive-project.jpg',
    tag: 'Services · Auctions',
  },
  {
    index: '05',
    title: 'Tourism',
    blurb:
      'International travel exhibitions expanded his outlook and highlighted the need for easier mobility for travellers.',
    image: '/brands/yalaride-car.webp',
    tag: 'Travel & mobility',
  },
];

export const YALA = {
  label: '(YALARIDE)',
  heading: ['Decades of experience.', 'One global vision.'],
  lead: 'YalaRide is a global car-rental marketplace created to make finding and accessing rental vehicles easier, more convenient and more competitive — while giving rental businesses a powerful way to reach new audiences.',
  built: 'Approximately eighteen months of focused development transformed decades of first-hand industry knowledge into a technology platform with global potential.',
  image: '/brands/yalaride-app.png',
  url: 'https://yalaride.com/',
} as const;

export const LEADERSHIP = {
  label: '(LEADERSHIP)',
  heading: 'A hands-on leader',
  body: 'Even after building and managing multiple ventures, Mohammed Rizwan remains closely involved in the work — attending vehicle auctions, monitoring operations and personally stepping in when a customer has a concern.',
  quote:
    'No matter how much a business grows, a leader should never lose touch with the customer, the team or the work itself.',
  principles: ['Hard work', 'Trust', 'Accountability', 'Innovation', 'Adaptability'] as const,
} as const;

export const STATS = [
  { value: 30, suffix: '+', label: 'Years in the United States' },
  { value: 5, suffix: '', label: 'Connected industries' },
  { value: 1, suffix: '', label: 'Global marketplace vision' },
] as const;

export const CTA = {
  headingLine1: 'THE JOURNEY',
  headingLine2: 'CONTINUES.',
  blurb: 'For business opportunities, strategic partnerships, media enquiries or professional communication.',
  buttonLabel: "Let's connect",
  buttonHref: '#contact',
  image: '/portrait.png',
} as const;

export const QUOTE_PRIMARY =
  'Success is not simply about building businesses; it is about solving real problems, earning people’s trust and creating something that makes their lives easier.';

export const SOCIALS = [
  { label: 'YalaRide', href: 'https://yalaride.com/' },
  { label: 'Email', href: 'mailto:riz_wizard@yahoo.com' },
] as const;

export const FOOTER_LINKS = [
  { label: 'YalaRide', href: 'https://yalaride.com/' },
  { label: 'Cars Compound', href: 'https://carscompound.com/' },
] as const;
