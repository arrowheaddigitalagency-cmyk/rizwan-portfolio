import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://mohammed-rizwan-life-in-motion.usmanfar2002.chatgpt.site'),
  title: 'Mohammed Rizwan — A Life in Motion',
  description: 'From Pakistan to Qatar and the United States. Discover the journey, businesses and global mobility vision of Mohammed Rizwan, CEO and Founder of YalaRide.',
  icons: { icon: '/icon.svg' },
  openGraph: {
  title: 'Mohammed Rizwan — A Life in Motion', description: 'Entrepreneur. Automotive leader. Founder of YalaRide.', images: [{ url: '/portrait.jpg', width: 1024, height: 1536, alt: 'Mohammed Rizwan' }] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Mohammed Rizwan', jobTitle: 'CEO & Founder', worksFor: { '@type': 'Organization', name: 'YalaRide', url: 'https://yalaride.com/' }, email: 'riz_wizard@yahoo.com', telephone: '+14075906100', description: 'Pakistani-American entrepreneur with experience across automotive services, car rentals, dealerships and tourism.' }) }} /></body></html>;
}


