import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { BRAND } from '@/lib/data';
import './globals.css';

const editorial = Cormorant_Garamond({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-editorial',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammed-rizwan-life-in-motion.usmanfar2002.chatgpt.site'),
  title: `A Life in Motion — ${BRAND.name}`,
  description:
    'Pakistani-American entrepreneur. More than three decades in the United States. Building businesses that solve real problems — culminating in YalaRide.',
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }], apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] },
  openGraph: {
    type: 'website',
    title: `A Life in Motion — ${BRAND.name}`,
    description: 'From Pakistan to Qatar to the United States — decades of enterprise culminating in YalaRide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mohammed Rizwan — A Life in Motion. Entrepreneur and Founder of YalaRide.' }],
  },
  twitter: { card: 'summary_large_image', title: `A Life in Motion — ${BRAND.name}`, description: 'Entrepreneur. Builder. Founder of YalaRide.', images: ['/og-image.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: BRAND.name,
    jobTitle: 'CEO & Founder',
    worksFor: { '@type': 'Organization', name: 'YalaRide', url: 'https://yalaride.com/' },
    email: BRAND.email,
    telephone: '+14075906100',
    description: BRAND.footerNote,
  };

  return (
    <html lang="en" className={`${editorial.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
