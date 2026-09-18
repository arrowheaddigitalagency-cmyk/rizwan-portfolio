export const site = {
  name: 'Mohammed Rizwan',
  title: 'CEO & Founder of YalaRide',
  film: 'A Life in Motion',
  email: 'riz_wizard@yahoo.com',
  phone: '+1 (407) 590-6100',
  phoneDisplay: '+1 (407) 590-6100',
  yala: 'https://yalaride.com/',
};

export const quotes = {
  primary:
    'Success is not simply about building businesses; it is about solving real problems, earning people’s trust and creating something that makes their lives easier.',
  philosophy:
    'I have always believed that no work is too small and no challenge is too great when you are committed to your vision.',
  leadership:
    'No matter how much a business grows, a leader should never lose touch with the customer, the team or the work itself.',
  yala: 'YalaRide is the result of everything I have learned in the automotive and rental industries. The goal is to make mobility easier for people and create better opportunities for rental businesses worldwide.',
};

export const hero = {
  film: 'A Life in Motion',
  name: 'Mohammed Rizwan',
  role: 'Entrepreneur · Automotive Leader · Founder of YalaRide',
  sub: 'Pakistani-American entrepreneur. More than three decades in the United States. A life built through hard work, movement and enterprise — culminating in YalaRide.',
};

export const origins = [
  {
    id: 'pakistan',
    place: 'Pakistan',
    label: '01',
    title: 'Early foundations',
    body: 'Born and educated in Pakistan, Mohammed Rizwan began his working life by taking on different small jobs and responsibilities. These early experiences developed his resilience, practical thinking and respect for hard work.',
    image: '/portrait.png',
    crop: '38% 16%',
  },
  {
    id: 'qatar',
    place: 'Qatar',
    label: '02',
    title: 'Professional experience abroad',
    body: 'An employment opportunity took him to Qatar, marking his first major international move. The experience strengthened his independence and introduced him to working across cultures and changing environments.',
    image: '/portrait.png',
    crop: '62% 24%',
  },
  {
    id: 'usa',
    place: 'United States',
    label: '03',
    title: 'A new chapter',
    body: 'Mohammed Rizwan later moved to the United States, where he has now lived for more than three decades. Starting again in a new country required patience, adaptability and the courage to pursue unfamiliar opportunities.',
    image: '/brands/compound-project.jpg',
    crop: '50% 42%',
  },
];

/** Editorial gallery compositions — each unique */
export type BizLayout = 'bleed' | 'behind' | 'dual' | 'type' | 'portal';

export const businesses: {
  name: string;
  tag: string;
  body: string;
  image: string;
  image2?: string;
  logo?: string;
  url?: string;
  layout: BizLayout;
  num: string;
}[] = [
  {
    num: '01',
    name: 'Cars Compound',
    tag: 'Auto body shop · Marietta',
    body: 'The major entrepreneurial turning point. A foundation in vehicle repair, customer care and the realities of building trust in a competitive local market.',
    image: '/brands/compound-project.jpg',
    logo: '/brands/compound.png',
    url: 'https://carscompound.com/',
    layout: 'bleed',
  },
  {
    num: '02',
    name: 'Priceless Car Rental',
    tag: 'Car rental operations',
    body: 'From vehicle services into fleet operations — pricing, bookings, customer expectations and the everyday challenges rental operators face.',
    image: '/brands/priceless-project.png',
    logo: '/brands/priceless.jpg',
    url: 'https://pricelesscarrental.com/',
    layout: 'bleed',
  },
  {
    num: '03',
    name: 'VIP Kars',
    tag: 'Automotive dealership',
    body: 'Vehicle sales, auctions, inventory and purchasing decisions — another essential layer of the automotive ecosystem.',
    image: '/brands/vip-project.png',
    logo: '/brands/vip.png',
    url: 'https://www.vipkars.com/',
    layout: 'bleed',
  },
  {
    num: '04',
    name: 'Automotive Operations',
    tag: 'Services · Auctions · Junkyard',
    body: 'End-to-end exposure across repair services, vehicle auctions, parts and junkyard operations — the industry from multiple perspectives.',
    image: '/brands/automotive-project.jpg',
    layout: 'type',
  },
  {
    num: '05',
    name: 'Tourism',
    tag: 'Travel & mobility',
    body: 'International travel exhibitions expanded his outlook beyond local automotive operations and highlighted the need for easier mobility for travellers.',
    image: '/brands/yalaride-car.webp',
    layout: 'portal',
  },
];

export const yala = {
  headline: ['Decades of experience.', 'One global vision.'],
  lead: 'YalaRide is a global car-rental marketplace created to make finding and accessing rental vehicles easier, more convenient and more competitive — while giving rental businesses a powerful way to reach new audiences.',
  why: 'After years of working directly in the automotive and rental industries, Mohammed Rizwan understood the same challenges from both sides. Customers wanted more accessible choices and better value. Rental businesses needed stronger visibility. YalaRide was created to bring those needs together.',
  built: 'Approximately eighteen months of focused development transformed decades of first-hand industry knowledge into a technology platform with global potential.',
  mission:
    'To make car rentals more accessible by connecting customers with rental businesses through a convenient, value-driven and globally scalable marketplace.',
  vision:
    'To grow YalaRide into a trusted worldwide mobility platform that helps people travel more easily and enables rental businesses of different sizes to participate in a broader digital marketplace.',
  visuals: [
    { src: '/brands/yalaride-app.webp', alt: 'YalaRide product surface', label: 'Product' },
    { src: '/brands/yalaride-map.webp', alt: 'YalaRide marketplace map', label: 'Reach' },
    { src: '/brands/yalaride-car.webp', alt: 'YalaRide vehicle choice', label: 'Choice' },
  ],
};

export const principles = [
  'Hard work',
  'Trust',
  'Accountability',
  'Innovation',
  'Adaptability',
];

export const leadership = {
  heading: 'A hands-on leader',
  body: 'Even after building and managing multiple ventures, Mohammed Rizwan remains closely involved in the work — attending vehicle auctions, monitoring operations and personally stepping in when a customer has a concern.',
  quote: quotes.leadership,
};

export const finale = {
  line1: 'The journey continues.',
  line2: 'Let’s build what’s next.',
  note: 'For business opportunities, strategic partnerships, media enquiries or professional communication.',
};
